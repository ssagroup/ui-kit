import {
  Point,
  LineSvgProps,
  LineCustomSvgLayerProps,
  LineSeries,
} from '@nivo/line';
import { ScaleTimeSpec } from '@nivo/scales';
import { MainColors, DropdownOptionProps } from '@ssa-ui-kit/core';

export interface OptionType extends DropdownOptionProps {
  value: 'd' | 'w' | 'm';
  label: string;
  precision: string;
}

export interface MealNutrientsProps {
  caption?: string;
  options: OptionType[];
  data: LineSvgProps<LineSeries>['data'];
  onOptionChange?: (option: OptionType) => void;
}

export interface MealNutrientsTooltipProps {
  colorName: keyof MainColors;
  point: Exclude<Point<LineSeries>, 'data'> & {
    data: Point<LineSeries>['data'] & { comp?: number; unit?: string };
  };
}

export type UseChartConfig = (
  ref: React.RefObject<HTMLElement | null>,
  data: LineSvgProps<LineSeries>['data'],
  precision: ScaleTimeSpec['precision'] | 'week',
) => Pick<LineSvgProps<LineSeries>, 'xScale' | 'axisBottom'>;

// ScaleSpec is not exported from @nivo/line
export type ScaleSpec = LineSvgProps<LineSeries>['xScale'];

// `CustomLayerProps` doesn't have `currentPoint` defined  on it even
// though this property is passed to a custom layer:
// https://github.com/plouc/nivo/blob/408d46f7de205d391ab19cf34321e7b40d5cebad/packages/line/src/Line.js#L318
export type CustomPointLayerProps = LineCustomSvgLayerProps<LineSeries> & {
  currentPoint: Point<LineSeries> | null;
};
