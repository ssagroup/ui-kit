import { Point, LineSvgProps, CustomLayerProps } from '@nivo/line';
import { ScaleTimeSpec } from '@nivo/scales';

export interface IMealNutrientsProps {
  caption?: string;
}

export interface IMealNutrientsTooltipProps {
  colorName: keyof MainColors;
  point: Exclude<Point, 'data'> & {
    data: Point['data'] & { comp?: number; unit?: string };
  };
}

export type UseChartConfig = (
  ref: React.RefObject,
  data: LineSvgProps['data'],
  precision: ScaleTimeSpec['precision'] | 'week',
) => Pick<LineSvgProps, 'xScale' | 'axisBottom'>;

// ScaleSpec is not exported from @nivo/line
export type ScaleSpec = LineSvgProps['xScale'];

// `CustomLayerProps` doesn't have `currentPoint` defined  on it even
// though this property is passed to a custom layer:
// https://github.com/plouc/nivo/blob/408d46f7de205d391ab19cf34321e7b40d5cebad/packages/line/src/Line.js#L318
export type CustomPointLayerProps = CustomLayerProps & { currentPoint?: Point };
