import { CommonProps } from '@global-types/emotion';
import { MayHaveLabel } from '@nivo/pie';
import { PieChartLegend, PieChartProps } from '@components';

type BalanceDataPartsItem = {
  label: string;
  value: number;
};

type BalanceDataItem = {
  id: number;
  value: number;
  label: string;
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
  totalAmount: number;
  totalDimension: string;
}

export interface BalanceDataForGraph extends MayHaveLabel {
  mainLabel: string;
  mainPercentage: number;
  partIndex?: number;
  partLabel?: string;
  partPercentage?: number;
  id: number | string;
  mainId: number;
  value: number | string;
  color: string;
}
