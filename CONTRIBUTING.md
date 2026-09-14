# Contributing

- **New example videos** need a brief in `docs/briefs/` first. PRs adding scenes without a brief will be asked to add one.
- **New components** go in `src/components/` and are exported from `index.ts`. Document the props inline. If a component exists to be shared across scenes, say which scenes.
- **No hand-drawn logos.** Add official sources to `assets.json`. If you can't find one, open an issue instead of approximating.
- **Motion values live in `src/theme.ts`.** Inline spring configs or colors will be rejected.
- Run `npm run lint` and render stills for every beat you changed. Attach a contact sheet to the PR.
- CI renders one still per scene of `ShortForm` on every PR.
