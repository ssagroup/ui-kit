import { GraphsListItem, RequestPeriod } from '@fintech/types';

export type KeeperRunsProps = {
  id?: string;
  data: Array<GraphsListItem>;
  period: RequestPeriod;
  onClick?: () => void;
};
