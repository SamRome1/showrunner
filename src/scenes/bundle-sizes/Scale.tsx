import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MonoLabel, SceneWrapper, SizeBar, StatCounter } from '../../components';
import { BAR_ROWS } from './Bars';
import { LARGEST, MAX_GZIP, RATIO, SMALLEST } from './data';
import { breathe, fonts, itp, palette } from '../../theme';

export const SCALE_DURATION = 240;
const RINGS_AT = 40;

/** Smallest and largest rows settled on the left; the ratio lands hero-size in amber with expanding rings. */
export const Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = BAR_ROWS.filter((r) => r.id === SMALLEST.id || r.id === LARGEST.id);
  const br = breathe(frame, 70, 0.6, 1);
  return (
    <SceneWrapper justify="center" gap={0} halo>
      <div style={{ display: 'flex', alignItems: 'center', gap: 64, width: '100%' }}>
        <SizeBar rows={rows} max={MAX_GZIP} animate={false} width={1120} labelWidth={300} valueWidth={240} rowHeight={150} barHeight={48} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 460 }}>
          {[0, 1, 2].map((i) => {
            const t = itp(frame, RINGS_AT + i * 16, RINGS_AT + 90 + i * 16);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 240 + t * 520,
                  height: 240 + t * 520,
                  borderRadius: '50%',
                  border: `1px solid ${palette.amber}`,
                  opacity: (1 - t) * 0.6,
                  boxShadow: `0 0 30px ${palette.amber}55`,
                }}
              />
            );
          })}
          <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle, ${palette.amber}55, transparent 70%)`, filter: 'blur(36px)', opacity: br }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, position: 'relative' }}>
            <StatCounter
              value={RATIO}
              decimals={1}
              suffix="×"
              delay={20}
              duration={50}
              fontSize={220}
              weight={800}
              letterSpacing={-9}
              accent
              align="center"
              numeralStyle={{ fontFamily: fonts.ui, lineHeight: 1 }}
              style={{ gap: 0 }}
            />
            <MonoLabel delay={40} uppercase={false} pill size={24}>
              smallest → largest
            </MonoLabel>
          </div>
        </div>
      </div>
    </SceneWrapper>
  );
};
