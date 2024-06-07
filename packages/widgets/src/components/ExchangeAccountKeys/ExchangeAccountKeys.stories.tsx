import { Meta, StoryObj } from '@storybook/react';
import { ExchangeAccountKeys } from './ExchangeAccountKeys';
import { StoryComponent } from './stories/StoryComponent';

export default {
  title: 'Industry-specific widgets/Training/ExchangeAccountKeys',
  component: ExchangeAccountKeys,
} as Meta<typeof ExchangeAccountKeys>;

export const Default: StoryObj<typeof ExchangeAccountKeys> = () => (
  <StoryComponent onDelete={() => alert('Account Deleted!')} />
);

Default.args = {};
