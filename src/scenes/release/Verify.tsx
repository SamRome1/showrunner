import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { CheckGlyph, SceneWrapper, StatCounter } from '../../components';
import { colors, enter, radius, timing } from '../../theme';

export const VERIFY_DURATION = 180;
const CELL = 176;

/** Six hollow frames fill in with checks; the counter tracks them. */
export const Verify: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneWrapper justify="center">
      <div style={{ display: 'flex', alignItems: 'center', gap: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${CELL}px)`, gap: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const e = enter(frame, fps, i * timing.stagger);
            const g = enter(frame, fps, i * timing.stagger + 20).progress;
            return (
              <div
                key={i}
                style={{
                  width: CELL,
                  height: CELL,
                  border: `1px solid ${colors.zinc700}`,
                  borderRadius: radius.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: e.opacity,
                  transform: `translateY(${e.translateY}px) scale(${e.scale})`,
                }}
              >
                <CheckGlyph progress={g} size={40} />
              </div>
            );
          })}
        </div>
        <StatCounter value={6} suffix=" / 6" label="stills reviewed" delay={30} duration={45} fontSize={96} letterSpacing={-3} />
      </div>
    </SceneWrapper>
  );
};
