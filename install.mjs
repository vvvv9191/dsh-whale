import { readFile, writeFile, copyFile, unlink, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = path.join(process.env.APPDATA, 'npm/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-frontend/dist');
const indexPath = path.join(dist, 'index.html');
const assetPath = path.join(dist, 'assets/dsh-whale-pet.js');
const oldAssetPath = path.join(dist, 'assets/dsh-jellyfish-pet.js');
const backgroundSource = path.join(root, 'assets/harness-background.png');
const backgroundPath = path.join(dist, 'assets/harness-background.png');
const oldArtworkPath = path.join(dist, 'assets/dsh-jellyfish.png');
const backupPath = path.join(root, 'original-index.html');
const marker = /\n?\s*<!-- dsh-(?:little-whale|jellyfish-pet):start -->[\s\S]*?<!-- dsh-(?:little-whale|jellyfish-pet):end -->/g;
const exists = async file => { try { await access(file); return true; } catch { return false; } };
const removeOwnedAsset = async file => {
  if (!(await exists(file))) return;
  const content = await readFile(file, 'utf8');
  if (content.startsWith('/* dsh-')) await unlink(file);
};

const original = await readFile(indexPath, 'utf8');
const cleaned = original.replace(marker, '');

if (process.argv.includes('--uninstall')) {
  if (original !== cleaned) await writeFile(indexPath, cleaned);
  await removeOwnedAsset(assetPath);
  await removeOwnedAsset(oldAssetPath);
  if (await exists(backgroundPath)) await unlink(backgroundPath);
  if (await exists(oldArtworkPath)) await unlink(oldArtworkPath);
  console.log('Removed the local pet overlay. Refresh http://127.0.0.1:3080/.');
} else {
  if (!cleaned.includes('<div id="root"></div>') || !cleaned.includes('</body>')) {
    throw new Error('Unexpected frontend structure; leaving the existing app untouched.');
  }
  const built = await readFile(path.join(root, 'dist/whale-pet.js'), 'utf8');
  const version = createHash('sha256').update(built).digest('hex').slice(0, 12);
  const addition = `
    <!-- dsh-little-whale:start -->
    <style id="dsh-little-whale-theme">
      :root, #root, #root * {
        --dsw-alias-bg-base: transparent !important;
        --dsw-alias-bg-layer-1: transparent !important;
        --dsw-alias-bg-layer-2: transparent !important;
        --dsw-alias-bg-module-platform: transparent !important;
      }
      html, body, #root, #root > div { background-color: transparent !important; }
      #root { position: relative !important; z-index: 1 !important; }
      #dsh-whale-background {
        position: fixed !important;
        inset: 0 !important;
        z-index: 0 !important;
        pointer-events: none !important;
        background-color: #f2faff !important;
        background-image: linear-gradient(rgba(242,250,255,.78), rgba(242,250,255,.78)), url("./assets/harness-background.png") !important;
        background-position: center top, center top !important;
        background-size: cover, cover !important;
        background-repeat: no-repeat, no-repeat !important;
      }
      #root aside, #root [data-sidebar], #root [class*="sidebar"], #root [class*="Sidebar"] {
        background-color: #fcfdff !important;
      }
      [data-dsh-main-bg="true"] {
        background: transparent !important;
        background-color: transparent !important;
        background-image: none !important;
      }
    </style>
    <script type="module" src="./assets/dsh-whale-pet.js?v=${version}"></script>
  <!-- dsh-little-whale:end -->
  `;
  if (!(await exists(backupPath))) await copyFile(indexPath, backupPath);
  if (await exists(assetPath)) {
    const prior = await readFile(assetPath, 'utf8');
    if (!prior.startsWith('/* dsh-')) throw new Error('Refusing to overwrite an unrelated asset.');
  }
  await removeOwnedAsset(oldAssetPath);
  if (await exists(oldArtworkPath)) await unlink(oldArtworkPath);
  await writeFile(assetPath, `/* dsh-little-whale local overlay */\n${built}`);
  await copyFile(backgroundSource, backgroundPath);
  await writeFile(indexPath, cleaned.replace('</body>', `${addition}</body>`));
  console.log(`Installed final whale ${version}; restored the floral background and removed the jellyfish overlay.`);
  console.log('Refresh the existing http://127.0.0.1:3080/ page. No server restart is needed.');
}
