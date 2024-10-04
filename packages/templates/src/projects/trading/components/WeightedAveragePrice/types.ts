import { RequestPeriod, GraphStatisticsWeighted } from '@trading/types';

export type WeightedAveragePriceProps = {
  id?: string;
  data: GraphStatisticsWeighted['weightedPriceData'];
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
