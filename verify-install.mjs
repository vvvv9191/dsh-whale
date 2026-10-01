import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
const dist = path.join(process.env.APPDATA, 'npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist');
const built = await readFile(path.join(root, 'dist/whale-pet.js'), 'utf8');
const index = await readFile(path.join(dist, 'index.html'), 'utf8');
const cleanedIndex = index.replace(/\s*<!-- dsh-(?:little-whale|jellyfish-pet):start -->[\s\S]*?<!-- dsh-(?:little-whale|jellyfish-pet):end -->\s*/g, '');
assert.match(cleanedIndex, /<div id="root"><\/div>/);
assert.doesNotMatch(cleanedIndex, /dsh-(?:little-whale|jellyfish-pet)/);
assert.equal(index.match(/dsh-whale-pet\.js/g)?.length, 1);
const url = 'http://127.0.0.1:3080/assets/dsh-whale-pet.js';
const response = await fetch(url, { cache: 'no-store' });
assert.equal(response.status, 200);
assert.match(response.headers.get('content-type'), /javascript/);
assert.equal(await response.text(), `/* dsh-little-whale local overlay */\n${built}`);
const report = {
  gui: 'http://127.0.0.1:3080/', assetURL: url, status: response.status,
  sha256: createHash('sha256').update(built).digest('hex'),
  originalAppPreserved: true, duplicateEntry: false,
  authenticatedGuiVisualCheck: 'Requires refresh/confirmation in the user’s already authenticated browser; no credentials were read.',
};
await writeFile(path.join(root, 'test-results/install-report.json'), JSON.stringify(report, null, 2));
console.log('PASS existing 3080 URL serves exactly the new whale build (200 JavaScript).');
console.log('PASS existing application entry preserved; exactly one whale entry installed.');
console.log('Awaiting user refresh/visual confirmation in the authenticated GUI.');
