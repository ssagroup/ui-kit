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

const getTriangleGeometry = (levels: number): FunnelGeometry => {
  const width = TRIANGLE_WIDTH;
  const bandHeight = DESIGN_HEIGHT / levels;
  const radius = TRIANGLE_CORNER_RADIUS;
  return {
    width,
    outline: roundedPolygonPath([
      { x: width / 2, y: 0, radius },
      { x: width, y: DESIGN_HEIGHT, radius },
      { x: 0, y: DESIGN_HEIGHT, radius },
    ]),
    bands: Array.from({ length: levels }, (_, index) => ({
      top: index * bandHeight,
      bottom: (index + 1) * bandHeight,
      // The apex band is a triangle, so its label goes to the centroid.
      labelY: index === 0 ? (bandHeight * 2) / 3 : (index + 0.5) * bandHeight,
    })),
    halfWidthAt: (y) => (y / DESIGN_HEIGHT) * (width / 2),
  };
};

const getFunnelGeometry = (levels: number): FunnelGeometry => {
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
    // The last band runs through the stem as well.
    bands: Array.from({ length: levels }, (_, index) => {
      const top = index * bandHeight;
      const bottom = index === levels - 1 ? DESIGN_HEIGHT : top + bandHeight;
      return { top, bottom, labelY: (top + bottom) / 2 };
    }),
    halfWidthAt: (y) =>
      y >= coneHeight ? stemHalfWidth : topHalfWidth - FUNNEL_SIDE_SLOPE * y,
  };
};

export const getGeometry = (type: FunnelChartType, levels: number) =>
  type === 'triangle' ? getTriangleGeometry(levels) : getFunnelGeometry(levels);
