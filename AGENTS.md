# AGENTS.md

This repository's agent instructions live in [`CLAUDE.md`](./CLAUDE.md). They apply to every coding agent, not only Claude Code:

- **No new video without a brief** in the `docs/VIDEO_BRIEF_TEMPLATE.md` format, unless the user explicitly says they are skipping it.
- **Never draw logos.** Official SVGs only, fetched via `assets.json` into `public/assets/`.
- **All visual and motion values come from `src/theme.ts`.** Kinetic v2: animated canvas, glass, glow, ambient motion on every hold.
- **Verify with rendered stills** (`node scripts/stills.mjs <Id> <frames...>`) before declaring anything done.

Read `CLAUDE.md` in full before making changes.
