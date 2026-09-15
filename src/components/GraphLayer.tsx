import React from 'react';
import { useCurrentFrame } from 'remotion';
import { breathe, fonts, hash, palette } from '../theme';
import { place, type Box, type Pt } from './pointMath';
import { QueryMarker } from './PointField';

/**
 * GraphLayer — one layer of a hierarchical graph index (HNSW-style) in a glass
 * panel: glowing nodes, faint edges, an optional query marker, and a search
 * path that lights up in amber with travelling pulses and an afterglow.
 * Render inside an <svg> that includes <FieldDefs />.
 */
type Props = {
  points: Pt[];
  nodes: number[];
  edges: [number, number][];
  box: Box;
  build?: number;
  query?: Pt;
  path?: number[];
  pathProgress?: number;
  label?: string;
  nodeRadius?: number;
  edgeOpacity?: number;
  frame?: boolean;
  dim?: number;
  /** Parallax offset applied to the whole layer. */
  offset?: { x: number; y: number };
  /** Glass activity 0..1 (border brightness). */
  active?: number;
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
  offset = { x: 0, y: 0 },
  active = 0,
}) => {
  const f = useCurrentFrame();
  const nodeP = Math.min(1, build * 1.6);
  const edgeP = Math.max(0, (build - 0.35) / 0.65);
  const q = query ? place(query, box) : null;
  const hops = Math.max(0, Math.min(path.length - 1, pathProgress));
  const br = breathe(f, 90, 0.5, 1, box.y);
  const sweepT = (((f + box.y) / 170) % 1 + 1) % 1;
  const sweepX = box.x - box.w * 0.4 + sweepT * box.w * 1.8;
  const borderA = 0.18 + 0.22 * active * br;
  const sweepId = `vi-sweep-${Math.round(box.y)}`;
  const clipId = `vi-clip-${Math.round(box.y)}`;

  return (
    <g opacity={dim} transform={`translate(${offset.x} ${offset.y})`}>
      {frame ? (
        <>
          <defs>
            <linearGradient id={sweepId} x1="0" x2="1">
              <stop offset="0" stopColor={palette.white} stopOpacity="0" />
              <stop offset="0.5" stopColor={palette.white} stopOpacity="0.07" />
              <stop offset="1" stopColor={palette.white} stopOpacity="0" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16} />
            </clipPath>
          </defs>
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16} fill="rgba(20,34,60,0.5)" stroke={`rgba(160,190,255,${borderA})`} strokeWidth={1} />
          <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={16} fill="none" stroke={palette.sky} strokeWidth={1} opacity={0.25 * active * br} filter="url(#vi-glow-soft)" />
          <g clipPath={`url(#${clipId})`}>
            <rect x={sweepX} y={box.y - 40} width={box.w * 0.35} height={box.h + 80} fill={`url(#${sweepId})`} transform={`skewX(-14)`} />
            <rect x={box.x} y={box.y} width={box.w} height={1} fill="rgba(255,255,255,0.08)" />
          </g>
        </>
      ) : null}
      {label ? (
        <text x={box.x + 22} y={box.y - 16} fontFamily={fonts.mono} fontSize={19} letterSpacing={2} fill={palette.sky} opacity={0.85}>
          {label.toUpperCase()}
        </text>
      ) : null}
      {edges.map(([a, b], i) => {
        const o = Math.max(0, Math.min(1, (edgeP * (edges.length + 40) - i) / 40));
        if (o <= 0) return null;
        const pa = place(points[a], box);
        const pb = place(points[b], box);
        return <line key={`e${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke={palette.sky} strokeWidth={1} opacity={o * edgeOpacity * 0.4} />;
      })}
      {nodes.map((n, i) => {
        const o = Math.max(0, Math.min(1, (nodeP * (nodes.length + 30) - i) / 30));
        if (o <= 0) return null;
        const p = place(points[n], box);
        const h = hash(n);
        const tw = breathe(f, 45 + h * 60, 0.45, 1, h * 6.28);
        return <circle key={`n${n}`} cx={p.x} cy={p.y} r={nodeRadius} fill={h > 0.85 ? palette.white : palette.sky} opacity={o * tw} />;
      })}
      {/* search path: afterglow + amber line + travelling pulses */}
      {path.length > 1 ? (
        <>
          <g filter="url(#vi-glow-soft)" opacity={0.55}>
            {path.slice(1, Math.ceil(hops) + 1).map((n, i) => {
              const a = place(points[path[i]], box);
              const b = place(points[n], box);
              const t = Math.max(0, Math.min(1, hops - i));
              return <line key={`g${i}`} x1={a.x} y1={a.y} x2={a.x + (b.x - a.x) * t} y2={a.y + (b.y - a.y) * t} stroke={palette.amber} strokeWidth={6} strokeLinecap="round" />;
            })}
          </g>
          {path.slice(1, Math.ceil(hops) + 1).map((n, i) => {
            const a = place(points[path[i]], box);
            const b = place(points[n], box);
            const t = Math.max(0, Math.min(1, hops - i));
            const x2 = a.x + (b.x - a.x) * t;
            const y2 = a.y + (b.y - a.y) * t;
            const pt = ((f / 36 + i * 0.37) % 1 + 1) % 1;
            const px = a.x + (x2 - a.x) * pt;
            const py = a.y + (y2 - a.y) * pt;
            return (
              <g key={`p${i}`}>
                <line x1={a.x} y1={a.y} x2={x2} y2={y2} stroke={palette.amber} strokeWidth={2.2} strokeLinecap="round" />
                {t >= 1 ? (
                  <>
                    <circle cx={px} cy={py} r={6} fill={palette.amber} opacity={0.35} />
                    <circle cx={px} cy={py} r={2.4} fill={palette.white} />
                  </>
                ) : null}
              </g>
            );
          })}
          {path.slice(0, Math.floor(hops) + 1).map((n, i) => {
            const p = place(points[n], box);
            const isHead = i === Math.floor(hops);
            return (
              <g key={`v${n}`}>
                <circle cx={p.x} cy={p.y} r={nodeRadius * 3.2} fill="url(#vi-amber)" opacity={isHead ? 0.8 * br : 0.45} />
                <circle cx={p.x} cy={p.y} r={nodeRadius + 1.6} fill={palette.amberSoft} filter="url(#vi-glow)" />
              </g>
            );
          })}
        </>
      ) : null}
      {q ? <QueryMarker x={q.x} y={q.y} scale={0.75} /> : null}
    </g>
  );
};
