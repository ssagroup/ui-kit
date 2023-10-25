import { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from '../UserProfile';
import { StoryComponent } from './StoryComponent';

export default {
  title: 'Widgets/UserProfile',
  component: UserProfile,
} as Meta<typeof UserProfile>;

export const Default: StoryObj<typeof UserProfile> = () => {
  return <StoryComponent />;
};

Default.args = {};
