import { useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { UserProfile } from './UserProfile';
import Icon from '@components/Icon';

export default {
  title: 'Widgets/UserProfile',
  component: UserProfile,
} as Meta<typeof UserProfile>;

export const Default: StoryObj<typeof UserProfile> = () => {
  const theme = useTheme();
  return (
    <UserProfile
      name="Josh Li"
      email="Josh@gmail.com"
      trigger={<Icon size={42} name="user" color={theme.colors.grey} />}
      onClick={() => alert('Clicked!')}
    />
  );
};

Default.args = {};
