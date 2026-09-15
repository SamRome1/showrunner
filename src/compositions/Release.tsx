import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { colors } from '../theme';
import * as S from '../scenes/release';

/** showrunner v0.1 launch video — see docs/briefs/release.md. */
export const RELEASE_SCENES = [
  { id: 'TheAsk', component: S.TheAsk, duration: S.THE_ASK_DURATION }, // 0–180
  { id: 'Wordmark', component: S.Wordmark, duration: S.WORDMARK_DURATION }, // 180–330
  { id: 'TheGate', component: S.TheGate, duration: S.THE_GATE_DURATION }, // 330–690
  { id: 'AssetRule', component: S.AssetRule, duration: S.ASSET_RULE_DURATION }, // 690–990
  { id: 'Grammar', component: S.Grammar, duration: S.GRAMMAR_DURATION }, // 990–1230
  { id: 'Verify', component: S.Verify, duration: S.VERIFY_DURATION }, // 1230–1410
  { id: 'Closer', component: S.Closer, duration: S.CLOSER_DURATION }, // 1410–1500
] as const;

export const RELEASE_DURATION = RELEASE_SCENES.reduce((n, s) => n + s.duration, 0);

export const Release: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.bg }}>
    <Series>
      {RELEASE_SCENES.map((s) => (
        <Series.Sequence key={s.id} durationInFrames={s.duration} name={s.id}>
          <s.component />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
