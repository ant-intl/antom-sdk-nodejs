# @antom-tech/node

Antom's server-side SDK requires Node.js newer than 22.23.5. It provides Promise-based business resources, TypeScript declarations, native ESM, CommonJS compatibility, and zero runtime dependencies.

This repository contains the runtime, generated API contracts, templates, tests, and packaged amount rules. Build a local tarball with `npm pack`, or publish the verified package to npm with `npm run release`.

## Installation

For a published npm release, install the package in your application.

```sh
npm install @antom-tech/node
```

To build a local package from this checkout, run the following commands in the SDK repository, then install the resulting `.tgz` in your application.

```sh
npm ci --ignore-scripts
npm pack
```

## Signed API requests

Use business resources on the client. Each method accepts a typed request object and optional request settings, and returns a Promise of its response type:

```ts
import { AntomClient, AmountUtil } from '@antom-tech/node';
import type {
  AlipayPayRequest, AlipayPayResponse,
  AlipayCustomerCreateRequest, AlipayCustomerCreateResponse,
  AlipayTaxInquireSettingsResponse,
} from '@antom-tech/node';

const client = new AntomClient({
  gatewayUrl: process.env.ANTOM_GATEWAY_URL!,
  clientId: process.env.ANTOM_CLIENT_ID!,
  merchantPrivateKey: process.env.ANTOM_MERCHANT_PRIVATE_KEY!,
  alipayPublicKey: process.env.ANTOM_PUBLIC_KEY!,
  timeout: 30000,
});

// The application supplies the complete request required by the generated API contract.
function submitPayment(request: AlipayPayRequest, signal?: AbortSignal): Promise<AlipayPayResponse> {
  return client.pay.paymentsPay(request, { signal, timeout: 30000 });
}

function createCustomer(request: AlipayCustomerCreateRequest): Promise<AlipayCustomerCreateResponse> {
  return client.billing.customerCreate(request);
}

function inquireTaxSettings(): Promise<AlipayTaxInquireSettingsResponse> {
  return client.billing.taxInquireSettings({});
}

const value = AmountUtil.toAmount('10.25', 'USD'); // '1025' for paymentAmount.value
```

Business parameters are ordinary objects whose properties retain the API's JSON names. Pass request settings as the second argument with `{ signal, timeout, headers }`. The client's default `timeout` is `30000` milliseconds, and each request can override it. TypeScript infers each method's request and response types.

Client configuration uses the `AntomClientOptions` type. `DefaultAntomClient` is an alias of `AntomClient`.

Every call has the form `client.<group>.<camelMethod>`. The group uses the metadata's exact `classPackage`, or the first business URL segment when no package is provided. After removing the technical URL prefix through its first `vN` segment, a leading segment naming the same resource as the group is removed once when more segments follow. Matching includes exact names and English singular/plural forms, such as `subscription` and `subscriptions`. The remaining segments form the camel-case method name. Each business group exposes methods directly. Examples include:

| Resource | Methods |
| --- | --- |
| `client.pay` | `paymentsPay`, `paymentsRefund`, `paymentsReserveCreateRule`, `vaultsFetchNonce`, `paymentMethodsInquirePaymentMethod` |
| `client.auth` | `authorizationsApplyToken`, `authorizationsRevoke` |
| `client.notification` | `inquireNotification`, `inquireNotificationList` |
| `client.dispute` | `paymentsAcceptDispute`, `paymentsSupplyEvidence` |
| `client.subscription` | `create`, `cancel`, `change`, `update`, `inquiry`, `inquireSubscription`, `inquireSubscriptionList`, `inquireSubscriptionPayment` |
| `client.agentic` | `agenticPaymentCreateBindingSession`, `agenticPaymentInquirePaymentToken` |
| `client.marketplace` | `fundsCreatePayout`, `accountsInquireBalance`, `merchantsSettlementInfoUpdate`, `businessAttachmentSubmitAttachment` |
| `client.aba` | `cardsApplyCard`, `accountInquireAvailableQuota`, `accountsInquiryBalance` |
| `client.billing` | `customerCreate`, `productUpdate`, `meterCreateSession`, `meterCreditGrantCreate`, `invoiceConfirmPayment`, `taxInquireSettings` |

Set `gatewayUrl` to the HTTPS gateway origin, for example `https://open-sea.alipay.com`. The SDK appends the API path. A client ID starting with `SANDBOX_` rewrites `/ams/api` to `/ams/sandbox/api` before signing. `agentToken` and `keyVersion` are optional client settings. `fetch` can be injected for custom transport adapters.

Requests are serialized once and signed using the same bytes that are sent. The SDK verifies original response text before returning a successful result. Unsigned `F`/`U` JSON results follow the existing SDK convention and are returned for the caller to handle; an incomplete signature-header pair is rejected. The SDK does not automatically retry payments, follow redirects, or overwrite signed protocol headers with custom headers. Use stable business request IDs when implementing application-level retries.

Failures use `AlipaySdkError.code`: `INVALID_ARGUMENT`, `HTTP_ERROR`, `TRANSPORT_ERROR`, `TIMEOUT`, `ABORTED`, `SIGNATURE_ERROR`, or `INVALID_RESPONSE`. HTTP errors expose their status without including raw response bodies or private keys. Business `resultStatus` remains part of the returned response rather than being converted into a transport exception.

## TypeScript types

Import Request/Response types and shared wire types directly from the package root. Shared examples include `Amount`, `Address`, `Quote`, `UserName`, and `CreditPayPlan`. In the current metadata, `Quote.quotePrice` is a required `number`.

```ts
import type { AlipayPayRequest, Amount, Quote, PayModels } from '@antom-tech/node';

const amount: Amount = { currency: 'USD', value: '1025' };
const quote: Quote = { quoteCurrencyPair: 'USD/EUR', quotePrice: 0.95 };
const challengeType: PayModels.ChallengeType = 'SMS_OTP';
```

Reachable operation-specific models use `XxxModels` namespaces, such as `PayModels.ChallengeType`. Common types are exported directly from the package root. The package root explicitly lists its public exports.

## ESM, CommonJS, and bundling

ESM applications use named imports.

```js
import { AntomClient, AmountUtil } from '@antom-tech/node';
```

CommonJS applications use `require()`.

```js
const { AntomClient, AmountUtil } = require('@antom-tech/node');
```

On Node.js versions with `require(esm)` enabled, both entry points load the same native ESM implementation. Other supported Node.js versions load the CommonJS build for `require()`.

Use ESM imports when bundling to let the bundler remove unused SDK code. Generated operation descriptors and the coverage registry can be removed when unused. The build embeds the currency rules in a module, so a standalone `AmountUtil` bundle can perform conversions without a separate JSON file.

## Notifications

Capture the raw request body before your web framework parses JSON:

```ts
import { verifyNotification } from '@antom-tech/node';

const valid = verifyNotification({
  path: '/your/actual/notification/path',
  clientId: process.env.ANTOM_CLIENT_ID!,
  headers: receivedHeaders,
  body: originalBodyText,
}, process.env.ANTOM_PUBLIC_KEY!);
```

Never verify a parsed and reserialized body. Reject an invalid signature before processing the event, and implement business-level idempotency for duplicate notifications. PEM keys and bare Base64 PKCS#8 private / X.509 SPKI public keys are supported.

## Amounts

```ts
import { AmountUtil } from '@antom-tech/node';

AmountUtil.toAmount('10.25', 'USD'); // '1025'
AmountUtil.fromAmount('1025', 'USD'); // '10.25'
AmountUtil.validate('1000', 'IDR'); // returns normally
```

Amounts use strings, without floating-point conversion or rounding. The packaged central rules control supported currencies, decimal precision and outbound multiples. All methods accept zero, canonical values are limited to sixteen digits, and `fromAmount` does not apply outbound-multiple constraints. Invalid inputs throw `AmountError` with the same error categories as the other language SDKs. Passing this utility's validation does not guarantee that a particular payment API accepts the amount.

## Special transports

Special APIs also live under their business resources:

```ts
import type {
  ProductImageUpload, ProductImageRequestOptions,
  MeterUploadEventBody, MeterEventRequestOptions,
} from '@antom-tech/node';

function uploadImage(request: ProductImageUpload, options?: ProductImageRequestOptions) {
  return client.billing.productUploadImage(request, options);
}

function uploadEvents(body: MeterUploadEventBody, options: MeterEventRequestOptions) {
  return client.billing.meterUploadEvent(body, options);
}
```

Image uploads accept a `Uint8Array` up to 2 MiB. The method uses the client's RSA credentials, signs the JSON multipart body, and verifies the response. An optional `uploadGatewayUrl` overrides regional upload-host resolution.

Meter uploads require `sessionId` in the second argument, obtained from `client.billing.meterCreateSession`. This transport requires HTTP/2 and session authentication; it does not apply sandbox rewriting, RSA signing, response signature verification, redirects, or retries. Its request settings also support `signal` and `timeout` in milliseconds.

These two methods use their dedicated protocols and are excluded from the ordinary generated service registry. The standalone `uploadProductImage` and `uploadMeterEvents` functions remain available for compatibility.

## Development and package verification

```sh
npm ci --ignore-scripts
npm test
npm run check:package
npm pack
```

The tarball check installs the built archive into a temporary consumer project and verifies native ESM, CommonJS fallback, TypeScript declarations, business methods, private infrastructure, and amount conversion.

Tests use temporary keys and injected transports. Published files include JavaScript, TypeScript declarations, amount resources, documentation, and the legal disclaimer.

## Publishing

To publish `@antom-tech/node` publicly to `https://registry.npmjs.org/`, authenticate an npm account with publishing access and install the development dependencies. Commit source changes and run the release from the repository root.

```sh
npm run release
```

The default command runs the tests, increments the patch version in `package.json` and `package-lock.json`, builds the SDK, and installs its tarball in a temporary consumer project to verify runtime and type contracts. The build embeds `antomsdk-nodejs/<version>` in the request `User-Agent`, and the tarball check verifies that it matches the installed package version exactly, including any prerelease suffix. The release command then publishes that exact archive with the `latest` tag and public access. The publishing process retains terminal access for authentication. After npm confirms publication, the script commits the two version files and creates a local Git tag named with the exact version, such as `0.1.1` or `0.1.1-beta.0`.

Use `--tag <beta|latest|pre>` to choose the npm dist-tag, and `--version <major|minor|patch>` to choose the version increment.

```sh
npm run release -- --tag beta --version minor
npm run release -- --tag pre --version patch
npm run release -- --dry-run
```

`beta` and `pre` start a prerelease series using the selected version increment and a counter of `0`. From `0.1.0`, a beta patch produces `0.1.1-beta.0` and a beta minor produces `0.2.0-beta.0`. A consecutive release in the same channel increments the counter, so `0.1.1-beta.0` becomes `0.1.1-beta.1`. Switching channels applies the selected increment to start a new series. A preview verifies the next version in an isolated temporary copy and reports the package, registry, and tag.

A failed check stops the release. If a real release fails after the version increment, the candidate version remains in both manifests for inspection. The next invocation calculates its version from that candidate. If npm confirms publication and the Git snapshot fails, complete the release commit and tag for that version before running another release.

## Export snapshots

Public exports have separate committed snapshots in `test/snapshots/runtime-exports.json` and `test/snapshots/type-exports.json`. Runtime checks cover the actual CommonJS and ESM package entries. Type checks cover the source entry and both declaration entries, including the type side of classes and members inside model namespaces. Snapshots record public names and categories; wire-contract structure is checked separately by the generator.

Normal builds, generation, and tests never update these baselines. After an intentional public API change, regenerate them explicitly, review the snapshot diff, and rerun the tests:

```sh
npm run snapshot:exports:update
npm test
```

## Generated contracts and amount rules

Generated contracts live in `src/generated/`. Currency rules are stored in `resources/amount-currency-rules.json`, with corresponding test cases in `test/resources/amount-conversion-test-cases.json`.

The generated source tree contains the following modules.

- `model/<operation>.ts` is emitted only when an API has reachable local model types.
- `resource/<group>.ts` contains the group's Request/Response types, descriptors, and resource factory. For example, `resource/pay.ts` defines direct methods on `client.pay`, including `paymentsPay`, `vaultsFetchNonce`, and `paymentMethodsInquirePaymentMethod`.
- `share.ts` contains equivalent model types whose dependencies are also shared.
- `resource/index.ts` aggregates resource factories and the internal operation registry.
- `index.ts` explicitly exports public types and nonempty model namespaces.

Run `npm test` after updating generated contracts or amount rules. The tests check generated operations, transport descriptors, public exports, and amount conversions.

Reference documentation includes the Antom signature specification, Python SDK, and Node.js package and release documentation. [Antom signatures](https://docs.antom.com/ac/ams/digital_signature), [Python SDK](https://github.com/alipay/global-open-sdk-python), [Node package exports](https://nodejs.org/api/packages.html), [Node releases](https://nodejs.org/en/about/previous-releases).
