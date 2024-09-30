import { CommonProps } from '@global-types/emotion';
import { PieChartLegend, PieChartLegendItem, PieChartProps } from '@components';

type SegmentedDataMainInfo = {
  label: string;
  value: number;
  legendValue: number;
};

interface SegmentedDataItem extends PieChartLegendItem {
  legendValue: number;
  parts?: SegmentedDataMainInfo[];
}

export type SegmentedDataSet = Array<SegmentedDataItem>;

export interface SegmentedPieChartProps extends CommonProps {
  data: SegmentedDataSet;
  totalAmount: number;
  totalDimension: string;
  pieChartProps?: Partial<PieChartProps>;
  pieChartLegendProps?: Partial<React.ComponentProps<typeof PieChartLegend>>;
  legendBackgrounds?: string[];
  pieChartColors?: string[][];
  currency?: string;
  otherLabel?: string;
  tooltipRoundingDigits?: number;
  legendValueRoundingDigits?: number;
  legendPercentageRoundingDigits?: number;
}

export interface BalanceDataForGraph extends PieChartLegendItem {
  label: string;
  percentage: number;
  partIndex?: number;
  partLabel?: string;
  partPercentage?: number;
  id: number | string;
  mainId: number;
  value: number | string;
  color: string;
}
