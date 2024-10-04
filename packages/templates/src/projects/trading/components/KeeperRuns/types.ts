import { RequestPeriod, GraphsListItem } from '@trading/types';

export type KeeperRunsProps = {
  id?: string;
  data: Array<GraphsListItem>;
  period: RequestPeriod;
  onClick?: () => void;
};
