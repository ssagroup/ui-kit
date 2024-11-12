import { PlotParams } from 'react-plotly.js';
import { PieChartProps } from '../PieChart';

export type ChartConfig = {
  showBars?: boolean;
  showLines?: boolean;
};

export interface BarLineComplexChartProps extends Omit<PlotParams, 'layout'> {
  layout?: PlotParams['layout'];
  cardProps?: PieChartProps['cardProps'];
  features?: Array<'header'>;
  chartConfig?: ChartConfig;
  data: Plotly.Data[];
  width?: string;
  height?: string;
}
