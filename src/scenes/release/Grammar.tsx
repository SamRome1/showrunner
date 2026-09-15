import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Headline, SceneWrapper } from '../../components';
import { colors, enter, fonts, timing } from '../../theme';

export const GRAMMAR_DURATION = 240;

const ROWS: [string, string][] = [
  ['spring', 'damping 200'],
  ['rise', '12px'],
  ['scale', '0.98 → 1.0'],
  ['exit', '6–8 frames'],
  ['hold', '≥ 20 frames'],
];

/** The house motion grammar, demonstrated with the house stagger. */
export const Grammar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneWrapper gap={40}>
      <Headline variant="subhead" delay={0}>
        One motion grammar.
      </Headline>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {ROWS.map(([key, val], i) => {
          const e = enter(frame, fps, 10 + i * timing.stagger);
          return (
            <div
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '22px 0',
                borderBottom: `1px solid ${colors.zinc800}`,
                fontFamily: fonts.mono,
                fontSize: 28,
                opacity: e.opacity,
                transform: `translateY(${e.translateY}px)`,
              }}
            >
              <span style={{ color: colors.zinc400 }}>{key}</span>
              <span style={{ color: colors.text }}>{val}</span>
            </div>
          );
        })}
      </div>
    </SceneWrapper>
  );
};
