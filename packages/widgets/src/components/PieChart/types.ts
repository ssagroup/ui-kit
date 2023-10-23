import { CommonProps, MainColors } from '@ssa-ui-kit/core';
import { ResponsivePie } from '@nivo/pie';

export interface PieChartProps
  extends CommonProps,
    React.ComponentProps<typeof ResponsivePie> {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export interface PieChartLegendProps {
  data: Array<{
    id: string | number;
    value: string | number;
    label: string;
    [key: string | number | symbol]: unknown;
  }>;
  // TODO: add the ability to use arbitrary color.
  // Need to modify Badge for that.
  colors: Array<keyof MainColors>;
  // TODO: legend config
}
