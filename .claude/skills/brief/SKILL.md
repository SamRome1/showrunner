---
name: brief
description: Fill in a video brief interactively, one section at a time, and save it to docs/briefs/. Use when the user wants to make a new video and has no brief yet, or types /brief.
---

Walk the user through `docs/VIDEO_BRIEF_TEMPLATE.md` one section at a time. Do not write any composition code during this skill.

1. Ask for the working title and composition id (PascalCase). Read `docs/briefs/shortform-openai-postgres.md` so your questions carry concrete examples.
2. Section 0 — Format: canvas size, fps, placement, total duration, whether a VO script exists. If a VO exists, ask them to paste it now; every scene beat must later cite a VO phrase.
3. Section 1 — Visual system: propose the `src/theme.ts` defaults as the answer and ask only what changes (accent hex is mandatory and has no default).
4. Section 2 — Assets: list every real product/company the video will reference and the variant needed (white/color). Do not download anything yet.
5. Section 4 — Scenes: for each scene ask for name, frame range, beats with timing, exact on-screen text, load-bearing components, sanctioned exceptions. Push back if a scene has no hold, if text isn't exact, or if beats overlap.
6. Write the completed brief to `docs/briefs/<composition-id>.md`, show the user the path, and end with: "Brief saved. Next step is the assets batch — say go and I will fetch and verify every logo, then stop for your review."
