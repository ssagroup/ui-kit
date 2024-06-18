import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@components/Avatar';
import { UserProfile } from './UserProfile';

export default {
  title: 'Widgets/UserProfile',
  component: UserProfile,
} as Meta<typeof UserProfile>;

export const Default: StoryObj<typeof UserProfile> = () => {
  return (
    <UserProfile
      name="Josh Li"
      email="Josh@gmail.com"
      trigger={<Avatar size={42} image="https://via.placeholder.com/42x42" />}
      onClick={() => alert('Clicked!')}
    />
  );
};

Default.args = {};
