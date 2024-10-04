import { ColorsKeys } from '@ssa-ui-kit/core';

export const GRID_AREA_NAME = 'weighted-average-price';
export const COLORS: Record<string, ColorsKeys> = {
  baseAssetWeightedMeanPrice: 'yellowWarm',
  baseAssetMarketPrice: 'pink',
};
export const COMMON_ANNOTATION = {
  xref: 'paper',
  yref: 'paper',
  x: 0,
  xanchor: 'left',
  y: 1,
  yanchor: 'top',
  xshift: -35,
  yshift: 19,
  showarrow: false,
};
