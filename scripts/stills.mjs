// Renders one PNG per requested frame through a single bundle, for reviewing
// every beat of a composition before a full render.
//   node scripts/stills.mjs ShortForm 60 120 305 ... [--out out/stills]
import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = outIdx >= 0 ? args.splice(outIdx, 2)[1] : 'out/stills';
const [id, ...frameArgs] = args;
if (!id || frameArgs.length === 0) {
  console.error('usage: node scripts/stills.mjs <CompositionId> <frame> [frame...] [--out dir]');
  process.exit(1);
}
const frames = frameArgs.map(Number);
await mkdir(outDir, { recursive: true });

const serveUrl = await bundle({ entryPoint: resolve('src/compositions/index.ts') });
const composition = await selectComposition({ serveUrl, id });
for (const frame of frames) {
  const output = resolve(outDir, `${id}-f${String(frame).padStart(4, '0')}.png`);
  await renderStill({ composition, serveUrl, output, frame, imageFormat: 'png' });
  console.log(output);
}
