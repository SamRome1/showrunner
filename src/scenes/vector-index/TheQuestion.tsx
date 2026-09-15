import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, MonoLabel, PointField, SceneWrapper } from '../../components';
import { slowSpring, timing } from '../../theme';
import { COUNT, QUERY, SEED, index } from './hnsw';
import { FIELD, TEXT_TOP } from './layout';
import { makePoints } from '../../components/pointMath';

export const THE_QUESTION_DURATION = 150;
const QUERY_AT = 44;

/** A query point appears; 2,000 candidates fill in around it. */
export const TheQuestion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const pts = makePoints(SEED, COUNT);
  index();
  const reveal = slowSpring(frame, fps, 10, 60);
  const qIn = slowSpring(frame, fps, QUERY_AT, 20);

  return (
    <SceneWrapper exit={false} align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
        <MonoLabel pill accent dot delay={0}>
          query
        </MonoLabel>
        <Headline delay={timing.stagger} maxWidth={864} gradient>
          Which point is closest?
        </Headline>
      </div>
      <AbsoluteFill>
        <PointField points={pts} box={FIELD} reveal={reveal} width={width} height={height} query={qIn > 0.05 ? QUERY : undefined} />
      </AbsoluteFill>
    </SceneWrapper>
  );
};
