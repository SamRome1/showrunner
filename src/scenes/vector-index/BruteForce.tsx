import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, MonoLabel, PointField, SceneWrapper } from '../../components';
import { breathe, enter, fonts, itp, palette, textGlow } from '../../theme';
import { COUNT, QUERY, SEED } from './hnsw';
import { FIELD, TEXT_TOP } from './layout';
import { makePoints, nearestIndex, place } from '../../components/pointMath';

export const BRUTE_FORCE_DURATION = 300;
const SWEEP_END = 200;
const WINDOW = 40;
const SWAP_AT = 200;

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
  const br = breathe(frame, 40, 0.6, 1);
  const nearestP = place(pts[nearest], FIELD);

  return (
    <SceneWrapper align="start">
      <div style={{ marginTop: TEXT_TOP, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
        <MonoLabel pill accent dot animate={false}>
          brute force
        </MonoLabel>
        <div style={{ position: 'relative', height: 160, width: 864 }}>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h1Out }}>
            <Headline animate={false} maxWidth={864} gradient>
              Which point is closest?
            </Headline>
          </div>
          <div style={{ position: 'absolute', inset: 0, width: 864, opacity: h2.opacity, transform: `translateY(${h2.translateY}px)` }}>
            <Headline animate={false} maxWidth={864} gradient>
              Exact. Slow.
            </Headline>
          </div>
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 34,
            color: palette.amber,
            letterSpacing: 1,
            fontVariantNumeric: 'tabular-nums',
            filter: textGlow(palette.amber, scanning ? br : 0.6),
          }}
        >
          {count.toLocaleString('en-US')} comparisons
        </div>
      </div>
      <AbsoluteFill>
        <PointField
          points={pts}
          box={FIELD}
          width={width}
          height={height}
          query={QUERY}
          highlights={frame >= SWEEP_END ? [{ index: nearest, ring: true, r: 16 + (1 - found.progress) * 14 }, { index: nearest, r: 6 }] : []}
        >
          {scanning
            ? pts.slice(Math.max(0, head - WINDOW), head).map((p, k) => {
                const i = Math.max(0, head - WINDOW) + k;
                const t = place(p, FIELD);
                const o = ((k + 1) / WINDOW) ** 2 * 0.7;
                const isHead = k === WINDOW - 1 || i === head - 1;
                return (
                  <g key={i}>
                    <line x1={q.x} y1={q.y} x2={t.x} y2={t.y} stroke={isHead ? palette.amber : palette.sky} strokeWidth={isHead ? 1.6 : 1} opacity={o} />
                    {isHead ? <circle cx={t.x} cy={t.y} r={5} fill={palette.white} filter="url(#vi-glow)" /> : null}
                  </g>
                );
              })
            : null}
          {frame >= SWEEP_END ? (
            <g opacity={found.opacity}>
              <line x1={q.x} y1={q.y} x2={nearestP.x} y2={nearestP.y} stroke={palette.amber} strokeWidth={5} opacity={0.35} filter="url(#vi-glow-soft)" />
              <line x1={q.x} y1={q.y} x2={nearestP.x} y2={nearestP.y} stroke={palette.amber} strokeWidth={2} />
            </g>
          ) : null}
        </PointField>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
