---
name: assets
description: Run the assets batch for a brief — add each official logo to assets.json, fetch into public/assets/, render the AssetCheck contact sheet, report, and stop. Use when a brief's asset list is ready or the user types /assets.
---

1. Read the brief in `docs/briefs/` and list every asset it names.
2. For each: query `https://api.svgl.app?search=<name>` and pick the variant the brief asks for (`_dark` routes are the light marks for dark canvases). Fall back to the company brand kit, then `https://cdn.simpleicons.org/<slug>`. If nothing official exists, STOP and ask — never draw a substitute.
3. Add entries to `assets.json` (`file`, `url`, `note`). Run `npm run setup`.
4. Inspect each file's fill colors (`grep -oE 'fill="[^"]+"'`) to confirm the variant.
5. Render `npx remotion still AssetCheck out/asset-check.png`, view it, and confirm every mark reads on the canvas background.
6. Reply with a table of requested asset → file → variant, note anything surprising, and **stop**. Do not build scenes until the user says go.
