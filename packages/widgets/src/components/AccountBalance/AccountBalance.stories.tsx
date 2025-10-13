import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { css } from '@emotion/css';
import { css as cssReact } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { mainTheme } from '@ssa-ui-kit/core';

import { AccountBalance, AccountBalanceProps } from './index';
import { data } from './stories/fixtures';

export default {
  title: 'Trading/AccountBalance',
  component: AccountBalance,
} as Meta<typeof AccountBalance>;

export const Default: StoryObj<typeof AccountBalance> = {};
Default.args = {
  total: 48700.53,
  currency: 'USDT',
  onClick: () => alert('Clicked!'),
  widgetMaxWidth: '290px',
  className: css`
    & .pie-chart-wrapper p {
      font-size: 12px;
    }
  `,
  data,
};

export const WithFullscreenMode: StoryObj<typeof AccountBalance> = {};
WithFullscreenMode.args = {
  ...Default.args,
  fullscreenModeFeature: true,
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
      css={cssReact`
        ul li {
          height: auto;
        }
        & .pie-chart-wrapper p {
          font-size: 12px;
        }
      `}
    />
  );
};

Custom.args = {
  total: 48700.53,
  currency: 'USDT',
  variant: 'withoutValueList',
  chartColorPalette: [
    mainTheme.colors.blue as string,
    mainTheme.colors.green as string,
  ],
  legendColorPalette: ['blue', 'green'],
  widgetMaxWidth: '240px',
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

export const WithTotalTooltip: StoryObj<typeof AccountBalance> = (
  args: AccountBalanceProps,
) => {
  return <AccountBalance {...args} />;
};

WithTotalTooltip.args = {
  ...Default.args,
  tooltip: {
    config: {
      placement: 'top-start',
    },
    content: (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 5px;
        `}>
        <div css={{ padding: 10 }}>Tooltip Content</div>
      </div>
    ),
    classNames: {
      trigger: css`
        padding: 0 13px;
        border-radius: 25%;
      `,
      content: css`
        z-index: 10;
      `,
    },
  },
};

export const WithoutPaletteColors: StoryObj<typeof AccountBalance> = (
  args: AccountBalanceProps,
) => {
  return (
    <AccountBalance
      {...args}
      css={cssReact`
        ul li {
          height: auto;
        }
        & .pie-chart-wrapper p {
          font-size: 12px;
        }
      `}
    />
  );
};

WithoutPaletteColors.args = {
  total: 48700.53,
  currency: 'USDT',
  variant: 'withoutValueList',
  chartColorPalette: ['#F7931A', '#50AF95'],
  legendColorPalette: [
    'linear-gradient(243.84deg, rgb(235, 117, 86), rgb(242, 136, 142))',
    '#50AF95',
  ],
  widgetMaxWidth: '240px',
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
