import { RequestPeriod, GraphsListItem } from '@fintech/types';

export type PNLProps = {
  data: Array<GraphsListItem>;
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
