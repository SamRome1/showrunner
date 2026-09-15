import React from 'react';
import { MonoLabel, SceneWrapper, SizeBar } from '../../components';
import { FRAMEWORKS, MAX_GZIP, toKb } from './data';

export const BARS_DURATION = 600;
export const BAR_ROWS = FRAMEWORKS.map((f) => ({ id: f.id, label: f.name, logo: f.logo, value: f.gzipBytes, display: toKb(f.gzipBytes) }));

/** Rows land smallest → largest, one every 100 frames; the last bar is the payoff. */
export const Bars: React.FC = () => (
  <SceneWrapper justify="start" gap={36}>
    <MonoLabel delay={0}>min + gzip · what a hello world imports</MonoLabel>
    <SizeBar rows={BAR_ROWS} max={MAX_GZIP} startAt={10} rowDelay={100} growFrames={50} />
  </SceneWrapper>
);
