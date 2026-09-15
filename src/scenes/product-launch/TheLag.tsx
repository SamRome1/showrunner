import React from 'react';
import { AbsoluteFill } from 'remotion';
import { Headline, MonoLabel, SceneWrapper, SearchMock } from '../../components';
import { QUERY, RESULTS } from './results';

export const THE_LAG_DURATION = 240;

/** Results arrive 1,400 ms after the last keystroke. */
export const TheLag: React.FC = () => (
  <SceneWrapper raw>
    <AbsoluteFill style={{ padding: 86, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 80 }}>
      <div style={{ width: 700, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28 }}>
        <MonoLabel delay={0} pill dot>
          the problem
        </MonoLabel>
        <Headline delay={6} variant="hero" glow={0.6}>
          Your search is late.
        </Headline>
        <Headline delay={40} variant="body" kinetic={false} color="#B8C4D6">
          Every keystroke waits on a round trip. Users stop typing before results show up.
        </Headline>
      </div>
      <SearchMock query={QUERY} results={RESULTS} mode="lagging" typeAt={30} framesPerChar={4} latencyFrames={42} readoutMs={1400} delay={8} />
    </AbsoluteFill>
  </SceneWrapper>
);
