import { WidgetCardProps } from '@components/WidgetCard';
import { MustInclude } from '@ssa-ui-kit/utils';

export type BarGaugeChartFeature = 'header' | 'fullscreenMode';

export type GaugeBarThreshold = { value: number; color: string };

export type GaugeBarValueFormatter = (
  value: number,
  color: string,
) => React.ReactNode;

export interface BarGaugeChartHeaderProps<T extends string[]> {
  features: MustInclude<T, 'fullscreenMode'>;
}

export interface GaugeBarProps {
  value: number;
  valueFormatter?: GaugeBarValueFormatter;
  title?: React.ReactNode;
  thresholds?: GaugeBarThreshold[];
  gap?: number;
  brickWidth?: number;
  min?: number;
  max?: number;
}

export interface BarGaugeChartProps {
  title?: string;
  widgetCardProps?: WidgetCardProps;
  bars?: GaugeBarProps[];
  features?: BarGaugeChartFeature[];
}
