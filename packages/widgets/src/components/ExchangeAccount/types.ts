import { To } from 'react-router-dom';
import { PieChartProps } from '@ssa-ui-kit/core';
import { AccountBalanceProps } from '@components/AccountBalance';

export interface ExchangeAccountProps {
  platform: string | JSX.Element;
  title: string;
  status: 'Active' | 'NotAvailable';
  onClick?: () => void;
  onDelete: () => void;
  link?: To;
  data: Omit<AccountBalanceProps, 'title' | 'className' | 'onClick' | 'link'>;
  pieChartProps?: Partial<PieChartProps>;
}
