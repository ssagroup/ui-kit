import { SerializedStyles } from '@emotion/react';
import { ResponsivePie } from '@nivo/pie';
import { CommonProps } from '../..';

export interface PieChartProps
  extends CommonProps,
    React.ComponentProps<typeof ResponsivePie> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export type PieChartLegendItem = {
  id: string | number;
  value: string | number;
  label: string;
  [key: string | number | symbol]: unknown;
};

export interface PieChartLegendProps {
  data: Array<PieChartLegendItem>;
  colors?: Array<keyof MainColors>;
  backgroundColors?: Array<string>;
  renderValue?: (item: PieChartLegendItem) => NonNullable<React.ReactNode>;
  renderLabel?: (item: PieChartLegendItem) => NonNullable<React.ReactNode>;
  className?: string;
  markerStyles?: SerializedStyles;
  currency?: string;
  labelListStyles?: SerializedStyles;
  valueListStyles?: SerializedStyles;
  variant?: 'valueList' | 'withoutValueList';
}
