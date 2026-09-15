import React from 'react';
import { Composition } from 'remotion';
import { CANVAS } from '../theme';
import { ShortForm, SHORT_FORM_DURATION } from './ShortForm';
import { AssetCheck } from './AssetCheck';
import { VectorIndex, VECTOR_INDEX_DURATION, VECTOR_INDEX_SIZE } from './VectorIndex';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="ShortForm"
      component={ShortForm}
      durationInFrames={SHORT_FORM_DURATION}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
    {/* ---- gallery examples (one block each; keep blocks separated) ---- */}

    <Composition
      id="VectorIndex"
      component={VectorIndex}
      durationInFrames={VECTOR_INDEX_DURATION}
      fps={CANVAS.fps}
      width={VECTOR_INDEX_SIZE.width}
      height={VECTOR_INDEX_SIZE.height}
    />

    {/* example: Release */}

    {/* example: BundleSizes */}

    {/* ---- tooling ---- */}
    <Composition
      id="AssetCheck"
      component={AssetCheck}
      durationInFrames={1}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />
  </>
);
