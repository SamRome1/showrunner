# Video Brief — Release: showrunner v0.1

Composition: `Release` (`src/compositions/Release.tsx`), 1080x1080, 30fps, 1500 frames (50s).
Placement: standalone launch-post video for X / GitHub README. No voiceover — every beat is self-explanatory on screen.
Accent: Postgres blue #336791 (house accent; unchanged so the gallery reads as one system).

## 1. VISUAL SYSTEM — apply to every scene, no exceptions
- Background: pure black (#000000). No gradients, no vignettes, no noise.
- Typography: Inter for UI/headlines (500–700), JetBrains Mono for code/terminal/labels. White primary, #A1A1AA secondary.
- Accent: #336791, used only for the terminal prompt glyph, thin rules, and the wordmark's period.
- Layout: center 80% safe zone. Terminal windows are 820px wide.
- Motion: standard `enter` (12px rise, 0.98→1.0, damping 200). Exits 6–8f via SceneWrapper. Stagger 4f unless the beat says otherwise.
- Emphasis: 1px borders and accent color only. No size changes.
- Timing: every scene ends with a ≥30f hold.

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
Beat C (120–180f): a fifth line lands in white at f126: `looks generated.` Hold.
On-screen text: exactly the strings above.
Load-bearing: Terminal.
Sanctioned exceptions: none.

### Scene 2 — Wordmark (180–330f, 5s)
Beat A (0–30f): `showrunner` in Inter 700, 128px, white, letter-spacing -4, centered. The trailing period is accent-colored: `showrunner.`
Beat B (6–40f): MonoLabel beneath (stagger 6f): `A MOTION DESIGN SYSTEM FOR AI-GENERATED VIDEO`.
Beat C (40–150f): hold.
On-screen text: `showrunner.`, `A MOTION DESIGN SYSTEM FOR AI-GENERATED VIDEO`.
Sanctioned exceptions: 128px hero text is the one display-scale moment in the video.

### Scene 3 — TheGate (330–690f, 12s)
Beat A (0–50f): Terminal titled `claude` with the Anthropic mark rises in. Input types: `make me a launch video`.
Beat B (50–110f): output line in white at f56: `This project requires a brief. Fill this in:`
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
Beat C (120–220f): two rows of five LogoBadge tiles (size 140, bare marks in bordered tiles) dock in beneath, 4f apart in reading order: openai, react, nextjs, typescript, rust / python, kubernetes, azure, postgresql, github.
Beat D (220–300f): hold.
On-screen text: the pill and the code lines only.

### Scene 5 — Grammar (990–1230f, 8s)
Beat A (0–30f): Headline variant `subhead`, white: `One motion grammar.`
Beat B (10–110f): five spec rows, 4f apart (the house stagger, demonstrated): key in mono zinc-400 left, value in mono white right, thin 1px zinc-800 rule under each row.
  `spring` — `damping 200` · `rise` — `12px` · `scale` — `0.98 → 1.0` · `exit` — `6–8 frames` · `hold` — `≥ 20 frames`
Beat C (110–240f): hold.
On-screen text: exactly the strings above.

### Scene 6 — Verify (1230–1410f, 6s)
Beat A (0–100f): a 3x2 grid of hollow 1px zinc-700 rounded rects (200x200) rises in 4f apart; inside each, a CheckGlyph draws 20f after the rect lands.
Beat B (30–110f): StatCounter to the right of the grid: counts 0→6 over 45f, suffix ` / 6`, label `STILLS REVIEWED`.
Beat C (110–180f): hold.
On-screen text: `6 / 6`, `STILLS REVIEWED`.

### Scene 7 — Closer (1410–1500f, 3s) — ends on a HARD CUT
Beat A (0–70f): Terminal rises in; input types (1.5f/char, done by f68): `git clone github.com/SamRome1/showrunner`
Beat B (70–90f): hold, then cut to black on the final frame. No fade, no outro.
On-screen text: the clone line only.
Sanctioned exceptions: hard cut ending (no exit fade).

## 5. Delivery
- Render: `docs/media/release.mp4`; gallery GIF `docs/media/release.gif` (≤1.5 MB); contact sheet `docs/media/contact-sheets/release.png`.
- Verify stills from every beat before the full render.
- PR to main, no merge by the agent.
