import { Theme } from '@emotion/react';
import { ColorsKeys } from '@global-types/emotion';

import { FunnelChartType } from './types';

// Geometry is expressed in the units of the Figma frames (every variant is
// 173.57 units tall) and scaled to the requested pixel height.
export const DESIGN_HEIGHT = 173.57;

const TRIANGLE_WIDTH = 197.51;
const TRIANGLE_CORNER_RADIUS = 6;

// The funnel variants share one slope and scale the stem with the band
// height: stem width ≈ 0.574 and stem height ≈ 0.828 of a band, for 2–6 levels.
const FUNNEL_SIDE_SLOPE = 0.507;
const FUNNEL_STEM_WIDTH_RATIO = 0.574;
const FUNNEL_STEM_HEIGHT_RATIO = 0.828;
const FUNNEL_STEM_RADIUS_RATIO = 0.11;
const FUNNEL_TOP_CORNER_RADIUS = 8;

// Theme colour keys, top to bottom. The triangle takes the first N colours,
// the funnel the last N.
const TRIANGLE_PALETTE: ColorsKeys[] = [
  'blueCornflower',
  'blueSky',
  'greenLime',
  'orangePeach',
  'orangeCoral',
  'redSalmon',
];
const FUNNEL_PALETTE: ColorsKeys[] = [
  'redSalmon',
  'orangePeach',
  'yellowButter',
  'greenLime',
  'blueSky',
  'blueCornflower',
];
const FUNNEL_TWO_LEVEL_PALETTE: ColorsKeys[] = ['blueSoft', 'blueVivid'];

export const getDefaultColors = (
  theme: Theme,
  type: FunnelChartType,
  levels: number,
) => {
  if (type === 'funnel' && levels === 2) {
    return FUNNEL_TWO_LEVEL_PALETTE.map((key) => theme.colors[key]);
  }
  const palette = type === 'triangle' ? TRIANGLE_PALETTE : FUNNEL_PALETTE;
  const offset = type === 'triangle' ? 0 : Math.max(0, palette.length - levels);
  return Array.from(
    { length: levels },
    (_, index) => theme.colors[palette[(offset + index) % palette.length]],
  );
};

type Point = { x: number; y: number; radius: number };

// Polygon path with each corner rounded by a quadratic curve through the
// original vertex.
export const roundedPolygonPath = (points: Point[]) => {
  const segments = points.map((point, index) => {
    const prev = points[(index - 1 + points.length) % points.length];
    const next = points[(index + 1) % points.length];
    const towards = (target: Point) => {
      const dx = target.x - point.x;
      const dy = target.y - point.y;
      const length = Math.hypot(dx, dy);
      const distance = Math.min(point.radius, length / 2);
      return {
        x: point.x + (dx / length) * distance,
        y: point.y + (dy / length) * distance,
      };
    };
    const start = towards(prev);
    const end = towards(next);
    return `${index === 0 ? 'M' : 'L'}${start.x},${start.y} Q${point.x},${point.y} ${end.x},${end.y}`;
  });
  return `${segments.join(' ')} Z`;
};

// In proportional mode no level is drawn thinner than this share of an
// equal level, so zeros and tiny values keep room for their label.
const MIN_PROPORTIONAL_SHARE = 0.4;

/**
 * Splits `total` between levels in proportion to `values`. Levels that would
 * fall below the minimum get the minimum, and the rest share what is left in
 * proportion to their values. Non-numeric and negative values count as 0;
 * when nothing is positive every level gets the same height.
 */
export const getProportionalHeights = (
  values: (number | string)[],
  total: number,
) => {
  const levels = values.length;
  const weights = values.map((value) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : 0;
  });
  const min = (total / levels) * MIN_PROPORTIONAL_SHARE;
  const floored = new Set<number>();
  for (;;) {
    const free = weights
      .map((_, index) => index)
      .filter((index) => !floored.has(index));
    const weightSum = free.reduce((sum, index) => sum + weights[index], 0);
    const room = total - floored.size * min;
    if (weightSum === 0) {
      return weights.map((_, index) =>
        floored.has(index) ? min : room / free.length,
      );
    }
    const heights = weights.map((weight, index) =>
      floored.has(index) ? min : (weight / weightSum) * room,
    );
    const tooThin = free.filter((index) => heights[index] < min);
    if (tooThin.length === 0) return heights;
    tooThin.forEach((index) => floored.add(index));
  }
};

/** Consecutive bands of the given heights, starting at the top */
const stackBands = (heights: number[]) => {
  let top = 0;
  return heights.map((height) => {
    const band = { top, bottom: top + height };
    top = band.bottom;
    return band;
  });
};

export interface FunnelBand {
  top: number;
  bottom: number;
  /** Where the band's label sits, measured from the top */
  labelY: number;
}

export interface FunnelGeometry {
  width: number;
  outline: string;
  bands: FunnelBand[];
  /** Half-width of the shape at a given distance from the top */
  halfWidthAt: (y: number) => number;
}

const getTriangleGeometry = (
  levels: number,
  heights?: number[],
): FunnelGeometry => {
  const width = TRIANGLE_WIDTH;
  const bandHeight = DESIGN_HEIGHT / levels;
  const bands = stackBands(heights ?? Array(levels).fill(bandHeight));
  const radius = TRIANGLE_CORNER_RADIUS;
  return {
    width,
    outline: roundedPolygonPath([
      { x: width / 2, y: 0, radius },
      { x: width, y: DESIGN_HEIGHT, radius },
      { x: 0, y: DESIGN_HEIGHT, radius },
    ]),
    bands: bands.map((band, index) => ({
      ...band,
      // The apex band is a triangle, so its label goes to the centroid.
      labelY:
        index === 0 ? (band.bottom * 2) / 3 : (band.top + band.bottom) / 2,
    })),
    halfWidthAt: (y) => (y / DESIGN_HEIGHT) * (width / 2),
  };
};

const getFunnelGeometry = (
  levels: number,
  heights?: number[],
): FunnelGeometry => {
  const bandHeight = DESIGN_HEIGHT / (levels + FUNNEL_STEM_HEIGHT_RATIO);
  const coneHeight = levels * bandHeight;
  const stemHalfWidth = (bandHeight * FUNNEL_STEM_WIDTH_RATIO) / 2;
  const topHalfWidth = stemHalfWidth + FUNNEL_SIDE_SLOPE * coneHeight;
  const width = topHalfWidth * 2;
  const center = topHalfWidth;
  const stemRadius = bandHeight * FUNNEL_STEM_RADIUS_RATIO;
  return {
    width,
    outline: roundedPolygonPath([
      { x: 0, y: 0, radius: FUNNEL_TOP_CORNER_RADIUS },
      { x: width, y: 0, radius: FUNNEL_TOP_CORNER_RADIUS },
      { x: center + stemHalfWidth, y: coneHeight, radius: 0 },
      { x: center + stemHalfWidth, y: DESIGN_HEIGHT, radius: stemRadius },
      { x: center - stemHalfWidth, y: DESIGN_HEIGHT, radius: stemRadius },
      { x: center - stemHalfWidth, y: coneHeight, radius: 0 },
    ]),
    // The last band runs through the stem as well. Proportional heights
    // share the whole frame, stem included.
    bands: stackBands(
      heights ??
        Array.from({ length: levels }, (_, index) =>
          index === levels - 1
            ? DESIGN_HEIGHT - index * bandHeight
            : bandHeight,
        ),
    ).map((band) => ({ ...band, labelY: (band.top + band.bottom) / 2 })),
    halfWidthAt: (y) =>
      y >= coneHeight ? stemHalfWidth : topHalfWidth - FUNNEL_SIDE_SLOPE * y,
  };
};

/**
 * Shape and level bands. Pass `heights` (summing to `DESIGN_HEIGHT`) to size
 * the levels; otherwise they are equal.
 */
export const getGeometry = (
  type: FunnelChartType,
  levels: number,
  heights?: number[],
) =>
  type === 'triangle'
    ? getTriangleGeometry(levels, heights)
    : getFunnelGeometry(levels, heights);
