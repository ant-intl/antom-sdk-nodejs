import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { test } from 'node:test';
import * as sdk from '../dist/esm/index.js';
import { createResources, resourceOperations } from '../dist/cjs/generated/resource/index.js';

// Authoritative whitelist/schema comparisons belong to the automation integration checks.
const operations = Object.entries(resourceOperations);

test('internal generated operations are nonempty immutable POST descriptors', () => {
  assert.ok(operations.length > 0, 'The SDK must include generated API operations internally.');
  for (const [name, operation] of operations) {
    assert.equal(operation.method, 'POST', name);
    assert.equal(typeof operation.path, 'string', name);
    assert.match(operation.path, /^\/[A-Za-z0-9/_.~-]+$/, name);
    const url = new URL(operation.path, 'https://sdk.invalid');
    assert.equal(url.origin, 'https://sdk.invalid', name);
    assert.equal(url.pathname, operation.path, name);
    assert.ok(Object.isFrozen(operation), name);
  }
});

test('the package root excludes infrastructure and every internal operation descriptor', () => {
  for (const name of ['defineOperation', 'SDK_USER_AGENT', 'Operation', 'OperationExecutor', 'ClientResources', 'GeneratedResources']) {
    assert.equal(name in sdk, false, name);
  }
  const publicValues = new Set(Object.values(sdk));
  for (const [resource, descriptor] of operations) {
    assert.equal(publicValues.has(descriptor), false, `${resource} must stay internal`);
  }
});

function resourceMethods(resources) {
  assert.ok(Object.isFrozen(resources), 'resources must be frozen');
  return Object.entries(resources).flatMap(([group, methods]) => {
    assert.ok(Object.isFrozen(methods), `${group} must be frozen`);
    return Object.entries(methods).map(([name, method]) => {
      const path = `${group}.${name}`;
      assert.equal(typeof method, 'function', `${path} must be a direct business method`);
      return path;
    });
  });
}

test('generated resources expose every immutable operation exactly once', () => {
  assert.ok(Object.isFrozen(resourceOperations), 'The internal operation registry must be frozen.');
  assert.ok(Object.keys(resourceOperations).length > 0, 'Generated resources must not be empty.');
  const resources = createResources(() => { throw new Error('Resource inventory must not execute a request.'); });
  const business = readdirSync(new URL('../src/generated/resource/', import.meta.url))
    .filter(name => name.endsWith('.ts') && name !== 'index.ts').map(name => name.slice(0, -3));
  assert.deepEqual(Object.keys(resources).sort(), business.sort());
  assert.deepEqual(resourceMethods(resources).sort(), Object.keys(resourceOperations).sort());
  const registryDescriptors = Object.values(resourceOperations);
  assert.equal(new Set(registryDescriptors).size, registryDescriptors.length, 'Each descriptor must have one resource method.');
  for (const descriptor of registryDescriptors) {
    assert.equal(descriptor.method, 'POST');
    assert.ok(Object.isFrozen(descriptor));
  }
  assert.equal('resourceOperations' in sdk, false, 'The internal registry must not be a root export.');
});

test('resource methods combine the URL hierarchy in camel case within each business group', () => {
  for (const [resource, operation] of operations) {
    const [, method] = resource.split('.');
    const segments = operation.path.split('/').filter(Boolean);
    const version = segments.findIndex(segment => /^v\d+$/.test(segment));
    assert.ok(version >= 0, `${resource} must contain an API version segment.`);
    const business = segments.slice(version + 1);
    const candidates = [business];
    if (business.length > 1) candidates.push(business.slice(1));
    const names = candidates.map(parts => parts.map((segment, index) =>
      (index === 0 ? segment[0].toLowerCase() : segment[0].toUpperCase()) + segment.slice(1)).join(''));
    // Exact English resource-name matching is covered by the generator's authoritative checks.
    assert.ok(names.includes(method), resource);
    assert.equal(resource.split('.').length, 2, resource);
  }
});

test('representative resource paths retain their API contracts', () => {
  for (const [resource, apiPath] of [
    ['pay.paymentsPay', 'payments/pay'], ['pay.paymentsRefund', 'payments/refund'],
    ['pay.paymentsReserveCreateRule', 'payments/reserve/createRule'], ['pay.vaultsFetchNonce', 'vaults/fetchNonce'],
    ['pay.paymentMethodsInquirePaymentMethod', 'paymentMethods/inquirePaymentMethod'],
    ['auth.authorizationsApplyToken', 'authorizations/applyToken'],
    ['subscription.create', 'subscriptions/create'],
    ['dispute.paymentsAcceptDispute', 'payments/acceptDispute'],
    ['agentic.agenticPaymentCreateAuthenticationSession', 'agenticPayment/createAuthenticationSession'],
    ['notification.inquireNotification', 'notification/inquireNotification'],
    ['marketplace.fundsCreatePayout', 'funds/createPayout'],
    ['marketplace.merchantsSettlementInfoUpdate', 'merchants/settlementInfo/update'],
    ['aba.cardsApplyCard', 'aba/cards/applyCard'],
    ['aba.accountInquireAvailableQuota', 'aba/account/inquireAvailableQuota'],
    ['billing.customerCreate', 'billing/customer/create'],
    ['billing.productUpdate', 'billing/product/update'], ['billing.meterCreateSession', 'meter/createSession'],
    ['billing.meterCreditGrantCreate', 'meter/creditGrant/create'],
    ['billing.taxInquireSettings', 'tax/inquireSettings'],
  ]) {
    assert.equal(resourceOperations[resource].path, `/ams/api/v1/${apiPath}`, resource);
  }
  assert.equal(resourceOperations['marketplace.businessAttachmentSubmitAttachment'].path,
    '/ams/api/open/openapiv2_file/v1/business/attachment/submitAttachment');
  assert.equal('billing.productUploadImage' in resourceOperations, false);
  assert.equal('billing.meterUploadEvent' in resourceOperations, false);
});

test('subscription methods remove the equivalent plural URL prefix exactly once', () => {
  for (const method of ['cancel', 'change', 'create', 'inquireSubscription',
    'inquireSubscriptionList', 'inquireSubscriptionPayment', 'inquiry', 'update']) {
    assert.equal(resourceOperations[`subscription.${method}`].path, `/ams/api/v1/subscriptions/${method}`);
    const previous = `subscriptions${method[0].toUpperCase()}${method.slice(1)}`;
    assert.equal(`subscription.${previous}` in resourceOperations, false, previous);
  }
});
