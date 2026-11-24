/** Resource methods delegate to the existing signed and special transports without network access. */
import assert from 'node:assert/strict';
import { createHash, generateKeyPairSync, sign, verify } from 'node:crypto';
import { EventEmitter } from 'node:events';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { AntomClient } from '../dist/esm/index.js';

const require = createRequire(import.meta.url);
const { createResources, resourceOperations } = require('../dist/cjs/generated/resource/index.js');
const pay = resourceOperations['pay.paymentsPay'];
const refund = resourceOperations['pay.paymentsRefund'];
const merchant = generateKeyPairSync('rsa', { modulusLength: 2048 });
const antom = generateKeyPairSync('rsa', { modulusLength: 2048 });
const options = {
  gatewayUrl: 'https://open-sea.alipay.com',
  clientId: 'resource-client',
  merchantPrivateKey: merchant.privateKey.export({ type: 'pkcs8', format: 'pem' }),
  alipayPublicKey: antom.publicKey.export({ type: 'spki', format: 'pem' }),
  timeout: 1000,
};

function methodAt(tree, path) {
  return path.split('.').reduce((value, segment) => value[segment], tree);
}

function leaves(tree) {
  assert.ok(Object.isFrozen(tree), 'resource root');
  return Object.entries(tree).flatMap(([group, methods]) => {
    assert.ok(Object.isFrozen(methods), group);
    return Object.entries(methods).map(([name, method]) => {
      const path = `${group}.${name}`;
      assert.equal(typeof method, 'function', path);
      return path;
    });
  });
}

function signedResponse(url, clientId, data = {}) {
  const body = JSON.stringify({ result: { resultStatus: 'S' }, ...data });
  const time = '2026-10-30T12:00:00.000Z';
  const signature = sign('RSA-SHA256', Buffer.from(`POST ${new URL(url).pathname}\n${clientId}.${time}.${body}`),
    antom.privateKey).toString('base64');
  return new Response(body, { headers: {
    'response-time': time,
    signature: `algorithm=RSA256,keyVersion=1,signature=${encodeURIComponent(signature)}`,
  } });
}

function assertRequestSignature(url, init, clientId, body = init.body) {
  const signature = decodeURIComponent(init.headers.get('signature').split('signature=')[1]);
  const canonical = `POST ${new URL(url).pathname}\n${clientId}.${init.headers.get('request-time')}.${body}`;
  assert.equal(verify('RSA-SHA256', Buffer.from(canonical), merchant.publicKey, Buffer.from(signature, 'base64')), true);
}

test('clients expose business resources without a public generic executor', () => {
  const client = new AntomClient(options);
  assert.equal('execute' in client, false);
  assert.equal(client.execute, undefined);
  assert.equal('execute' in AntomClient.prototype, false);
  assert.equal(typeof client.pay.paymentsPay, 'function');
  assert.equal(typeof client.pay.paymentsRefund, 'function');
  for (const [group, methods] of Object.entries(client)) {
    assert.ok(Object.isFrozen(methods), group);
    for (const [name, method] of Object.entries(methods)) {
      assert.equal(typeof method, 'function', `${group}.${name} must be a direct business method`);
    }
  }
  const generated = createResources(() => { throw new Error('Resource inventory must not execute a request.'); });
  assert.deepEqual(Object.keys(client).sort(), Object.keys(generated).sort());
});

test('every generated resource delegates its original descriptor, parameters, options and result', async () => {
  const calls = [];
  const result = { result: { resultStatus: 'S' } };
  const promise = Promise.resolve(result);
  const resources = createResources((operation, params, requestOptions) => {
    calls.push({ operation, params, requestOptions });
    return promise;
  });
  const declaredPaths = Object.keys(resourceOperations).sort();
  assert.ok(declaredPaths.length > 0, 'The generated operation registry must not be empty.');
  assert.deepEqual(leaves(resources).sort(), declaredPaths);
  const controller = new AbortController();
  const params = { active: false, count: 0, preferredLocales: [] };
  const requestOptions = { timeout: 123, signal: controller.signal, headers: { 'x-resource-test': 'kept' } };
  for (const path of declaredPaths) {
    const method = methodAt(resources, path);
    assert.equal(typeof method, 'function', path);
    const response = method(params, requestOptions);
    assert.equal(response, promise, path);
    assert.equal(await response, result, path);
    const call = calls.at(-1);
    assert.equal(call.operation, resourceOperations[path], path);
    assert.equal(call.params, params, path);
    assert.equal(call.requestOptions, requestOptions, path);
  }
  assert.equal(calls.length, declaredPaths.length);
});

test('resource factories do not share their executor or request options', async () => {
  const firstCalls = [];
  const secondCalls = [];
  const first = createResources((...args) => { firstCalls.push(args); return Promise.resolve('first'); });
  const second = createResources((...args) => { secondCalls.push(args); return Promise.resolve('second'); });
  const body = { paymentRequestId: 'first' };
  assert.equal(await first.pay.paymentsPay(body), 'first');
  assert.equal(await second.pay.paymentsPay(body, { timeout: 100 }), 'second');
  assert.equal(firstCalls.length, 1);
  assert.equal(secondCalls.length, 1);
  assert.equal(firstCalls[0][0], pay);
  assert.equal(secondCalls[0][0], pay);
  assert.equal(firstCalls[0][2], undefined);
  assert.deepEqual(secondCalls[0][2], { timeout: 100 });
});

test('client payment and refund methods retain signing, path routing and client isolation', async () => {
  const firstCalls = [];
  const secondCalls = [];
  function transport(clientId, calls) {
    return async (url, init) => {
      calls.push({ url, init });
      assert.equal(init.headers.get('client-id'), clientId);
      assert.equal(init.headers.get('x-resource-test'), 'kept');
      assert.equal(init.redirect, 'error');
      assertRequestSignature(url, init, clientId);
      return signedResponse(url, clientId, { owner: clientId });
    };
  }
  const first = new AntomClient({ ...options, fetch: transport(options.clientId, firstCalls) });
  const second = new AntomClient({ ...options, clientId: 'second-client', fetch: transport('second-client', secondCalls) });
  const detachedPay = first.pay.paymentsPay;
  const body = { active: false, count: 0, preferredLocales: [] };
  const requestOptions = { headers: { 'x-resource-test': 'kept' } };
  assert.equal((await detachedPay(body, requestOptions)).owner, options.clientId);
  assert.equal((await first.pay.paymentsRefund(body, requestOptions)).owner, options.clientId);
  assert.equal((await second.pay.paymentsPay(body, requestOptions)).owner, 'second-client');
  assert.equal(firstCalls.length, 2);
  assert.equal(secondCalls.length, 1);
  assert.equal(firstCalls[0].url, options.gatewayUrl + pay.path);
  assert.equal(firstCalls[1].url, options.gatewayUrl + refund.path);
  assert.equal(firstCalls[0].init.body, JSON.stringify(body));
  assert.ok(Object.isFrozen(first.pay));
  assert.notEqual(first.pay, second.pay);
});

test('pay.paymentMethodsInquirePaymentMethod signs the documented path and serializes the card token', async () => {
  const cardToken = 'test-card-token';
  const paymentMethodDetails = [{ paymentMethodDetailType: 'CARD', card: { expiryYear: '29' } }];
  let requestCount = 0;
  const client = new AntomClient({ ...options, fetch: async (url, init) => {
    requestCount += 1;
    assert.equal(init.method, 'POST');
    assert.equal(new URL(url).pathname, '/ams/api/v1/paymentMethods/inquirePaymentMethod');
    assert.deepEqual(JSON.parse(init.body), { cardToken });
    assertRequestSignature(url, init, options.clientId);
    return signedResponse(url, options.clientId, { paymentMethodDetails });
  } });

  assert.deepEqual(await client.pay.paymentMethodsInquirePaymentMethod({ cardToken }), {
    result: { resultStatus: 'S' }, paymentMethodDetails,
  });
  assert.equal(requestCount, 1);
});

test('subscription.create retains the signed wire path and omits redundant plural aliases', async () => {
  const body = {
    subscriptionRequestId: 'subscription-request', subscriptionDescription: 'Monthly subscription',
    subscriptionStartTime: '2026-11-20T00:00:00Z',
    env: { terminalType: 'WEB' }, orderInfo: {},
    paymentAmount: { currency: 'USD', value: '1000' }, paymentMethod: { paymentMethodType: 'CARD' },
    periodRule: { periodType: 'MONTH', periodCount: 1 }, settlementStrategy: { settlementCurrency: 'USD' },
    paymentNotificationUrl: 'https://sdk.invalid/payments',
    subscriptionNotificationUrl: 'https://sdk.invalid/subscriptions',
    subscriptionRedirectUrl: 'https://sdk.invalid/return',
  };
  let calls = 0;
  const client = new AntomClient({ ...options, fetch: async (url, init) => {
    calls += 1;
    assert.equal(new URL(url).pathname, '/ams/api/v1/subscriptions/create');
    assert.deepEqual(JSON.parse(init.body), body);
    assertRequestSignature(url, init, options.clientId);
    return signedResponse(url, options.clientId, { subscriptionId: 'subscription-1' });
  } });
  for (const method of ['cancel', 'change', 'create', 'inquireSubscription',
    'inquireSubscriptionList', 'inquireSubscriptionPayment', 'inquiry', 'update']) {
    assert.equal(typeof client.subscription[method], 'function', method);
    assert.equal(`subscriptions${method[0].toUpperCase()}${method.slice(1)}` in client.subscription, false);
  }
  assert.deepEqual(await client.subscription.create(body), {
    result: { resultStatus: 'S' }, subscriptionId: 'subscription-1',
  });
  assert.equal(calls, 1);
});

test('grouped JSON methods forward per-call deadlines and cancellation', async () => {
  const pending = new AntomClient({ ...options, fetch: () => new Promise(() => {}) });
  await assert.rejects(pending.pay.paymentsPay({}, { timeout: 5 }), { code: 'TIMEOUT' });
  const controller = new AbortController();
  const request = pending.pay.paymentsRefund({}, { signal: controller.signal });
  controller.abort();
  await assert.rejects(request, { code: 'ABORTED' });

  let calls = 0;
  const alreadyAborted = new AntomClient({ ...options, fetch: async () => {
    calls += 1;
    throw new Error('must not send');
  } });
  await assert.rejects(alreadyAborted.pay.paymentsPay({}, { signal: controller.signal }), { code: 'ABORTED' });
  assert.equal(calls, 0);
});

test('grouped product images reuse multipart signing and the configured client identity', async () => {
  const clientId = 'SANDBOX_resource-client';
  const file = Uint8Array.of(1, 2, 3);
  const request = { productId: 'product-1', file, filename: 'image.png' };
  let calls = 0;
  const client = new AntomClient({ ...options, clientId, fetch: async (url, init) => {
    calls += 1;
    assert.equal(url, 'https://uploads.example/ams/sandbox/api/v1/billing/product/uploadImage');
    assert.equal(init.headers.get('client-id'), clientId);
    assert.match(init.headers.get('content-type'), /^multipart\/form-data; boundary=/);
    const body = JSON.stringify({ productId: request.productId, fileSha256: createHash('sha256').update(file).digest('hex') });
    assert.ok(Buffer.from(init.body).toString('utf8').includes(body));
    assertRequestSignature(url, init, clientId, body);
    return signedResponse(url, clientId, { imageUrl: 'https://images.example/image.png' });
  } });
  const result = await client.billing.productUploadImage(request, {
    uploadGatewayUrl: 'https://uploads.example', timeout: 100,
    clientId: 'cannot-override-client', merchantPrivateKey: 'cannot-override-key',
  });
  assert.equal(result.imageUrl, 'https://images.example/image.png');
  assert.equal(calls, 1);
  assert.ok(Object.isFrozen(client.billing));
  assert.equal(typeof client.billing.productUploadImage, 'function');
  assert.equal(typeof client.billing.productCreate, 'function');
});

test('grouped product images pass caller cancellation to the dedicated transport', async () => {
  let calls = 0;
  const client = new AntomClient({ ...options, fetch: async () => {
    calls += 1;
    throw new Error('must not send');
  } });
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(client.billing.productUploadImage({ productId: 'id', file: Uint8Array.of(1), filename: 'image.png' },
    { signal: controller.signal }), { code: 'ABORTED' });
  assert.equal(calls, 0);
});

function meterAdapter(pending = false) {
  const observed = { destroyed: false };
  const session = new EventEmitter();
  const stream = new EventEmitter();
  session.alpnProtocol = 'h2';
  session.close = () => session.emit('close');
  session.destroy = () => { observed.destroyed = true; session.emit('close'); };
  stream.close = () => stream.emit('close');
  stream.end = body => {
    observed.body = body;
    if (pending) return;
    queueMicrotask(() => {
      stream.emit('response', { ':status': 200 });
      stream.emit('data', Buffer.from('{"result":{"resultStatus":"U"},"retryAfter":5}'));
      stream.emit('end');
    });
  };
  session.request = headers => { observed.headers = headers; return stream; };
  return { observed, connect: origin => {
    observed.origin = origin;
    queueMicrotask(() => session.emit('connect'));
    return session;
  } };
}

test('grouped meter events reuse session-only HTTP/2 without JSON signing or sandbox rewriting', async () => {
  const adapter = meterAdapter();
  const client = new AntomClient({ ...options, clientId: 'SANDBOX_resource-client', fetch: async () => {
    throw new Error('Meter events must not use the JSON fetch transport');
  } });
  const body = { meters: [{ eventName: 'tokens', events: [{ payload: { value: '9007199254740993' } }] }] };
  const result = await client.billing.meterUploadEvent(body, {
    sessionId: 'meter-session', connect: adapter.connect, timeout: 100, gatewayUrl: 'https://cannot-override.example',
  });
  assert.equal(result.retryAfter, 5);
  assert.equal(adapter.observed.origin, options.gatewayUrl);
  assert.deepEqual(JSON.parse(adapter.observed.body), body);
  assert.equal(adapter.observed.headers[':path'], '/ams/api/v1/meter/uploadEvent');
  assert.equal(adapter.observed.headers['x-session-id'], 'meter-session');
  assert.equal(adapter.observed.headers.signature, undefined);
  assert.equal(adapter.observed.headers['client-id'], undefined);
  assert.equal(typeof client.billing.meterUploadEvent, 'function');
  assert.equal(typeof client.billing.meterCreateSession, 'function');
});

test('grouped meter events preserve per-call deadlines, cancellation and required session identity', async () => {
  const client = new AntomClient(options);
  const timed = meterAdapter(true);
  await assert.rejects(client.billing.meterUploadEvent({ meters: [] }, {
    sessionId: 'meter-session', connect: timed.connect, timeout: 5,
  }), { code: 'TIMEOUT' });
  assert.equal(timed.observed.destroyed, true);
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(client.billing.meterUploadEvent({ meters: [] }, {
    sessionId: 'meter-session', signal: controller.signal,
    connect: () => { throw new Error('must not connect'); },
  }), { code: 'ABORTED' });
  await assert.rejects(client.billing.meterUploadEvent({ meters: [] }), { code: 'INVALID_ARGUMENT' });
});
