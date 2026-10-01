import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = path.join(root, 'dist');
await mkdir(path.join(dist, 'assets'), { recursive: true });
const binary = process.platform === 'win32'
  ? path.join(root, 'node_modules/@esbuild/win32-x64/esbuild.exe')
  : path.join(root, `node_modules/@esbuild/${process.platform}-${process.arch}/bin/esbuild`);

function bundle(args) {
  const result = spawnSync(binary, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// The installable DSH Client half: ModuleLoader registration plus the whale overlay.
bundle([
  'src/client-entry.mjs', '--bundle', '--format=iife', '--target=es2020', '--minify',
  '--loader:.css=text', '--loader:.png=dataurl', '--outfile=client.js',
]);

// Keep the standalone ESM artifact for local preview/manual Harness installation.
bundle([
  'src/standalone-entry.mjs', '--bundle', '--format=esm', '--target=es2020', '--minify',
  '--loader:.css=text', '--loader:.png=dataurl', '--outfile=dist/whale-pet.js',
]);
await copyFile(path.join(root, 'assets/harness-background.png'), path.join(dist, 'assets/harness-background.png'));
await writeFile(path.join(dist, 'BUILD.txt'), 'Transparent little whale pet with fixed floral background build.\n');
console.log('Built the DSH plugin client and standalone whale artifacts.');
