import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { StatCounter } from './StatCounter';
import { breathe, colors, drift, enter, fonts, glass, glow, palette, radius, slowSpring } from '../theme';

/**
 * SizeBar — horizontal bar-chart rows for comparing one numeric value across
 * items that each have an official logo. Glass tracks, deep→sky gradient fills
 * with a glowing leading edge and a travelling highlight; the `payoff` row
 * turns amber. Brand color comes only from the logo so lengths compare cleanly.
 */
export type SizeBarRow = {
  id: string;
  label: string;
  /** Path under public/, e.g. "assets/react.svg". */
  logo: string;
  /** Raw value used for bar length. */
  value: number;
  /** Value to display in the counter (defaults to `value`). */
  display?: number;
};

type Props = {
  rows: SizeBarRow[];
  /** Value that fills the full track. Fixed up front so early rows read small. */
  max: number;
  startAt?: number;
  rowDelay?: number;
  growFrames?: number;
  animate?: boolean;
  unit?: string;
  decimals?: number;
  width?: number;
  rowHeight?: number;
  barHeight?: number;
  labelWidth?: number;
  valueWidth?: number;
  /** Ids to keep at full opacity while others dim. */
  focus?: string[];
  dimTo?: number;
  /** Row id rendered in amber — the single highlight. Defaults to the largest value. */
  payoff?: string | null;
};

export const SizeBar: React.FC<Props> = ({
  rows,
  max,
  startAt = 0,
  rowDelay = 100,
  growFrames = 50,
  animate = true,
  unit = ' kB',
  decimals = 1,
  width = 1748,
  rowHeight = 118,
  barHeight = 44,
  labelWidth = 330,
  valueWidth = 300,
  focus,
  dimTo = 0.3,
  payoff,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const trackWidth = width - labelWidth - valueWidth;
  const payoffId = payoff === undefined ? rows.reduce((a, b) => (b.value > a.value ? b : a), rows[0])?.id : payoff;

  return (
    <div style={{ width, display: 'flex', flexDirection: 'column' }}>
      {rows.map((row, i) => {
        const delay = startAt + i * rowDelay;
        const e = animate ? enter(frame, fps, delay) : { opacity: 1, translateY: 0, scale: 1 };
        const grow = animate ? slowSpring(frame, fps, delay + 10, growFrames) : 1;
        const frac = Math.min(1, row.value / max) * grow;
        const dim = focus && !focus.includes(row.id) ? dimTo : 1;
        const hot = row.id === payoffId;
        const hue = hot ? palette.amber : palette.sky;
        const br = breathe(frame, 80 + i * 7, 0.55, 1, i * 1.3);
        const d = drift(frame, i * 13 + 7, 2, 170);
        const sweep = (((frame + i * 37) / 110) % 1 + 1) % 1; // travelling highlight along the fill
        const fillPx = trackWidth * frac;
        return (
          <div
            key={row.id}
            style={{
              height: rowHeight,
              display: 'flex',
              alignItems: 'center',
              opacity: e.opacity * dim,
              transform: `translate(${d.x}px, ${d.y + e.translateY}px) scale(${e.scale})`,
              transformOrigin: '0% 50%',
            }}
          >
            <div style={{ width: labelWidth, display: 'flex', alignItems: 'center', gap: 20 }}>
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: radius.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...glass(hot ? br : 0.35 * br),
                  boxShadow: `${glow(hue, (hot ? 0.9 : 0.35) * br, 28)}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  flexShrink: 0,
                }}
              >
                <Img src={staticFile(row.logo)} style={{ width: 40, height: 40, objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.6))' }} />
              </div>
              <span style={{ fontFamily: fonts.ui, fontWeight: 700, fontSize: 32, letterSpacing: -0.5, color: colors.text }}>{row.label}</span>
            </div>

            <div
              style={{
                position: 'relative',
                width: trackWidth,
                height: barHeight,
                borderRadius: radius.pill,
                ...glass(0),
                backgroundColor: 'rgba(5,8,16,0.55)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: fillPx,
                  borderRadius: radius.pill,
                  background: hot
                    ? `linear-gradient(90deg, ${palette.deep} 0%, ${palette.amber} 60%, ${palette.amberSoft} 100%)`
                    : `linear-gradient(90deg, ${palette.deep} 0%, ${palette.sky} 100%)`,
                  boxShadow: glow(hue, (hot ? 1 : 0.7) * br, 36),
                }}
              >
                {/* travelling highlight */}
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    bottom: -10,
                    left: `${sweep * 130 - 30}%`,
                    width: '22%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                    transform: 'skewX(-18deg)',
                  }}
                />
              </div>
              {/* glowing leading edge */}
              <div
                style={{
                  position: 'absolute',
                  left: Math.max(0, fillPx - 6),
                  top: -6,
                  width: 12,
                  height: barHeight + 12,
                  borderRadius: 6,
                  background: palette.white,
                  opacity: 0.55 + 0.45 * br,
                  boxShadow: `0 0 ${18 + 14 * br}px ${hue}, 0 0 4px #fff`,
                  filter: 'blur(1px)',
                }}
              />
            </div>

            <div style={{ width: valueWidth, display: 'flex', justifyContent: 'flex-end' }}>
              <StatCounter
                value={row.display ?? row.value}
                decimals={decimals}
                suffix={unit}
                delay={animate ? delay + 10 : -1000}
                duration={growFrames}
                fontSize={48}
                weight={800}
                letterSpacing={-1.5}
                accent={hot}
                numeralStyle={{ lineHeight: 1 }}
                style={{ gap: 0 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
