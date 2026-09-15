import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArchDiagram, ARCH_NODES, SceneWrapper } from '../components';
import { afterScene4 } from './diagramState';
import { breathe, CANVAS, enter, itp, palette, slowSpring } from '../theme';

export const COLLAPSE_DURATION = 210;
const COLLAPSE_AT = 30;
const COLLAPSE_LEN = 60;
const ELEPHANT_AT = 90;
export const ELEPHANT_HERO = 260;

/** The diagram is swallowed into the db slot, which drifts to canvas center; the elephant appears there. */
export const CollapseToElephant: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = slowSpring(frame, fps, COLLAPSE_AT, COLLAPSE_LEN);
  const shift = (CANVAS.height / 2 - ARCH_NODES.db.y) * c; // db slot → center
  const el = enter(frame, fps, ELEPHANT_AT);
  const bloom = breathe(frame, 80, 0.6, 1);

  return (
    <SceneWrapper exit={false} justify="center">
      {c < 0.999 ? (
        <AbsoluteFill style={{ transform: `translateY(${shift}px)` }}>
          <ArchDiagram slots={afterScene4} collapse={c} />
        </AbsoluteFill>
      ) : null}
      {frame >= ELEPHANT_AT ? (
        <div style={{ position: 'relative', width: 640, height: 640, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {[0, 1, 2].map((i) => {
            const t = itp(frame, ELEPHANT_AT + i * 14, ELEPHANT_AT + 70 + i * 14);
            return (
              <div key={i} style={{ position: 'absolute', width: 260 + t * 420, height: 260 + t * 420, borderRadius: '50%', border: `1px solid ${palette.sky}`, opacity: (1 - t) * 0.6, boxShadow: `0 0 30px ${palette.sky}55` }} />
            );
          })}
          <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, ${palette.deep}88 0%, transparent 70%)`, filter: 'blur(30px)', opacity: el.opacity * bloom }} />
          <Img
            src={staticFile('assets/postgresql.svg')}
            style={{
              width: ELEPHANT_HERO + 40,
              height: ELEPHANT_HERO + 40,
              objectFit: 'contain',
              opacity: el.opacity,
              transform: `translateY(${el.translateY}px) scale(${el.scale})`,
              filter: `drop-shadow(0 0 ${30 * bloom}px ${palette.sky}aa)`,
            }}
          />
        </div>
      ) : null}
    </SceneWrapper>
  );
};
