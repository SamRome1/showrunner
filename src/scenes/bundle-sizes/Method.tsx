import React from 'react';
import { CodeBlock, MonoLabel, SceneWrapper } from '../../components';
import { colors, timing } from '../../theme';
import type { CodeLine } from '../../components';

export const METHOD_DURATION = 180;

const LINES: CodeLine[] = [
  [{ text: '// what a hello world imports', color: colors.zinc600 }],
  [{ text: 'import ', color: colors.zinc400 }, { text: "'preact'", color: colors.text }],
  [{ text: 'import ', color: colors.zinc400 }, { text: "'solid-js'", color: colors.text }, { text: '; import ', color: colors.zinc400 }, { text: "'solid-js/web'", color: colors.text }],
  [{ text: 'import ', color: colors.zinc400 }, { text: "'svelte'", color: colors.text }],
  [{ text: 'import ', color: colors.zinc400 }, { text: "'vue'", color: colors.text }],
  [{ text: 'import ', color: colors.zinc400 }, { text: "'react'", color: colors.text }, { text: '; import ', color: colors.zinc400 }, { text: "'react-dom/client'", color: colors.text }],
];

export const Method: React.FC = () => (
  <SceneWrapper justify="center" gap={32}>
    <div style={{ width: 1100, display: 'flex' }}>
      <MonoLabel pill accent delay={0}>
        method
      </MonoLabel>
    </div>
    <CodeBlock lines={LINES} delay={timing.stagger * 2} filename="esbuild · minify · gzip" fontSize={28} width={1100} />
  </SceneWrapper>
);
