import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import { Button, Icon } from '@ssa-ui-kit/core';
import TradingScoreboard from './TradingScoreboard';
import { ITradingScoreboardProps } from './types';

export default {
  title: 'Widgets/TradingScoreboard',
  component: TradingScoreboard,
} as Meta<typeof TradingScoreboard>;

export const Default: StoryObj<typeof TradingScoreboard> = (
  args: ITradingScoreboardProps,
) => {
  return (
    <TradingScoreboard
      items={args.items}
      itemsPerRow={args.itemsPerRow}
      onClick={() => alert('clicked!')}
      css={css`
        gap: 4px;
      `}
    />
  );
};

Default.args = {
  itemsPerRow: 5,
  items: [
    {
      value: (
        <div>
          <Icon name="stats" color="gold" size={16} />
          <span css={{ marginLeft: '10px' }}>Binance</span>
        </div>
      ),
      title: 'Exchange',
    },
    {
      value: 'Account name',
      title: 'Account',
    },
    {
      value: 'Grid v7',
      title: 'Strategy',
    },
    {
      value: 'ETH/USDT',
      title: 'Pairs',
    },
    {
      value: '25',
      title: 'Orders',
    },
    {
      value: '27.07.23',
      unit: '4:22:23 pm',
      title: 'Start Date',
    },
    {
      value: '30.07.23',
      unit: '4:22:23 pm',
      title: 'End date',
    },
    {
      value: '4d 5h 36m 2s',
      title: 'Launch duration',
    },
    {
      value: '25',
      unit: '%',
      title: 'ROI',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '340.025',
      unit: 'USD',
      title: 'PNL',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
  ],
};

export const OneLine: StoryObj<typeof TradingScoreboard> = (
  args: ITradingScoreboardProps,
) => {
  return (
    <TradingScoreboard
      items={args.items}
      itemsPerRow={args.itemsPerRow}
      onClick={() => alert('clicked!')}
      css={css`
        gap: 4px;
      `}
    />
  );
};

OneLine.args = {
  itemsPerRow: 7,
  items: [
    {
      value: '16',
      title: 'Exchanges',
    },
    {
      value: '6',
      title: 'Accounts',
    },
    {
      value: '62',
      title: 'Orders',
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
    },
    {
      value: '340',
      unit: 'USD',
      title: 'PNL',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '25',
      unit: '%',
      title: 'ROI',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '15',
      title: 'Errors',
    },
  ],
};

export const WithCustomComponent: StoryObj<typeof TradingScoreboard> = (
  args: ITradingScoreboardProps,
) => {
  return (
    <TradingScoreboard
      items={args.items}
      itemsPerRow={args.itemsPerRow}
      renderCard={(item, onClick) => (
        <Button
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            height: 'auto',
            padding: '10px',
          }}
          variant="secondary"
          onClick={() => onClick?.(item)}>
          <span css={{ fontWeight: '600' }}>
            {item.value} {item.unit}
          </span>
          <span>{item.title}</span>
        </Button>
      )}
      css={css`
        gap: 4px;
        color: white;
      `}
    />
  );
};

WithCustomComponent.args = {
  itemsPerRow: 7,
  items: [
    {
      value: '16',
      title: 'Exchanges',
    },
    {
      value: '6',
      title: 'Accounts',
    },
    {
      value: '62',
      title: 'Orders',
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
    },
    {
      value: '340',
      unit: 'USD',
      title: 'PNL',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '25',
      unit: '%',
      title: 'ROI',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '15',
      title: 'Errors',
    },
  ],
};

export const WithLink: StoryObj<typeof TradingScoreboard> = (
  args: ITradingScoreboardProps,
) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/*'}
          element={
            <TradingScoreboard
              items={args.items}
              itemsPerRow={args.itemsPerRow}
              css={css`
                gap: 4px;
              `}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

WithLink.args = {
  itemsPerRow: 7,
  items: [
    {
      value: '16',
      title: 'Exchanges',
      link: '/Exchanges',
    },
    {
      value: '6',
      title: 'Accounts',
      link: '/Accounts',
    },
    {
      value: '62',
      title: 'Orders',
      link: '/Orders',
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      link: '/Turnover',
    },
    {
      value: '340',
      unit: 'USD',
      title: 'PNL',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
      link: '/PNL',
    },
    {
      value: '25',
      unit: '%',
      title: 'ROI',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
      link: '/ROI',
    },
    {
      value: '15',
      title: 'Errors',
      link: '/Errors',
    },
  ],
};
