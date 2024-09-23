import { RequestPeriod, GraphsListItem } from '@trading/types';

export type TurnoverDataItem = {
  [key: string]: string | number;
} & Pick<GraphsListItem, 'timestamp' | 'turnover'>;

export type TurnoverProps = {
  data: Array<GraphsListItem>;
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
