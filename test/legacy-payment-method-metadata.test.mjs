import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('legacy PaymentMethodMetaData remains importable with its original value type', () => {
  const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const options = { ...parsed.options, rootDir: root, noEmit: true, skipLibCheck: false };
  const program = ts.createProgram([path.join(root, 'test/fixtures/legacy-payment-method-metadata.ts')], options);
  const diagnostics = ts.getPreEmitDiagnostics(program).map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n'));
  assert.deepEqual(diagnostics, []);
});
