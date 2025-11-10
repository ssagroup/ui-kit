import { useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { UserProfile } from '@components';
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

export const WithAdditionalInfo: StoryObj<typeof UserProfile> = () => {
  const theme = useTheme();
  return (
    <UserProfile
      name="Josh Li"
      email="Josh@gmail.com"
      additionalInfo={['Active', 'Administrator']}
      trigger={<Icon size={42} name="user" color={theme.colors.grey} />}
      onClick={() => alert('Clicked!')}
    />
  );
};

WithAdditionalInfo.args = {};

export const WithAdditionalInfoComponents: StoryObj<
  typeof UserProfile
> = () => {
  const theme = useTheme();
  return (
    <UserProfile
      name="Josh Li"
      email="Josh@gmail.com"
      additionalInfo={[
        <span
          key="status"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="check-circle" size={12} color={theme.colors.green} />
          Active
        </span>,
        <span
          key="role"
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="user" size={12} color={theme.colors.grey} />
          Administrator
        </span>,
      ]}
      trigger={<Icon size={42} name="user" color={theme.colors.grey} />}
      onClick={() => alert('Clicked!')}
    />
  );
};

WithAdditionalInfoComponents.args = {};

export const WithCustomContent: StoryObj<typeof UserProfile> = () => {
  const theme = useTheme();
  return (
    <UserProfile
      name="Josh Li"
      email="Josh@gmail.com"
      additionalInfo={['Active', 'Administrator']}
      customContent={
        <div>
          <div style={{ marginBottom: 8 }}>
            <strong>Settings</strong>
          </div>
          <div style={{ marginBottom: 4, cursor: 'pointer' }}>
            Profile Settings
          </div>
          <div style={{ marginBottom: 4, cursor: 'pointer' }}>
            Account Preferences
          </div>
        </div>
      }
      trigger={<Icon size={42} name="user" color={theme.colors.grey} />}
      onClick={() => alert('Clicked!')}
    />
  );
};

WithCustomContent.args = {};
