import { RequestPeriod, GraphStatisticsWeighted } from '@fintech/types';

export type WeightedAveragePriceProps = {
  id?: string;
  data: GraphStatisticsWeighted['weightedPriceData'];
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
