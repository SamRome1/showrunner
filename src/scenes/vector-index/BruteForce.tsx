import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, MonoLabel, PointField, SceneWrapper } from '../../components';
import { colors, enter, fonts, itp } from '../../theme';
import { COUNT, QUERY, SEED } from './hnsw';
import { FIELD, TEXT_TOP } from './layout';
import { makePoints, nearestIndex, place } from '../../components/pointMath';

export const BRUTE_FORCE_DURATION = 300;
const SWEEP_END = 200;
const WINDOW = 36;
const SWAP_AT = 200; // headline swap

/** Every candidate is measured, one by one. Exact, and 2,000 comparisons deep. */
export const BruteForce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const pts = makePoints(SEED, COUNT);
  const nearest = nearestIndex(pts, QUERY);
  const q = place(QUERY, FIELD);

  const sweep = itp(frame, 0, SWEEP_END, 0, COUNT);
  const count = Math.floor(sweep);
  const head = Math.floor(sweep);
  const scanning = frame < SWEEP_END;
  const found = enter(frame, fps, SWEEP_END + 6);
  const h1Out = itp(frame, SWAP_AT - 8, SWAP_AT, 1, 0);
  const h2 = enter(frame, fps, SWAP_AT + 4);

  return (
    <SceneWrapper align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <MonoLabel pill accent animate={false}>
          brute force
        </MonoLabel>
        <div style={{ position: 'relative', height: 150, width: 864 }}>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h1Out }}>
            <Headline animate={false} maxWidth={864}>
              Which point is closest?
            </Headline>
          </div>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h2.opacity, transform: `translateY(${h2.translateY}px)` }}>
            <Headline animate={false} maxWidth={864}>
              Exact. Slow.
            </Headline>
          </div>
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.zinc400, letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>
          {count.toLocaleString('en-US')} comparisons
        </div>
      </div>
      <AbsoluteFill>
        <PointField
          points={pts}
          box={FIELD}
          width={width}
          height={height}
          highlights={frame >= SWEEP_END ? [{ index: nearest, ring: true, r: 14 + (1 - found.progress) * 10 }, { index: nearest, r: 5 }] : []}
        >
          {scanning
            ? pts.slice(Math.max(0, head - WINDOW), head).map((p, k) => {
                const i = Math.max(0, head - WINDOW) + k;
                const t = place(p, FIELD);
                const o = ((k + 1) / WINDOW) * 0.55;
                return <line key={i} x1={q.x} y1={q.y} x2={t.x} y2={t.y} stroke={colors.zinc500} strokeWidth={1} opacity={o} />;
              })
            : null}
          {frame >= SWEEP_END ? (
            <line x1={q.x} y1={q.y} x2={place(pts[nearest], FIELD).x} y2={place(pts[nearest], FIELD).y} stroke={colors.accent} strokeWidth={1.5} opacity={found.opacity} />
          ) : null}
          <circle cx={q.x} cy={q.y} r={7} fill={colors.accent} />
          <circle cx={q.x} cy={q.y} r={16} fill="none" stroke={colors.accent} strokeWidth={1.5} />
        </PointField>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
