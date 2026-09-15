import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CodeBlock, Headline, LogoBadge, SceneWrapper } from '../../components';
import { colors, palette } from '../../theme';
import type { CodeLine } from '../../components';

export const ONE_LINE_DURATION = 240;

const lines: CodeLine[] = [
  [
    { text: 'import ', color: palette.sky },
    { text: '{ lumen } ', color: colors.text },
    { text: 'from ', color: palette.sky },
    { text: "'@lumen/search'", color: palette.amberSoft },
  ],
  '',
  [
    { text: 'await ', color: palette.sky },
    { text: 'lumen.index(', color: colors.text },
    { text: "'products'", color: palette.amberSoft },
    { text: ')', color: colors.text },
  ],
];

export const OneLine: React.FC = () => (
  <SceneWrapper raw>
    <AbsoluteFill style={{ padding: 86, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 44 }}>
      <Headline delay={0} variant="headline" glow={0.6} maxWidth={1400}>
        One line. That's the integration.
      </Headline>
      <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
        <CodeBlock lines={lines} delay={24} filename="lumen.ts" fontSize={34} width={1150} highlight={[2]} highlightAt={80} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <LogoBadge src="assets/typescript.svg" label="TypeScript" labelSize={30} size={120} delay={60} highlight={0.4} />
          <LogoBadge src="assets/python.svg" label="Python" labelSize={30} size={120} delay={72} highlight={0.4} />
        </div>
      </div>
    </AbsoluteFill>
  </SceneWrapper>
);
