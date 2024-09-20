import { CommonProps } from '@global-types/emotion';
import { MayHaveLabel } from '@nivo/pie';
import { PieChartLegend, PieChartProps } from '@components';

type BalanceDataPartsItem = {
  label: string;
  percentage: number;
  value: number;
};

type BalanceDataItem = {
  id: number;
  value: number;
  label: string;
  percentage: number;
  parts?: BalanceDataPartsItem[];
};

export type BalanceData = Array<BalanceDataItem>;

export interface SegmentedPieChartProps extends CommonProps {
  data: BalanceData;
  pieChartProps?: Partial<PieChartProps>;
  pieChartLegendProps?: Partial<React.ComponentProps<typeof PieChartLegend>>;
  legendBackgrounds?: string[];
  pieChartColors?: string[][];
  currency?: string;
  otherLabel?: string;
}

export interface BalanceDataForGraph extends MayHaveLabel {
  mainLabel: string;
  mainPercentage: number;
  partLabel?: string;
  partPercentage?: number;
  id: number | string;
  mainId: number;
  value: number | string;
  color: string;
}
