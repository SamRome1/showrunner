import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FlowLine, Headline, LogoBadge, MonoLabel, SceneWrapper } from '../../components';

export const WORKS_WITH_DURATION = 180;

const STACK = [
  { src: 'assets/react.svg', label: 'React' },
  { src: 'assets/nextjs.svg', label: 'Next.js' },
  { src: 'assets/postgresql.svg', label: 'Postgres' },
  { src: 'assets/typescript.svg', label: 'TypeScript' },
  { src: 'assets/python.svg', label: 'Python' },
];

export const WorksWith: React.FC = () => (
  <SceneWrapper raw>
    <AbsoluteFill style={{ padding: 86, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 60 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24 }}>
        <MonoLabel delay={0} pill dot>
          works with
        </MonoLabel>
        <Headline delay={6} variant="hero" glow={0.6}>
          Your stack. Already.
        </Headline>
      </div>
      <div style={{ position: 'relative', height: 260 }}>
        <svg width={1748} height={260} style={{ position: 'absolute', inset: 0 }}>
          <FlowLine x1={60} y1={130} x2={1690} y2={130} pulses={3} period={120} opacity={0.5} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          {STACK.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <LogoBadge src={s.src} size={168} delay={20 + i * 8} highlight={0.5} />
              <MonoLabel delay={28 + i * 8} uppercase={false} size={24}>
                {s.label}
              </MonoLabel>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  </SceneWrapper>
);
