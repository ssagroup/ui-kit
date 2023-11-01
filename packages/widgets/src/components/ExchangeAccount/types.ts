import { AccountBalanceProps } from '@components/AccountBalance';

export interface ExchangeAccountProps {
  platform: string | JSX.Element;
  title: string;
  status: 'Active' | 'NotAvailable';
  onClick?: () => void;
  deleteOnClick: () => void;
  link?: string;
  data: AccountBalanceProps;
}
