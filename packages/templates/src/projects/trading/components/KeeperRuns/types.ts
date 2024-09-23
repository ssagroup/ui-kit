import { RequestPeriod, GraphsListItem } from '@/types';

export type KeeperRunsProps = {
  id?: string;
  data: Array<GraphsListItem>;
  period: RequestPeriod;
  onClick?: () => void;
};
