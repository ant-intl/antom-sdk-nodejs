// Special transports are tested without network connections or payment credentials.
import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { readFileSync } from 'node:fs';
import { createHash, generateKeyPairSync, sign, verify } from 'node:crypto';
import { test } from 'node:test';
import { uploadMeterEvents, uploadProductImage } from '../dist/esm/index.js';

const gatewayUrl = 'https://open-sea.alipay.com';
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const expectedUserAgent = `antomsdk-nodejs/${version}`;
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
});
const rsaOptions = {
  gatewayUrl, clientId: 'SANDBOX_test', merchantPrivateKey: privateKey,
  alipayPublicKey: publicKey, agentToken: 'agent-test',
};

function http2Adapter({ status = 200, body = '{"result":{"resultStatus":"S"}}', alpn = 'h2', pending = false, error = false } = {}) {
  const observations = { connects: 0, requests: 0, destroyed: false, closed: false };
  const session = new EventEmitter();
  const stream = new EventEmitter();
  session.alpnProtocol = alpn;
  session.close = () => { observations.closed = true; session.emit('close'); };
  session.destroy = () => { observations.destroyed = true; session.emit('close'); };
  stream.close = () => { stream.emit('close'); };
  stream.end = requestBody => {
    observations.body = requestBody;
    if (pending) return;
    queueMicrotask(() => {
      if (error) { stream.emit('error', new Error('remote detail')); return; }
      stream.emit('response', { ':status': status });
      stream.emit('data', Buffer.from(body));
      stream.emit('end');
    });
  };
  session.request = headers => {
    observations.requests += 1;
    observations.headers = headers;
    return stream;
  };
  return {
    observations,
    connect: origin => {
      observations.connects += 1;
      observations.origin = origin;
      queueMicrotask(() => session.emit('connect'));
      return session;
    },
  };
}

test('meter uploads use HTTP/2 session authentication and preserve the production path', async () => {
  const adapter = http2Adapter({ body: '{"result":{"resultStatus":"U"},"retryAfter":10}' });
  const body = { meters: [{ eventName: 'tokens', events: [{ idempotencyKey: 'id-1', payload: { value: '9007199254740993', customerId: 'customer' } }] }] };
  const result = await uploadMeterEvents({ gatewayUrl, sessionId: 'session-test', connect: adapter.connect }, body);
  assert.equal(result.retryAfter, 10);
  assert.deepEqual(JSON.parse(adapter.observations.body), body);
  assert.equal(adapter.observations.origin, gatewayUrl);
  assert.deepEqual(adapter.observations.headers, {
    ':method': 'POST', ':path': '/ams/api/v1/meter/uploadEvent',
    'x-session-id': 'session-test', 'content-type': 'application/json; charset=UTF-8',
    accept: 'application/json', 'user-agent': adapter.observations.headers['user-agent'],
  });
  assert.equal(adapter.observations.headers['user-agent'], expectedUserAgent);
  assert.equal(adapter.observations.connects, 1);
  assert.equal(adapter.observations.closed, true);
});

test('meter uploads reject HTTP/1 and never start an HTTP/1 request', async () => {
  const adapter = http2Adapter({ alpn: 'http/1.1' });
  await assert.rejects(uploadMeterEvents({ gatewayUrl, sessionId: 'session', connect: adapter.connect }, { meters: [] }), { code: 'TRANSPORT_ERROR' });
  assert.equal(adapter.observations.requests, 0);
  assert.equal(adapter.observations.destroyed, true);
});

test('meter transport rejects statuses and malformed responses without retrying', async () => {
  for (const [settings, code] of [
    [{ status: 429 }, 'HTTP_ERROR'], [{ body: 'broken' }, 'INVALID_RESPONSE'],
    [{ body: '{"result":null}' }, 'INVALID_RESPONSE'], [{ error: true }, 'TRANSPORT_ERROR'],
  ]) {
    const adapter = http2Adapter(settings);
    await assert.rejects(uploadMeterEvents({ gatewayUrl, sessionId: 'session', connect: adapter.connect }, { meters: [] }), { code });
    assert.equal(adapter.observations.connects, 1);
    assert.equal(adapter.observations.requests, 1);
  }
});

test('meter deadlines and cancellation close pending HTTP/2 connections', async () => {
  const timed = http2Adapter({ pending: true });
  await assert.rejects(uploadMeterEvents({ gatewayUrl, sessionId: 'session', timeout: 5, connect: timed.connect }, { meters: [] }), { code: 'TIMEOUT' });
  assert.equal(timed.observations.destroyed, true);
  const adapter = http2Adapter({ pending: true });
  const controller = new AbortController();
  const request = uploadMeterEvents({ gatewayUrl, sessionId: 'session', signal: controller.signal, connect: adapter.connect }, { meters: [] });
  controller.abort();
  await assert.rejects(request, { code: 'ABORTED' });
  assert.equal(adapter.observations.destroyed, true);
});

test('meter invalid identity and gateway never create a connection', async () => {
  const adapter = http2Adapter();
  for (const options of [
    { gatewayUrl: 'http://localhost', sessionId: 'session' },
    { gatewayUrl: 'https://user:pass@example.com', sessionId: 'session' },
    { gatewayUrl: `${gatewayUrl}/path`, sessionId: 'session' },
    { gatewayUrl, sessionId: 'session\r\nHeader: value' },
    { gatewayUrl, sessionId: '  ' },
    { gatewayUrl, sessionId: 'session', timeout: 0 },
  ]) {
    await assert.rejects(uploadMeterEvents({ ...options, connect: adapter.connect }, { meters: [] }), { code: 'INVALID_ARGUMENT' });
  }
  assert.equal(adapter.observations.connects, 0);
});

function signedResponse(url, body = '{"result":{"resultStatus":"S"},"imageUrl":"https://image.example/test.png"}') {
  const time = '2026-10-30T00:00:00.000Z';
  const content = `POST ${new URL(url).pathname}\n${rsaOptions.clientId}.${time}.${body}`;
  const signature = sign('RSA-SHA256', Buffer.from(content), privateKey).toString('base64');
  return new Response(body, { headers: { 'Response-Time': time, Signature: `algorithm=RSA256,keyVersion=1,signature=${encodeURIComponent(signature)}` } });
}

test('image upload signs the JSON body part and sends both bounded binary aliases', async () => {
  const file = Uint8Array.from([0, 1, 2, 255]);
  let calls = 0;
  const fetch = async (url, init) => {
    calls += 1;
    assert.equal(url, 'https://open-big-sea.alipay.com/ams/sandbox/api/v1/billing/product/uploadImage');
    assert.equal(init.redirect, 'error');
    const headers = new Headers(init.headers);
    assert.equal(headers.get('Agent-Token'), 'agent-test');
    assert.equal(headers.get('User-Agent'), expectedUserAgent);
    const wireBody = Buffer.from(init.body).toString('utf8');
    const body = JSON.stringify({ productId: 'product-1', fileSha256: createHash('sha256').update(file).digest('hex') });
    assert.ok(wireBody.includes(`Content-Type: application/json; charset=UTF-8\r\n\r\n${body}\r\n`));
    assert.match(wireBody, /name="file"; filename="image_\.png"/);
    assert.match(wireBody, /name="imageFile"; filename="image_\.png"/);
    assert.equal(wireBody.split('Content-Transfer-Encoding: binary').length - 1, 2);
    const message = `POST ${new URL(url).pathname}\n${rsaOptions.clientId}.${headers.get('Request-Time')}.${body}`;
    const signature = decodeURIComponent(headers.get('Signature').split('signature=')[1]);
    assert.equal(verify('RSA-SHA256', Buffer.from(message), publicKey, Buffer.from(signature, 'base64')), true);
    return signedResponse(url);
  };
  const result = await uploadProductImage({ ...rsaOptions, fetch }, { productId: 'product-1', file, filename: '../image".png' });
  assert.equal(result.imageUrl, 'https://image.example/test.png');
  assert.equal(calls, 1);
});

test('image upload rejects tampering, incomplete signatures, unsigned success and unknown results', async () => {
  const request = { productId: 'id', file: Uint8Array.of(1), filename: 'image.png' };
  for (const response of [
    new Response('{"result":{"resultStatus":"S"}}'),
    new Response('{"result":{"resultStatus":"U"}}'),
    new Response('{"result":{"resultStatus":"F"}}', { headers: { Signature: '' } }),
    new Response('{"result":{"resultStatus":"F"}}', { headers: { 'Client-Id': 'different' } }),
    new Response('{"result":{"resultStatus":"F"}}', { headers: { 'Response-Time': 'time' } }),
    new Response('{"result":{"resultStatus":"S"}}', { headers: { 'Response-Time': 'time', Signature: 'broken' } }),
  ]) {
    await assert.rejects(uploadProductImage({ ...rsaOptions, fetch: async () => response }, request), { code: 'SIGNATURE_ERROR' });
  }
  const result = await uploadProductImage({ ...rsaOptions, fetch: async () => new Response('{"result":{"resultStatus":"F"}}') }, request);
  assert.equal(result.result.resultStatus, 'F');
});

test('image upload validates size, filenames, origins and MIME headers before sending', async () => {
  let calls = 0;
  const fetch = async () => { calls += 1; throw new Error('must not run'); };
  const valid = { productId: 'id', file: Uint8Array.of(1), filename: 'image.png' };
  for (const request of [
    { ...valid, file: new Uint8Array() }, { ...valid, file: new Uint8Array(2 * 1024 * 1024 + 1) },
    { ...valid, productId: 'x'.repeat(65) }, { ...valid, filename: '' }, { ...valid, filename: '/' },
    { ...valid, contentType: 'image/png\r\nHeader: value' },
  ]) {
    await assert.rejects(uploadProductImage({ ...rsaOptions, fetch }, request), { code: 'INVALID_ARGUMENT' });
  }
  await assert.rejects(uploadProductImage({ ...rsaOptions, gatewayUrl: 'https://unknown.example', fetch }, valid), { code: 'INVALID_ARGUMENT' });
  await assert.rejects(uploadProductImage({ ...rsaOptions, uploadGatewayUrl: 'http://example.com', fetch }, valid), { code: 'INVALID_ARGUMENT' });
  await assert.rejects(uploadProductImage({ ...rsaOptions, clientId: 'nonascii-身份', fetch }, valid), { code: 'INVALID_ARGUMENT' });
  await assert.rejects(uploadProductImage({ ...rsaOptions, alipayPublicKey: '', fetch }, valid), { code: 'INVALID_ARGUMENT' });
  assert.equal(calls, 0);
});

test('image upload supports explicit HTTPS gateways and never retries HTTP errors', async () => {
  let calls = 0;
  const fetch = async url => {
    calls += 1;
    assert.equal(new URL(url).origin, 'https://upload.example:8443');
    return new Response('upstream failure', { status: 503 });
  };
  await assert.rejects(uploadProductImage({ ...rsaOptions, uploadGatewayUrl: 'https://upload.example:8443', fetch }, { productId: 'id', file: Uint8Array.of(1), filename: 'image.png' }), { code: 'HTTP_ERROR', status: 503 });
  assert.equal(calls, 1);
});

test('image deadlines and cancellation settle even when a custom fetch ignores the signal', async () => {
  const request = { productId: 'id', file: Uint8Array.of(1), filename: 'image.png' };
  let calls = 0;
  const fetch = () => { calls += 1; return new Promise(() => {}); };
  await assert.rejects(uploadProductImage({ ...rsaOptions, fetch, timeout: 5 }, request), { code: 'TIMEOUT' });
  const controller = new AbortController();
  const pending = uploadProductImage({ ...rsaOptions, fetch, signal: controller.signal }, request);
  controller.abort();
  await assert.rejects(pending, { code: 'ABORTED' });
  assert.equal(calls, 2);
});
