import {
  RequestPeriod,
  GraphsListItem,
  RebalancingItem,
  RebalancingItemKeys,
} from '@fintech/types';
import { getExtendedInfo } from '@fintech/utils/charts';

export type RebalanceDataItem = RebalancingItem &
  Pick<GraphsListItem, 'timestamp'>;

export type RebalanceProps = {
  id?: string;
  data: Array<GraphsListItem>;
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};

export type ExtendedInfoData = {
  [key in RebalancingItemKeys]: ReturnType<typeof getExtendedInfo>;
};
