import { RequestPeriod, GraphStatistics } from '@trading/types';

export type WeightedAveragePriceProps = {
  id?: string;
  data: GraphStatistics['weightedPriceData'];
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
