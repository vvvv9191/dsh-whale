import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root = fileURLToPath(new URL('..', import.meta.url));

const loadJson = name => readFile(path.join(root, name), 'utf8').then(JSON.parse);

test('package declares a DSH web bundle and client entry', async () => {
  const pkg = await loadJson('package.json');
  assert.equal(pkg.name, 'dsh-whale');
  assert.equal(pkg.exports['./client'], './client.js');
  assert.deepEqual(pkg.dsh.bundle, { patch: './cordis.patch.yml' });
  assert.equal(pkg.dsh.client.platform, 'web');
  assert.equal(pkg.dsh.client.immediately, true);
});

test('bundle patch inserts the same whale plugin row', async () => {
  const patch = await readFile(path.join(root, 'cordis.patch.yml'), 'utf8');
  assert.match(patch, /id:\s*dsh-whale/);
  assert.match(patch, /name:\s*dsh-whale/);
});

test('built client registers dsh-whale with the ModuleLoader', async () => {
  const source = await readFile(path.join(root, 'client.js'), 'utf8');
  let registration;
  vm.runInNewContext(source, {
    window: {
      __ModuleLoader__: {
        load(value) { registration = value; },
      },
    },
  });
  assert.equal(registration?.id, 'dsh-whale');
  assert.equal(typeof registration?.factory, 'function');
  const plugin = registration.factory();
  assert.equal(typeof plugin.apply, 'function');
});
