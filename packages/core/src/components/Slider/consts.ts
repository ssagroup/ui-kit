import { css } from '@emotion/react';

import { MainSizes } from '../../types/global';
import { SliderSize } from './types';

export const SLIDER_THUMB_SIZES: Record<SliderSize, number> = {
  small: 10,
  medium: 14,
  large: 20,
};

const TRACK_HEIGHTS: Record<SliderSize, number> = {
  small: 2,
  medium: 4,
  large: 8,
};

export const trackSizeStyles: MainSizes = {
  small: css`
    height: ${TRACK_HEIGHTS.small}px;
  `,
  medium: css`
    height: ${TRACK_HEIGHTS.medium}px;
  `,
  large: css`
    height: ${TRACK_HEIGHTS.large}px;
  `,
};
