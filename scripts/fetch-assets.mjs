// Downloads every official logo listed in assets.json into public/assets/.
// Run via `npm run setup` (also runs on postinstall; fails soft when offline).
import { mkdir, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const quiet = process.argv.includes('--quiet');
const force = process.argv.includes('--force');
const root = resolve(new URL('..', import.meta.url).pathname);
const dest = resolve(root, 'public/assets');
const { assets } = JSON.parse(await (await import('node:fs/promises')).readFile(resolve(root, 'assets.json'), 'utf8'));

await mkdir(dest, { recursive: true });
let ok = 0;
let failed = 0;
for (const a of assets) {
  const target = resolve(dest, a.file);
  if (!force) {
    try {
      await access(target);
      ok++;
      continue;
    } catch {
      /* not present, fetch */
    }
  }
  try {
    const res = await fetch(a.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = await res.text();
    if (!body.includes('<svg')) throw new Error('response is not an SVG');
    await writeFile(target, body);
    ok++;
    if (!quiet) console.log(`✓ ${a.file}  ←  ${a.url}`);
  } catch (e) {
    failed++;
    console.warn(`✗ ${a.file}: ${e.message}`);
  }
}
if (!quiet || failed) console.log(`${ok}/${assets.length} assets ready in public/assets/${failed ? ' — re-run `npm run setup` when online' : ''}`);
