import { Meta, StoryObj } from '@storybook/react';
import { ExchangeAccountKeys } from './ExchangeAccountKeys';

export default {
  title: 'Widgets/ExchangeAccountKeys',
  component: ExchangeAccountKeys,
} as Meta<typeof ExchangeAccountKeys>;

export const Default: StoryObj<typeof ExchangeAccountKeys> = () => {
  return <ExchangeAccountKeys />;
};

Default.args = {};
