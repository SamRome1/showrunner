import React from 'react';
import { Headline, SceneWrapper } from '../../components';
import { colors } from '../../theme';

export const CAVEAT_DURATION = 210;

export const Caveat: React.FC = () => (
  <SceneWrapper justify="center" gap={28}>
    <Headline delay={0} align="center" maxWidth={1400}>
      Bundle size is one variable.
    </Headline>
    <Headline variant="subhead" delay={6} align="center" color={colors.zinc400} maxWidth={1300}>
      Runtime speed, hydration, and the team you already have matter more.
    </Headline>
  </SceneWrapper>
);
