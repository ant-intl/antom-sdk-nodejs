/** Bump the SDK version, verify the release archive, and publish it to npm. */
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, rmdirSync, symlinkSync } from 'node:fs';
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

const dryRun = values['dry-run'];
const temporary = mkdtempSync(join(tmpdir(), 'antom-release-'));
const directory = dryRun ? join(temporary, 'sdk') : root;
const manifests = ['package.json', 'package-lock.json'];
let releaseLock;

function run(command, args, stdio = 'inherit') {
  const result = spawnSync(command, args, { cwd: directory, encoding: 'utf8', stdio });
  assert.equal(result.status, 0,
    result.error?.message ?? (result.stderr?.trim() || `${command} failed. Release stopped.`));
  return result.stdout?.trim();
}

function gitOutput(...args) {
  return run('git', args, 'pipe');
}

function assertReleaseSource(head) {
  assert.equal(gitOutput('rev-parse', '--verify', 'HEAD'), head, 'HEAD changed during the release.');
  assert.equal(gitOutput('status', '--porcelain=v1', '--untracked-files=normal', '--',
    '.', ...manifests.map(file => `:(exclude)${file}`)), '', 'Commit source changes before publishing.');
}

try {
  let head;
  if (dryRun) {
    // Preview the next version and its actual tarball without changing the checkout's manifests.
    for (const entry of [...manifests, 'tsconfig.json', 'README.md', 'LEGAL.md',
      'src', 'scripts', 'test', 'resources']) {
      cpSync(join(root, entry), join(directory, entry), { recursive: true });
    }
    symlinkSync(join(root, 'node_modules'), join(directory, 'node_modules'), 'junction');
  } else {
    assert.equal(gitOutput('rev-parse', '--show-prefix'), '', 'Release from the root of the Git repository.');
    const lock = resolve(root, gitOutput('rev-parse', '--git-path', 'antom-release.lock'));
    mkdirSync(lock);
    releaseLock = lock;
    head = gitOutput('rev-parse', '--verify', 'HEAD');
    assertReleaseSource(head);
    assert.equal(gitOutput('diff', '--cached', '--name-only'), '', 'Commit staged changes before publishing.');
    gitOutput('ls-files', '--error-unmatch', '--', ...manifests);
    gitOutput('var', 'GIT_AUTHOR_IDENT');
    gitOutput('var', 'GIT_COMMITTER_IDENT');
  }
  run('npm', ['--cache', join(temporary, 'npm-cache'), 'test']);
  let bump = values.version;
  const prerelease = values.tag !== 'latest';
  if (prerelease) {
    const current = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8')).version;
    const channel = /^(?:\d+\.){2}\d+-(beta|pre)\.\d+(?:\+[0-9A-Za-z.-]+)?$/.exec(current)?.[1];
    bump = channel === values.tag ? 'prerelease' : `pre${bump}`;
  }
  run('npm', ['--cache', join(temporary, 'npm-cache'), 'version', bump,
    '--no-git-tag-version', '--ignore-scripts', ...(prerelease ? ['--preid', values.tag] : [])]);

  const releaseManifests = manifests.map(file => readFileSync(join(directory, file), 'utf8'));
  const { version } = JSON.parse(releaseManifests[0]);
  if (!dryRun) {
    assertReleaseSource(head);
    assert.equal(gitOutput('tag', '--list', version), '', `Git tag ${version} already exists.`);
  }
  run(process.execPath, [join(directory, 'scripts/check-package.mjs'), '--publish', '--tag', values.tag,
    ...(dryRun ? ['--dry-run'] : [])]);

  if (!dryRun) {
    try {
      assertReleaseSource(head);
      assert.ok(manifests.every((file, i) => readFileSync(join(directory, file), 'utf8') === releaseManifests[i]),
        'Version manifests changed during the release.');
      run('git', ['commit', '--only', '-m', `chore(release): ${version}`, '--', ...manifests]);
      run('git', ['tag', '--', version]);
    } catch (error) {
      throw new Error(`npm published ${version}. The local Git snapshot failed.`, { cause: error });
    }
  }
} finally {
  if (releaseLock) rmdirSync(releaseLock);
  rmSync(temporary, { recursive: true, force: true });
}
