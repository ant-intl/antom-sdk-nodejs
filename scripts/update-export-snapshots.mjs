/** Explicitly accept a reviewed export surface; never invoked by build or ordinary tests. */
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectRuntimeExportSnapshot, collectTypeExportSnapshots } from './export-snapshot.mjs';

const directory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../test/snapshots');
const runtime = await collectRuntimeExportSnapshot();
const types = collectTypeExportSnapshots();
for (const [entry, snapshot] of Object.entries(types)) {
  assert.deepEqual(snapshot, types.source, `The ${entry} type exports differ from the source entry; snapshots were not updated.`);
}
// Compute and validate both inventories before replacing either static review baseline.
const snapshots = new Map([
  ['runtime-exports.json', runtime],
  ['type-exports.json', types.source],
]);
mkdirSync(directory, { recursive: true });
for (const [name, snapshot] of snapshots) writeFileSync(path.join(directory, name), JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Updated runtime exports (${runtime.exports.length}) and type exports (${types.source.exports.length}, ` +
  `${types.source.namespaceMembers.length} namespace members). Review both snapshot diffs before accepting API changes.`);
