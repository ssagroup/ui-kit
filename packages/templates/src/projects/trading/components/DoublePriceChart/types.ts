import { RequestPeriod, GraphsListItem } from '@trading/types';

export type DoublePriceChartProps = {
  data: Array<GraphsListItem>;
  currency: string;
  period: RequestPeriod;
  aggregationPeriod: 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
  onClick?: () => void;
};
