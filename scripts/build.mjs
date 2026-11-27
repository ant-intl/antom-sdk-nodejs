// Build native ESM and a CommonJS fallback with one public declaration graph.
import { readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { collectNamedExports, renderNamedExports } from './export-names.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { version } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const userAgentLiteral = JSON.stringify(`global-open-sdk-nodejs/${version}`);
// Reject an expanding package surface before replacing any existing build output.
collectNamedExports(ts, readFileSync(resolve(root, 'src/index.ts'), 'utf8'), 'src/index.ts');
// Resource snapshots are synchronized by automation, never inferred from neighboring checkouts.
const rulesPath = 'resources/amount-currency-rules.json';
const vectorsPath = 'test/resources/amount-conversion-test-cases.json';
for (const target of [rulesPath, vectorsPath]) {
  const destination = resolve(root, target);
  if (!existsSync(destination)) throw new Error(`Missing amount resource: ${target}`);
}
const rulesText = readFileSync(resolve(root, rulesPath), 'utf8');
JSON.parse(rulesText);
JSON.parse(readFileSync(resolve(root, vectorsPath), 'utf8'));
rmSync(resolve(root, 'dist'), { recursive: true, force: true });
const esmOptions = ['--module', 'ES2022', '--moduleResolution', 'Bundler', '--outDir', 'dist/esm', '--declaration', 'false'];
for (const options of [[], esmOptions]) {
  const result = spawnSync(process.execPath, [resolve(root, 'node_modules/typescript/bin/tsc'), '-p', root, ...options], {
    cwd: root, stdio: 'inherit',
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
// A static data module lets a consumer bundle the rules without a runtime filesystem path.
const rulesLiteral = JSON.stringify(rulesText);
writeFileSync(resolve(root, 'dist/cjs/amount-rules-data.js'), `exports.amountRulesJson = ${rulesLiteral};\n`);
writeFileSync(resolve(root, 'dist/esm/amount-rules-data.js'), `export const amountRulesJson = ${rulesLiteral};\n`);
// Embed the package version in both formats without a runtime manifest lookup.
writeFileSync(resolve(root, 'dist/cjs/sdk-user-agent.js'), `exports.SDK_USER_AGENT = ${userAgentLiteral};\n`);
writeFileSync(resolve(root, 'dist/esm/sdk-user-agent.js'), `export const SDK_USER_AGENT = ${userAgentLiteral};\n`);
const declarations = collectNamedExports(ts, readFileSync(resolve(root, 'dist/cjs/index.d.ts'), 'utf8'),
  'dist/cjs/index.d.ts');
const esm = resolve(root, 'dist/esm');
writeFileSync(resolve(esm, 'package.json'), '{"type":"module"}\n');
writeFileSync(resolve(esm, 'index.d.ts'), renderNamedExports(declarations, '../cjs/index.js'));
