import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { FieldDefs, GraphLayer, Headline, MonoLabel, SceneWrapper } from '../../components';
import { breathe, enter, fonts, itp, palette, textGlow } from '../../theme';
import { greedySearch, hopCount, index, QUERY } from './hnsw';
import { panelForLayer, TEXT_TOP } from './layout';
import { layerLabel, layerOffset, sampleEdges } from './BuildGraph';
import { place } from '../../components/pointMath';

export const SEARCH_DURATION = 300;
const START = 30;
const HOP_FRAMES = 18;
const DROP_FRAMES = 12;
const SWAP_AT = 224;

const buildTimeline = () => {
  const path = greedySearch(QUERY);
  const perLayer: Record<number, number[]> = { 0: [], 1: [], 2: [] };
  for (const h of path) perLayer[h.layer].push(h.node);
  let t = START;
  const events = [2, 1, 0].map((L) => {
    const hops = perLayer[L].length - 1;
    const hopsStart = t;
    t += hops * HOP_FRAMES;
    const dropStart = t;
    if (L > 0) t += DROP_FRAMES;
    return { L, hops, hopsStart, dropStart };
  });
  return { path, perLayer, events, end: t, totalHops: hopCount(path) };
};

export const Search: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const { pts, layers } = index();
  const { perLayer, events, end, totalHops } = buildTimeline();

  const qIn = enter(frame, fps, 0).opacity;
  const hopsSoFar = events.reduce((n, e) => n + Math.max(0, Math.min(e.hops, (frame - e.hopsStart) / HOP_FRAMES)), 0);
  const h1Out = itp(frame, SWAP_AT - 8, SWAP_AT, 1, 0);
  const h2 = enter(frame, fps, SWAP_AT + 4);
  const done = enter(frame, fps, end + 4);
  const finalNode = perLayer[0][perLayer[0].length - 1];
  const br = breathe(frame, 40, 0.6, 1);
  const activeLayer = events.find((e) => frame >= e.hopsStart && frame < (e.L > 0 ? e.dropStart + DROP_FRAMES : Infinity))?.L;
  const fp = place(pts[finalNode], panelForLayer(0));
  const pulseT = (frame % 50) / 50;

  return (
    <SceneWrapper align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
        <MonoLabel pill accent dot animate={false}>
          search
        </MonoLabel>
        <div style={{ position: 'relative', height: 160, width: 864 }}>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h1Out }}>
            <Headline animate={false} maxWidth={864} gradient>
              Start sparse. Descend. Refine.
            </Headline>
          </div>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h2.opacity, transform: `translateY(${h2.translateY}px)` }}>
            <Headline animate={false} maxWidth={864} gradient>
              {`${totalHops} hops. Not 2,000.`}
            </Headline>
          </div>
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 34, color: palette.amber, letterSpacing: 1, fontVariantNumeric: 'tabular-nums', filter: textGlow(palette.amber, frame < end ? br : 0.6) }}>
          {Math.floor(hopsSoFar)} hops
        </div>
      </div>
      <AbsoluteFill>
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          <FieldDefs />
          {[0, 1, 2].map((L) => {
            const e = events.find((x) => x.L === L)!;
            const progress = Math.max(0, (frame - e.hopsStart) / HOP_FRAMES);
            const isActive = activeLayer === L || (frame >= end && L === 0);
            return (
              <GraphLayer
                key={L}
                points={pts}
                nodes={layers[L].nodes}
                edges={L === 0 ? sampleEdges(layers[L].edges, 6) : layers[L].edges}
                box={panelForLayer(L)}
                offset={layerOffset(frame, L)}
                active={isActive ? 1 : 0.25}
                label={layerLabel(L, layers[L].nodes.length)}
                nodeRadius={L === 0 ? 1.9 : L === 1 ? 3.6 : 5.2}
                edgeOpacity={L === 0 ? 0.5 : 1}
                query={qIn > 0.5 ? QUERY : undefined}
                path={frame >= e.hopsStart - 1 ? perLayer[L] : []}
                pathProgress={frame >= e.hopsStart ? progress : 0}
              />
            );
          })}
          {/* descents: glowing dashed drop from the last node of a layer to the same node one layer down */}
          {events
            .filter((e) => e.L > 0)
            .map((e) => {
              const node = perLayer[e.L][perLayer[e.L].length - 1];
              const a = place(pts[node], panelForLayer(e.L));
              const b = place(pts[node], panelForLayer(e.L - 1));
              const oa = layerOffset(frame, e.L);
              const ob = layerOffset(frame, e.L - 1);
              const t = itp(frame, e.dropStart, e.dropStart + DROP_FRAMES);
              if (t <= 0) return null;
              const x2 = a.x + oa.x + (b.x + ob.x - a.x - oa.x) * t;
              const y2 = a.y + oa.y + (b.y + ob.y - a.y - oa.y) * t;
              return (
                <g key={`d${e.L}`}>
                  <line x1={a.x + oa.x} y1={a.y + oa.y} x2={x2} y2={y2} stroke={palette.amber} strokeWidth={5} opacity={0.3} filter="url(#vi-glow-soft)" />
                  <line x1={a.x + oa.x} y1={a.y + oa.y} x2={x2} y2={y2} stroke={palette.amber} strokeWidth={1.8} strokeDasharray="4 6" strokeDashoffset={-frame * 0.8} />
                </g>
              );
            })}
          {/* found: bloom + repeating pulse ring */}
          {frame >= end ? (
            <g opacity={done.opacity} transform={`translate(${layerOffset(frame, 0).x} ${layerOffset(frame, 0).y})`}>
              <circle cx={fp.x} cy={fp.y} r={40} fill="url(#vi-amber)" opacity={0.6 * br} />
              <circle cx={fp.x} cy={fp.y} r={12 + pulseT * 34} fill="none" stroke={palette.amber} strokeWidth={1.5} opacity={(1 - pulseT) * 0.9} />
              <circle cx={fp.x} cy={fp.y} r={14 + (1 - done.progress) * 12} fill="none" stroke={palette.amberSoft} strokeWidth={2} filter="url(#vi-glow)" />
            </g>
          ) : null}
        </svg>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
