import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, copyFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { AmountUtil, AmountError } from '../dist/esm/index.js';

const vectors = JSON.parse(readFileSync(new URL('./resources/amount-conversion-test-cases.json', import.meta.url)));
for (const method of ['toAmount', 'fromAmount', 'validate']) {
  for (const vector of vectors[method]) {
    test(`${method}: ${vector.name}`, () => {
      const call = () => AmountUtil[method](vector.amount ?? vector.value, vector.currency);
      if (vector.error) assert.throws(call, error => error instanceof AmountError && error.code === vector.error);
      else assert.equal(call(), method === 'validate' ? undefined : vector.result);
    });
  }
}

test('shared amount vectors cover every utility method', () => {
  assert.equal(vectors.schemaVersion, 1);
  for (const method of ['toAmount', 'fromAmount', 'validate']) {
    assert.ok(Array.isArray(vectors[method]) && vectors[method].length > 0,
      `Shared amount vectors must exercise ${method}.`);
  }
});

test('damaged package rules fail consistently, including repeated calls', () => {
  const original = readFileSync(new URL('../resources/amount-currency-rules.json', import.meta.url), 'utf8');
  const rules = JSON.parse(original);
  const variants = ['{', original.replace('"schemaVersion": 1', '"schemaVersion": 1, "schemaVersion": 1'),
    JSON.stringify({ ...rules, schemaVersion: true }),
    JSON.stringify({ ...rules, currencies: { USD: { minorUnit: '2' } } }),
    JSON.stringify({ ...rules, antomConstraints: { IDR: { minorValueMultiple: 100 } } })];
  for (const damaged of variants) {
    const temporary = mkdtempSync(join(tmpdir(), 'antom-amount-'));
    try {
      mkdirSync(join(temporary, 'dist/cjs'), { recursive: true });
      copyFileSync(new URL('../dist/cjs/amount.js', import.meta.url), join(temporary, 'dist/cjs/amount.js'));
      writeFileSync(join(temporary, 'dist/cjs/amount-rules-data.js'),
        `exports.amountRulesJson = ${JSON.stringify(damaged)};\n`);
      const child = spawnSync(process.execPath, ['-e', `
        const assert = require('node:assert/strict');
        const { AmountUtil } = require('./dist/cjs/amount.js');
        for (let i = 0; i < 2; i++) {
          assert.throws(() => AmountUtil.toAmount('1', 'USD'), { code: 'RULE_DATA_ERROR' });
        }
      `], { cwd: temporary, encoding: 'utf8' });
      assert.equal(child.status, 0, child.stderr);
    } finally {
      rmSync(temporary, { recursive: true, force: true });
    }
  }
});
