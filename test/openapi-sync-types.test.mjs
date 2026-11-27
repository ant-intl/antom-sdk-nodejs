import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
for (const [label, entry] of Object.entries({
  source: './src/index.js', commonjs: './dist/cjs/index.js', esm: './dist/esm/index.js',
})) {
  test(`${label} preserves the legacy metadata import and exposes synchronized contract types`, () => {
    const file = join(root, '.openapi-sync-consumer.mts');
    const content = `
      import type {
        PaymentMethodMetaData, PaymentPreference, AuthorizationControl,
        AlipayPaymentSessionRequest, AlipayVaultingPaymentMethodRequest,
        AlipayVaultingSessionRequest, AlipayBillingSubscriptionUpdateResponse,
      } from ${JSON.stringify(entry)};
      const omitted: PaymentMethodMetaData = {};
      const scheduled: PaymentMethodMetaData = { recurringType: 'SCHEDULED' };
      const unscheduled: PaymentMethodMetaData = { recurringType: 'UNSCHEDULED' };
      // @ts-expect-error The legacy import retains its original literal union.
      const invalidMetadata: PaymentMethodMetaData = { recurringType: 'OTHER' };
      const preference: PaymentPreference = { currencyOrder: ['EUR', 'USD'] };
      const authorization: Pick<AuthorizationControl, 'paymentPreference'> = { paymentPreference: preference };
      const excluded: NonNullable<AlipayPaymentSessionRequest['excludedPaymentMethod']> = { paymentMethodTypeList: [] };
      const vaulting: AlipayVaultingPaymentMethodRequest['paymentMethodDetail'] = {
        paymentMethodType: 'CARD', paymentMethodMetaData: { recurringType: 'SCHEDULED', merchantTag: 'saved-card', count: 1 },
      };
      const sessionMetadata: AlipayVaultingSessionRequest['paymentMethodMetaData'] = { merchantTag: 'saved-card', count: 1 };
      const creditNotes: AlipayBillingSubscriptionUpdateResponse['creditNoteIds'] = ['credit-note-1', 'credit-note-2'];
      // @ts-expect-error Credit note identifiers remain strings.
      const invalidCreditNotes: AlipayBillingSubscriptionUpdateResponse['creditNoteIds'] = [1];
    `;
    const options = {
      strict: true, noEmit: true, target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.Node16, moduleResolution: ts.ModuleResolutionKind.Node16,
      typeRoots: [join(root, 'node_modules/@types')],
    };
    const host = ts.createCompilerHost(options);
    const getSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (name, languageVersion, onError, shouldCreate) => name === file
      ? ts.createSourceFile(name, content, languageVersion, true)
      : getSourceFile(name, languageVersion, onError, shouldCreate);
    host.writeFile = () => { throw new Error('Type compatibility checks must not emit files.'); };
    const program = ts.createProgram([file], options, host);
    const diagnostics = ts.getPreEmitDiagnostics(program);
    assert.deepEqual(diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')), []);
  });
}
