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
const result = spawnSync(binary, [
  'src/whale.mjs', '--bundle', '--format=esm', '--target=es2020', '--minify',
  '--loader:.css=text', '--outfile=dist/whale-pet.js',
], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await copyFile(path.join(root, 'assets/harness-background.png'), path.join(dist, 'assets/harness-background.png'));
await writeFile(path.join(dist, 'BUILD.txt'), 'Transparent little whale pet with fixed floral background build.\n');
console.log('Built the final little whale and copied its floral background.');
