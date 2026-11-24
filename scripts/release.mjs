/** Bump the SDK version, verify the release archive, and publish it to npm. */
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    tag: { type: 'string', default: 'latest' },
    version: { type: 'string', default: 'patch' },
    'dry-run': { type: 'boolean', default: false },
  },
});
assert.ok(['beta', 'latest', 'pre'].includes(values.tag), '--tag must be beta, latest, or pre.');
assert.ok(['major', 'minor', 'patch'].includes(values.version), '--version must be major, minor, or patch.');

const temporary = mkdtempSync(join(tmpdir(), 'antom-release-'));
const directory = values['dry-run'] ? join(temporary, 'sdk') : root;

function run(command, args) {
  const result = spawnSync(command, args, { cwd: directory, stdio: 'inherit' });
  assert.equal(result.status, 0, result.error?.message ?? `${command} failed. Release stopped.`);
}

try {
  if (values['dry-run']) {
    // Preview the next version and its actual tarball without changing the checkout's manifests.
    for (const entry of ['package.json', 'package-lock.json', 'tsconfig.json', 'README.md', 'LEGAL.md',
      'src', 'scripts', 'test', 'resources']) {
      cpSync(join(root, entry), join(directory, entry), { recursive: true });
    }
    symlinkSync(join(root, 'node_modules'), join(directory, 'node_modules'), 'junction');
  }
  run('npm', ['--cache', join(temporary, 'npm-cache'), 'test']);
  run('npm', ['--cache', join(temporary, 'npm-cache'), 'version', values.version,
    '--no-git-tag-version', '--ignore-scripts']);
  run(process.execPath, [join(directory, 'scripts/check-package.mjs'), '--publish', '--tag', values.tag,
    ...(values['dry-run'] ? ['--dry-run'] : [])]);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
