import { RequestPeriod, GraphsListItem } from '@trading/types';

export type PNLProps = {
  data: Array<GraphsListItem>;
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
