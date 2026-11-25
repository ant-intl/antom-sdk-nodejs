/** Client configuration and transport contracts shared by generated operations and the signed client. */
import { AlipaySdkError } from './errors.js';

declare const OPERATION_TYPES: unique symbol;

/** A generated POST operation carrying its request and response types. */
export interface Operation<TRequest, TResponse> {
  readonly method: 'POST';
  readonly path: string;
  readonly [OPERATION_TYPES]?: (request: TRequest) => TResponse;
}

/** Client credentials and transport configuration, supplied by the application. */
export interface AntomClientOptions {
  gatewayUrl: string;
  clientId: string;
  merchantPrivateKey: string;
  alipayPublicKey: string;
  keyVersion?: string;
  agentToken?: string;
  /** Timeout in milliseconds; defaults to 30000. */
  timeout?: number;
  fetch?: typeof globalThis.fetch;
}

/** Per-request cancellation, deadline, and additional non-protocol headers. */
export interface RequestOptions {
  signal?: AbortSignal;
  /** Timeout in milliseconds, overriding the client's default. */
  timeout?: number;
  headers?: HeadersInit;
}

/** A typed JSON operation executor shared by generated business resources. */
export interface OperationExecutor {
  <TRequest, TResponse>(
    operation: Operation<TRequest, TResponse>, params: TRequest, options?: RequestOptions,
  ): Promise<TResponse>;
}

/** The exact bytes and routing information used by the Antom signature protocol. */
export interface SignedMessage {
  method: string;
  path: string;
  clientId: string;
  time: string;
  body: string;
}

/** Raw notification data; body must be captured before JSON parsing. */
export interface NotificationVerificationOptions {
  path: string;
  body: string;
  headers: HeadersInit;
  clientId: string;
}

/**
 * Reject ambiguous or cross-origin paths before signing or sending credentials.
 * @param path Absolute API path without an origin, query, or fragment.
 * @internal
 */
export function assertRequestPath(path: string): void {
  if (typeof path !== 'string' || !/^\/[A-Za-z0-9/_.~-]+$/.test(path)
    || path.startsWith('//') || new URL(path, 'https://sdk.invalid').pathname !== path) {
    throw new AlipaySdkError('INVALID_ARGUMENT', 'An unambiguous absolute API path is required.');
  }
}

/**
 * Bind an API path to generated request and response types.
 * @param path Absolute API path from the OpenAPI metadata.
 * @returns An immutable descriptor used by the client's private JSON transport.
 */
export function defineOperation<TRequest, TResponse>(path: string): Operation<TRequest, TResponse> {
  assertRequestPath(path);
  return Object.freeze({ method: 'POST', path });
}
