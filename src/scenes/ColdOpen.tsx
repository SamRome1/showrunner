import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArchDiagram, SceneWrapper } from '../components';
import { breathe, enter, palette } from '../theme';

export const COLD_OPEN_DURATION = 135;
const CUT = 90;

/** Beat A: OpenAI mark alone. Beat B (f90): hard cut to the empty diagram. */
export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = enter(frame, fps, 0);
  const bloom = breathe(frame, 70, 0.6, 1);

  return (
    <SceneWrapper exit={false} justify="center" halo={frame < CUT}>
      {frame < CUT ? (
        <div style={{ position: 'relative', width: 520, height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: e.opacity, transform: `translateY(${e.translateY}px) scale(${e.scale})` }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 40 + i * 60,
                borderRadius: '50%',
                border: `1px solid rgba(95,168,255,${0.35 - i * 0.09})`,
                borderTopColor: `rgba(245,158,11,${0.6 - i * 0.15})`,
                transform: `rotate(${frame * (1.2 - i * 0.35) * (i % 2 ? -1 : 1)}deg)`,
                boxShadow: `0 0 ${18 * bloom}px rgba(95,168,255,0.15)`,
              }}
            />
          ))}
          <Img
            src={staticFile('assets/openai.svg')}
            style={{ width: 240, height: 240, objectFit: 'contain', filter: `drop-shadow(0 0 ${28 * bloom}px ${palette.sky}aa) drop-shadow(0 0 4px #fff)` }}
          />
        </div>
      ) : (
        <AbsoluteFill>
          <ArchDiagram />
        </AbsoluteFill>
      )}
    </SceneWrapper>
  );
};
