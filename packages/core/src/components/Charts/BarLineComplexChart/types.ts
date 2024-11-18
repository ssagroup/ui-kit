import { PlotParams } from 'react-plotly.js';
import { PieChartProps } from '../PieChart';

export type ChartItem = Plotly.Data & {
  selected?: boolean;
};

export interface BarLineComplexChartProps extends Omit<PlotParams, 'layout'> {
  layout?: PlotParams['layout'];
  cardProps?: PieChartProps['cardProps'];
  features?: Array<'header'>;
  data: ChartItem[];
  lineShape?: Plotly.ScatterLine['shape'];
  width?: string;
  height?: string;
  title?: string;
  maxVisibleBars?: number;
  maxVisibleLines?: number;
}

export type BarLineComplexInternalProps = Omit<
  BarLineComplexChartProps,
  | 'data'
  | 'lineShape'
  | 'maxVisibleBars'
  | 'maxVisibleLines'
  | 'features'
  | 'title'
>;

export interface BarLineComplexChartPContextProps {
  data: ChartItem[];
  filteredData: ChartItem[];
  lineShape?: Plotly.ScatterLine['shape'];
  maxVisibleBars?: number;
  maxVisibleLines?: number;
  setFilteredData: React.Dispatch<React.SetStateAction<ChartItem[]>>;
  setData: React.Dispatch<React.SetStateAction<ChartItem[]>>;
}

export interface BarLineComplexChartPContextProviderProps
  extends Pick<
    BarLineComplexChartProps,
    'data' | 'lineShape' | 'maxVisibleBars' | 'maxVisibleLines'
  > {
  children: React.ReactNode;
}
