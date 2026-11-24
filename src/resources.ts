/** Typed operation binding and the two transports that require dedicated business methods. */
import type { GeneratedResources } from './generated/resource/index.js';
import { uploadMeterEvents, uploadProductImage } from './special.js';
import type {
  MeterUploadEventBody, MeterUploadEventResponse, MeterUploadOptions,
  ProductImageUpload, ProductUploadImageResponse, ProductUploadOptions,
} from './special.js';
import type { AntomClientOptions, Operation, OperationExecutor, RequestOptions } from './types.js';

/** Per-image overrides retain the client's configured signing identity and transport. */
export type ProductImageRequestOptions = Pick<ProductUploadOptions, 'timeout' | 'signal' | 'uploadGatewayUrl'>;

/** Meter uploads require a session and retain their dedicated HTTP/2 transport. */
export type MeterEventRequestOptions = Pick<MeterUploadOptions, 'sessionId' | 'timeout' | 'signal' | 'connect'>;

/** Generated business resources extended with their dedicated image and meter upload methods. */
export type ClientResources = Omit<GeneratedResources, 'billing'> & {
  readonly billing: GeneratedResources['billing'] & {
    /**
     * Upload a product image using the client's identity and multipart transport.
     * @param request Product identifier, filename, and bounded image bytes.
     * @param options Optional deadline, cancellation, and upload gateway override.
     * @returns The verified product image result.
     */
    readonly productUploadImage: (request: ProductImageUpload, options?: ProductImageRequestOptions) => Promise<ProductUploadImageResponse>;
    /**
     * Upload meter batches with session authentication over HTTP/2.
     * @param body Event batches retaining their wire-format values.
     * @param options Session identity and optional deadline, cancellation, or HTTP/2 adapter.
     * @returns The unchanged meter result and server retry guidance.
     */
    readonly meterUploadEvent: (body: MeterUploadEventBody, options: MeterEventRequestOptions) => Promise<MeterUploadEventResponse>;
  };
};

/**
 * Bind one generated operation without changing its request, options, or response types.
 * @param execute The owning client's typed JSON executor.
 * @param operation The existing generated operation descriptor.
 * @returns A resource method that delegates parameters and options without transformation.
 */
export function bindOperation<TRequest, TResponse>(
  execute: OperationExecutor, operation: Operation<TRequest, TResponse>,
): (params: TRequest, options?: RequestOptions) => Promise<TResponse> {
  return (params, options) => execute(operation, params, options);
}

/**
 * Add dedicated transports while retaining all generated business resources.
 * @param generated The immutable generated resource tree bound to the client.
 * @param clientOptions The owning client's frozen identity and transport configuration.
 * @returns An immutable tree including product images and meter events.
 * @internal
 */
export function createClientResources(
  generated: GeneratedResources, clientOptions: Readonly<AntomClientOptions>,
): ClientResources {
  return Object.freeze({
    ...generated,
    billing: Object.freeze({
      ...generated.billing,
      productUploadImage: (request: ProductImageUpload, options: ProductImageRequestOptions = {}) => uploadProductImage({
        ...clientOptions,
        timeout: options.timeout ?? clientOptions.timeout,
        signal: options.signal,
        uploadGatewayUrl: options.uploadGatewayUrl,
      }, request),
      meterUploadEvent: (body: MeterUploadEventBody, options: MeterEventRequestOptions) => uploadMeterEvents({
        gatewayUrl: clientOptions.gatewayUrl,
        sessionId: options?.sessionId,
        timeout: options?.timeout ?? clientOptions.timeout,
        signal: options?.signal,
        connect: options?.connect,
      }, body),
    }),
  });
}
