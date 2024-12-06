import { SerializedStyles } from '@emotion/react';
import { ResponsivePie, MayHaveLabel, PieTooltipProps } from '@nivo/pie';
import { CommonProps, WidgetCardProps } from '../../..';

export type PieChartFeatures =
  | 'header'
  | 'fullscreenMode'
  | 'activeItemAnimation';

export interface PieChartTooltipProps {
  isEnabled?: boolean;
  isFullscreenEnabled?: boolean;
  dimension?: string;
  outputType?:
    | 'value'
    | 'value+dimension'
    | 'dimension'
    | 'percentage'
    | 'value+percentage'
    | 'value+dimension+percentage';
  valueRoundingDigits?: number | false;
  percentageRoundingDigits?: number;
}
export interface PieChartProps
  extends CommonProps,
    React.ComponentProps<typeof ResponsivePie> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  width?: string;
  features?: Array<PieChartFeatures>;
  cardProps?: Omit<WidgetCardProps, 'children'>;
  activeHighlight?: boolean;
  container?: Element | DocumentFragment;
  tooltipProps?: PieChartTooltipProps;
  legendOutputType?: 'value' | 'percentage' | 'value+percentage';
  data: PieChartLegendItem[];
  onFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}

export interface PieChartLegendItem extends MayHaveLabel {
  id: string | number;
  value: string | number;
  label: string;
  [key: string | number | symbol]: unknown;
}

export type PieChartLegendProps = {
  data?: Array<PieChartLegendItem>;
  useChartData?: boolean;
  activeHighlight?: boolean;
  colors?: Array<keyof MainColors | string>;
  backgroundColors?: Array<string>;
  className?: string;
  markerStyles?: SerializedStyles;
  currency?: string;
  labelListStyles?: SerializedStyles;
  valueListStyles?: SerializedStyles;
  variant?: 'valueList' | 'withoutValueList';
  renderValue?: (
    item: PieChartLegendItem,
    legendOutputType: PieChartProps['legendOutputType'],
  ) => NonNullable<React.ReactNode>;
  renderLabel?: (
    item: PieChartLegendItem,
    legendOutputType: PieChartProps['legendOutputType'],
  ) => NonNullable<React.ReactNode>;
};

export type PieChartTooltipViewProps = {
  point: PieTooltipProps<
    MayHaveLabel & {
      percentage?: number;
      dimension?: string;
    }
  >;
  outputType: PieChartTooltipProps['outputType'];
  dimension?: string;
  isFullscreenMode?: boolean;
  position: { x: number; y: number };
};
