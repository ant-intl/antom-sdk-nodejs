// Verify the tarball as a consumer, including NodeNext TypeScript import and require resolution.
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ts = createRequire(import.meta.url)('typescript');
const PRIVATE_EXPORTS = ['defineOperation', 'SDK_USER_AGENT', 'Operation', 'OperationExecutor',
  'ClientResources', 'GeneratedResources', 'createResources', 'resourceOperations'];
const [mode, ...publishFlags] = process.argv.slice(2);
assert.ok(mode === undefined || mode === '--publish', 'Use --publish to release the verified tarball.');
const { values } = parseArgs({
  args: publishFlags,
  options: { tag: { type: 'string', default: 'latest' }, 'dry-run': { type: 'boolean', default: false } },
});
assert.ok(['beta', 'latest', 'pre'].includes(values.tag), '--tag must be beta, latest, or pre.');
const temporary = mkdtempSync(join(tmpdir(), 'antom-package-'));

function explicitExports(file) {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  assert.equal(source.parseDiagnostics.length, 0, `Invalid TypeScript entry: ${file}`);
  const names = new Map();
  const add = (name, module) => {
    assert.ok(!names.has(name), `Duplicate public export ${name} in ${file}`);
    names.set(name, module);
  };
  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement)) {
      assert.ok(statement.exportClause, `Bare export star is forbidden in ${file}`);
      const module = statement.moduleSpecifier?.text;
      if (ts.isNamedExports(statement.exportClause)) {
        for (const item of statement.exportClause.elements) add(item.name.text, module);
      } else { add(statement.exportClause.name.text, module); }
    } else if (statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      const bindings = ts.isVariableStatement(statement) ? statement.declarationList.declarations : [statement];
      for (const binding of bindings) {
        assert.ok(binding.name && ts.isIdentifier(binding.name), `Unsupported public binding in ${file}`);
        add(binding.name.text);
      }
    }
  }
  for (const name of PRIVATE_EXPORTS) assert.ok(!names.has(name), `Private export ${name} leaked from ${file}`);
  return names;
}

function run(command, args, cwd = temporary) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  assert.equal(result.status, 0, `${command} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
function runNpm(args, cwd) {
  const options = ['--cache', join(temporary, 'npm-cache'), ...args];
  return run('npm', options, cwd);
}
try {
  const sourceExports = explicitExports(resolve(root, 'src/index.ts'));
  const generatedExports = explicitExports(resolve(root, 'src/generated/index.ts'));
  const models = [...generatedExports.keys()].filter(name => name.endsWith('Models')).sort();
  assert.deepEqual([...sourceExports.keys()].filter(name => name.endsWith('Models')).sort(), models,
    'The root must expose exactly the nonempty operation-local model namespaces.');
  for (const [name, module] of generatedExports) {
    assert.ok(sourceExports.has(name), `Missing public business type: ${name}`);
    if (module === './share.js') assert.equal(sourceExports.get(name), './generated/share.js',
      `Shared type ${name} must establish a direct package-root stability contract.`);
  }
  run(process.execPath, [resolve(root, 'scripts/build.mjs')], root);
  const [packed] = JSON.parse(runNpm(['pack', '--ignore-scripts', '--json', '--pack-destination', temporary], root));
  for (const file of packed.files) {
    assert.ok(/^(dist\/|resources\/|README\.md$|LEGAL\.md$|package\.json$)/.test(file.path), `Unexpected published file: ${file.path}`);
    assert.ok(!file.path.endsWith('.map'), `Unexpected published source map: ${file.path}`);
  }
  assert.ok(packed.files.some(file => file.path === 'LEGAL.md'), 'The package must include its legal disclaimer.');
  for (const format of ['cjs', 'esm']) {
    assert.ok(packed.files.some(file => file.path === `dist/${format}/generated/resource/pay.js`),
      `The package must include generated operations in ${format}.`);
  }
  const localExports = await import(pathToFileURL(resolve(root, 'dist/esm/index.js')).href);
  const expectedPublicExports = Object.keys(localExports).sort();
  const leakedDescriptors = Object.entries(localExports).filter(([, value]) =>
    value && typeof value === 'object' && value.method === 'POST' && typeof value.path === 'string')
    .map(([name]) => name).sort();
  assert.deepEqual(leakedDescriptors, [], 'Operation descriptors must remain internal.');
  const { resourceOperations } = await import(pathToFileURL(resolve(root, 'dist/cjs/generated/resource/index.js')).href);
  const operationSnapshot = registry => Object.entries(registry).map(([name, descriptor]) =>
    [name, descriptor.method, descriptor.path]).sort(([a], [b]) => a.localeCompare(b));
  const expectedOperations = operationSnapshot(resourceOperations);
  const resourceGroups = packed.files.map(file => /^dist\/cjs\/generated\/resource\/([^/]+)\.js$/.exec(file.path)?.[1])
    .filter(name => name && name !== 'index').sort();
  assert.ok(expectedOperations.length > 0, 'The internal operation registry must not be empty.');
  writeFileSync(join(temporary, 'package.json'), '{"private":true}\n');
  runNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund', '--offline', join(temporary, packed.filename)], temporary);
  const { resourceOperations: installedOperations } = await import(pathToFileURL(join(temporary,
    'node_modules/@antom-tech/node/dist/cjs/generated/resource/index.js')).href);
  assert.deepEqual(operationSnapshot(installedOperations), expectedOperations, 'The installed internal operation registry must be unchanged.');
  for (const descriptor of Object.values(installedOperations)) assert.ok(Object.isFrozen(descriptor));
  for (const entry of ['dist/cjs/index.d.ts', 'dist/esm/index.d.ts']) {
    const declarations = explicitExports(join(temporary, 'node_modules/@antom-tech/node', entry));
    assert.deepEqual([...declarations.keys()].sort(), [...sourceExports.keys()].sort(),
      `Installed ${entry} must retain the complete explicit public export set.`);
    assert.deepEqual([...declarations.keys()].filter(name => name.endsWith('Models')).sort(), models,
      `Installed ${entry} must retain every model namespace.`);
  }
  for (const file of packed.files.filter(file => /\.(?:js|ts)$/.test(file.path))) {
    const content = readFileSync(join(temporary, 'node_modules/@antom-tech/node', file.path), 'utf8');
    assert.ok(!/^[\t ]*\/\/[#@]\s*sourceMappingURL=/m.test(content), `Source map reference in ${file.path}`);
  }
  const runtimeChecks = `
    assert.equal(typeof AntomClient, 'function');
    assert.equal(sdk.DefaultAntomClient, AntomClient, 'The default client export must retain the same constructor.');
    for (const name of ['AlipayClient', 'DefaultAlipayClient', 'AlipayClientOptions']) {
      assert.equal(name in sdk, false, name + ' must not remain exported.');
    }
    assert.equal(AmountUtil.toAmount('99999999999999.99', 'USD'), '9999999999999999');
    for (const name of ${JSON.stringify(PRIVATE_EXPORTS)}) assert.equal(name in sdk, false, name);
    assert.deepEqual(Object.keys(sdk).sort(), ${JSON.stringify(expectedPublicExports)});
    const descriptors = Object.entries(sdk).filter(([, value]) =>
      value && typeof value === 'object' && value.method === 'POST' && typeof value.path === 'string');
    assert.equal(descriptors.length, 0, 'Transport descriptors are not part of the public SDK.');
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      publicKeyEncoding: { type: 'spki', format: 'pem' },
    });
    const requests = [];
    const expected = { result: { resultStatus: 'F', resultCode: 'PACKAGE_TEST' }, paymentId: 'package-test' };
    const client = new AntomClient({
      gatewayUrl: 'https://sdk.invalid', clientId: 'package-check',
      merchantPrivateKey: privateKey, alipayPublicKey: publicKey,
      fetch: async (url, options) => {
        requests.push({ url, options });
        return new Response(JSON.stringify(expected));
      },
    });
    assert.equal('execute' in client, false, 'The generic executor must be truly private.');
    assert.deepEqual(Object.keys(client).sort(), ${JSON.stringify(resourceGroups)});
    for (const group of ${JSON.stringify(resourceGroups)}) {
      assert.equal(typeof client[group], 'object', group);
      assert.ok(Object.isFrozen(client[group]), group);
      for (const [method, value] of Object.entries(client[group])) {
        assert.equal(typeof value, 'function', group + '.' + method);
      }
    }
    assert.equal(typeof client.billing.customerCreate, 'function');
    assert.equal(typeof client.billing.taxInquireSettings, 'function');
    assert.equal(typeof client.billing.productUploadImage, 'function');
    assert.equal(typeof client.billing.meterUploadEvent, 'function');
    assert.equal(typeof client.billing.meterCreditGrantCreate, 'function');
    assert.equal(typeof client.pay.paymentMethodsInquirePaymentMethod, 'function');
    assert.equal(typeof client.marketplace.businessAttachmentSubmitAttachment, 'function');
    assert.equal(typeof client.subscription.create, 'function');
    assert.equal('subscriptionsCreate' in client.subscription, false);
    const response = client.pay.paymentsPay({});
    assert.ok(response instanceof Promise, 'Grouped methods must return a Promise.');
    assert.deepEqual(await response, expected);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, 'https://sdk.invalid/ams/api/v1/payments/pay');
    assert.equal(typeof new Headers(requests[0].options.headers).get('Signature'), 'string');
  `;
  const fallbackFlags = process.features.require_module ? ['--no-experimental-require-module'] : [];
  run(process.execPath, [...fallbackFlags, '-e', `
    const assert = require('node:assert/strict');
    const { generateKeyPairSync } = require('node:crypto');
    assert.equal(require.resolve('@antom-tech/node'),
      require.resolve('./node_modules/@antom-tech/node/dist/cjs/index.js'));
    const sdk = require('@antom-tech/node');
    const { AntomClient, AmountUtil } = sdk;
    assert.throws(() => require('@antom-tech/node/dist/cjs/generated/resource/index.js'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
    (async () => { ${runtimeChecks} })().catch(error => { console.error(error); process.exitCode = 1; });
  `]);
  run(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import { generateKeyPairSync } from 'node:crypto';
    import { createRequire } from 'node:module';
    import { dirname, sep } from 'node:path';
    import * as sdk from '@antom-tech/node';
    const { AntomClient, AmountUtil } = sdk;
    const require = createRequire(import.meta.url);
    const esmEntry = './node_modules/@antom-tech/node/dist/esm/index.js';
    const cjsEntry = './node_modules/@antom-tech/node/dist/cjs/index.js';
    assert.equal(import.meta.resolve('@antom-tech/node'), import.meta.resolve(esmEntry));
    const cjsDirectory = dirname(require.resolve(cjsEntry)) + sep;
    assert.ok(!Object.keys(require.cache).some(file => file.startsWith(cjsDirectory)),
      'The native ESM entry must not load the CommonJS implementation.');
    await assert.rejects(import('@antom-tech/node/dist/cjs/generated/resource/index.js'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
    const requireEntry = process.features.require_module ? esmEntry : cjsEntry;
    assert.equal(require.resolve('@antom-tech/node'), require.resolve(requireEntry));
    const commonjs = require('@antom-tech/node');
    if (process.features.require_module) {
      assert.equal(AntomClient, commonjs.AntomClient);
      assert.equal(AmountUtil, commonjs.AmountUtil);
    }
    assert.equal(AmountUtil.fromAmount('1025', 'USD'), '10.25');
    ${runtimeChecks}
  `]);
  const types = `
    import { AntomClient, DefaultAntomClient, signRequest, verifySignature } from '@antom-tech/node';
    import type { AntomClientOptions } from '@antom-tech/node';
    // @ts-expect-error The client family uses Antom names exclusively.
    import { AlipayClient } from '@antom-tech/node';
    // @ts-expect-error The default client alias uses the Antom name.
    import { DefaultAlipayClient } from '@antom-tech/node';
    // @ts-expect-error Client options use the Antom name.
    import type { AlipayClientOptions } from '@antom-tech/node';
    declare const clientOptions: AntomClientOptions;
    const configuredClient: AntomClient = new AntomClient(clientOptions);
    const defaultClient: AntomClient = new DefaultAntomClient(clientOptions);
    declare const client: AntomClient;
    // @ts-expect-error The executor is private; callers use typed business resources.
    client.execute({}, {});
    import type {
      AlipayPayRequest, AlipayPayResponse, Amount, Address, ResultStatusType,
      AlipayInquirePaymentMethodRequest, AlipayInquirePaymentMethodResponse,
      AlipaySubscriptionCreateRequest, AlipaySubscriptionCreateResponse,
      PayModels, Quote, UserName, CreditPayPlan, SignedMessage,
      AlipayCustomerCreateRequest, AlipayCustomerCreateResponse, AlipayTaxInquireSettingsResponse,
      ProductImageUpload, ProductImageRequestOptions, ProductUploadImageResponse,
      MeterUploadEventBody, MeterEventRequestOptions, MeterUploadEventResponse,
    } from '@antom-tech/node';
    declare const payment: AlipayPayRequest;
    declare const amount: Amount;
    declare const address: Address;
    const value: string | undefined = amount.value;
    const status: ResultStatusType = 'S';
    // @ts-expect-error Shared types are imported directly, without repeated namespace aliases.
    type RepeatedAmount = PayModels.Amount;
    // @ts-expect-error Shared enums are not repeated in operation-local namespaces.
    type RepeatedStatus = PayModels.ResultStatusType;
    // @ts-expect-error The original wire enum excludes additional statuses.
    const invalidStatus: ResultStatusType = 'PENDING';
    declare const message: SignedMessage;
    declare const key: string;
    const signature: string = signRequest(message, key);
    const verified: boolean = verifySignature(message, signature, key);
    declare const quote: Quote;
    const numericQuote: number = quote.quotePrice;
    // @ts-expect-error The shared quote price is numeric.
    const stringQuote: string = quote.quotePrice;
    // @ts-expect-error Quote is exported once from the package root.
    type RepeatedQuote = PayModels.Quote;
    const userName: UserName = { firstName: 'Test' };
    // @ts-expect-error Optional name fields still require strings when present.
    const invalidName: UserName = { lastName: 123 };
    declare const creditPayPlan: CreditPayPlan;
    const periods: number[] | undefined = creditPayPlan.filteredInstallmentPeriods;
    declare const signal: AbortSignal;
    const groupedPayment: Promise<AlipayPayResponse> = client.pay.paymentsPay(payment, {
      signal, timeout: 1000, headers: { 'X-Package-Test': 'true' },
    });
    declare const paymentMethod: AlipayInquirePaymentMethodRequest;
    const groupedPaymentMethod: Promise<AlipayInquirePaymentMethodResponse> =
      client.pay.paymentMethodsInquirePaymentMethod(paymentMethod);
    declare const subscription: AlipaySubscriptionCreateRequest;
    const groupedSubscription: Promise<AlipaySubscriptionCreateResponse> = client.subscription.create(subscription);
    // @ts-expect-error Equivalent resource prefixes are removed from generated method names.
    client.subscription.subscriptionsCreate(subscription);
    // @ts-expect-error Business resources require their metadata package.
    client.payments.pay(payment);
    // @ts-expect-error Business groups expose methods directly.
    client.pay.payments.pay(payment);
    declare const customer: AlipayCustomerCreateRequest;
    const groupedCustomer: Promise<AlipayCustomerCreateResponse> = client.billing.customerCreate(customer);
    const emptyTax: Promise<AlipayTaxInquireSettingsResponse> = client.billing.taxInquireSettings({});
    // @ts-expect-error Grouped payments preserve their generated request type.
    client.pay.paymentsPay('invalid request');
    // @ts-expect-error Business parameter field types are preserved.
    client.billing.customerCreate({ customerRequestId: 'id', email: 123 });
    // @ts-expect-error The tax settings API has an explicitly empty request object.
    client.billing.taxInquireSettings({ unexpected: true });
    // @ts-expect-error Grouped methods preserve the generated response type.
    const wrongGrouped: Promise<number> = client.pay.paymentsPay(payment);
    declare const image: ProductImageUpload;
    const imageOptions: ProductImageRequestOptions = { signal, timeout: 1000, uploadGatewayUrl: 'https://upload.invalid' };
    const imageResponse: Promise<ProductUploadImageResponse> = client.billing.productUploadImage(image, imageOptions);
    // @ts-expect-error Image uploads are direct methods on the billing group.
    client.billing.product.uploadImage(image, imageOptions);
    declare const events: MeterUploadEventBody;
    const meterOptions: MeterEventRequestOptions = { sessionId: 'package-test-session', signal, timeout: 1000 };
    const meterResponse: Promise<MeterUploadEventResponse> = client.billing.meterUploadEvent(events, meterOptions);
    // @ts-expect-error Session uploads require a session identifier.
    client.billing.meterUploadEvent(events, {});
    // @ts-expect-error Session credentials do not belong to multipart upload options.
    client.billing.productUploadImage(image, { sessionId: 'unexpected' });
  `;
  for (const suffix of ['mts', 'cts']) writeFileSync(join(temporary, `consumer.${suffix}`), types);
  run(process.execPath, [resolve(root, 'node_modules/typescript/bin/tsc'), '--noEmit', '--strict',
    '--module', 'NodeNext', '--target', 'ES2022', '--typeRoots', resolve(root, 'node_modules/@types'),
    'consumer.mts', 'consumer.cts']);
  assert.deepEqual(readFileSync(join(temporary, 'node_modules/@antom-tech/node/resources/amount-currency-rules.json')),
    readFileSync(resolve(root, 'resources/amount-currency-rules.json')));
  console.log('Installed tarball: business-only CommonJS/ESM clients, shared/local type contracts, private infrastructure, and amount resources verified.');
  if (mode === '--publish') {
    const manifest = JSON.parse(readFileSync(join(temporary, 'node_modules/@antom-tech/node/package.json'), 'utf8'));
    const registry = manifest.publishConfig.registry;
    if (values['dry-run']) {
      console.log(`Dry run. Verified ${packed.id} for public npm publication to ${registry} with tag ${values.tag}.`);
    } else {
      // Upload the exact verified archive and keep npm's authentication prompts interactive.
      const result = spawnSync('npm', ['publish', join(temporary, packed.filename), '--ignore-scripts',
        '--registry', registry, '--access', 'public', '--tag', values.tag,
        '--cache', join(temporary, 'npm-cache')], { cwd: root, stdio: 'inherit' });
      assert.equal(result.status, 0, result.error?.message ?? 'Publishing the verified package with npm failed.');
    }
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
