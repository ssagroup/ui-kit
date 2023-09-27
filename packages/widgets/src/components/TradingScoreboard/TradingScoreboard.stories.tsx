import { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@ssa-ui-kit/core';
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
    <TradingScoreboard itemsPerRow={args.itemsPerRow} items={args.items} />
  );
};

Default.args = {
  itemsPerRow: 5,
  items: [
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
    {
      value: '500.025',
      unit: 'USD',
      title: 'Turnover',
      icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    },
  ],
};
