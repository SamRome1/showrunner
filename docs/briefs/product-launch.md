# Video Brief — ProductLaunch: Lumen

Composition: `ProductLaunch` (`src/compositions/ProductLaunch.tsx`), 1920x1080, 30fps, 1350 frames (45s). No voiceover.
Purpose: the "make it yours" example — the launch video a user would make for their own product. **Lumen is fictional.** Every number on screen (1,400 ms, 12 ms, 10,000,000 queries a day) is invented for the story and labelled so here.

## 0. Format — REQUIRED
- Canvas: 1920x1080, 30fps. Standalone 16:9 (X, LinkedIn, YouTube).
- Total duration: 1350 frames (45s).
- Voiceover: none. Beats are paced for a silent autoplay.

## 1. VISUAL SYSTEM — apply to every scene, no exceptions — REQUIRED
Default showrunner kinetic v2 (`src/theme.ts`), unchanged: animated deep-blue wash, dot grid, particles, glass surfaces, glow, flowing connectors, slight-overshoot entrances, ambient motion on every hold. Palette deep #336791 · sky #5FA8FF · amber #F59E0B. Inter 800 kinetic headlines, JetBrains Mono for code and readouts. Amber is the single highlight per frame: the latency readout, the "12 ms", the counter, the install line.
Wordmark: "Lumen" is set in Inter 800 with `gradientText` (sky → white). No icon is drawn for it — type only.

## 2. ASSET RULES — REQUIRED
As in `docs/VIDEO_BRIEF_TEMPLATE.md`. Lumen has no logo and none is invented.
### Assets batch
All already in `assets.json` / `public/assets/` (official svgl sources): react.svg, nextjs.svg, typescript.svg, python.svg, postgresql.svg. No new downloads.

## 3. ARCHITECTURE — REQUIRED
- Scenes in `src/scenes/product-launch/`, sequenced by `<Series>` in `src/compositions/ProductLaunch.tsx`, registered in `Root.tsx`.
- Load-bearing: `<SearchMock>` (`src/components/SearchMock.tsx`) — glass search field with a typed query, result rows that land after a configurable latency, amber latency readout. Used by TheLag (lagging mode) and ThePromise (live mode).
- Reused: SceneWrapper (halo), Headline, MonoLabel, CodeBlock, LogoBadge, StatCounter, LightSweep.

## 4. SCENES — REQUIRED

### Scene 1 — Wordmark (0–150f, 5s)
Beat A (0–40f): "Lumen" lands hero-scale (Inter 800, 200px, gradientText, textGlow) letter-kinetic, halo behind.
Beat B (30–150f): mono label "REALTIME SEARCH FOR YOUR APP · ONE LINE" rises beneath with an amber dot. Hold with breathing glow.
On-screen text: `Lumen`, `realtime search for your app · one line`
Load-bearing components: none · Sanctioned exceptions: none

### Scene 2 — TheLag (150–390f, 8s)
Beat A (0–30f): headline "Your search is late." (kinetic) top-left; SearchMock rises center-right.
Beat B (30–110f): query `running shoes` types at 4 f/char. No results appear. A spinner ring turns in the field.
Beat C (110–190f): results land 1,400 ms (42 f) after the last keystroke — five rows stagger in. Amber readout counts to `1,400 ms`.
Beat D (190–240f): hold; readout breathes amber.
On-screen text: `Your search is late.`, `running shoes`, result rows (`Trail runner · Pegasus 41`, `Road racer · Endorphin`, `Daily trainer · Clifton 9`, `Track spike · Dragonfly`, `Recovery · Recovery Slide 2`), `1,400 ms`
Load-bearing components: SearchMock (mode "lagging") · Sanctioned exceptions: none

### Scene 3 — ThePromise (390–630f, 8s)
Beat A (0–30f): headline "Search that keeps up." kinetic, amber on "keeps up".
Beat B (30–110f): SearchMock types the same query; results now refresh on every keystroke (12 ms = 1 f after each char), rows re-land as the list narrows.
Beat C (110–240f): readout `12 ms` in amber with glow; hold with row shimmer.
On-screen text: `Search that keeps up.`, `running shoes`, the same result rows, `12 ms`
Load-bearing components: SearchMock (mode "live") · Sanctioned exceptions: none

### Scene 4 — OneLine (630–870f, 8s)
Beat A (0–30f): headline "One line. That's the integration."
Beat B (24–120f): CodeBlock `lumen.ts` — two lines: `import { lumen } from '@lumen/search'` and `await lumen.index('products')`; second line amber-highlighted at f80.
Beat C (60–240f): TypeScript and Python LogoBadges dock right of the panel with labels `TypeScript`, `Python`. Hold.
On-screen text: `One line. That's the integration.`, the two code lines, `lumen.ts`, `TypeScript`, `Python`
Load-bearing components: CodeBlock, LogoBadge · Sanctioned exceptions: none

### Scene 5 — WorksWith (870–1050f, 6s)
Beat A (0–24f): mono pill `WORKS WITH` + headline "Your stack. Already."
Beat B (20–110f): five LogoBadges (React, Next.js, Postgres, TypeScript, Python) dock in a row, 8 f apart, with labels. FlowLine spine behind them.
Beat C (110–180f): hold, breathing tiles.
On-screen text: `works with`, `Your stack. Already.`, `React`, `Next.js`, `Postgres`, `TypeScript`, `Python`
Load-bearing components: LogoBadge, FlowLine · Sanctioned exceptions: none

### Scene 6 — Scale (1050–1230f, 6s)
Beat A (0–60f): StatCounter counts to `10,000,000` (amber, hero size), label `queries a day · p99 under 20 ms`. Halo.
Beat B (60–180f): hold; expanding rings.
On-screen text: `10,000,000`, `queries a day · p99 under 20 ms` (fictional)
Load-bearing components: StatCounter · Sanctioned exceptions: none

### Scene 7 — Closer (1230–1350f, 4s)
Beat A (0–24f): "Lumen" wordmark returns (120px), halo.
Beat B (20–90f): `npm i @lumen/search` types in a glass chip (amber caret); `lumen.dev` mono beneath.
Beat C (90–120f): hold. HARD CUT at the final frame — no fade.
On-screen text: `Lumen`, `npm i @lumen/search`, `lumen.dev`
Load-bearing components: none · Sanctioned exceptions: hard cut ending (no exit fade)

## 5. Delivery
- Render: `docs/media/product-launch.mp4` (gitignored; attached to the GitHub Release), GIF `docs/media/product-launch.gif` at 25 fps, contact sheet `docs/media/contact-sheets/product-launch.png`.
- Verify stills from every beat before the full render.
