/** Verify release arguments, npm version updates, and isolated previews without publishing. */
import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function fixture(callback, { failTests = false, failPackageCheck = false } = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'antom-release-test-'));
  for (const entry of ['scripts', 'src', 'test', 'resources', 'node_modules']) {
    mkdirSync(join(directory, entry));
  }
  copyFileSync(new URL('../scripts/release.mjs', import.meta.url), join(directory, 'scripts/release.mjs'));
  const manifest = { name: 'release-fixture', version: '1.2.3', private: true,
    scripts: { test: 'node test/smoke.cjs' } };
  writeFileSync(join(directory, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
  writeFileSync(join(directory, 'package-lock.json'), JSON.stringify({
    name: manifest.name, version: manifest.version, lockfileVersion: 3,
    packages: { '': { name: manifest.name, version: manifest.version } },
  }, null, 2) + '\n');
  for (const entry of ['README.md', 'LEGAL.md', 'tsconfig.json']) writeFileSync(join(directory, entry), '{}\n');
  writeFileSync(join(directory, 'test/smoke.cjs'), `process.exit(${failTests ? 1 : 0});\n`);
  writeFileSync(join(directory, 'scripts/check-package.mjs'), `
    import { readFileSync, writeFileSync } from 'node:fs';
    const manifest = JSON.parse(readFileSync('package.json'));
    const lock = JSON.parse(readFileSync('package-lock.json'));
    writeFileSync(process.env.ANTOM_RELEASE_CAPTURE, JSON.stringify({
      args: process.argv.slice(2), version: manifest.version,
      lockVersion: lock.version, rootVersion: lock.packages[''].version,
    }));
    process.exit(${failPackageCheck ? 1 : 0});
  `);
  const run = args => spawnSync(process.execPath, [join(directory, 'scripts/release.mjs'), ...args], {
    cwd: directory, encoding: 'utf8',
    env: { ...process.env, ANTOM_RELEASE_CAPTURE: join(directory, 'capture.json'), npm_config_offline: 'true' },
  });
  try { callback({ directory, run }); } finally { rmSync(directory, { recursive: true, force: true }); }
}

for (const [label, args, version, tag] of [
  ['defaults', [], '1.2.4', 'latest'],
  ['beta minor', ['--tag', 'beta', '--version', 'minor'], '1.3.0', 'beta'],
  ['pre major', ['--tag=pre', '--version=major'], '2.0.0', 'pre'],
]) {
  test(`release supports ${label} and synchronizes both version files`, () => {
    fixture(({ directory, run }) => {
      const result = run(args);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      const captured = JSON.parse(readFileSync(join(directory, 'capture.json')));
      assert.deepEqual(captured, {
        args: ['--publish', '--tag', tag], version, lockVersion: version, rootVersion: version,
      });
    });
  });
}

test('invalid release arguments stop before tests or version changes', () => {
  fixture(({ directory, run }) => {
    const manifest = readFileSync(join(directory, 'package.json'), 'utf8');
    for (const args of [['--tag', 'next'], ['--version', 'prepatch'], ['--tag'], ['--unexpected']]) {
      assert.notEqual(run(args).status, 0, args.join(' '));
      assert.equal(readFileSync(join(directory, 'package.json'), 'utf8'), manifest);
    }
  });
});

test('release previews verify the next version without modifying checkout manifests', () => {
  fixture(({ directory, run }) => {
    const names = ['package.json', 'package-lock.json'];
    const original = names.map(name => readFileSync(join(directory, name), 'utf8'));
    const result = run(['--dry-run', '--tag', 'beta']);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const captured = JSON.parse(readFileSync(join(directory, 'capture.json')));
    assert.equal(captured.version, '1.2.4');
    assert.deepEqual(captured.args, ['--publish', '--tag', 'beta', '--dry-run']);
    assert.deepEqual(names.map(name => readFileSync(join(directory, name), 'utf8')), original);
  });
});

test('failed tests stop before incrementing the version', () => {
  fixture(({ directory, run }) => {
    assert.notEqual(run([]).status, 0);
    assert.equal(JSON.parse(readFileSync(join(directory, 'package.json'))).version, '1.2.3');
  }, { failTests: true });
});

test('failed package verification preserves the synchronized candidate version', () => {
  fixture(({ directory, run }) => {
    assert.notEqual(run([]).status, 0);
    assert.equal(JSON.parse(readFileSync(join(directory, 'package.json'))).version, '1.2.4');
    assert.equal(JSON.parse(readFileSync(join(directory, 'package-lock.json'))).version, '1.2.4');
  }, { failPackageCheck: true });
});
