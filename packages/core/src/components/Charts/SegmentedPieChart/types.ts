import { PieChartLegend, PieChartLegendItem, PieChartProps } from '@components';
import { TooltipProps } from '@components/Tooltip/types';
import { CommonProps } from '@global-types/emotion';

type SegmentedDataMainInfo = {
  label: string;
  value: number;
  legendValue: number;
};

export interface SegmentedDataItem extends PieChartLegendItem {
  legendValue: number;
  legendLabel?: string;
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
  legendValueRoundingDigits?: number;
  legendPercentageRoundingDigits?: number;
  showDimensions?: boolean;
  showPercentage?: boolean;
  titleTooltipOptions?: Array<ChartTitleOption>;
  tooltipConfig?: Partial<TooltipProps>;
  renderTitleTooltipContent?: (props: {
    totalAmount: number;
    totalDimension: string;
  }) => React.ReactNode;
}

export interface BalanceDataForGraph extends PieChartLegendItem {
  label: string;
  legendLabel?: string;
  legendValueRoundingDigits: number;
  percentage: number;
  partIndex?: number;
  partLabel?: string;
  partPercentage?: number;
  id: number | string;
  mainId: number;
  value: number | string;
  color: string;
}

export type LegendItemProps = {
  label: string;
  legendLabel?: string;
  percentage?: number;
  legendValue?: number;
  legendValueRoundingDigits: number;
};

export type ChartTitleOption = Pick<BalanceDataForGraph, 'value' | 'label'> & {
  dimension?: string;
  legendValueRoundingDigits?: number;
  legendPercentageRoundingDigits?: number;
};
