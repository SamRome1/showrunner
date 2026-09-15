/** Pure, theme-free geometry helpers shared by PointField, GraphLayer, and the HNSW module. */
export type Pt = { x: number; y: number };
export type Box = { x: number; y: number; w: number; h: number };

/** mulberry32 — small, fast, deterministic PRNG. */
export const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const cache = new Map<string, Pt[]>();

/** Points are mildly clustered (sum of two uniforms) so the field reads as data, not noise. */
export const makePoints = (seed: number, count: number): Pt[] => {
  const key = `${seed}:${count}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const rnd = mulberry32(seed);
  const centers = Array.from({ length: 7 }, () => ({ x: 0.15 + rnd() * 0.7, y: 0.15 + rnd() * 0.7, s: 0.06 + rnd() * 0.1 }));
  const pts: Pt[] = [];
  for (let i = 0; i < count; i++) {
    if (rnd() < 0.35) {
      pts.push({ x: 0.03 + rnd() * 0.94, y: 0.03 + rnd() * 0.94 });
    } else {
      const c = centers[Math.floor(rnd() * centers.length)];
      const gx = (rnd() + rnd() - 1) * c.s * 2;
      const gy = (rnd() + rnd() - 1) * c.s * 2;
      pts.push({ x: Math.min(0.97, Math.max(0.03, c.x + gx)), y: Math.min(0.97, Math.max(0.03, c.y + gy)) });
    }
  }
  cache.set(key, pts);
  return pts;
};

export const place = (p: Pt, box: Box) => ({ x: box.x + p.x * box.w, y: box.y + p.y * box.h });

export const dist2 = (a: Pt, b: Pt) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

export const nearestIndex = (pts: Pt[], q: Pt) => {
  let best = 0;
  let bd = Infinity;
  for (let i = 0; i < pts.length; i++) {
    const d = dist2(pts[i], q);
    if (d < bd) {
      bd = d;
      best = i;
    }
  }
  return best;
};

