import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import StatisticCard, { StatisticCardProps } from './StatisticCard';
import { Wrapper } from '@ssa-ui-kit/core';

export default {
  title: 'Widgets/StatisticCard',
  component: StatisticCard,
} as Meta<typeof StatisticCard>;

export const PriceCard: StoryObj<typeof StatisticCard> = (
  args: StatisticCardProps,
) => {
  const [active, setActive] = useState(false);

  return (
    <Wrapper
      onClick={() => setActive((prev) => !prev)}
      css={{ width: 'fit-content' }}>
      <StatisticCard
        value={args.value}
        unit={args.unit}
        title={args.title}
        isActive={active}
      />
    </Wrapper>
  );
};

PriceCard.args = {
  value: 500.234,
  unit: 'USD',
  title: 'Turnover',
  // icon: false,
};
