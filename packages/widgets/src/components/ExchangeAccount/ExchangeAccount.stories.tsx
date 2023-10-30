import { Meta, StoryObj } from '@storybook/react';
import { ExchangeAccount } from './ExchangeAccount';

export default {
  title: 'Widgets/ExchangeAccount',
  component: ExchangeAccount,
} as Meta<typeof ExchangeAccount>;

export const Default: StoryObj<typeof ExchangeAccount> = () => {
  return <ExchangeAccount />;
};

Default.args = {};
