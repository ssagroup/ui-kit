import { PlotParams } from 'react-plotly.js';
import { PieChartProps } from '../PieChart';

export interface BarLineComplexChartProps extends Omit<PlotParams, 'layout'> {
  layout?: PlotParams['layout'];
  cardProps?: PieChartProps['cardProps'];
  features?: Array<'header'>;
  data: Plotly.Data[];
  lineShape?: Plotly.ScatterLine['shape'];
  width?: string;
  height?: string;
}
