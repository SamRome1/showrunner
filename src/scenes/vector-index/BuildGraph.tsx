import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { FieldDefs, GraphLayer, Headline, MonoLabel, SceneWrapper } from '../../components';
import { drift, slowSpring, timing } from '../../theme';
import { index } from './hnsw';
import { panelForLayer, TEXT_TOP } from './layout';

export const BUILD_GRAPH_DURATION = 300;
/** Layer 0 draws first (dense floor), then 1, then 2 — bottom-up like a real build. */
const BUILD_AT = [0, 70, 150];
const BUILD_LEN = 70;

/** Only a sample of layer-0 edges is drawn; 7,500 lines would read as a smear. */
export const sampleEdges = <T,>(edges: T[], every: number) => edges.filter((_, i) => i % every === 0);

export const layerLabel = (L: number, n: number) => `layer ${L} · ${n.toLocaleString('en-US')} nodes`;

/** Parallax: upper (sparser) layers drift a little more than the dense floor. */
export const layerOffset = (frame: number, L: number) => drift(frame, 100 + L * 13, 2 + L * 2, 260 + L * 40);

export const BuildGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const { pts, layers } = index();

  return (
    <SceneWrapper exit={false} align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
        <MonoLabel pill accent dot delay={0}>
          hnsw
        </MonoLabel>
        <Headline delay={timing.stagger} maxWidth={864} gradient>
          Sparse on top. Dense below.
        </Headline>
      </div>
      <AbsoluteFill>
        <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
          <FieldDefs />
          {[0, 1, 2].map((L) => {
            const build = slowSpring(frame, fps, BUILD_AT[L], BUILD_LEN);
            return (
              <GraphLayer
                key={L}
                points={pts}
                nodes={layers[L].nodes}
                edges={L === 0 ? sampleEdges(layers[L].edges, 6) : layers[L].edges}
                box={panelForLayer(L)}
                build={build}
                active={Math.min(1, build * 1.2)}
                offset={layerOffset(frame, L)}
                label={layerLabel(L, layers[L].nodes.length)}
                nodeRadius={L === 0 ? 1.9 : L === 1 ? 3.6 : 5.2}
                edgeOpacity={L === 0 ? 0.5 : 1}
              />
            );
          })}
        </svg>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
