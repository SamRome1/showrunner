import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ArchDiagram, ARCH_NODES, SceneWrapper } from '../components';
import { afterScene4 } from './diagramState';
import { breathe, CANVAS, enter, itp, palette, slowSpring } from '../theme';

export const COLLAPSE_DURATION = 210;
const COLLAPSE_AT = 30;
const COLLAPSE_LEN = 60;
const ELEPHANT_AT = 82;
const GATHER_AT = 48;
export const ELEPHANT_HERO = 260;

/** The diagram is swallowed into the db slot, which drifts to canvas center; the elephant appears there. */
export const CollapseToElephant: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = slowSpring(frame, fps, COLLAPSE_AT, COLLAPSE_LEN);
  const shift = (CANVAS.height / 2 - ARCH_NODES.db.y) * c; // db slot → center
  const el = enter(frame, fps, ELEPHANT_AT);
  const bloom = breathe(frame, 80, 0.6, 1);
  // energy gathers at the convergence point while the diagram is swallowed
  const gather = itp(frame, GATHER_AT, ELEPHANT_AT + 6);
  const gatherOut = itp(frame, ELEPHANT_AT + 6, ELEPHANT_AT + 40, 1, 0.35);

  return (
    <SceneWrapper exit={false} justify="center">
      {gather > 0 ? (
        <div style={{ position: 'absolute', left: 540 - 300, top: 540 - 300, width: 600, height: 600, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle, ${palette.sky}cc 0%, ${palette.deep}88 22%, transparent 65%)`, filter: 'blur(26px)', opacity: gather * gatherOut * bloom, transform: `scale(${0.3 + gather * 0.9})` }} />
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2 + frame * 0.02;
            const r = 340 * (1 - gather) + 40 + Math.sin(frame / 7 + i) * 8;
            return (
              <div key={i} style={{ position: 'absolute', left: 300 + Math.cos(a) * r - 3, top: 300 + Math.sin(a) * r - 3, width: 6, height: 6, borderRadius: '50%', backgroundColor: i % 4 === 0 ? palette.amber : palette.sky, boxShadow: `0 0 12px ${i % 4 === 0 ? palette.amber : palette.sky}`, opacity: gather * gatherOut }} />
            );
          })}
        </div>
      ) : null}
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
