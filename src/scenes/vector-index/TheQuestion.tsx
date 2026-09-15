import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, MonoLabel, PointField, SceneWrapper } from '../../components';
import { colors, slowSpring, timing } from '../../theme';
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
  index(); // warm the index once so later scenes don't pay for it mid-render
  const reveal = slowSpring(frame, fps, 10, 60);
  const qIn = slowSpring(frame, fps, QUERY_AT, 20);
  const qx = FIELD.x + QUERY.x * FIELD.w;
  const qy = FIELD.y + QUERY.y * FIELD.h;

  return (
    <SceneWrapper exit={false} align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <MonoLabel pill accent delay={0}>
          query
        </MonoLabel>
        <Headline delay={timing.stagger} maxWidth={864}>
          Which point is closest?
        </Headline>
      </div>
      <AbsoluteFill>
        <PointField points={pts} box={FIELD} reveal={reveal} width={width} height={height}>
          <circle cx={qx} cy={qy} r={7} fill={colors.accent} opacity={qIn} />
          <circle cx={qx} cy={qy} r={16} fill="none" stroke={colors.accent} strokeWidth={1.5} opacity={qIn} />
        </PointField>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
