import { MayHaveLabel } from '@nivo/pie';

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
  parts: BalanceDataPartsItem[];
};

export type BalanceData = Array<BalanceDataItem>;

export type SegmentedPieChartProps = {
  balanceData: BalanceData;
  balanceDataTotal: number;
};

export interface BalanceDataForGraph extends MayHaveLabel {
  mainLabel: string;
  mainPercentage: number;
  partLabel: string;
  partPercentage: number;
  id: number | string;
  mainId: number;
  value: number | string;
  color: string;
}
