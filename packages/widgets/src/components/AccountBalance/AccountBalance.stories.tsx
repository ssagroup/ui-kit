import type { Meta, StoryObj } from '@storybook/react';

import { AccountBalance } from './index';

export default {
  title: 'Widgets/AccountBalance',
  component: AccountBalance,
} as Meta<typeof AccountBalance>;

export const Default: StoryObj<typeof AccountBalance> = {};
Default.args = {
  total: 48700.53569,
  currency: 'USDT',
  onClick: () => alert('Clicked!'),
  data: [
    {
      id: 'BTC', // coinName
      label: 'BTC', // coinName
      legendValue: 1, // coins
      value: 35371.23, // price
    },
    {
      id: 'USDT',
      label: 'USDT',
      legendValue: 10000,
      value: 10000,
    },
    {
      id: 'ETH',
      label: 'ETH',
      legendValue: 1,
      value: 1815.31,
    },
    {
      id: 'Other',
      label: 'Other',
      legendValue: 943,
      value: 1513.9956,
    },
  ],
};
