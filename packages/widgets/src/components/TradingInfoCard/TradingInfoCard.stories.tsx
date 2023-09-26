import type { Meta, StoryObj } from '@storybook/react';

import TradingInfoCard from './TradingInfoCard';
import { ITradingInfoCardProps } from './types';
import { Icon } from '@ssa-ui-kit/core';

export default {
  title: 'Widgets/TradingInfoCard',
  component: TradingInfoCard,
} as Meta<typeof TradingInfoCard>;

export const Default: StoryObj<typeof TradingInfoCard> = (
  args: ITradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => console.log('object')}
    />
  );
};

Default.args = {
  value: '500',
  unit: 'USD',
  title: 'Turnover',
};

export const WithTooltip: StoryObj<typeof TradingInfoCard> = (
  args: ITradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => console.log('object')}
    />
  );
};

WithTooltip.args = {
  value: '500.025',
  unit: 'USD',
  title: 'Turnover',
};

export const WithIcon: StoryObj<typeof TradingInfoCard> = (
  args: ITradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => console.log('object')}
    />
  );
};

WithIcon.args = {
  value: '500.025',
  unit: 'USD',
  title: 'Turnover',
  icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
};

export const WithoutUnit: StoryObj<typeof TradingInfoCard> = (
  args: ITradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => console.log('object')}
    />
  );
};

WithoutUnit.args = {
  value: 'ETH/USDT',
  title: 'Pairs',
};
