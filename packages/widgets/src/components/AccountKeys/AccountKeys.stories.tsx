import type { Meta, StoryObj } from '@storybook/react';
import { AccountKeys } from './AccountKeys';
import { StoryComponent } from './stories/StoryComponent';

export default {
  title: 'Trading/AccountKeys',
  component: AccountKeys,
} as Meta<typeof AccountKeys>;

export const Default: StoryObj<typeof AccountKeys> = () => (
  <StoryComponent onDelete={() => alert('Account Deleted!')} />
);

Default.args = {};
