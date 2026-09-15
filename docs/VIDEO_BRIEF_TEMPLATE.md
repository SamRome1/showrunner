# Video Brief — <working title>

> Fill every section. Sections marked REQUIRED cannot be left blank.
> A completed example: `docs/briefs/shortform-openai-postgres.md`.

## 0. Format — REQUIRED
- Canvas: <1080x1080 | 1080x1920 | 1920x1080>, <fps>
- Placement / context: <e.g. upper half of a 9:16 composite, standalone, X embed>
- Total duration: <frames> (<seconds>)
- Voiceover: <attached script | none>. If attached, every beat below must cite the VO phrase it syncs to.

## 1. VISUAL SYSTEM — apply to every scene, no exceptions — REQUIRED
Default is the showrunner kinetic system in `src/theme.ts`. State what, if anything, changes.
- Canvas: animated dark gradient wash + drifting dot grid + particle field (`SceneWrapper`). Never flat, never static.
- Palette: deep blue #336791 (structure) · sky #5FA8FF (active accent) · amber #F59E0B (single warm highlight). Text white / #B8C4D6. Change: <hex set, or "default">
- Typography: Inter 500–800 for UI/headlines (kinetic word-by-word entrances), JetBrains Mono for code/labels. Hero 112 · headline 76 · stat 168.
- Surfaces: glass panels with luminous 1px borders and light sweeps. No opaque black boxes.
- Motion: entrances rise 24px, scale 0.92→1, slight overshoot (damping 14). Ambient layer REQUIRED on every hold: drift, breathing glow, flowing connectors, shimmer. Exits: 8-frame fade + scale-down; the canvas never fades.
- Density: fill the frame in layers (background → midground → foreground). Stagger siblings 3 frames.
- Emphasis: amber + glow for the one thing to look at. Scale pops are allowed on stamps/counters (`springs.pop`).
- Timing: <unhurried | brisk>. Holds ≥ 20 frames, but alive — never frozen.

## 2. ASSET RULES — REQUIRED
- NEVER recreate brand logos, product icons, or UI screenshots with HTML/CSS/JSX shapes or hand-written SVG paths. Approximations are unacceptable.
- Before building any scene that references a real product/company, download the official asset first:
  1. Check https://svgl.app (clean official SVGs) or the company's brand/press kit
  2. Fallback: https://cdn.simpleicons.org/[slug] for monochrome marks
  3. Save to `public/assets/` with a descriptive filename
  4. Reference via `<Img src={staticFile("assets/name.svg")} />` — never hotlink remote URLs
- If an official asset can't be found, STOP and ask rather than improvising one.
- Logos on black: use white/light variants. Apply `filter: invert` only to pure monochrome marks, never to color logos.

### Assets batch (run before any scenes)
Download these to `public/assets/` and confirm each renders on the canvas background (use the `AssetCheck` composition):
1. <Product> logo (<variant>) — <source>
2. ...

**Stop and report the file list before proceeding. Do not build scenes until every asset exists locally.**

## 3. ARCHITECTURE — REQUIRED
- One shared `src/theme.ts` exporting colors, fonts, spacing, and spring configs. All components import from it.
- Reusable components in `src/components/`: `<SceneWrapper>`, `<Headline>`, `<MonoLabel>`, `<LogoBadge>`, `<CodeBlock>`, `<StatCounter>`, ambient `<Halo>` / `<FlowLine>` / `<LightSweep>`, plus any load-bearing components this brief names. Build scenes by composing these, not one-off JSX.
- Each scene is its own file in `src/scenes/`, sequenced in a composition with `<Series>` and registered in `Root.tsx`.
- Name any component that must be shared across scenes (e.g. a diagram that later scenes populate) and say which scenes depend on it.

## 4. SCENES — REQUIRED (one block per scene)

### Scene N — <Name> (<start>–<end>f, <seconds>s)
Beat A (<frames>): <what enters, how, and the VO phrase it syncs to>
Beat B (<frames>): ...
Beat C (<frames>): <hold / exit>
On-screen text: <exact strings, or "none">
Load-bearing components: <component names later scenes reuse, or "none">
Sanctioned exceptions: <any deliberate break from the visual system, stated explicitly, or "none">

### Scene N+1 — ...

## 5. Delivery
- Render target: `out/<CompositionId>.mp4`
- Verify: stills from every beat reviewed before the full render
- Commit and push to GitHub when done
