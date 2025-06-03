import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Icon } from '@ssa-ui-kit/core';
import TradingInfoCard from './TradingInfoCard';
import { TradingInfoCardProps } from './types';

export default {
  title: 'Trading/TradingInfoCard',
  component: TradingInfoCard,
} as Meta<typeof TradingInfoCard>;

export const Default: StoryObj<typeof TradingInfoCard> = (
  args: TradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => alert('clicked!')}
    />
  );
};

Default.args = {
  value: 500.55,
  unit: 'USD',
  title: 'Turnover',
};

export const WithLink: StoryObj<typeof TradingInfoCard> = (
  args: TradingInfoCardProps,
) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <TradingInfoCard
              value={args.value}
              unit={args.unit}
              title={args.title}
              icon={args.icon}
              link={'/link'}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

WithLink.args = {
  value: '500',
  unit: 'USD',
  title: 'Turnover',
};

export const WithTooltip: StoryObj<typeof TradingInfoCard> = (
  args: TradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => alert('clicked!')}
    />
  );
};

WithTooltip.args = {
  value: '500.025',
  unit: 'USD',
  title: 'Turnover',
};

export const WithIcon: StoryObj<typeof TradingInfoCard> = (
  args: TradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
      onClick={() => alert('clicked!')}
    />
  );
};

WithIcon.args = {
  value: '500.025',
  unit: 'USD',
  title: 'Turnover',
  icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
};

export const WithoutUnitAndClick: StoryObj<typeof TradingInfoCard> = (
  args: TradingInfoCardProps,
) => {
  return (
    <TradingInfoCard
      value={args.value}
      unit={args.unit}
      title={args.title}
      icon={args.icon}
    />
  );
};

WithoutUnitAndClick.args = {
  value: 'ETH/USDT',
  title: 'Pairs',
};

WithoutUnitAndClick.storyName = 'Without unit and onClick handler';
