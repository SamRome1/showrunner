import { dist2, makePoints, type Pt } from '../../components/pointMath';

/**
 * A small, honest HNSW-style index over the shared point field:
 *  - layer 0: every point, k-NN edges
 *  - layer 1: every 16th point
 *  - layer 2: every 96th point (subset of layer 1)
 * Search is greedy: start at the top layer's entry node, walk to the neighbor
 * closest to the query until no neighbor improves, descend, repeat.
 * Everything is computed once per module load — deterministic for rendering.
 */
export const SEED = 20260914;
export const COUNT = 2000;
export const QUERY: Pt = { x: 0.8, y: 0.85 };
/** k-NN degree per layer (0,1,2). */
export const K: [number, number, number] = [4, 3, 2];

export type Layer = { nodes: number[]; edges: [number, number][]; adj: Map<number, number[]> };
export type Hop = { layer: number; node: number };

const knnEdges = (pts: Pt[], nodes: number[], k: number): [number, number][] => {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  for (const a of nodes) {
    const near = nodes
      .filter((b) => b !== a)
      .map((b) => ({ b, d: dist2(pts[a], pts[b]) }))
      .sort((u, v) => u.d - v.d)
      .slice(0, k);
    for (const { b } of near) {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([a, b]);
      }
    }
  }
  return edges;
};

const toAdj = (edges: [number, number][]) => {
  const adj = new Map<number, number[]>();
  for (const [a, b] of edges) {
    adj.set(a, [...(adj.get(a) ?? []), b]);
    adj.set(b, [...(adj.get(b) ?? []), a]);
  }
  return adj;
};

const build = () => {
  const pts = makePoints(SEED, COUNT);
  const l2n = pts.map((_, i) => i).filter((i) => i % 96 === 0);
  const l1n = pts.map((_, i) => i).filter((i) => i % 16 === 0);
  const l0n = pts.map((_, i) => i);
  const l2e = knnEdges(pts, l2n, K[2]);
  const l1e = [...knnEdges(pts, l1n, K[1]), ...l2e];
  const l0e = [...knnEdges(pts, l0n, K[0]), ...l1e];
  const layers: Layer[] = [
    { nodes: l0n, edges: l0e, adj: toAdj(l0e) },
    { nodes: l1n, edges: l1e, adj: toAdj(l1e) },
    { nodes: l2n, edges: l2e, adj: toAdj(l2e) },
  ];
  return { pts, layers };
};

let memo: ReturnType<typeof build> | null = null;
export const index = () => (memo ??= build());

export const greedySearch = (q: Pt): Hop[] => {
  const { pts, layers } = index();
  const path: Hop[] = [];
  let cur = layers[2].nodes[0]; // fixed entry point
  for (let L = 2; L >= 0; L--) {
    path.push({ layer: L, node: cur });
    for (;;) {
      let best = cur;
      let bd = dist2(pts[cur], q);
      for (const n of layers[L].adj.get(cur) ?? []) {
        const d = dist2(pts[n], q);
        if (d < bd) {
          bd = d;
          best = n;
        }
      }
      if (best === cur) break;
      cur = best;
      path.push({ layer: L, node: cur });
    }
  }
  return path;
};

/** Hops (edges walked) in the full search, excluding layer descents. */
export const hopCount = (path: Hop[]) => path.length - 3;
