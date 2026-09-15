/**
 * Measured 2026-09-15 with https://bundlejs.com (esbuild, minify, gzip).
 * Query = the modules a hello world imports; whole module, every export, before tree-shaking.
 * See docs/briefs/bundle-sizes.md for the full table and methodology.
 */
export type Framework = {
  id: string;
  name: string;
  logo: string; // path under public/
  query: string;
  gzipBytes: number;
  minBytes: number;
};

export const FRAMEWORKS: Framework[] = [
  { id: 'preact', name: 'Preact', logo: 'assets/preact.svg', query: 'preact@10.29.8', gzipBytes: 4851, minBytes: 11695 },
  { id: 'solid', name: 'Solid', logo: 'assets/solidjs.svg', query: 'solid-js@1.9.15,solid-js@1.9.15/web', gzipBytes: 15029, minBytes: 39709 },
  { id: 'svelte', name: 'Svelte', logo: 'assets/svelte.svg', query: 'svelte@5.57.0', gzipBytes: 17062, minBytes: 47033 },
  { id: 'vue', name: 'Vue', logo: 'assets/vue.svg', query: 'vue@3.5.42', gzipBytes: 49214, minBytes: 125570 },
  { id: 'react', name: 'React', logo: 'assets/react.svg', query: 'react@19.2.3,react-dom@19.2.3/client', gzipBytes: 61227, minBytes: 201376 },
];

export const MEASURED_ON = '2026-09-15';
export const SOURCE_URL = 'bundlejs.com';

/** kB = 1000 bytes, one decimal — matches bundlejs's display. */
export const toKb = (bytes: number) => Math.round(bytes / 100) / 10;

export const MAX_GZIP = Math.max(...FRAMEWORKS.map((f) => f.gzipBytes));
export const SMALLEST = FRAMEWORKS[0];
export const LARGEST = FRAMEWORKS[FRAMEWORKS.length - 1];
export const RATIO = Math.round((LARGEST.gzipBytes / SMALLEST.gzipBytes) * 10) / 10; // 12.6
