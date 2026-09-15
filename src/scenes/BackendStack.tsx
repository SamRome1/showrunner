import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { itp } from '../theme';
import { ArchDiagram, SceneWrapper, SlotBadge } from '../components';
import { afterScene3 } from './diagramState';

export const BACKEND_STACK_DURATION = 105;
const PUNCH = 8; // deliberately faster than the house stagger

/** Python → backend, Kubernetes + Azure → infra, 8 frames apart. db stays empty. */
export const BackendStack: React.FC = () => {
  const frame = useCurrentFrame();
  const tension = itp(frame, 60, 100);
  return (
  <SceneWrapper exit={false}>
    <AbsoluteFill>
      <ArchDiagram
        dbEmphasis={tension}
        slots={{
          ...afterScene3,
          backend: <SlotBadge src="assets/python.svg" word="Python" delay={0} />,
          infra: (
            <>
              <SlotBadge src="assets/kubernetes.svg" word="Kubernetes" delay={PUNCH} />
              <SlotBadge src="assets/azure.svg" word="Azure" delay={PUNCH * 2} />
            </>
          ),
        }}
      />
    </AbsoluteFill>
  </SceneWrapper>
  );
};
