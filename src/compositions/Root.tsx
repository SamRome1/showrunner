import React from 'react';
import { Composition } from 'remotion';
import { CANVAS } from '../theme';
import { ShortForm, SHORT_FORM_DURATION } from './ShortForm';
import { AssetCheck } from './AssetCheck';
import { Release, RELEASE_DURATION } from './Release';
import { BundleSizes, BUNDLE_SIZES_DURATION } from './BundleSizes';
import { VectorIndex, VECTOR_INDEX_DURATION, VECTOR_INDEX_SIZE } from './VectorIndex';
import { ProductLaunch, PRODUCT_LAUNCH_DURATION, PRODUCT_LAUNCH_SIZE } from './ProductLaunch';

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

    <Composition
      id="Release"
      component={Release}
      durationInFrames={RELEASE_DURATION}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
    />

    <Composition
      id="BundleSizes"
      component={BundleSizes}
      durationInFrames={BUNDLE_SIZES_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />

    {/* example: ProductLaunch */}
    <Composition
      id="ProductLaunch"
      component={ProductLaunch}
      durationInFrames={PRODUCT_LAUNCH_DURATION}
      fps={CANVAS.fps}
      width={PRODUCT_LAUNCH_SIZE.width}
      height={PRODUCT_LAUNCH_SIZE.height}
    />

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
