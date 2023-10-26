import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AccountBalance, AccountBalanceProps } from './index';

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

export const WithLink: StoryObj<typeof AccountBalance> = (
  args: AccountBalanceProps,
) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<AccountBalance {...args} />} />
      </Routes>
    </MemoryRouter>
  );
};
WithLink.args = {
  ...Default.args,
  link: '/',
};
