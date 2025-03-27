import { To } from 'react-router-dom';
import { PieChartProps } from '@ssa-ui-kit/core';

import { AccountBalanceProps } from '@components/AccountBalance';

export interface ExchangeAccountProps {
  platform?: React.ReactNode;
  title?: React.ReactNode;
  status?: 'Active' | 'NotAvailable';
  disabled?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  link?: To;
  data: Omit<AccountBalanceProps, 'title' | 'className' | 'onClick' | 'link'>;
  pieChartProps?: Partial<PieChartProps>;
  children?: React.ReactNode;
}
