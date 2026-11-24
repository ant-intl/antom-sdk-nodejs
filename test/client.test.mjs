/** Protocol tests use ephemeral RSA keys and an injected transport; no gateway is contacted. */
import assert from 'node:assert/strict';
import { constants, generateKeyPairSync, sign, verify } from 'node:crypto';
import test from 'node:test';
import { AntomClient, AlipaySdkError, signRequest, verifyNotification, verifySignature }
  from '../dist/esm/index.js';
import { defineOperation } from '../dist/cjs/types.js';

const merchant = generateKeyPairSync('rsa', { modulusLength: 2048 });
const antom = generateKeyPairSync('rsa', { modulusLength: 2048 });
const privatePem = merchant.privateKey.export({ type: 'pkcs8', format: 'pem' });
const publicPem = antom.publicKey.export({ type: 'spki', format: 'pem' });
const operationPath = '/ams/api/v1/payments/pay';
const defaults = {
  gatewayUrl: 'https://open-sea-global.alipay.com',
  clientId: 'test-client',
  merchantPrivateKey: privatePem,
  alipayPublicKey: publicPem,
};

function response(body, path = operationPath, clientId = defaults.clientId) {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  const time = '2026-10-30T10:11:12.000Z';
  const signature = sign('RSA-SHA256', Buffer.from(`POST ${path}\n${clientId}.${time}.${raw}`), {
    key: antom.privateKey, padding: constants.RSA_PKCS1_PADDING,
  }).toString('base64');
  return new Response(raw, { headers: {
    'response-time': time,
    signature: `algorithm=RSA256,keyVersion=1,signature=${encodeURIComponent(signature)}`,
  } });
}

function client(fetch, extra = {}) { return new AntomClient({ ...defaults, fetch, ...extra }); }

test('signs the exact JSON sent and preserves false, zero, empty arrays, and wire names', async () => {
  let calls = 0;
  const sdk = client(async (url, init) => {
    calls += 1;
    assert.equal(url, defaults.gatewayUrl + operationPath);
    assert.equal(init.redirect, 'error');
    assert.equal(init.headers.get('agent-token'), 'agent');
    assert.equal(init.headers.get('custom'), 'retained');
    assert.equal(init.body, '{"active":false,"count":0,"preferredLocales":[],"class":"wire","label":"支付"}');
    const signature = decodeURIComponent(init.headers.get('signature').split('signature=')[1]);
    const canonical = `POST ${operationPath}\n${defaults.clientId}.${init.headers.get('request-time')}.${init.body}`;
    assert.equal(verify('RSA-SHA256', Buffer.from(canonical), {
      key: merchant.publicKey, padding: constants.RSA_PKCS1_PADDING,
    }, Buffer.from(signature, 'base64')), true);
    return response('{ "result": { "resultStatus": "S" }, "value": "原文" }');
  }, { agentToken: 'agent' });
  assert.deepEqual(await sdk.pay.paymentsPay({
    active: false, count: 0, preferredLocales: [], class: 'wire', label: '支付', omitted: undefined,
  }, { headers: { custom: 'retained' } }), { result: { resultStatus: 'S' }, value: '原文' });
  assert.equal(calls, 1);
});

test('sandbox rewrites the API path before signing', async () => {
  const path = '/ams/sandbox/api/v1/payments/pay';
  const sdk = client(async (url, init) => {
    assert.equal(url, defaults.gatewayUrl + path);
    assert.equal(verifySignature({ method: 'POST', path, clientId: 'SANDBOX_client',
      time: init.headers.get('request-time'), body: init.body }, init.headers.get('signature'),
    merchant.publicKey.export({ type: 'spki', format: 'pem' })), true);
    return response({ result: { resultStatus: 'S' } }, path, 'SANDBOX_client');
  }, { clientId: 'SANDBOX_client' });
  await sdk.pay.paymentsPay({});
});

test('rejects tampered or unsigned successful responses', async () => {
  const valid = response({ result: { resultStatus: 'S' }, value: 1 });
  const sdk = client(async () => new Response('{"result":{"resultStatus":"S"},"value":2}', { headers: valid.headers }));
  await assert.rejects(sdk.pay.paymentsPay({}), { code: 'SIGNATURE_ERROR' });
  await assert.rejects(client(async () => new Response('{"result":{"resultStatus":"S"}}')).pay.paymentsPay({}),
    { code: 'SIGNATURE_ERROR' });
});

test('rejects missing, empty, or mismatched signature headers even for business failures', async () => {
  for (const headers of [{ signature: 'invalid' }, { 'response-time': 'time' },
    { signature: '', 'response-time': '' }, { 'client-id': 'another-client' }]) {
    await assert.rejects(client(async () => new Response('{"result":{"resultStatus":"F"}}', { headers }))
      .pay.paymentsPay({}), { code: 'SIGNATURE_ERROR' });
  }
});

test('returns unsigned F and U business results without converting them to transport errors', async () => {
  for (const resultStatus of ['F', 'U']) {
    const body = { result: { resultStatus, resultCode: 'BUSINESS_RESULT' } };
    assert.deepEqual(await client(async () => new Response(JSON.stringify(body))).pay.paymentsPay({}), body);
  }
});

test('does not retry HTTP errors or leak their response body', async () => {
  let calls = 0;
  await assert.rejects(client(async () => {
    calls += 1;
    return new Response('sensitive-body', { status: 503 });
  }).pay.paymentsPay({}), (error) => {
    assert.equal(error.code, 'HTTP_ERROR');
    assert.equal(error.status, 503);
    assert.equal(error.message.includes('sensitive-body'), false);
    return true;
  });
  assert.equal(calls, 1);
});

test('rejects protocol header overrides before contacting the gateway', async () => {
  const sdk = client(async () => { throw new Error('must not send'); });
  for (const name of ['Signature', 'Client-ID', 'Request-Time', 'Content-Type', 'Agent-Token', 'Host', 'Content-Length']) {
    await assert.rejects(sdk.pay.paymentsPay({}, { headers: { [name]: 'override' } }), { code: 'INVALID_ARGUMENT' });
  }
});

test('rejects cross-origin and ambiguous API paths', () => {
  for (const path of ['https://attacker.invalid/pay', '//attacker.invalid/pay', '/ams/../pay', '/pay?query=1', '/pay#fragment', '/pay\\evil']) {
    assert.throws(() => defineOperation(path), { code: 'INVALID_ARGUMENT' });
  }
});

test('rejects insecure or credential-bearing gateway URLs', () => {
  for (const gatewayUrl of ['http://localhost', 'https://user:password@example.com', 'https://example.com/path', 'https://example.com/?x=1']) {
    assert.throws(() => new AntomClient({ ...defaults, gatewayUrl }), { code: 'INVALID_ARGUMENT' });
  }
});

test('times out an unresponsive transport', async () => {
  await assert.rejects(client(() => new Promise(() => {}), { timeout: 10 }).pay.paymentsPay({}), { code: 'TIMEOUT' });
});

test('timeout covers response-body reading', async () => {
  await assert.rejects(client(async () => ({
    ok: true, headers: new Headers(), text: () => new Promise(() => {}),
  }), { timeout: 10 }).pay.paymentsPay({}), { code: 'TIMEOUT' });
});

test('supports already-aborted and in-flight caller cancellation', async () => {
  const already = new AbortController();
  already.abort('private reason');
  await assert.rejects(client(async () => { throw new Error('must not send'); })
    .pay.paymentsPay({}, { signal: already.signal }), { code: 'ABORTED' });
  const ongoing = new AbortController();
  const pending = client(() => new Promise(() => {})).pay.paymentsPay({}, { signal: ongoing.signal });
  ongoing.abort('private reason');
  await assert.rejects(pending, { code: 'ABORTED' });
});

test('normalizes bare Base64 PKCS8 and X509 keys', async () => {
  const privateDer = merchant.privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64');
  const publicDer = antom.publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
  await client(async () => response({ result: { resultStatus: 'S' } }), {
    merchantPrivateKey: privateDer, alipayPublicKey: publicDer,
  }).pay.paymentsPay({});
});

test('verifies notifications from raw body and configured client identity', () => {
  const body = '{ "result": { "resultStatus": "S" }, "data": "原文" }';
  const path = '/merchant/notify';
  const time = '2026-10-30T12:00:00.000Z';
  const signature = signRequest({ method: 'POST', path, clientId: defaults.clientId, time, body },
    antom.privateKey.export({ type: 'pkcs8', format: 'pem' }));
  const notification = { path, body, clientId: defaults.clientId, headers: {
    'client-id': defaults.clientId, 'request-time': time, signature,
  } };
  assert.equal(verifyNotification(notification, publicPem), true);
  assert.equal(verifyNotification({ ...notification, body: JSON.stringify(JSON.parse(body)) }, publicPem), false);
  assert.equal(verifyNotification({ ...notification, clientId: 'another-client' }, publicPem), false);
  assert.equal(verifyNotification({ ...notification, headers: {} }, publicPem), false);
  assert.equal(verifyNotification({ ...notification, headers: { signature: 'invalid\nheader' } }, publicPem), false);
});

test('rejects forged algorithms, duplicate fields, bad encodings, and malformed signatures', () => {
  const message = { method: 'POST', path: operationPath, clientId: 'test', time: 'time', body: '{}' };
  for (const header of ['algorithm=RSA128,keyVersion=1,signature=abc',
    'algorithm=RSA256,keyVersion=1,signature=%zz',
    'algorithm=RSA256,keyVersion=1,signature=YQ==,signature=YQ==']) {
    assert.equal(verifySignature(message, header, publicPem), false);
  }
});

test('sanitizes invalid JSON and transport exceptions', async () => {
  await assert.rejects(client(async () => new Response('not JSON')).pay.paymentsPay({}), { code: 'INVALID_RESPONSE' });
  await assert.rejects(client(async () => { throw new Error('secret-key'); }).pay.paymentsPay({}), (error) => {
    assert.ok(error instanceof AlipaySdkError);
    assert.equal(error.code, 'TRANSPORT_ERROR');
    assert.equal(error.message.includes('secret-key'), false);
    return true;
  });
});

test('rejects circular payloads, invalid deadlines, and invalid signing keys', async () => {
  const circular = {}; circular.self = circular;
  const sdk = client(async () => { throw new Error('must not send'); });
  await assert.rejects(sdk.pay.paymentsPay(circular), { code: 'INVALID_ARGUMENT' });
  await assert.rejects(sdk.pay.paymentsPay({}, { timeout: 0 }), { code: 'INVALID_ARGUMENT' });
  await assert.rejects(client(async () => {}, { merchantPrivateKey: 'private-invalid-key' }).pay.paymentsPay({}),
    { code: 'INVALID_ARGUMENT' });
});
