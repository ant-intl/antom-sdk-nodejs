/** Dedicated transports for APIs whose wire format differs from signed JSON requests. */
import { createHash, randomUUID } from 'node:crypto';
import { connect, constants, type ClientHttp2Session, type ClientHttp2Stream } from 'node:http2';
import { AlipaySdkError } from './errors.js';
import { SDK_USER_AGENT } from './sdk-user-agent.js';
import { signRequest, verifySignature } from './signature.js';
import type { AntomClientOptions } from './types.js';

const METER_PATH = '/ams/api/v1/meter/uploadEvent';
const IMAGE_PATH = '/ams/api/v1/billing/product/uploadImage';
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_RESPONSE_BYTES = 8 * 1024 * 1024;
const UPLOAD_HOSTS: Readonly<Record<string, string>> = {
  'open-sea-global.alipay.com': 'open-big-sea.alipay.com',
  'open-sea.alipay.com': 'open-big-sea.alipay.com',
  'open-na-global.alipay.com': 'open-big-na.alipay.com',
  'open-na.alipay.com': 'open-big-na.alipay.com',
  'open-de-global.alipay.com': 'open-big-de-global.alipay.com',
};

/** Result envelope retained unchanged for callers to handle business outcomes. */
export interface SpecialApiResponse {
  result: { resultCode?: string; resultStatus?: string; resultMessage?: string };
}

/** Meter event batches, with integer quantities represented as decimal strings. */
export interface MeterUploadEventBody {
  meters: ReadonlyArray<{
    eventName?: string;
    events?: ReadonlyArray<{
      idempotencyKey?: string;
      eventTimestamp?: number;
      payload?: { value?: string; customerId?: string };
    }>;
  }>;
}

/** Meter results include server retry guidance without triggering an SDK retry. */
export interface MeterUploadEventResponse extends SpecialApiResponse {
  retryAfter?: number;
  errors?: ReadonlyArray<{
    index?: number;
    groupIndex?: number;
    eventName?: string;
    idempotencyKey?: string;
    customerId?: string;
    errorCode?: string;
  }>;
}

/** Session-only HTTP/2 transport settings; RSA credentials are deliberately absent. */
export interface MeterUploadOptions {
  gatewayUrl: string;
  sessionId: string;
  /** Timeout in milliseconds; defaults to 30000. */
  timeout?: number;
  signal?: AbortSignal;
  /** Override HTTP/2 connection creation for transport adapters and offline tests. */
  connect?: (origin: string) => ClientHttp2Session;
}

/** A bounded in-memory image avoids reading arbitrary file paths inside the SDK. */
export interface ProductImageUpload {
  productId: string;
  file: Uint8Array;
  filename: string;
  contentType?: string;
}

/** Product image response fields mirror the existing language SDKs. */
export interface ProductUploadImageResponse extends SpecialApiResponse {
  imageUrl?: string;
  imageName?: string;
  productId?: string;
}

/** Multipart settings use the same credentials and fetch injection as the JSON client. */
export interface ProductUploadOptions extends AntomClientOptions {
  uploadGatewayUrl?: string;
  signal?: AbortSignal;
}

function httpsOrigin(value: string): URL {
  let url: URL;
  try { url = new URL(value); } catch {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'Gateway must be an HTTPS origin.');
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'Gateway must be an HTTPS origin without credentials or a path.');
  }
  return url;
}

function cancellation(timeout = 30000, signal?: AbortSignal) {
  if (!Number.isInteger(timeout) || timeout <= 0 || timeout > 2147483647) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'timeout must be a positive 32-bit integer in milliseconds.');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new DOMException('Request timed out.', 'TimeoutError')), timeout);
  return {
    signal: signal ? AbortSignal.any([controller.signal, signal]) : controller.signal,
    dispose: () => clearTimeout(timer),
  };
}

function abortError(signal: AbortSignal): AlipaySdkError {
  const timeout = signal.reason instanceof Error && signal.reason.name === 'TimeoutError';
  return new AlipaySdkError(timeout ? 'TIMEOUT' : 'ABORTED', timeout ? 'Request timed out.' : 'Request was cancelled.');
}

function parseResponse(text: string): SpecialApiResponse {
  let value: unknown;
  try { value = JSON.parse(text); } catch {
    throw new AlipaySdkError('INVALID_RESPONSE', 'Response is not valid JSON.');
  }
  if (!value || typeof value !== 'object' || Array.isArray(value) || !('result' in value) ||
      !value.result || typeof value.result !== 'object' || Array.isArray(value.result)) {
    throw new AlipaySdkError('INVALID_RESPONSE', 'Response must contain a result object.');
  }
  return value as SpecialApiResponse;
}

/**
 * Upload meter events once over HTTP/2 using a session from the createSession API.
 * @param options HTTPS gateway, session ID, cancellation, and optional transport adapter.
 * @param body Event batches sent without RSA signing or sandbox path rewriting.
 * @returns The unmodified result and any server retry guidance.
 */
export async function uploadMeterEvents(options: MeterUploadOptions, body: MeterUploadEventBody): Promise<MeterUploadEventResponse> {
  const origin = httpsOrigin(options.gatewayUrl).origin;
  if (typeof options.sessionId !== 'string' || !options.sessionId.trim() || /[\r\n]/.test(options.sessionId)) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'sessionId must be a nonempty header value.');
  }
  if (!body || !Array.isArray(body.meters)) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'meters must be an array.');
  }
  let requestBody: string;
  try {
    requestBody = JSON.stringify(body);
    if (typeof requestBody !== 'string' || !requestBody.startsWith('{')) throw new Error();
  } catch {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'Meter events must be JSON serializable.');
  }
  const abort = cancellation(options.timeout, options.signal);
  return new Promise((resolve, reject) => {
    let session: ClientHttp2Session | undefined;
    let stream: ClientHttp2Stream | undefined;
    let settled = false;
    let status = 0;
    let size = 0;
    const chunks: Buffer[] = [];
    const finish = (error?: AlipaySdkError, response?: MeterUploadEventResponse) => {
      if (settled) return;
      settled = true;
      abort.dispose();
      abort.signal.removeEventListener('abort', onAbort);
      if (error) {
        stream?.close(constants.NGHTTP2_CANCEL);
        session?.destroy();
        reject(error);
      } else {
        session?.close();
        resolve(response!);
      }
    };
    const onAbort = () => finish(abortError(abort.signal));
    abort.signal.addEventListener('abort', onAbort, { once: true });
    if (abort.signal.aborted) { onAbort(); return; }
    try {
      session = (options.connect ?? connect)(origin);
      session.once('error', () => finish(new AlipaySdkError('TRANSPORT_ERROR', 'HTTP/2 connection failed.')));
      session.once('close', () => {
        if (!settled) finish(new AlipaySdkError('TRANSPORT_ERROR', 'HTTP/2 connection closed before a response.'));
      });
      session.once('connect', () => {
        if (settled) return;
        if (session!.alpnProtocol !== 'h2') {
          finish(new AlipaySdkError('TRANSPORT_ERROR', 'This API requires HTTP/2.'));
          return;
        }
        try {
          stream = session!.request({
            ':method': 'POST', ':path': METER_PATH,
            'x-session-id': options.sessionId,
            'content-type': 'application/json; charset=UTF-8',
            accept: 'application/json', 'user-agent': SDK_USER_AGENT,
          });
          stream.on('response', headers => { status = Number(headers[':status']); });
          stream.on('data', (chunk: Buffer) => {
            size += chunk.length;
            if (size > MAX_RESPONSE_BYTES) {
              finish(new AlipaySdkError('INVALID_RESPONSE', 'HTTP/2 response exceeds the size limit.'));
            } else { chunks.push(Buffer.from(chunk)); }
          });
          stream.once('error', () => finish(new AlipaySdkError('TRANSPORT_ERROR', 'HTTP/2 request failed.')));
          stream.once('aborted', () => finish(new AlipaySdkError('TRANSPORT_ERROR', 'HTTP/2 stream was aborted.')));
          stream.once('close', () => {
            if (!settled) finish(new AlipaySdkError('TRANSPORT_ERROR', 'HTTP/2 stream closed before a response.'));
          });
          stream.once('end', () => {
            if (settled) return;
            if (status !== 200) { finish(new AlipaySdkError('HTTP_ERROR', 'HTTP/2 request returned a non-200 status.', status)); return; }
            try { finish(undefined, parseResponse(Buffer.concat(chunks).toString('utf8')) as MeterUploadEventResponse); }
            catch (error) { finish(error as AlipaySdkError); }
          });
          stream.end(requestBody);
        } catch { finish(new AlipaySdkError('TRANSPORT_ERROR', 'Unable to start the HTTP/2 request.')); }
      });
    } catch { finish(new AlipaySdkError('TRANSPORT_ERROR', 'Unable to connect using HTTP/2.')); }
  });
}

function uploadOrigin(options: ProductUploadOptions): string {
  if (options.uploadGatewayUrl) return httpsOrigin(options.uploadGatewayUrl).origin;
  const gateway = httpsOrigin(options.gatewayUrl);
  const host = UPLOAD_HOSTS[gateway.hostname];
  if (!host || gateway.port) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'No upload gateway mapping; configure uploadGatewayUrl explicitly.');
  }
  return `https://${host}`;
}

function multipart(request: ProductImageUpload, body: string) {
  const boundary = `----AntomBoundary${randomUUID().replaceAll('-', '')}`;
  const filename = request.filename.replaceAll('\\', '/').split('/').at(-1)!.replace(/["\x00-\x1f\x7f]/g, '_');
  if (!filename.trim()) throw new AlipaySdkError('INVALID_ARGUMENT', 'The filename must contain a basename.');
  const mimeTypes: Readonly<Record<string, string>> = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp' };
  const contentType = request.contentType ?? mimeTypes[filename.split('.').at(-1)!.toLowerCase()] ?? 'application/octet-stream';
  if (!/^[\w!#$&^.+-]+\/[\w!#$&^.+-]+$/.test(contentType)) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'contentType must be a MIME type without parameters.');
  }
  const chunks = [Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="body"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${body}\r\n`)];
  // Both file aliases are required for compatibility with the existing multipart SDKs.
  for (const name of ['file', 'imageFile']) {
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${name}"; filename="${filename}"\r\nContent-Type: ${contentType}\r\nContent-Transfer-Encoding: binary\r\n\r\n`), Buffer.from(request.file), Buffer.from('\r\n'));
  }
  chunks.push(Buffer.from(`--${boundary}--\r\n`));
  return { contentType: `multipart/form-data; boundary=${boundary}`, payload: Buffer.concat(chunks) };
}

/**
 * Upload a product image once using the signed JSON body part and duplicate binary parts.
 * @param options RSA credentials, regional gateway, and optional upload gateway override.
 * @param request Product ID, image bytes, filename, and optional MIME type.
 * @returns The verified upload result, including the image URL when provided by Antom.
 */
export async function uploadProductImage(options: ProductUploadOptions, request: ProductImageUpload): Promise<ProductUploadImageResponse> {
  if (!request || typeof request.productId !== 'string' || !request.productId.trim() || request.productId.length > 64 ||
      !(request.file instanceof Uint8Array) || request.file.byteLength === 0 || request.file.byteLength > MAX_IMAGE_BYTES ||
      typeof request.filename !== 'string' || !request.filename.trim()) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'A product ID of at most 64 characters, filename, and image of 1 to 2097152 bytes are required.');
  }
  if (typeof options.clientId !== 'string' || !/^[\x21-\x7e]+$/.test(options.clientId) ||
      !options.merchantPrivateKey || !options.alipayPublicKey ||
      (options.agentToken && !/^[\x20-\x7e]+$/.test(options.agentToken))) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'Valid client identity, merchant/Antom keys, and agent token are required.');
  }
  const origin = uploadOrigin(options);
  const path = options.clientId.startsWith('SANDBOX_') ? IMAGE_PATH.replace('/ams/api', '/ams/sandbox/api') : IMAGE_PATH;
  const body = JSON.stringify({ productId: request.productId, fileSha256: createHash('sha256').update(request.file).digest('hex') });
  const time = new Date().toISOString();
  const payload = multipart(request, body);
  const headers = new Headers({
    'Content-Type': payload.contentType,
    Accept: 'application/json',
    'User-Agent': SDK_USER_AGENT,
    'Client-Id': options.clientId,
    'Request-Time': time,
    Signature: signRequest({ method: 'POST', path, clientId: options.clientId, time, body }, options.merchantPrivateKey, options.keyVersion),
  });
  if (options.agentToken) headers.set('Agent-Token', options.agentToken);
  const abort = cancellation(options.timeout, options.signal);
  let cancel: (() => void) | undefined;
  const cancelled = new Promise<never>((_resolve, reject) => {
    cancel = () => reject(abortError(abort.signal));
    abort.signal.addEventListener('abort', cancel, { once: true });
  });
  try {
    if (abort.signal.aborted) throw abortError(abort.signal);
    const send = async () => {
      const response = await (options.fetch ?? globalThis.fetch)(`${origin}${path}`, {
        method: 'POST', headers, body: new Uint8Array(payload.payload), signal: abort.signal, redirect: 'error',
      });
      if (response.status !== 200) {
        await response.body?.cancel();
        throw new AlipaySdkError('HTTP_ERROR', 'Image upload returned a non-200 status.', response.status);
      }
      const rawBody = await response.text();
      const signature = response.headers.get('Signature');
      const responseTime = response.headers.get('Response-Time');
      const clientId = response.headers.get('Client-Id');
      if (((signature !== null || responseTime !== null) && (!signature || !responseTime)) ||
          (clientId !== null && clientId !== options.clientId)) {
        throw new AlipaySdkError('SIGNATURE_ERROR', 'Image response signature headers are incomplete or inconsistent.');
      }
      if (signature && responseTime && !verifySignature({ method: 'POST', path, clientId: options.clientId, time: responseTime, body: rawBody }, signature, options.alipayPublicKey)) {
        throw new AlipaySdkError('SIGNATURE_ERROR', 'Image response signature verification failed.');
      }
      const result = parseResponse(rawBody) as ProductUploadImageResponse;
      if (!signature && result.result.resultStatus !== 'F') {
        throw new AlipaySdkError('SIGNATURE_ERROR', 'An unsigned image response must be a failure.');
      }
      return result;
    };
    return await Promise.race([send(), cancelled]);
  } catch (error) {
    if (error instanceof AlipaySdkError) throw error;
    if (abort.signal.aborted) throw abortError(abort.signal);
    throw new AlipaySdkError('TRANSPORT_ERROR', 'Image upload transport failed.');
  } finally {
    abort.dispose();
    if (cancel) abort.signal.removeEventListener('abort', cancel);
  }
}
