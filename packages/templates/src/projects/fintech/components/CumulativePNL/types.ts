import { GraphsListItem, RequestPeriod } from '@fintech/types';

type CumulativePNLDataItem = {
  [key: string]: unknown;
} & Pick<
  GraphsListItem,
  | 'timestamp'
  | 'cumulativePNL'
  | 'cumulativePnlInvestment'
  | 'cumulativePnlTotal'
>;

export type CumulativePNLProps = {
  data: Array<CumulativePNLDataItem>;
  currency: string;
  period: RequestPeriod;
  onClick?: () => void;
};
