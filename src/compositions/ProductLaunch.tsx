import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { colors } from '../theme';
import * as S from '../scenes/product-launch';

export const PRODUCT_LAUNCH_SIZE = { width: 1920, height: 1080 } as const;

/** Launch video for the fictional product "Lumen" — the make-it-yours example. */
export const PRODUCT_LAUNCH_SCENES = [
  { id: 'Wordmark', component: S.WordmarkScene, duration: S.WORDMARK_DURATION }, // 0–150
  { id: 'TheLag', component: S.TheLag, duration: S.THE_LAG_DURATION }, // 150–390
  { id: 'ThePromise', component: S.ThePromise, duration: S.THE_PROMISE_DURATION }, // 390–630
  { id: 'OneLine', component: S.OneLine, duration: S.ONE_LINE_DURATION }, // 630–870
  { id: 'WorksWith', component: S.WorksWith, duration: S.WORKS_WITH_DURATION }, // 870–1050
  { id: 'Scale', component: S.Scale, duration: S.SCALE_DURATION }, // 1050–1230
  { id: 'Closer', component: S.Closer, duration: S.CLOSER_DURATION }, // 1230–1350
] as const;

export const PRODUCT_LAUNCH_DURATION = PRODUCT_LAUNCH_SCENES.reduce((n, s) => n + s.duration, 0);

export const ProductLaunch: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <Series>
      {PRODUCT_LAUNCH_SCENES.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.duration} name={s.id}>
          <s.component />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
