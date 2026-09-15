# Video Brief — BundleSizes: what does a hello world cost?

Composition: `BundleSizes` (`src/compositions/BundleSizes.tsx`), 1920×1080, 30fps, 1620 frames (54s). Standalone 16:9, no voiceover. Accent: #336791 (repo default).

## 0. Format
- Canvas: 1920x1080, 30fps
- Placement: standalone landscape (YouTube / X embed)
- Total duration: 1620 frames (54s)
- Voiceover: none. Beats are paced for silent viewing with captions-free on-screen text.

## Data (measured 2026-09-15)
Source: https://bundlejs.com (esbuild, minify, gzip). Query = the modules a hello world imports, whole module, every export, before tree-shaking. kB = 1000 bytes.

| Framework | Query | min bytes | gzip bytes | on screen |
|---|---|---|---|---|
| Preact | `preact@10.29.8` | 11,695 | 4,851 | 4.9 kB |
| Solid | `solid-js@1.9.15,solid-js@1.9.15/web` | 39,709 | 15,029 | 15.0 kB |
| Svelte | `svelte@5.57.0` | 47,033 | 17,062 | 17.1 kB |
| Vue | `vue@3.5.42` | 125,570 | 49,214 | 49.2 kB |
| React | `react@19.2.3,react-dom@19.2.3/client` | 201,376 | 61,227 | 61.2 kB |

Largest ÷ smallest = 61,227 / 4,851 = 12.6×.

Why bundlejs and not bundlephobia: bundlephobia measures a package's default entry only. For react-dom@19 that entry excludes `react-dom/client` (the reconciler), which would understate React by ~50 kB. bundlejs accepts subpath entries, so every framework is measured the same way. Numbers are the full runtime with every export; a real app tree-shakes some of it. The caveat scene says so.

## 1. VISUAL SYSTEM — apply to every scene, no exceptions
Repo defaults from `src/theme.ts`: pure black, Inter 500–700 / JetBrains Mono, white primary / zinc-400 secondary, accent #336791, center-80% safe zone, damping-200 rise entrances, 6–8 frame exits, ≥20 frame holds. Bars are accent-colored on a zinc track. **No per-framework brand colors** — the official logos carry brand color, the bars stay neutral so the eye compares length, not hue.

## 2. ASSET RULES
As in `docs/VIDEO_BRIEF_TEMPLATE.md`.

### Assets batch
1. Preact — svgl `preact.svg` (color)
2. Solid — svgl `solidjs.svg` (color)
3. Svelte — svgl `svelte.svg` (color)
4. Vue — svgl `vue.svg` (color)
5. React — svgl `react_dark.svg` (already present as `react.svg`)
All verified on the AssetCheck contact sheet before scenes were built.

## 3. ARCHITECTURE
- Scenes in `src/scenes/bundle-sizes/`, sequenced by `<Series>` in `src/compositions/BundleSizes.tsx`.
- Load-bearing: `<SizeBar>` (`src/components/SizeBar.tsx`) — horizontal bar chart rows with logo, name, accent bar, and a `StatCounter` value. Used by Scenes 3 and 4.
- Data lives once in `src/scenes/bundle-sizes/data.ts`; every on-screen number derives from it.

## 4. SCENES

### Scene 1 — HelloWorld (0–150f, 5s)
Beat A (0–60f): a mono line types center-frame: `<h1>Hello world</h1>`
Beat B (60–130f): beneath it, Inter subhead rises in: What does it cost to ship it?
Beat C (130–150f): hold, then exit fade.
On-screen text: `<h1>Hello world</h1>`, "What does it cost to ship it?"

### Scene 2 — Method (150–330f, 6s)
Beat A (0–30f): mono pill label "METHOD" rises in top-left of the content block.
Beat B (8–80f): a `<CodeBlock>` with header "esbuild · minify · gzip" reveals six lines, one per framework import set, house stagger:
```
// what a hello world imports
import 'preact'
import 'solid-js'; import 'solid-js/web'
import 'svelte'
import 'vue'
import 'react'; import 'react-dom/client'
```
Beat C (80–180f): hold. Exit fade.
On-screen text: the label and the six code lines only.

### Scene 3 — Bars (330–930f, 20s)
Beat A (0–20f): mono label "MIN + GZIP · WHAT A HELLO WORLD IMPORTS" rises in above the chart.
Beat B (0–500f): `<SizeBar>` rows land smallest → largest, one every 100 frames (Preact f10, Solid f110, Svelte f210, Vue f310, React f410). Each row: logo badge + name rise in; the bar grows on a slow 50-frame damping-200 spring; the `StatCounter` counts to the exact kB with one decimal. Scale is fixed to the largest value from the first frame, so Preact reads as a sliver and React fills the track. Smallest-first so the last bar is the payoff.
Beat C (460–600f): hold the completed chart. Exit fade.
On-screen text: the label, five framework names, five values.

### Scene 4 — Scale (930–1170f, 8s)
Beat A (0–30f): two rows only — Preact and React — settled, no growth animation.
Beat B (20–80f): a large mono `StatCounter` counts 0 → 12.6 with suffix "×" right of the rows; beneath it a mono caption "smallest → largest".
Beat C (80–240f): hold. Exit fade.
On-screen text: "Preact", "React", the two values, "12.6×", "smallest → largest".

### Scene 5 — Caveat (1170–1380f, 7s)
Beat A (0–30f): Inter headline: Bundle size is one variable.
Beat B (6–40f): second line, zinc-400 subhead: Runtime speed, hydration, and the team you already have matter more.
Beat C (40–210f): hold. Exit fade.
On-screen text: those two sentences.

### Scene 6 — Source (1380–1620f, 8s)
Beat A (20–60f): citation card (style of `TheReceipt`): mono label "SOURCE", Inter title "bundlejs.com · esbuild · min + gzip", mono lines with the five queries and versions, footer "Measured 2026-09-15 · whole runtime, every export, before tree-shaking".
Beat B (60–240f): hold. Exit fade to black.
On-screen text: the card contents only.

Sanctioned exceptions: none. The 100-frame row cadence in Scene 3 is content pacing, not a sibling stagger.

## 5. Delivery
- Render: `docs/media/bundle-sizes.mp4`, gallery GIF `docs/media/bundle-sizes.gif`, contact sheet `docs/media/contact-sheets/bundle-sizes.png`.
