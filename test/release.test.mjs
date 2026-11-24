/** Verify release arguments, npm version updates, Git snapshots, and isolated previews without publishing. */
import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { devNull, tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function fixture(callback, { failTests = false, failPackageCheck = false } = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'antom-release-test-'));
  writeFileSync(join(directory, '.gitignore'), 'capture.json\nnode_modules/\n');
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
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')));
  const options = {
    cwd: directory, encoding: 'utf8', env: {
      ...env, ANTOM_RELEASE_CAPTURE: join(directory, 'capture.json'), npm_config_offline: 'true',
      GIT_CONFIG_GLOBAL: devNull, GIT_CONFIG_SYSTEM: devNull,
      GIT_AUTHOR_NAME: 'Release Test', GIT_AUTHOR_EMAIL: 'release-test@example.invalid',
      GIT_COMMITTER_NAME: 'Release Test', GIT_COMMITTER_EMAIL: 'release-test@example.invalid',
    },
  };
  const run = args => spawnSync(process.execPath, [join(directory, 'scripts/release.mjs'), ...args], options);
  const git = (...args) => {
    const result = spawnSync('git', args, options);
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  try {
    git('init', '--quiet', '--template=');
    git('add', '.');
    git('commit', '--quiet', '-m', 'test: initialize release fixture');
    callback({ directory, run, git });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

for (const [label, args, version, tag] of [
  ['defaults', [], '1.2.4', 'latest'],
  ['beta patch', ['--tag', 'beta', '--version', 'patch'], '1.2.4-beta.0', 'beta'],
  ['beta minor', ['--tag', 'beta', '--version', 'minor'], '1.3.0-beta.0', 'beta'],
  ['pre major', ['--tag=pre', '--version=major'], '2.0.0-pre.0', 'pre'],
]) {
  test(`release supports ${label} and tags both version files`, () => {
    fixture(({ directory, run, git }) => {
      const result = run(args);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      const captured = JSON.parse(readFileSync(join(directory, 'capture.json')));
      assert.deepEqual(captured, {
        args: ['--publish', '--tag', tag], version, lockVersion: version, rootVersion: version,
      });
      assert.equal(git('tag', '--points-at', 'HEAD'), version);
      assert.equal(JSON.parse(git('show', `refs/tags/${version}:package.json`)).version, version);
      const lock = JSON.parse(git('show', `refs/tags/${version}:package-lock.json`));
      assert.equal(lock.version, version);
      assert.equal(lock.packages[''].version, version);
      assert.equal(git('status', '--porcelain'), '');
    });
  });
}

test('successive releases in the same prerelease channel increment only the counter', () => {
  for (const tag of ['beta', 'pre']) {
    fixture(({ run, git }) => {
      for (const [increment, count] of [['patch', 0], ['major', 1]]) {
        const result = run(['--tag', tag, '--version', increment]);
        assert.equal(result.status, 0, result.stdout + result.stderr);
        assert.equal(git('tag', '--points-at', 'HEAD'), `1.2.4-${tag}.${count}`);
      }
    });
  }
});

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
  fixture(({ directory, run, git }) => {
    const names = ['package.json', 'package-lock.json'];
    const original = names.map(name => readFileSync(join(directory, name), 'utf8'));
    const result = run(['--dry-run', '--tag', 'beta']);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    const captured = JSON.parse(readFileSync(join(directory, 'capture.json')));
    assert.equal(captured.version, '1.2.4-beta.0');
    assert.deepEqual(captured.args, ['--publish', '--tag', 'beta', '--dry-run']);
    assert.deepEqual(names.map(name => readFileSync(join(directory, name), 'utf8')), original);
    assert.equal(git('tag', '--list'), '');
    assert.equal(git('rev-list', '--count', 'HEAD'), '1');
  });
});

test('failed tests stop before incrementing the version', () => {
  fixture(({ directory, run }) => {
    assert.notEqual(run([]).status, 0);
    assert.equal(JSON.parse(readFileSync(join(directory, 'package.json'))).version, '1.2.3');
  }, { failTests: true });
});

test('failed package verification preserves the synchronized candidate version', () => {
  fixture(({ directory, run, git }) => {
    assert.notEqual(run([]).status, 0);
    assert.equal(JSON.parse(readFileSync(join(directory, 'package.json'))).version, '1.2.4');
    assert.equal(JSON.parse(readFileSync(join(directory, 'package-lock.json'))).version, '1.2.4');
    assert.equal(git('tag', '--list'), '');
    assert.equal(git('rev-list', '--count', 'HEAD'), '1');
  }, { failPackageCheck: true });
});

test('an existing version tag stops the release before publication', () => {
  fixture(({ directory, run, git }) => {
    const original = git('rev-parse', 'HEAD');
    git('tag', '1.2.4');
    const result = run([]);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Git tag 1\.2\.4 already exists/);
    assert.throws(() => readFileSync(join(directory, 'capture.json')), { code: 'ENOENT' });
    assert.equal(git('rev-parse', 'refs/tags/1.2.4'), original);
  });
});

test('uncommitted source changes stop the release before the version bump', () => {
  fixture(({ directory, run, git }) => {
    writeFileSync(join(directory, 'README.md'), 'Uncommitted release source\n');
    const result = run([]);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Commit source changes before publishing/);
    assert.equal(JSON.parse(readFileSync(join(directory, 'package.json'))).version, '1.2.3');
    assert.equal(git('tag', '--list'), '');
  });
});
