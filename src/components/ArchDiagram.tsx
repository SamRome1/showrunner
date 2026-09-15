import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { breathe, colors, drift, enter, fonts, glass, glow, lerp, palette, radius } from '../theme';
import { FlowLine } from './FlowLine';
import { LightSweep } from './LightSweep';

/**
 * ArchDiagram — the load-bearing system diagram populated across Scenes 1–5.
 * Glass nodes that float and breathe, live connectors with travelling pulses.
 * `collapse` (0→1) pulls every node into the db slot.
 */
export type SlotId = 'frontend' | 'agent' | 'backend' | 'infra' | 'db';
type NodeSpec = { x: number; y: number; w: number; h: number };

export const ARCH_NODES: Record<SlotId, NodeSpec> = {
  frontend: { x: 290, y: 320, w: 250, h: 120 },
  agent: { x: 790, y: 320, w: 250, h: 120 },
  backend: { x: 290, y: 570, w: 250, h: 120 },
  infra: { x: 790, y: 570, w: 250, h: 130 },
  db: { x: 540, y: 810, w: 310, h: 140 },
};

const EDGES: [SlotId, SlotId][] = [
  ['frontend', 'agent'],
  ['frontend', 'backend'],
  ['agent', 'infra'],
  ['backend', 'infra'],
  ['backend', 'db'],
  ['infra', 'db'],
];
const SLOT_ORDER: SlotId[] = ['frontend', 'agent', 'backend', 'infra', 'db'];

type Props = {
  slots?: Partial<Record<SlotId, React.ReactNode>>;
  collapse?: number;
  opacity?: number;
  /** Extra glow on the db node (0..1) — e.g. the empty-slot tension moment. */
  dbEmphasis?: number;
  /** Slots that are "live" get a stronger glow and faster pulses. */
  live?: SlotId[];
};

export const ArchDiagram: React.FC<Props> = ({ slots = {}, collapse = 0, opacity = 1, dbEmphasis = 0, live }) => {
  const frame = useCurrentFrame();
  const db = ARCH_NODES.db;
  const c = Math.max(0, Math.min(1, collapse));
  const filled = (id: SlotId) => Boolean(slots[id]);
  const isLive = (id: SlotId) => (live ? live.includes(id) : filled(id));

  const pos = (id: SlotId) => {
    const n = ARCH_NODES[id];
    const d = drift(frame, id.length * 31 + n.x, 3 * (1 - c), 190);
    if (id === 'db') return { cx: n.x + d.x, cy: n.y + d.y, s: 1 - 0.25 * c, o: 1 - Math.max(0, (c - 0.6) / 0.4) };
    return {
      cx: lerp(n.x, db.x, c) + d.x,
      cy: lerp(n.y, db.y, c) + d.y,
      s: lerp(1, 0.12, c),
      o: 1 - Math.min(1, c * 1.15),
    };
  };

  const lineOpacity = Math.max(0, 1 - c * 2.5);

  return (
    <AbsoluteFill style={{ opacity, pointerEvents: 'none' }}>
      <svg width={1080} height={1080} style={{ position: 'absolute', inset: 0, opacity: lineOpacity }}>
        {EDGES.map(([a, b], i) => {
          const pa = pos(a);
          const pb = pos(b);
          const hot = isLive(a) && isLive(b);
          return (
            <FlowLine
              key={`${a}-${b}`}
              x1={pa.cx}
              y1={pa.cy}
              x2={pb.cx}
              y2={pb.cy}
              color={hot ? palette.sky : palette.deep}
              opacity={hot ? 0.75 : 0.4}
              speed={hot ? 1.2 : 0.5}
              pulses={hot ? 2 : 1}
              period={hot ? 70 : 130 + i * 9}
            />
          );
        })}
      </svg>
      {SLOT_ORDER.map((id, i) => {
        const n = ARCH_NODES[id];
        const p = pos(id);
        const active = isLive(id) ? breathe(frame, 90, 0.45, 1, i) : 0;
        const dbGlow = id === 'db' ? dbEmphasis * breathe(frame, 60, 0.5, 1) : 0;
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: p.cx - n.w / 2,
              top: p.cy - n.h / 2,
              width: n.w,
              height: n.h,
              ...glass(active),
              borderColor: dbGlow > 0 ? `rgba(245,158,11,${0.35 + 0.5 * dbGlow})` : undefined,
              boxShadow: dbGlow > 0 ? `${glow(palette.amber, dbGlow, 44)}, inset 0 1px 0 rgba(255,255,255,0.06)` : undefined,
              borderRadius: radius.md,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              overflow: 'hidden',
              transform: `scale(${p.s})`,
              opacity: p.o,
            }}
          >
            {slots[id]}
            <LightSweep period={150 + i * 23} phase={i * 41} opacity={0.08} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
type BadgeProps = { src: string; word?: string; delay?: number; animate?: boolean; size?: number };

export const SlotBadge: React.FC<BadgeProps> = ({ src, word, delay = 0, animate = true, size = 34 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = animate ? enter(frame, fps, delay) : { opacity: 1, translateY: 0, scale: 1 };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, opacity: e.opacity, transform: `translateY(${e.translateY}px) scale(${e.scale})` }}>
      <Img src={staticFile(src)} style={{ width: size, height: size, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.6))' }} />
      {word ? <span style={{ fontFamily: fonts.ui, fontWeight: 600, fontSize: 21, color: colors.text }}>{word}</span> : null}
    </div>
  );
};

export const SlotRow: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 18 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap }}>{children}</div>
);
