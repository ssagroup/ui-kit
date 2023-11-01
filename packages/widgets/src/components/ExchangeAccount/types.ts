import { To } from 'react-router-dom';
import { AccountBalanceProps } from '@components/AccountBalance';

export interface ExchangeAccountProps {
  platform: string | JSX.Element;
  title: string;
  status: 'Active' | 'NotAvailable';
  onClick?: () => void;
  onDelete: () => void;
  link?: To;
  data: Omit<AccountBalanceProps, 'title' | 'className' | 'onClick' | 'link'>;
}
