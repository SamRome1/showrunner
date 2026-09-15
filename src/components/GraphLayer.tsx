import React from 'react';
import { colors, fonts } from '../theme';
import { place, type Box, type Pt } from './pointMath';

/**
 * GraphLayer — one layer of a hierarchical graph index (HNSW-style): a subset
 * of nodes, their edges, an optional query marker, and a search path that
 * reveals hop by hop.
 */
type Props = {
  points: Pt[];
  nodes: number[];
  edges: [number, number][];
  box: Box;
  /** 0→1 draw-in of nodes then edges. */
  build?: number;
  query?: Pt;
  /** Node indices in visit order for this layer. */
  path?: number[];
  /** How many hops of `path` are drawn (fractional = partial last segment). */
  pathProgress?: number;
  /** Frame label rendered top-left of the box, e.g. "layer 2 · 21 nodes". */
  label?: string;
  nodeRadius?: number;
  edgeOpacity?: number;
  /** Render the panel border. */
  frame?: boolean;
  dim?: number;
};

export const GraphLayer: React.FC<Props> = ({
  points,
  nodes,
  edges,
  box,
  build = 1,
  query,
  path = [],
  pathProgress = 0,
  label,
  nodeRadius = 4,
  edgeOpacity = 0.9,
  frame = true,
  dim = 1,
}) => {
  const nodeP = Math.min(1, build * 1.6);
  const edgeP = Math.max(0, (build - 0.35) / 0.65);
  const q = query ? place(query, box) : null;
  const hops = Math.max(0, Math.min(path.length - 1, pathProgress));

  return (
    <g opacity={dim}>
      {frame ? (
        <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={12} fill="none" stroke={colors.zinc800} strokeWidth={1} />
      ) : null}
      {label ? (
        <text x={box.x + 20} y={box.y - 14} fontFamily={fonts.mono} fontSize={18} letterSpacing={1.5} fill={colors.zinc400}>
          {label.toUpperCase()}
        </text>
      ) : null}
      {edges.map(([a, b], i) => {
        const o = Math.max(0, Math.min(1, (edgeP * (edges.length + 40) - i) / 40));
        if (o <= 0) return null;
        const pa = place(points[a], box);
        const pb = place(points[b], box);
        return <line key={`e${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={colors.zinc700} strokeWidth={1} opacity={o * edgeOpacity} />;
      })}
      {nodes.map((n, i) => {
        const o = Math.max(0, Math.min(1, (nodeP * (nodes.length + 30) - i) / 30));
        if (o <= 0) return null;
        const p = place(points[n], box);
        return <circle key={`n${n}`} cx={p.x} cy={p.y} r={nodeRadius} fill={colors.zinc400} opacity={o} />;
      })}
      {/* search path */}
      {path.slice(0, Math.ceil(hops) + 1).map((n, i) => {
        if (i === 0) return null;
        const a = place(points[path[i - 1]], box);
        const b = place(points[n], box);
        const t = Math.max(0, Math.min(1, hops - (i - 1)));
        const x2 = a.x + (b.x - a.x) * t;
        const y2 = a.y + (b.y - a.y) * t;
        return <line key={`p${i}`} x1={a.x} y1={a.y} x2={x2} y2={y2} stroke={colors.accent} strokeWidth={2} strokeLinecap="round" />;
      })}
      {path.slice(0, Math.floor(hops) + 1).map((n) => {
        const p = place(points[n], box);
        return <circle key={`v${n}`} cx={p.x} cy={p.y} r={nodeRadius + 1.5} fill={colors.accent} />;
      })}
      {q ? <circle cx={q.x} cy={q.y} r={11} fill="none" stroke={colors.accent} strokeWidth={1.5} strokeDasharray="3 3" /> : null}
    </g>
  );
};
