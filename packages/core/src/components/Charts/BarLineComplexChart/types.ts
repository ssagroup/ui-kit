import { MutableRefObject } from 'react';
import { PlotParams } from 'react-plotly.js';
import { PieChartProps } from '../PieChart';

export type BarLineChartItem = Plotly.Data & {
  selected?: boolean;
  showOnHover?: boolean;
  valueDimension?: string | null;
};

export type BarLineComplexChartFeatures =
  | 'header'
  | 'filtering'
  | 'fullscreenMode';

export interface BarLineComplexChartProps extends Omit<PlotParams, 'layout'> {
  layout?: PlotParams['layout'];
  cardProps?: PieChartProps['cardProps'];
  features?: Array<BarLineComplexChartFeatures>;
  data: BarLineChartItem[];
  lineShape?: Plotly.ScatterLine['shape'];
  width?: string;
  height?: string;
  title?: string;
  maxVisibleBars?: number;
  maxVisibleLines?: number;
  container?: Element | DocumentFragment;
  systemModeBarButtons?: Array<Plotly.ModeBarDefaultButtons>;
  onChange?: (name: string | number, isSelected: boolean) => void;
  onFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}

export type BarLineComplexInternalProps = Omit<
  BarLineComplexChartProps,
  | 'data'
  | 'lineShape'
  | 'maxVisibleBars'
  | 'maxVisibleLines'
  | 'title'
  | 'features'
>;

export interface BarLineComplexChartContextProps {
  data: BarLineChartItem[];
  filteredData: BarLineChartItem[];
  lineShape?: Plotly.ScatterLine['shape'];
  isMaxBarsSelected: boolean;
  isMaxLinesSelected: boolean;
  maxVisibleBars?: number;
  maxVisibleLines?: number;
  selected: Array<number | string>;
  barsSelected: Array<number | string>;
  linesSelected: Array<number | string>;
  features: BarLineComplexChartProps['features'];
  setFilteredData: React.Dispatch<React.SetStateAction<BarLineChartItem[]>>;
  setData: React.Dispatch<React.SetStateAction<BarLineChartItem[]>>;
  setBarsSelected: React.Dispatch<React.SetStateAction<Array<number | string>>>;
  setLinesSelected: React.Dispatch<
    React.SetStateAction<Array<number | string>>
  >;
}

export interface BarLineComplexChartContextProviderProps
  extends Pick<
    BarLineComplexChartProps,
    'data' | 'lineShape' | 'maxVisibleBars' | 'maxVisibleLines' | 'features'
  > {
  children: React.ReactNode;
}

export interface UseChartInfo {
  (): {
    transformedChartData: Plotly.Data[];
    tooltipContentRef: MutableRefObject<HTMLDivElement | null>;
    modeBarButtonsByKey: Record<string, Plotly.ModeBarButtonAny>;
  };
}
