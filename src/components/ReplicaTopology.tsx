import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, drift, enter, fonts, glass, glow, hash, palette, radius } from '../theme';
import { FlowLine } from './FlowLine';

export const TOPO_W = 720;
export const TOPO_H = 480;
export const REPLICA_COLS = 8;
export const REPLICA_ROWS = 6;
export const REPLICA_COUNT = REPLICA_COLS * REPLICA_ROWS;

const REPLICA_W = 64;
const REPLICA_H = 28;
const COL_GAP = 24;
const ROW_GAP = 22;
const PRIMARY_W = 200;
const PRIMARY_H = 56;
const ELEPHANT = 96;

type Props = {
  primaryAt?: number;
  replicasAt?: number;
  stagger?: number;
  showElephant?: boolean;
  animate?: boolean;
};

/** One primary and a fan of 48 glowing replicas that shimmer in a rolling wave. */
export const ReplicaTopology: React.FC<Props> = ({ primaryAt = 0, replicasAt = 40, stagger = 2.5, showElephant = false, animate = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settled = { opacity: 1, translateY: 0, scale: 1, progress: 1 };
  const ent = (d: number) => (animate ? enter(frame, fps, d) : settled);

  const gridW = REPLICA_COLS * REPLICA_W + (REPLICA_COLS - 1) * COL_GAP;
  const gridLeft = (TOPO_W - gridW) / 2;
  const primaryTop = showElephant ? ELEPHANT + 24 : 0;
  const railTop = primaryTop + PRIMARY_H + 22;
  const gridTop = railTop + 22;
  const prim = ent(primaryAt);
  const railP = ent(primaryAt + 8).progress;
  const pb = breathe(frame, 80, 0.6, 1);

  return (
    <div style={{ position: 'relative', width: TOPO_W, height: TOPO_H }}>
      {showElephant ? (
        <Img
          src={staticFile('assets/postgresql.svg')}
          style={{ position: 'absolute', left: TOPO_W / 2 - ELEPHANT / 2, top: 0, width: ELEPHANT, height: ELEPHANT, objectFit: 'contain', opacity: prim.opacity, filter: `drop-shadow(0 0 ${18 * pb}px ${palette.sky}88)` }}
        />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: TOPO_W / 2 - PRIMARY_W / 2,
          top: primaryTop,
          width: PRIMARY_W,
          height: PRIMARY_H,
          ...glass(pb),
          borderRadius: radius.sm,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fonts.mono,
          fontSize: 18,
          letterSpacing: 1,
          color: colors.text,
          opacity: prim.opacity,
          transform: `translateY(${prim.translateY}px) scale(${prim.scale})`,
        }}
      >
        primary
      </div>

      <svg width={TOPO_W} height={TOPO_H} style={{ position: 'absolute', inset: 0, opacity: railP }}>
        <FlowLine x1={TOPO_W / 2} y1={primaryTop + PRIMARY_H} x2={TOPO_W / 2} y2={railTop} pulses={1} period={40} opacity={0.7} />
        <FlowLine x1={TOPO_W / 2 - (gridW / 2) * railP} y1={railTop} x2={TOPO_W / 2 + (gridW / 2) * railP} y2={railTop} pulses={2} period={110} opacity={0.5} speed={0.6} />
        {Array.from({ length: REPLICA_COLS }).map((_, c) => (
          <line key={c} x1={gridLeft + c * (REPLICA_W + COL_GAP) + REPLICA_W / 2} y1={railTop} x2={gridLeft + c * (REPLICA_W + COL_GAP) + REPLICA_W / 2} y2={gridTop} stroke={palette.deep} strokeWidth={1} opacity={0.6 * railP} />
        ))}
      </svg>

      {Array.from({ length: REPLICA_COUNT }).map((_, i) => {
        const row = Math.floor(i / REPLICA_COLS);
        const col = i % REPLICA_COLS;
        const e = ent(replicasAt + i * stagger);
        const d = drift(frame, i + 500, 1.5, 120 + hash(i) * 60);
        // rolling shimmer wave across the grid
        const wave = breathe(frame, 100, 0, 1, -(row * 0.9 + col * 0.35));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: gridLeft + col * (REPLICA_W + COL_GAP) + d.x,
              top: gridTop + row * (REPLICA_H + ROW_GAP) + d.y,
              width: REPLICA_W,
              height: REPLICA_H,
              borderRadius: 7,
              border: `1px solid rgba(95,168,255,${0.25 + 0.55 * wave})`,
              backgroundColor: `rgba(51,103,145,${0.25 + 0.35 * wave})`,
              boxShadow: glow(palette.sky, 0.35 + 0.65 * wave, 14),
              opacity: e.opacity,
              transform: `translateY(${e.translateY}px) scale(${e.scale})`,
            }}
          />
        );
      })}
    </div>
  );
};
