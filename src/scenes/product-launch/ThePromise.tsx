import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Accent, Headline, MonoLabel, SceneWrapper, SearchMock } from '../../components';
import { QUERY, RESULTS } from './results';

export const THE_PROMISE_DURATION = 240;

/** Same query; results refresh on every keystroke at 12 ms. */
export const ThePromise: React.FC = () => (
  <SceneWrapper raw>
    <AbsoluteFill style={{ padding: 86, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 80 }}>
      <div style={{ width: 700, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28 }}>
        <MonoLabel delay={0} pill accent dot>
          with lumen
        </MonoLabel>
        <Headline delay={6} variant="hero" glow={0.7} kinetic={false}>
          Search that <Accent>keeps up.</Accent>
        </Headline>
        <Headline delay={40} variant="body" kinetic={false} color="#B8C4D6">
          Results refresh as they type. Every keystroke, every time.
        </Headline>
      </div>
      <SearchMock query={QUERY} results={RESULTS} mode="live" typeAt={30} framesPerChar={4} latencyFrames={1} readoutMs={12} delay={8} />
    </AbsoluteFill>
  </SceneWrapper>
);
