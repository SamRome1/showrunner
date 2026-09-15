import React from 'react';
import { CodeBlock, LogoBadge, MonoLabel, SceneWrapper } from '../../components';
import type { CodeLine } from '../../components';
import { colors } from '../../theme';

export const ASSET_RULE_DURATION = 300;

const k = (t: string) => ({ text: t, color: colors.zinc400 });
const v = (t: string) => ({ text: t, color: colors.text });
const LINES: CodeLine[] = [
  [k('{ "file": '), v('"openai.svg"'), k(',     "url": '), v('"svgl.app/library/openai_dark.svg"'), k(' },')],
  [k('{ "file": '), v('"postgresql.svg"'), k(', "url": '), v('"svgl.app/library/postgresql.svg"'), k(' },')],
  [k('{ "file": '), v('"github.svg"'), k(',     "url": '), v('"svgl.app/library/github_dark.svg"'), k(' },')],
  [{ text: '// never drawn by hand', color: colors.zinc600 }],
];

const MARKS = ['openai', 'react', 'nextjs', 'typescript', 'rust', 'python', 'kubernetes', 'azure', 'postgresql', 'github'];
const DOCK_AT = 120;

export const AssetRule: React.FC = () => (
  <SceneWrapper gap={28}>
    <MonoLabel pill delay={0}>
      Official sources only
    </MonoLabel>
    <CodeBlock lines={LINES} delay={8} stagger={6} fontSize={18} filename="assets.json" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, width: '100%', justifyItems: 'center' }}>
      {MARKS.map((m, i) => (
        <LogoBadge key={m} src={`assets/${m}.svg`} size={140} delay={DOCK_AT + i * 4} />
      ))}
    </div>
  </SceneWrapper>
);
