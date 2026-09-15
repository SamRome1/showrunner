import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { colors } from '../theme';
import * as S from '../scenes/vector-index';

/** What a vector index does — 1080×1920, no brand assets. Brief: docs/briefs/vector-index.md */
export const VECTOR_INDEX_SCENES = [
  { id: 'TheQuestion', component: S.TheQuestion, duration: S.THE_QUESTION_DURATION }, // 0–150
  { id: 'BruteForce', component: S.BruteForce, duration: S.BRUTE_FORCE_DURATION }, // 150–450
  { id: 'TheIdea', component: S.TheIdea, duration: S.THE_IDEA_DURATION }, // 450–630
  { id: 'BuildGraph', component: S.BuildGraph, duration: S.BUILD_GRAPH_DURATION }, // 630–930
  { id: 'Search', component: S.Search, duration: S.SEARCH_DURATION }, // 930–1230
  { id: 'TradeOff', component: S.TradeOff, duration: S.TRADE_OFF_DURATION }, // 1230–1410
  { id: 'Closer', component: S.Closer, duration: S.VI_CLOSER_DURATION }, // 1410–1500
] as const;

export const VECTOR_INDEX_DURATION = VECTOR_INDEX_SCENES.reduce((n, s) => n + s.duration, 0);
export const VECTOR_INDEX_SIZE = { width: 1080, height: 1920 } as const;

export const VectorIndex: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <Series>
      {VECTOR_INDEX_SCENES.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.duration} name={s.id}>
          <s.component />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
