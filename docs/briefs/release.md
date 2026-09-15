# Video Brief — Release: showrunner v0.1

Composition: `Release` (`src/compositions/Release.tsx`), 1080x1080, 30fps, 1500 frames (50s).
Placement: standalone launch-post video for X / GitHub README. No voiceover — every beat is self-explanatory on screen.
Palette: showrunner kinetic system — deep #336791, sky #5FA8FF, amber #F59E0B (see section 1).

## 1. VISUAL SYSTEM — apply to every scene, no exceptions
Revised 2026-09-15 to the showrunner kinetic system (the original brief specified pure black and static holds; the owner asked for density, constant motion, and a color theme).
- Canvas: animated deep-blue gradient wash, drifting dot grid, particle field (`SceneWrapper`). Halo rings behind the terminal scenes, the wordmark, the verification grid, and the closer.
- Palette: deep #336791 · sky #5FA8FF (prompt chevron, borders, glow) · amber #F59E0B — the single highlight per frame: `looks generated.`, the gate sentence, the check glyphs, the `// never drawn by hand` line, the `ambient · always` row, the `6 / 6` counter, the wordmark's period.
- Typography: Inter 800 kinetic wordmark (136px, letter-by-letter, white→sky gradient, glow), Inter 800 headline for "One motion grammar.", JetBrains Mono for terminal/labels/spec rows.
- Surfaces: `Terminal` is a glass window with luminous border, breathing glow, light sweep, and a glowing active line. Spec rows and verification tiles are glass with light sweeps. No opaque black boxes.
- Motion: slight-overshoot entrances (damping 14, 24px rise, 0.92→1), drift on every idle panel, breathing glow, a flowing spine behind the spec rows, rolling shimmer on the tiles.
- Timing: every scene ends with a ≥30f hold that stays alive.
- Sanctioned exceptions: the 136px wordmark is the one display-scale moment; the closer ends on a hard cut.

## 2. ASSET RULES
As in `docs/VIDEO_BRIEF_TEMPLATE.md`.

### Assets batch (run before any scenes)
Already in `assets.json` from ShortForm: openai, react, nextjs, typescript, rust, python, kubernetes, azure, postgresql, github.
1. Anthropic mark (white) — svgl.app `anthropic_white.svg` → `assets/anthropic.svg` (appended to `assets.json`).
Stop and report the file list before proceeding.

## 3. ARCHITECTURE
- `src/theme.ts` for every value. Scenes in `src/scenes/release/`. Composition `Release` sequences them with `<Series>`.
- Components reused: SceneWrapper, Headline, MonoLabel, LogoBadge, CodeBlock, StatCounter, CheckGlyph, CrossGlyph.
- New load-bearing component: `<Terminal>` (`src/components/Terminal.tsx`) — a bordered terminal window with a title bar, typed input lines (`›` prompt in accent), and output lines that rise in on a per-line frame. Used by Scenes 1, 3, 7.

## 4. SCENES

### Scene 1 — TheAsk (0–180f, 6s)
Beat A (0–60f): Terminal window rises in. Input line types: `make me a launch video` (2f/char, from f12).
Beat B (60–120f): four output lines rise in 8f apart (zinc-400 mono, each with a check glyph drawn in zinc-400): `added bounce spring`, `added gradient background`, `drew the logo in CSS`, `centered everything`.
Beat C (120–180f): a fifth line lands in amber at f126: `looks generated.` Hold.
On-screen text: exactly the strings above.
Load-bearing: Terminal.
Sanctioned exceptions: none.

### Scene 2 — Wordmark (180–330f, 5s)
Beat A (0–30f): `showrunner` in Inter 800, 136px, letter-by-letter 2f apart, white→sky gradient with glow, centered. The trailing period is amber: `showrunner.`
Beat B (6–40f): MonoLabel beneath (stagger 6f): `A MOTION DESIGN SYSTEM FOR AI-GENERATED VIDEO`.
Beat C (40–150f): hold.
On-screen text: `showrunner.`, `A MOTION DESIGN SYSTEM FOR AI-GENERATED VIDEO`.
Sanctioned exceptions: 136px hero text is the one display-scale moment in the video.

### Scene 3 — TheGate (330–690f, 12s)
Beat A (0–50f): Terminal titled `claude` with the Anthropic mark rises in. Input types: `make me a launch video`.
Beat B (50–110f): output line in amber at f56: `This project requires a brief. Fill this in:`
Beat C (110–300f): five section headers type out one after another, 34f apart (f110, 144, 178, 212, 246), each 2f/char, mono zinc-400, with a check glyph drawing 6f after each finishes:
  `0. FORMAT` · `1. VISUAL SYSTEM` · `2. ASSET RULES` · `3. ARCHITECTURE` · `4. SCENES`
Beat D (300–360f): hold.
On-screen text: exactly the strings above.
Load-bearing: Terminal.

### Scene 4 — AssetRule (690–990f, 10s)
Beat A (0–40f): MonoLabel pill at top-left of the safe zone: `OFFICIAL SOURCES ONLY`.
Beat B (8–120f): CodeBlock (filename `assets.json`, 4 lines, stagger 6f) showing three manifest entries:
  `{ "file": "openai.svg",     "url": "svgl.app/library/openai_dark.svg" },`
  `{ "file": "postgresql.svg", "url": "svgl.app/library/postgresql.svg" },`
  `{ "file": "github.svg",     "url": "svgl.app/library/github_dark.svg" },`
  `// never drawn by hand`
Beat C (120–220f): two rows of five glass LogoBadge tiles (size 156, glowing, light sweep) dock in beneath, 4f apart in reading order: openai, react, nextjs, typescript, rust / python, kubernetes, azure, postgresql, github.
Beat D (220–300f): hold.
On-screen text: the pill and the code lines only.

### Scene 5 — Grammar (990–1230f, 8s)
Beat A (0–30f): Headline variant `subhead`, white: `One motion grammar.`
Beat B (10–110f): five glass spec rows, 3f apart (the house stagger, demonstrated): key in mono secondary left, value in mono white right; the last row is the amber highlight.
  `spring` — `damping 14 · slight overshoot` · `rise` — `24px` · `scale` — `0.92 → 1` · `exit` — `8f fade` · `ambient` — `always`
Beat C (110–240f): hold.
On-screen text: exactly the strings above.

### Scene 6 — Verify (1230–1410f, 6s)
Beat A (0–100f): a 3x2 grid of glass tiles (214x214) rises in 12f apart; inside each, an amber CheckGlyph draws 20f after the tile lands and the tile's border warms.
Beat B (30–110f): StatCounter to the right of the grid: counts 0→6 over 45f, suffix ` / 6`, label `STILLS REVIEWED`.
Beat C (110–180f): hold.
On-screen text: `6 / 6`, `STILLS REVIEWED`.

### Scene 7 — Closer (1410–1500f, 3s) — ends on a HARD CUT
Beat A (0–70f): Terminal rises in; input types (1.5f/char, done by f68): `git clone github.com/SamRome1/showrunner`
Beat B (70–90f): hold, then cut to black on the final frame. No fade, no outro.
On-screen text: the clone line only.
Sanctioned exceptions: hard cut ending (no exit fade).

## 5. Delivery
- Render: `docs/media/release.mp4`; gallery GIF `docs/media/release.gif` (25 fps, ≤2.5 MB); contact sheet `docs/media/contact-sheets/release.png`.
- Verify stills from every beat before the full render.
- PR to main, no merge by the agent.
