import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SceneWrapper, StatCounter } from '../../components';
import { itp, palette } from '../../theme';

export const SCALE_DURATION = 180;

/** Fictional throughput number — see the brief. */
export const Scale: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneWrapper justify="center" halo>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => {
          const t = itp(frame, 40 + i * 20, 130 + i * 20);
          return (
            <div key={i} style={{ position: 'absolute', width: 500 + t * 900, height: 500 + t * 900, borderRadius: '50%', border: `1px solid ${palette.amber}`, opacity: (1 - t) * 0.5, boxShadow: `0 0 30px ${palette.amber}55` }} />
          );
        })}
        <StatCounter value={10_000_000} delay={0} duration={60} accent fontSize={220} align="center" label="queries a day · p99 under 20 ms" />
      </div>
    </SceneWrapper>
  );
};
