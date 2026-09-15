import React from 'react';
import { MonoLabel, SceneWrapper, SizeBar, StatCounter } from '../../components';
import { BAR_ROWS } from './Bars';
import { LARGEST, MAX_GZIP, RATIO, SMALLEST } from './data';
import { fonts } from '../../theme';

export const SCALE_DURATION = 240;

/** Only the smallest and largest rows, settled, with the ratio counting up beside them. */
export const Scale: React.FC = () => {
  const rows = BAR_ROWS.filter((r) => r.id === SMALLEST.id || r.id === LARGEST.id);
  return (
    <SceneWrapper justify="center" gap={48}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
        <SizeBar rows={rows} max={MAX_GZIP} animate={false} width={1180} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20 }}>
          <StatCounter
            value={RATIO}
            decimals={1}
            suffix="×"
            delay={20}
            duration={50}
            fontSize={140}
            weight={500}
            letterSpacing={-4}
            numeralStyle={{ fontFamily: fonts.mono, lineHeight: 1 }}
          />
          <MonoLabel delay={40} uppercase={false}>
            smallest → largest
          </MonoLabel>
        </div>
      </div>
    </SceneWrapper>
  );
};
