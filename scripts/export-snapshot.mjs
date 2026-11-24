/** Read-only collectors for the package's separate runtime and TypeScript export inventories. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sdkRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

/** Physical entry points are comparison inputs, never part of a stored snapshot. */
export const TYPE_ENTRY_PATHS = Object.freeze({
  source: 'src/index.ts',
  commonjs: 'dist/cjs/index.d.ts',
  esm: 'dist/esm/index.d.ts',
});

function dereference(ts, checker, symbol) {
  const seen = new Set();
  let target = symbol;
  while (target.flags & ts.SymbolFlags.Alias) {
    assert.ok(!seen.has(target), `Circular exported alias: ${symbol.getName()}`);
    seen.add(target);
    target = checker.getAliasedSymbol(target);
  }
  return target;
}

function typeKind(ts, target) {
  for (const [flag, label] of [
    ['Class', 'class'], ['Interface', 'interface'], ['TypeAlias', 'type-alias'],
    ['Enum', 'enum'], ['TypeParameter', 'type-parameter'], ['Namespace', 'namespace'],
  ]) {
    if (target.flags & ts.SymbolFlags[flag]) return label;
  }
  throw new Error(`Unsupported exported type symbol: ${target.getName()}`);
}

/**
 * Collect actual module type symbols, including class type faces and all namespace type paths.
 * @param {object} ts The SDK's installed TypeScript compiler.
 * @param {object} checker Type checker owning the source file and all alias targets.
 * @param {object} sourceFile A parsed package entry from that checker program.
 * @returns {object} Path-independent, sorted type exports and namespace member inventory.
 */
export function typeExportSnapshot(ts, checker, sourceFile) {
  const module = checker.getSymbolAtLocation(sourceFile);
  assert.ok(module, 'The type snapshot entry must resolve to a TypeScript module.');
  const exports = [];
  const namespaceMembers = [];
  const visible = target => Boolean(target.flags & (ts.SymbolFlags.Type | ts.SymbolFlags.Namespace));
  const record = (name, target) => ({
    name, kind: typeKind(ts, target), namespace: Boolean(target.flags & ts.SymbolFlags.Namespace),
  });
  const visitNamespace = (target, prefix, ancestors) => {
    if (ancestors.has(target)) return;
    const next = new Set(ancestors).add(target);
    for (const member of checker.getExportsOfModule(target)) {
      const resolved = dereference(ts, checker, member);
      if (!visible(resolved)) continue;
      const memberPath = `${prefix}.${member.getName()}`;
      const { name, ...details } = record(memberPath, resolved);
      namespaceMembers.push({ path: name, ...details });
      if (details.namespace) visitNamespace(resolved, memberPath, next);
    }
  };
  for (const symbol of checker.getExportsOfModule(module)) {
    const target = dereference(ts, checker, symbol);
    if (!visible(target)) continue;
    // Keep the public label even when two aliases resolve to the same class or module.
    const entry = record(symbol.getName(), target);
    exports.push(entry);
    if (entry.namespace) visitNamespace(target, entry.name, new Set());
  }
  exports.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  namespaceMembers.sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return { formatVersion: 1, exports, namespaceMembers };
}

/**
 * Compare actual package self-reference imports and collect the named runtime value surface.
 * @returns {Promise<object>} Sorted names and typeof categories for both module formats.
 */
export async function collectRuntimeExportSnapshot() {
  const esm = await import('@antom-tech/node');
  const commonjs = require('@antom-tech/node');
  const names = Object.keys(esm).sort();
  assert.deepEqual(names, Object.keys(commonjs).sort(), 'CommonJS and ESM runtime export names differ.');
  for (const name of names) {
    assert.equal(typeof esm[name], typeof commonjs[name], `CommonJS and ESM export types differ: ${name}`);
    if (process.features.require_module) {
      assert.strictEqual(esm[name], commonjs[name], `CommonJS and ESM must share the same runtime export: ${name}`);
    }
  }
  assert.equal(typeof esm.AntomClient, 'function', 'The public client class must remain available.');
  assert.strictEqual(esm.DefaultAntomClient, esm.AntomClient, 'The default client name must alias the same constructor.');
  for (const name of ['AlipayClient', 'DefaultAlipayClient']) {
    assert.equal(name in esm, false, `The previous client export must be absent: ${name}`);
  }
  return { formatVersion: 1, exports: names.map(name => ({ name, type: typeof esm[name] })) };
}

/**
 * Resolve the source, CommonJS declaration, and ESM declaration entries through one read-only program.
 * @returns {object} A separate type snapshot for each of the three actual package entry points.
 */
export function collectTypeExportSnapshots() {
  const ts = require('typescript');
  const configFile = path.join(sdkRoot, 'tsconfig.json');
  const configuration = ts.readConfigFile(configFile, ts.sys.readFile);
  if (configuration.error) throw new Error(ts.flattenDiagnosticMessageText(configuration.error.messageText, '\n'));
  const parsed = ts.parseJsonConfigFileContent(configuration.config, ts.sys, sdkRoot);
  if (parsed.errors.length) throw new Error(parsed.errors.map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'));
  const entries = Object.fromEntries(Object.entries(TYPE_ENTRY_PATHS).map(([label, relative]) => [label, path.join(sdkRoot, relative)]));
  // Missing artifacts are errors rather than an empty or skipped type inventory.
  for (const entry of Object.values(entries)) readFileSync(entry, 'utf8');
  const options = { ...parsed.options, noEmit: true, incremental: false, skipLibCheck: false };
  const host = ts.createCompilerHost(options);
  host.writeFile = () => { throw new Error('Export snapshot collection must not emit files.'); };
  const program = ts.createProgram(Object.values(entries), options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    throw new Error(diagnostics.map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'));
  }
  const checker = program.getTypeChecker();
  return Object.fromEntries(Object.entries(entries).map(([label, entry]) => {
    const source = program.getSourceFile(entry);
    assert.ok(source, `Missing TypeScript entry for ${label}.`);
    return [label, typeExportSnapshot(ts, checker, source)];
  }));
}
