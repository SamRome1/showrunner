import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { colors } from '../theme';
import * as S from '../scenes/bundle-sizes';

/** What does a hello world cost? — 1920×1080, 1620 frames. Brief: docs/briefs/bundle-sizes.md */
export const BUNDLE_SIZES_SCENES = [
  { id: 'HelloWorld', component: S.HelloWorld, duration: S.HELLO_WORLD_DURATION }, // 0–150
  { id: 'Method', component: S.Method, duration: S.METHOD_DURATION }, // 150–330
  { id: 'Bars', component: S.Bars, duration: S.BARS_DURATION }, // 330–930
  { id: 'Scale', component: S.Scale, duration: S.SCALE_DURATION }, // 930–1170
  { id: 'Caveat', component: S.Caveat, duration: S.CAVEAT_DURATION }, // 1170–1380
  { id: 'Source', component: S.Source, duration: S.SOURCE_DURATION }, // 1380–1620
] as const;

export const BUNDLE_SIZES_DURATION = BUNDLE_SIZES_SCENES.reduce((n, s) => n + s.duration, 0);

export const BundleSizes: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <Series>
      {BUNDLE_SIZES_SCENES.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.duration} name={s.id}>
          <s.component />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
