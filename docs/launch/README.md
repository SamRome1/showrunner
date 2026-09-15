# Launch kit

Drafts for launch day. Post the video first, the link second. Keep the repo private until the morning of.

## Order of operations
1. Flip the repo public. Enable branch protection on `main` (required check: `verify`). Promote the v0.1.0 pre-release to a release.
2. Upload the social preview (Settings → General → Social preview → `docs/media/social-preview.png`). Test the unfurl by pasting the link into a private Slack DM.
3. Post on X with the Release video attached natively (not a link). Repo link in the first reply.
4. Same hour: LinkedIn (native video), Remotion Discord `#showcase`, Remotion showcase submission.
5. Next morning, once there is activity: Show HN.
6. Reply to every comment for the first 48 hours.

## X — main post (video attached: `release.mp4`)
> AI agents make ugly videos. Not because the tools are bad — because nobody hands them a brief.
>
> showrunner is a motion design system for Claude Code + Remotion. You describe the video in a brief. The agent can't skip it. Official logos only. One grammar. Rendered stills before "done."
>
> Four videos below were made this way. 🧵

Reply 1 (repo link):
> Repo, MIT, template ready: github.com/SamRome1/showrunner
> `npx degit SamRome1/showrunner my-video`

Reply 2 (ShortForm GIF):
> The flagship: how OpenAI runs ChatGPT on one unsharded Postgres primary with ~48 read replicas. 12 scenes from one brief. Every frame range and on-screen string came from the brief.

Reply 3 (BundleSizes GIF):
> Same system, 16:9, real data pulled at build time. Bars, logos, and citation card are all components.

Reply 4 (VectorIndex GIF):
> Zero logos. The HNSW graph and the 8-hop search are computed at render time. Proof the system holds without brand assets.

Reply 5 (the gate, text screenshot):
> The part that matters: `CLAUDE.md` refuses to write video code until a brief exists. Ask for a video, get the template back. `/brief` fills it in interactively.

Reply 6 (make it yours):
> `npm run brand -- --deep #hex --sky #hex --amber #hex` re-themes everything. Add your logos to assets.json. Run /brief. Your launch video, same grammar.

## LinkedIn (native video: `release.mp4`)
> I kept asking coding agents for launch videos and getting the same thing back: bouncing text, gradients, a logo drawn in CSS, everything centered. The tools were fine. The missing piece was the discipline a motion designer brings before the first keyframe.
>
> So I encoded it. showrunner is a motion design system for Claude Code and Remotion: a brief the agent cannot skip, an asset rule that forbids hand-drawn logos, one visual grammar, and rendered stills before anything is called done.
>
> Four example videos, four briefs, MIT. Link in comments.

## Show HN
Title: `Show HN: Showrunner – a motion design system that makes AI-generated video look designed`

Text:
> I build a lot of short explainer videos with Remotion and started using coding agents to write the compositions. The output was always technically fine and visually generated: overshoot springs, gradients, approximated logos, everything crowded into the middle.
>
> Showrunner is what fixed it for me. It's a template repo whose CLAUDE.md refuses to write video code until a brief exists (canvas, palette, asset list, every scene as timed beats with exact on-screen text). Logos must be official SVGs fetched from their source into a manifest; the agent will stop and ask rather than draw one. All motion values come from one theme file. Before "done," the agent renders one still per beat and looks at them; CI does the same.
>
> There are four example videos in the README, each with the brief that produced it. The interesting one technically is VectorIndex: the HNSW graph and the search path are computed at render time, so the animation is the actual algorithm.
>
> Happy to answer questions about the brief format, why the gate is behavioral rather than a plugin, or Remotion in general.

## Remotion showcase / Discord
> showrunner — a brief-first motion design system for AI agents building Remotion videos. Animated canvas, glass, glow, kinetic type; official-logo manifest; per-beat still verification in CI. Four examples with briefs. MIT. github.com/SamRome1/showrunner

## Discussions welcome post
Title: `Welcome — show what you made`

> If you built a video with showrunner, post the brief and a GIF here. The best ones get added to the README gallery with credit.
> Questions about the brief format, the asset rule, or re-theming go here too. Bugs go in Issues.
