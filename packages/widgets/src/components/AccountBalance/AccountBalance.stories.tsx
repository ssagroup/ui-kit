import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import { mainTheme } from '@ssa-ui-kit/core';

import { data } from './stories/fixtures';

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
  data,
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

export const Custom: StoryObj<typeof AccountBalance> = (
  args: AccountBalanceProps,
) => {
  return (
    <AccountBalance
      {...args}
      css={css`
        ul li {
          height: auto;
        }
      `}
    />
  );
};

Custom.args = {
  total: 48700.53569,
  currency: 'USDT',
  variant: 'withoutValueList',
  chartColorPalette: [
    mainTheme.colors.blue as string,
    mainTheme.colors.green as string,
  ],
  legendColorPalette: ['blue', 'green'],
  data: [
    {
      id: 'BTC',
      label: 'BTC',
      value: 571.23,
      legendValue: 12323,
    },
    {
      id: 'LTC',
      label: 'LTC',
      value: 530.25,
      legendValue: 12323,
    },
  ],
};
