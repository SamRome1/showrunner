# showrunner — agent instructions

This repo is a motion design system for AI-generated video. Your job is to turn a **brief** into a Remotion composition that looks like a studio made it: dense, luminous, constantly in motion, and disciplined. The rules below exist because unguided AI video looks generated — either chaotic or dead. Follow them exactly.

## REQUIRED FIRST STEP — the brief gate

**Any request to create a new video, animation, composition, or scene sequence MUST begin with a completed brief in the format of `docs/VIDEO_BRIEF_TEMPLATE.md`. This step cannot be skipped.**

When the user asks for a new video and has not supplied a brief:
1. Do NOT write code, scaffold files, or download assets yet.
2. Reply: "This project requires a specific brief format to ensure the visuals are professional. Please fill this out in a format similar to the following:" and paste the full contents of `docs/VIDEO_BRIEF_TEMPLATE.md`. Point to `docs/briefs/shortform-openai-postgres.md` as a completed example. Offer the `/brief` skill to fill it in interactively.
3. Wait for the brief. If any REQUIRED section is missing or a placeholder like `#______` is unfilled, ask for it before building.

The only bypass: the user explicitly states they are deliberately skipping the brief (e.g. "skip the brief", "no brief, just build it"). A vague "just do it" does not count — ask once whether they mean to skip. If they confirm, say so in the first line of your reply and use the defaults in `src/theme.ts`.

When a brief IS provided:
- Save it to `docs/briefs/<composition-id>.md` before writing code.
- Its VISUAL SYSTEM section is law for that composition. Encode any new values in `src/theme.ts`, never inline.
- Follow the assets-batch step literally: add each asset to `assets.json`, run `npm run setup`, render `AssetCheck`, **stop and report the file list, and wait for the go-ahead** before building any scene.
- Build scenes from `src/components/`. Any element used by more than one scene becomes a component; the brief names these as "load-bearing".

Edits to an existing composition do not need a new brief — read the one in `docs/briefs/` first and stay consistent with it.

## Asset rules — no exceptions

- NEVER recreate brand logos, product icons, or UI screenshots with HTML/CSS/JSX shapes or hand-written SVG paths. Approximations are unacceptable.
- Official sources only: https://svgl.app first, then the company's brand kit, then https://cdn.simpleicons.org/[slug] for monochrome marks. Record the URL in `assets.json`; never hotlink at render time.
- If an official asset can't be found, STOP and ask.
- On dark canvases use white/light variants. `filter: invert` only on pure monochrome marks, never on color logos.
- Generic shapes (cylinders, boxes, checkmarks) are fine as stroke-drawn SVG in `src/components/Glyphs.tsx`.

## Visual + motion system (`src/theme.ts`) — kinetic

The look is **dense, luminous, and always moving**. Every frame should attract the eye on mute.

- **Canvas**: never flat black. `SceneWrapper` renders an animated gradient wash (`GradientWash`), a drifting `DotGrid`, and a `Particles` field under every scene. Add `halo` for hero / type-only scenes. Content sits on top in the safe zone (`raw` for absolutely positioned scenes).
- **Palette** (`palette`): deep Postgres blue `#336791` for structure, sky `#5FA8FF` as the active accent, amber `#F59E0B` as the single warm highlight — the one thing to look at in a frame. White / `#B8C4D6` text. No other saturated hues except official logo colors.
- **Surfaces**: `glass(active)` panels (translucent fill, 1px luminous border, inner highlight) — never opaque black boxes. Cards and tiles get a `LightSweep`.
- **Glow**: `glow()` on active elements, `textGlow()` on headlines and numerals, `gradientText()` for hero numerals. Bloom breathes with `breathe()`.
- **Entrances**: `enter(frame, fps, delay)` → opacity, 24px rise, scale 0.92→1 with a slight overshoot (`springs.enter`, damping 14). `springs.pop` for badges/stamps, `springs.drift` for whole-composition moves.
- **Ambient layer — required**: nothing sits fully still. Use `drift()` on idle elements, `breathe()` on glow/borders, `FlowLine` for any connector (travelling pulses), rolling shimmer across grids. Holds are alive, not frozen.
- **Kinetic type**: `Headline` enters word-by-word; use `Accent` (amber) or `Sky` spans for emphasis. Big sizes: hero 112, headline 76, stats 168.
- **Exits**: `exitFade` — 8-frame fade with a small scale-down. The canvas never fades; only content does, so cuts feel continuous.
- **Density**: fill the frame. Layer background → midground → foreground. Stagger siblings 3 frames. Avoid single small elements on an empty canvas.
- **Hard limits**: text ≥ 14px on 1080 canvases; official logos only; no emoji; any deliberate break from the system is named in the brief under "Sanctioned exceptions" and commented in code.

## Verification before you say "done"

1. `npm run lint` clean on files you touched.
2. Render one still per beat with `node scripts/stills.mjs <Id> <frames...>` and actually look at them. Tile with ffmpeg if there are many.
3. Full render: `npx remotion render <Id> out/<Id>.mp4`.
4. Report what you rendered, what you fixed, and any interpretation calls you made. MP4s are gitignored — attach them to the GitHub Release; only GIFs and contact sheets are committed.
5. Commit and push (`origin/main`) unless the user says otherwise.

## Layout

```
assets.json              official logo manifest → public/assets/ (gitignored, fetched on install)
docs/VIDEO_BRIEF_TEMPLATE.md
docs/briefs/             one brief per composition
src/theme.ts             colors, fonts, spacing, springs, enter/exit helpers
src/components/          SceneWrapper, Headline, MonoLabel, LogoBadge, CodeBlock, StatCounter, Glyphs,
                         ambient: GradientWash, Particles, DotGrid, Halo, FlowLine, LightSweep,
                         load-bearing: ArchDiagram, ReplicaTopology, Terminal, SizeBar, PointField, GraphLayer
src/scenes/              one file per scene, each exporting its component + DURATION
src/compositions/        Root.tsx registers compositions; ShortForm sequences scenes with <Series>
scripts/                 fetch-assets.mjs, stills.mjs
```
