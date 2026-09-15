import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { GraphLayer, Headline, MonoLabel, SceneWrapper } from '../../components';
import { colors, enter, fonts, itp } from '../../theme';
import { greedySearch, hopCount, index, QUERY } from './hnsw';
import { panelForLayer, TEXT_TOP } from './layout';
import { layerLabel, sampleEdges } from './BuildGraph';
import { place } from '../../components/pointMath';

export const SEARCH_DURATION = 300;
const START = 30;
const HOP_FRAMES = 18;
const DROP_FRAMES = 12;
const SWAP_AT = 224;

/**
 * Timeline of the greedy search: hops within a layer, then a descent.
 * Returns per-layer path arrays plus frame offsets for each event.
 */
const buildTimeline = () => {
  const path = greedySearch(QUERY);
  const perLayer: Record<number, number[]> = { 0: [], 1: [], 2: [] };
  for (const h of path) perLayer[h.layer].push(h.node);
  // event list: {layer, hopsStartFrame, dropStartFrame}
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

  return (
    <SceneWrapper align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <MonoLabel pill accent animate={false}>
          search
        </MonoLabel>
        <div style={{ position: 'relative', height: 150, width: 864 }}>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h1Out }}>
            <Headline animate={false} maxWidth={864}>
              Start sparse. Descend. Refine.
            </Headline>
          </div>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h2.opacity, transform: `translateY(${h2.translateY}px)` }}>
            <Headline animate={false} maxWidth={864}>
              {totalHops} hops. Not 2,000.
            </Headline>
          </div>
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.zinc400, letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>
          {Math.floor(hopsSoFar)} hops
        </div>
      </div>
      <AbsoluteFill>
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          {[0, 1, 2].map((L) => {
            const e = events.find((x) => x.L === L)!;
            const progress = Math.max(0, (frame - e.hopsStart) / HOP_FRAMES);
            return (
              <GraphLayer
                key={L}
                points={pts}
                nodes={layers[L].nodes}
                edges={L === 0 ? sampleEdges(layers[L].edges, 6) : layers[L].edges}
                box={panelForLayer(L)}
                label={layerLabel(L, layers[L].nodes.length)}
                nodeRadius={L === 0 ? 1.8 : L === 1 ? 3.5 : 5}
                edgeOpacity={L === 0 ? 0.35 : 0.9}
                query={qIn > 0.5 ? QUERY : undefined}
                path={frame >= e.hopsStart - 1 ? perLayer[L] : []}
                pathProgress={frame >= e.hopsStart ? progress : 0}
              />
            );
          })}
          {/* descents: dashed vertical drop from the last node of a layer to the same node one layer down */}
          {events
            .filter((e) => e.L > 0)
            .map((e) => {
              const node = perLayer[e.L][perLayer[e.L].length - 1];
              const a = place(pts[node], panelForLayer(e.L));
              const b = place(pts[node], panelForLayer(e.L - 1));
              const t = itp(frame, e.dropStart, e.dropStart + DROP_FRAMES);
              if (t <= 0) return null;
              return (
                <line
                  key={`d${e.L}`}
                  x1={a.x}
                  y1={a.y}
                  x2={a.x + (b.x - a.x) * t}
                  y2={a.y + (b.y - a.y) * t}
                  stroke={colors.accent}
                  strokeWidth={1.5}
                  strokeDasharray="4 6"
                />
              );
            })}
          {/* found */}
          {frame >= end ? (
            <circle
              cx={place(pts[finalNode], panelForLayer(0)).x}
              cy={place(pts[finalNode], panelForLayer(0)).y}
              r={12 + (1 - done.progress) * 10}
              fill="none"
              stroke={colors.accent}
              strokeWidth={1.5}
              opacity={done.opacity}
            />
          ) : null}
        </svg>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
