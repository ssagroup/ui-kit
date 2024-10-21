import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { css } from '@emotion/react';
import { mainTheme, FullscreenModeProvider } from '@ssa-ui-kit/core';

import { data } from './stories/fixtures';

import { AccountBalance, AccountBalanceProps } from './index';

export default {
  title: 'Trading/AccountBalance',
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
        <Route
          path="/*"
          element={
            <FullscreenModeProvider>
              <AccountBalance {...args} />
            </FullscreenModeProvider>
          }
        />
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
    <FullscreenModeProvider>
      <AccountBalance
        {...args}
        css={css`
          ul li {
            height: auto;
          }
        `}
      />
    </FullscreenModeProvider>
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

export const WithoutPaletteColors: StoryObj<typeof AccountBalance> = (
  args: AccountBalanceProps,
) => {
  return (
    <FullscreenModeProvider>
      <AccountBalance
        {...args}
        css={css`
          ul li {
            height: auto;
          }
        `}
      />
    </FullscreenModeProvider>
  );
};

WithoutPaletteColors.args = {
  total: 48700.53569,
  currency: 'USDT',
  variant: 'withoutValueList',
  chartColorPalette: ['#F7931A', '#50AF95'],
  legendColorPalette: [
    'linear-gradient(243.84deg, rgb(235, 117, 86), rgb(242, 136, 142))',
    '#50AF95',
  ],
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
