<p align="center">
  <img src="docs/media/hero.gif" width="600" alt="A system diagram collapses into a single Postgres elephant" />
</p>

<h1 align="center">showrunner</h1>

<p align="center">
  A motion design system for AI-generated video.<br/>
  Describe a video in a brief. Claude Code builds it in <a href="https://remotion.dev">Remotion</a> to a standard you would ship.
</p>

<p align="center">
  <a href="https://github.com/SamRome1/showrunner/actions/workflows/ci.yml"><img src="https://github.com/SamRome1/showrunner/actions/workflows/ci.yml/badge.svg" alt="ci" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-5FA8FF" alt="MIT" /></a>
  <img src="https://img.shields.io/badge/remotion-4.0-336791" alt="Remotion 4" />
  <img src="https://img.shields.io/badge/works%20with-Claude%20Code%20%C2%B7%20Cursor%20%C2%B7%20Codex-F59E0B" alt="agents" />
</p>

<p align="center">
  <a href="https://github.com/SamRome1/showrunner/releases/download/v0.1.0/shortform-openai-postgres.mp4">Watch the full 90-second example</a> ·
  <a href="docs/VIDEO_BRIEF_TEMPLATE.md">The brief template</a> ·
  <a href="docs/briefs/shortform-openai-postgres.md">A completed brief</a>
</p>

---

## The problem

Ask an AI agent for a video and you get one of two things: a chaotic pile of bouncing text and hand-drawn logos, or a flat slideshow that sits dead on screen. The tooling is fine. What is missing is the discipline a motion designer brings before the first keyframe: a palette, a grammar, and a layer of ambient life.

**showrunner** is the person on a set who holds the brief and makes everyone follow it. This repo puts that role in front of the agent and makes it impossible to skip.


## How it works

1. **The brief gate.** `CLAUDE.md` forbids writing any video code until a brief exists in the [template format](docs/VIDEO_BRIEF_TEMPLATE.md): canvas, visual system, asset list, architecture, and every scene as timed beats with exact on-screen text. If you ask for a video without one, the agent hands you the template instead. `/brief` fills it in interactively.
2. **The asset rule.** No logo is ever drawn by hand. Every mark is an official SVG fetched from its source into `public/assets/` via `assets.json`, verified on a contact sheet, and reported back before a single scene is built. `/assets` runs this batch.
3. **One motion grammar.** `src/theme.ts` owns every color, font, spacing value, and spring. The canvas is an animated gradient wash with a particle field; panels are glass; active elements glow and breathe; connectors carry travelling pulses. Entrances rise with a slight overshoot, exits are quick fades, and nothing on screen ever sits fully still. Deviations must be named in the brief as sanctioned exceptions.
4. **Composable scenes.** Scenes are built from `SceneWrapper`, `Headline`, `MonoLabel`, `LogoBadge`, `CodeBlock`, `StatCounter`, plus load-bearing components the brief names. Anything two scenes share becomes a component.
5. **Verification before "done".** The agent renders one still per beat through a single bundle, reviews them, fixes what is off, then renders the MP4 and pushes.

## Quick start

```bash
git clone https://github.com/SamRome1/showrunner
cd showrunner
npm install          # also fetches the example's official logos into public/assets/
npm run dev          # opens Remotion Studio with the example video
```

Then open the folder in Claude Code and say what you want to make. You will get the brief template back. Fill it in, or run `/brief` and answer questions.

```bash
npm run render                                  # flagship MP4 → out/ShortForm.mp4
npx remotion render VectorIndex out/VectorIndex.mp4   # any composition by id
node scripts/stills.mjs ShortForm 60 305 1005   # one PNG per frame → out/stills/
npm run assets:check                            # contact sheet of every logo on the canvas
npm run brand -- --deep #hex --sky #hex --amber #hex   # re-theme the whole system
```

## Gallery

Five compositions, five briefs, three canvas formats. Full-quality MP4s are attached to the [latest release](https://github.com/SamRome1/showrunner/releases). Every frame range, hold, and on-screen string in the code came from the brief next to it.

| | |
|---|---|
| <img src="docs/media/hero.gif" width="440" alt="ShortForm" /> | **ShortForm** · 1:1 · 90s<br/>OpenAI runs ChatGPT on one unsharded Postgres primary. Cited to Bohan Zhang, PGConf.dev 2025.<br/>[brief](docs/briefs/shortform-openai-postgres.md) · [mp4](https://github.com/SamRome1/showrunner/releases/download/v0.1.0/shortform-openai-postgres.mp4) · `src/scenes/` |
| <img src="docs/media/release.gif" width="440" alt="Release" /> | **Release** · 1:1 · 50s<br/>The showrunner v0.1 launch video: the gate, the asset rule, the motion grammar, verification.<br/>[brief](docs/briefs/release.md) · [mp4](https://github.com/SamRome1/showrunner/releases/download/v0.1.0/release.mp4) · `src/scenes/release/` |
| <img src="docs/media/bundle-sizes.gif" width="440" alt="BundleSizes" /> | **BundleSizes** · 16:9 · 54s<br/>Min+gzip runtime size of Preact, Solid, Svelte, Vue, and React from live bundlejs measurements. Official logos, one accent.<br/>[brief](docs/briefs/bundle-sizes.md) · [mp4](https://github.com/SamRome1/showrunner/releases/download/v0.1.0/bundle-sizes.mp4) · `src/scenes/bundle-sizes/` |
| <img src="docs/media/product-launch.gif" width="440" alt="ProductLaunch" /> | **ProductLaunch** · 16:9 · 45s<br/>A launch video for a fictional product with no logo of its own. This is the "make it yours" path: type for the wordmark, official logos for the stack, the system for everything else.<br/>[brief](docs/briefs/product-launch.md) · [mp4](https://github.com/SamRome1/showrunner/releases/download/v0.1.0/product-launch.mp4) · `src/scenes/product-launch/` |
| <img src="docs/media/vector-index.gif" width="248" alt="VectorIndex" /> | **VectorIndex** · 9:16 · 50s<br/>What an HNSW index does, with zero brand assets. The graph and the 8-hop search are computed at render time.<br/>[brief](docs/briefs/vector-index.md) · [mp4](https://github.com/SamRome1/showrunner/releases/download/v0.1.0/vector-index.mp4) · `src/scenes/vector-index/` |

Two components carry the flagship: `ArchDiagram` (a system diagram with named slots that scenes populate and then collapse) and `ReplicaTopology` (one primary and 48 replicas, reused at half scale inside a boundary circle). The other examples added `Terminal`, `SizeBar`, `PointField`, `GraphLayer`, and `SearchMock` the same way: built once because a brief named them, then shared.

## Make it yours

The examples are about Postgres and JavaScript frameworks because those have public data and official logos. Your video will be about your product. Three steps:

```bash
npx degit SamRome1/showrunner my-launch-video && cd my-launch-video && npm install
npm run brand -- --deep "#1F2A44" --sky "#7C9CFF" --amber "#FF7A59"   # your three hues; everything re-themes
```

Then add your logos to `assets.json` (official SVGs only, the agent will refuse to draw one), run `npm run setup`, and open the folder in Claude Code. Say what you want. You get the brief template back. Fill it in or run `/brief`, and the agent builds your video inside the same grammar that produced the gallery above.

`ProductLaunch` in the gallery is exactly this path applied to a fictional product with no logo of its own: the wordmark is type, the stack logos are official, everything else is the system.

## What lives where

```
assets.json                 official logo manifest → public/assets/ (fetched on install, not committed)
docs/VIDEO_BRIEF_TEMPLATE.md
docs/briefs/                one brief per composition
src/theme.ts                colors, fonts, spacing, springs, enter/exit helpers
src/components/             the design system
src/scenes/                 one file per scene, exporting its component and DURATION
src/compositions/           Root.tsx, ShortForm (Series of scenes), AssetCheck
scripts/                    fetch-assets.mjs, stills.mjs
.claude/skills/             /brief and /assets
.cursor/rules/              the same rules for Cursor
```

## Using it with other agents

The rules are plain markdown in `CLAUDE.md`, mirrored by `AGENTS.md` for Codex, Copilot, and Windsurf, and by `.cursor/rules/` for Cursor. For anything else, paste `CLAUDE.md` into the system prompt. The gate is a behavioral contract, not a plugin.

## Contributing

New example videos need a brief first. New components need documented props. No hand-drawn logos, ever. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. Logos in `assets.json` are trademarks of their respective owners, fetched from official sources at install time, and are not redistributed by this repository.
