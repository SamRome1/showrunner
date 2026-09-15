import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { CheckGlyph, LightSweep, SceneWrapper, StatCounter } from '../../components';
import { breathe, drift, enter, glass, glow, palette, radius, timing } from '../../theme';

export const VERIFY_DURATION = 180;
const CELL = 180;

/** Six glass frames fill in with amber checks; the counter tracks them. */
export const Verify: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneWrapper justify="center" halo>
      <div style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, ${CELL}px)`, gap: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => {
            const at = i * timing.stagger * 4;
            const e = enter(frame, fps, at);
            const g = enter(frame, fps, at + 20).progress;
            const d = drift(frame, i * 11 + 3, 2.5, 160 + i * 15);
            const br = breathe(frame, 80, 0.4, 1, i * 0.9);
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  width: CELL,
                  height: CELL,
                  ...glass(g * 0.6 * br),
                  borderColor: g > 0.5 ? `rgba(245,158,11,${0.3 + 0.5 * br * g})` : undefined,
                  boxShadow: g > 0.5 ? `${glow(palette.amber, 0.6 * br * g, 30)}, inset 0 1px 0 rgba(255,255,255,0.07)` : undefined,
                  borderRadius: radius.md,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: e.opacity,
                  transform: `translate(${d.x}px, ${d.y + e.translateY}px) scale(${e.scale})`,
                }}
              >
                {/* placeholder "frame" strokes so the tiles read as stills */}
                <div style={{ position: 'absolute', left: 18, right: 18, top: 22, height: 6, borderRadius: 3, backgroundColor: `rgba(95,168,255,${0.18 + 0.2 * br})` }} />
                <div style={{ position: 'absolute', left: 18, width: '40%', top: 38, height: 6, borderRadius: 3, backgroundColor: `rgba(95,168,255,${0.12 + 0.15 * br})` }} />
                <CheckGlyph progress={g} size={56} color={palette.amber} />
                <LightSweep period={140 + i * 19} phase={i * 29} opacity={0.09} />
              </div>
            );
          })}
        </div>
        <StatCounter value={6} suffix=" / 6" label="stills reviewed" delay={30} duration={45} fontSize={96} letterSpacing={-4} accent style={{ flexShrink: 0, whiteSpace: 'nowrap' }} />
      </div>
    </SceneWrapper>
  );
};
