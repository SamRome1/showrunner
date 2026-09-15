#!/usr/bin/env node
// Re-theme the whole system in one command.
//   node scripts/brand.mjs --deep "#336791" --sky "#5FA8FF" --amber "#F59E0B" [--canvas-top "#050810" --canvas-bottom "#0B1E33"]
// Rewrites the palette block in src/theme.ts. Every component and scene reads from it, so
// the change propagates to every composition. Then add your logos to assets.json and run `npm run setup`.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1]]);
    return acc;
  }, []),
);
const HEX = /^#[0-9a-fA-F]{6}$/;
const keys = { deep: 'deep', sky: 'sky', amber: 'amber', 'canvas-top': 'canvasTop', 'canvas-bottom': 'canvasBottom' };
const updates = Object.entries(keys).filter(([k]) => args[k]).map(([k, prop]) => {
  if (!HEX.test(args[k])) {
    console.error(`--${k} must be a 6-digit hex like #5FA8FF (got ${args[k]})`);
    process.exit(1);
  }
  return [prop, args[k].toUpperCase()];
});
if (updates.length === 0) {
  console.log('usage: node scripts/brand.mjs --deep #hex --sky #hex --amber #hex [--canvas-top #hex --canvas-bottom #hex]');
  process.exit(0);
}
const file = resolve(new URL('..', import.meta.url).pathname, 'src/theme.ts');
let src = await readFile(file, 'utf8');
for (const [prop, hex] of updates) {
  const re = new RegExp(`(\\b${prop}:\\s*)'#[0-9a-fA-F]{6}'`);
  if (!re.test(src)) {
    console.error(`could not find palette.${prop} in src/theme.ts`);
    process.exit(1);
  }
  src = src.replace(re, `$1'${hex}'`);
  console.log(`palette.${prop} → ${hex}`);
}
// ACCENT follows sky; amberSoft is derived by lightening amber slightly
if (args.sky) src = src.replace(/export const ACCENT = '#[0-9a-fA-F]{6}'/, `export const ACCENT = '${args.sky.toUpperCase()}'`);
if (args.amber) {
  const n = parseInt(args.amber.slice(1), 16);
  const lift = (c) => Math.min(255, Math.round(c + (255 - c) * 0.25));
  const soft = `#${[16, 8, 0].map((s) => lift((n >> s) & 255).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
  src = src.replace(/(\bamberSoft:\s*)'#[0-9a-fA-F]{6}'/, `$1'${soft}'`);
  console.log(`palette.amberSoft → ${soft} (derived)`);
}
await writeFile(file, src);
console.log('\nDone. Next: add your logos to assets.json, run `npm run setup`, then `npm run dev`.');
