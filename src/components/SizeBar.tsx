import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { StatCounter } from './StatCounter';
import { colors, enter, fonts, radius, slowSpring } from '../theme';

/**
 * SizeBar — horizontal bar-chart rows for comparing one numeric value across
 * items that each have an official logo. Bars are accent on a zinc track; brand
 * color comes only from the logo so lengths compare cleanly.
 */
export type SizeBarRow = {
  id: string;
  /** Display name, Inter 500 zinc-400. */
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
  /** Frame at which row 0 starts entering. */
  startAt?: number;
  /** Frames between consecutive rows. */
  rowDelay?: number;
  /** Frames the bar takes to grow (slow damping-200 spring). */
  growFrames?: number;
  /** false = everything settled, no animation. */
  animate?: boolean;
  /** Counter suffix, e.g. " kB". */
  unit?: string;
  decimals?: number;
  width?: number;
  rowHeight?: number;
  barHeight?: number;
  labelWidth?: number;
  valueWidth?: number;
  /** Ids to keep at full opacity while others dim (0 = no dimming). */
  focus?: string[];
  dimTo?: number;
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
  width = 1704,
  rowHeight = 108,
  barHeight = 28,
  labelWidth = 300,
  valueWidth = 240,
  focus,
  dimTo = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const trackWidth = width - labelWidth - valueWidth;

  return (
    <div style={{ width, display: 'flex', flexDirection: 'column' }}>
      {rows.map((row, i) => {
        const delay = startAt + i * rowDelay;
        const e = animate ? enter(frame, fps, delay) : { opacity: 1, translateY: 0, scale: 1 };
        const grow = animate ? slowSpring(frame, fps, delay + 10, growFrames) : 1;
        const frac = Math.min(1, row.value / max) * grow;
        const dim = focus && !focus.includes(row.id) ? dimTo : 1;
        return (
          <div
            key={row.id}
            style={{
              height: rowHeight,
              display: 'flex',
              alignItems: 'center',
              opacity: e.opacity * dim,
              transform: `translateY(${e.translateY}px) scale(${e.scale})`,
              transformOrigin: '0% 50%',
            }}
          >
            <div style={{ width: labelWidth, display: 'flex', alignItems: 'center', gap: 18 }}>
              <Img src={staticFile(row.logo)} style={{ width: 40, height: 40, objectFit: 'contain' }} />
              <span style={{ fontFamily: fonts.ui, fontWeight: 500, fontSize: 28, color: colors.zinc400 }}>{row.label}</span>
            </div>
            <div
              style={{
                width: trackWidth,
                height: barHeight,
                borderRadius: radius.sm,
                border: `1px solid ${colors.zinc800}`,
                backgroundColor: colors.surface,
                overflow: 'hidden',
              }}
            >
              <div style={{ width: `${frac * 100}%`, height: '100%', backgroundColor: colors.accent }} />
            </div>
            <div style={{ width: valueWidth, display: 'flex', justifyContent: 'flex-end' }}>
              <StatCounter
                value={row.display ?? row.value}
                decimals={decimals}
                suffix={unit}
                delay={animate ? delay + 10 : -1000}
                duration={growFrames}
                fontSize={40}
                weight={600}
                letterSpacing={-1}
                numeralStyle={{ lineHeight: 1 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
