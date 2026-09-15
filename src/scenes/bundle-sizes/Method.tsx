import React from 'react';
import { CodeBlock, Headline, MonoLabel, SceneWrapper } from '../../components';
import { colors, palette, timing } from '../../theme';
import type { CodeLine } from '../../components';

export const METHOD_DURATION = 180;

const imp = { text: 'import ', color: palette.sky };
const LINES: CodeLine[] = [
  [{ text: '// what a hello world imports', color: colors.zinc500 }],
  [imp, { text: "'preact'", color: colors.text }],
  [imp, { text: "'solid-js'", color: colors.text }, { text: '; ', color: colors.zinc500 }, imp, { text: "'solid-js/web'", color: colors.text }],
  [imp, { text: "'svelte'", color: colors.text }],
  [imp, { text: "'vue'", color: colors.text }],
  [imp, { text: "'react'", color: colors.text }, { text: '; ', color: colors.zinc500 }, imp, { text: "'react-dom/client'", color: colors.text }],
];

/** Method label + headline on the left, the six import lines in a large glass panel on the right. */
export const Method: React.FC = () => (
  <SceneWrapper justify="start" gap={0}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 72, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 560, flexShrink: 0 }}>
        <MonoLabel pill accent delay={0} dot>
          method
        </MonoLabel>
        <Headline delay={timing.stagger} variant="headline" glow={0.6}>
          Six imports. One build.
        </Headline>
        <MonoLabel delay={timing.stagger * 4} uppercase={false} size={22}>
          esbuild · minify · gzip
        </MonoLabel>
      </div>
      <CodeBlock lines={LINES} delay={timing.stagger * 2} filename="hello-world.ts" fontSize={30} width={1110} highlight={[5]} highlightAt={70} />
    </div>
  </SceneWrapper>
);
