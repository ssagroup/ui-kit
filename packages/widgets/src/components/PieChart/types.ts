import { CommonProps } from '@ssa-ui-kit/core';

export interface PieChartProps extends CommonProps {
  data: Array<{ id: string | number; value: number }>;
  title?: React.ReactNode;
  // TODO: need to have everything required for the Pie chart and for the Legend
  colors?: [];
  showLegend?: boolean;
  // TODO: Nivo Chart's props for config
}

export interface PieChartLegendProps {
  // TODO: take from PieChartProps
  data: Array<{ id: string | number; value: number }>;
}
