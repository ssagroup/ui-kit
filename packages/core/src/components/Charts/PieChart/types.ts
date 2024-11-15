import { SerializedStyles } from '@emotion/react';
import { ResponsivePie, MayHaveLabel } from '@nivo/pie';
import { CommonProps, WidgetCardProps } from '../../..';

export type PieChartFeatures =
  | 'header'
  | 'fullscreenMode'
  | 'activeItemAnimation';
export interface PieChartProps
  extends CommonProps,
    React.ComponentProps<typeof ResponsivePie> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  width?: string;
  features?: Array<PieChartFeatures>;
  cardProps?: Omit<WidgetCardProps, 'children'>;
  activeHighlight?: boolean;
  onFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}

export interface PieChartLegendItem extends MayHaveLabel {
  id: string | number;
  value: string | number;
  label: string;
  [key: string | number | symbol]: unknown;
}

export interface PieChartLegendProps {
  data: Array<PieChartLegendItem>;
  activeHighlight?: boolean;
  colors?: Array<keyof MainColors | string>;
  backgroundColors?: Array<string>;
  className?: string;
  markerStyles?: SerializedStyles;
  currency?: string;
  labelListStyles?: SerializedStyles;
  valueListStyles?: SerializedStyles;
  variant?: 'valueList' | 'withoutValueList';
  renderValue?: (item: PieChartLegendItem) => NonNullable<React.ReactNode>;
  renderLabel?: (item: PieChartLegendItem) => NonNullable<React.ReactNode>;
}
