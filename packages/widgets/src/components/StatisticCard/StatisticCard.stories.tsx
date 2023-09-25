import type { Meta, StoryObj } from '@storybook/react';

import StatisticCard, { StatisticCardProps } from './StatisticCard';

export default {
  title: 'Widgets/StatisticCard',
  component: StatisticCard,
} as Meta<typeof StatisticCard>;

export const PriceCard: StoryObj<typeof StatisticCard> = (
  args: StatisticCardProps,
) => {
  return (
    <StatisticCard value={args.value} unit={args.unit} title={args.title} />
  );
};

PriceCard.args = {
  value: 500.234,
  unit: 'USD',
  title: 'Turnover',
};
