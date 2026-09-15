import type { Box } from '../../components/pointMath';

/** Shared geometry for the VectorIndex example (1080×1920). */
export const W = 1080;
export const H = 1920;

/** Full point field used by scenes 1–2. */
export const FIELD: Box = { x: 108, y: 520, w: 864, h: 1250 };

/** Three stacked layer panels used by scenes 4–5 (top = sparsest). */
const PANEL_H = 380;
const PANEL_GAP = 56;
const PANEL_TOP = 520;
export const PANELS: Box[] = [2, 1, 0].map((_, i) => ({
  x: 108,
  y: PANEL_TOP + i * (PANEL_H + PANEL_GAP),
  w: 864,
  h: PANEL_H,
}));
/** PANELS is ordered top→bottom, i.e. layer 2, layer 1, layer 0. */
export const panelForLayer = (layer: number) => PANELS[2 - layer];

/** Top text block offset inside the safe zone. */
export const TEXT_TOP = 76;
