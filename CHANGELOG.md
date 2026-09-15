# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- Visual system v2 (kinetic): animated gradient canvas, dot grid, particles, glass surfaces, glow, flowing connectors, slight-overshoot entrances, ambient motion on every hold. Brand-anchored palette (deep blue, sky, amber). All four gallery videos re-rendered.

### Added
- Ambient components: `GradientWash`, `Particles`, `DotGrid`, `Halo`, `FlowLine`, `LightSweep`.
- Brief gate in `CLAUDE.md` with the brief template and `/brief`, `/assets` skills.
- Shared `theme.ts` and nine composable components.
- `ShortForm` example: OpenAI runs on one Postgres, 12 scenes, with brief and render.
- Official-logo manifest with fetch-on-install; `AssetCheck` contact sheet.
- `scripts/stills.mjs` per-beat verification; CI rendering one still per scene.
- Gallery: `Release` (1:1 launch video), `BundleSizes` (16:9 data story from live bundlejs measurements), `VectorIndex` (9:16 zero-logo HNSW explainer), each with its brief.
- Components: `Terminal`, `SizeBar`, `PointField`, `GraphLayer`.
- Before/after contrast GIF and social preview image.
- Issue and PR templates, code of conduct, roadmap issues.
