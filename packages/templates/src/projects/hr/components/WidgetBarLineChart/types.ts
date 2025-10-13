import { BarLineComplexChart } from '@ssa-ui-kit/core';

import { DashboardGraphsItem } from '@/hr/types';

type BarLineComplexChartProps = Parameters<typeof BarLineComplexChart>[0];

export interface WidgetBarLineChartProps extends BarLineComplexChartProps {
  gridArea: string;
  data: DashboardGraphsItem[];
  timestamps: number[];
  handleFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}
