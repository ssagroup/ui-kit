import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MarginInfo } from './MarginInfo';
import { MarginInfoProps } from './types';

export default {
  title: 'Trading/MarginInfo',
  component: MarginInfo,
} as Meta<typeof MarginInfo>;

export const Default: StoryObj<typeof MarginInfo> = (args: MarginInfoProps) => {
  return <MarginInfo {...args} />;
};

Default.args = {
  title: 'Margin Info (x3)',
  base: 'USDT',
  quote: 'BTC',
  baseBorrowed: (
    <>
      100 <strong>USD</strong> ≈0.000000001 <strong>BTC</strong> (x2)
    </>
  ),
  baseInterestRate: '5.2%',
  baseTotalInterest: (
    <>
      25 <strong>USDT</strong> (x1.5)
    </>
  ),
  quoteBorrowed: (
    <>
      ≈0.000000001 <strong>BTC</strong>
    </>
  ),
  quoteInterestRate: '4.8%',
  quoteTotalInterest: (
    <>
      0.0024 <strong>BTC</strong>
    </>
  ),
  onBorrow: () => alert('Borrow action triggered'),
  onRepay: () => alert('Repay action triggered'),
};

export const WithoutInterestRate: StoryObj<typeof MarginInfo> = (
  args: MarginInfoProps,
) => {
  return <MarginInfo {...args} />;
};

WithoutInterestRate.args = {
  ...Default.args,
  showInterestRate: false,
};

export const DisabledButtons: StoryObj<typeof MarginInfo> = (
  args: MarginInfoProps,
) => {
  return <MarginInfo {...args} />;
};

DisabledButtons.args = {
  ...Default.args,
  disableBorrow: true,
  disableRepay: true,
};

export const CustomLabels: StoryObj<typeof MarginInfo> = (
  args: MarginInfoProps,
) => {
  return <MarginInfo {...args} />;
};

CustomLabels.args = {
  ...Default.args,
  borrowedLabel: 'Total Borrowed',
  interestRateLabel: 'APR',
  totalInterestLabel: 'Accumulated Interest',
};
