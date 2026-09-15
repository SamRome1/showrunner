# Video Brief — VectorIndex: What a vector index does

Composition: `VectorIndex` (`src/compositions/VectorIndex.tsx`). Gallery example #2.

## 0. Format
- Canvas: 1080x1920 (9:16 vertical), 30fps
- Placement / context: standalone short; also proves the system works on a vertical canvas and with zero brand assets
- Total duration: 1500 frames (50s)
- Voiceover: none. Beats are paced to be read, not spoken over.

## 1. VISUAL SYSTEM — apply to every scene, no exceptions
- Background: pure black (#000000). No gradients, no vignettes, no noise.
- Typography: Inter for headlines (700), JetBrains Mono for labels, counters, and the closing line. White primary, #A1A1AA secondary.
- Accent: #336791 (shared across the gallery). Used only for the query point, the search path, the found node, and rules.
- Layout: center 80% safe zone. Text block pinned to the top of the safe zone; diagram fills the lower ~two-thirds.
- Motion language: standard `enter()` (12px rise, 0.98→1.0, damping 200). Point clouds and graph layers reveal with `slowSpring` over 60–70 frames. Exits are `SceneWrapper` fades; scenes that hand the diagram to the next scene use `exit={false}`.
- Emphasis: accent color and 1.5px rings. Never size changes.
- Timing: every scene holds its finished state ≥40 frames.

## 2. ASSET RULES
As in `docs/VIDEO_BRIEF_TEMPLATE.md`.

### Assets batch
**None — sanctioned.** This example deliberately references no product or company, so there is nothing to download. Every mark on screen is a stroke-drawn shape from `src/components/`. This is the point of the example.

## 3. ARCHITECTURE
- Theme: `src/theme.ts` unchanged. Vertical size is passed in the Composition registration (`VECTOR_INDEX_SIZE`); components read `useVideoConfig()`.
- Load-bearing components (new, in `src/components/`):
  - `pointMath.ts` — seeded PRNG (mulberry32), clustered point generator, distance and nearest helpers. Theme-free so it can be unit-probed in Node.
  - `PointField` — 2,000 seeded points drawn into a box with a soft reveal edge and highlight rings. Used by scenes 1–2.
  - `GraphLayer` — one layer of the index: nodes, edges, query marker, search path revealing hop by hop. Used by scenes 4–5.
- Example-local: `src/scenes/vector-index/hnsw.ts` builds an honest HNSW-style index (layer 0: all 2,000 points with 4-NN edges; layer 1: every 16th point, 3-NN; layer 2: every 96th point, 2-NN; upper-layer edges are kept in lower layers) and runs a real greedy search from a fixed entry node. The path and hop count on screen are computed, not scripted. Query (0.80, 0.85) → 8 hops, and the greedy result equals the exact nearest neighbor.
- Shared geometry in `src/scenes/vector-index/layout.ts` (field box, three stacked layer panels).

## 4. SCENES

### Scene 1 — TheQuestion (0–150f, 5s)
Beat A (0–24f): pill `query` and headline enter at the top of the safe zone.
Beat B (10–70f): 2,000 points reveal in index order across the field box (slowSpring, 60f).
Beat C (44–64f): the query point appears as an accent dot with a 1.5px ring at (0.80, 0.85) of the field.
Beat D (64–150f): hold. `exit={false}` — the field continues into Scene 2.
On-screen text: "query", "Which point is closest?"

### Scene 2 — BruteForce (150–450f, 10s)
Beat A (0–200f): a scanning sweep draws thin zinc lines from the query to a moving window of 36 candidates, walking through all 2,000 in index order. A mono counter under the headline counts "N comparisons" in lockstep.
Beat B (200–212f): sweep ends; the exact nearest neighbor gets an accent ring (settling from r=24 to r=14) and a single accent line from the query.
Beat C (192–204f / 204–228f): headline crossfades from "Which point is closest?" to "Exact. Slow."
Beat D (228–300f): hold. Standard exit fade.
On-screen text: "brute force", "Which point is closest?", "Exact. Slow.", "N comparisons" (ends at "2,000 comparisons").

### Scene 3 — TheIdea (450–630f, 6s)
Beat A (0–24f): headline. Beat B (12–36f): muted subhead. Beat C: hold. Exit fade.
On-screen text: "Don't compare against everything.", "Build a map first."

### Scene 4 — BuildGraph (630–930f, 10s)
Beat A (0–24f): pill `hnsw` and headline.
Beat B (0–70f): layer 0 panel (bottom) draws: 2,000 nodes at r=1.8, a 1-in-6 sample of its 7,500 edges at 35% so it reads as a dense floor rather than a smear.
Beat C (70–140f): layer 1 panel (middle) draws: 125 nodes, 370 edges.
Beat D (150–220f): layer 2 panel (top) draws: 21 nodes, 42 edges.
Beat E (220–300f): hold. `exit={false}` — panels continue into Scene 5.
On-screen text: "hnsw", "Sparse on top. Dense below.", panel labels "LAYER 2 · 21 NODES", "LAYER 1 · 125 NODES", "LAYER 0 · 2,000 NODES".

### Scene 5 — Search (930–1230f, 10s)
Beat A (0–24f): pill swaps to `search`; headline "Start sparse. Descend. Refine."; a dashed accent query ring appears in all three panels at the query's position.
Beat B (30–198f): the computed greedy path animates: 18 frames per hop within a layer, a 12-frame dashed vertical descent between layers (from the last node visited to the same node one panel down). Mono counter "N hops" ticks with the path. Path: 3 hops on layer 2, 3 on layer 1, 2 on layer 0.
Beat C (198–212f): the found node gets an accent ring settling from r=22 to r=12. It is the exact nearest neighbor (verified in code).
Beat D (216–228f / 228–252f): headline crossfades to "8 hops. Not 2,000."
Beat E (252–300f): hold. Exit fade.
On-screen text: "search", "Start sparse. Descend. Refine.", "8 hops. Not 2,000.", "N hops", panel labels as above.

### Scene 6 — TradeOff (1230–1410f, 6s)
Beat A (0–24f): headline. Beat B (30–70f): two mono rows enter 8 frames apart, each with a 1px accent rule drawing left→right beneath it. Beat C (50–74f): small mono caption. Beat D: hold. Exit fade.
On-screen text: "Approximate. Fast.", "recall  ~95%", "latency  ~1 ms", "TYPICAL · HNSW · 1M VECTORS"
Note: the two figures are labeled as typical; they are representative of published HNSW benchmarks at ~1M vectors, not measurements from this demo.

### Scene 7 — Closer (1410–1500f, 3s)
Beat A (0–44f): one mono line types at 2 frames/char, center-frame. Beat B (44–90f): hold. Hard cut to black on the final frame (`exit={false}`).
On-screen text: "that's a vector index."

Sanctioned exceptions: none.

## 5. Delivery
- Render: `docs/media/vector-index.mp4`; gallery GIF `docs/media/vector-index.gif` (10s from the search scene)
- Verify: 14 beat stills reviewed and tiled at `docs/media/contact-sheets/vector-index.png`
- Interpretation calls: 2,000 points rather than "thousands" so the count on screen is honest and the field stays legible; HNSW chosen over IVF because layers stack naturally on a vertical canvas; hop and node counts are computed by the actual index at render time.
