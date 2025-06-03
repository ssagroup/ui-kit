import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, Icon, Wrapper } from '@ssa-ui-kit/core';

import { AccountKeys } from './AccountKeys';
import { StoryComponent } from './stories/StoryComponent';
import { useAccountKeys } from './useAccountKeys';

export default {
  title: 'Trading/AccountKeys',
  component: AccountKeys,
} as Meta<typeof AccountKeys>;

export const Default: StoryObj<typeof AccountKeys> = () => (
  <StoryComponent onDelete={() => alert('Account Deleted!')} />
);

Default.args = {};

export const WithoutDeleteButton: StoryObj<typeof AccountKeys> = () => (
  <StoryComponent />
);

WithoutDeleteButton.args = {};

export const Composition: StoryObj<typeof AccountKeys> = () => {
  const apiKey = '123456789012345678901234567890';
  const secretKey = '1234567890';
  return (
    <AccountKeys apiKey={apiKey} secretKey={secretKey}>
      <AccountKeys.Header>
        <Wrapper css={{ gap: '10px' }}>
          <span css={{ color: 'green' }}>Account Name</span>
          <Icon name="check" size={15} color="green" />
        </Wrapper>

        <Button variant="tertiary">
          <Icon name="unlock" size={15} />
        </Button>
      </AccountKeys.Header>
      <AccountKeys.Content />
    </AccountKeys>
  );
};

Composition.args = {};

export const ControlledState = () => {
  const store = useAccountKeys({
    apiKey: '123456789012345678901234567890',
    secretKey: '1234567890',
    title: 'Account Name',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      store.toggleVisible();
    }, 2000);
    return () => clearInterval(interval);
  });

  return <AccountKeys store={store} />;
};

ControlledState.parameters = {
  lostpixel: {
    disable: true,
  },
};
