import { css, Theme } from '@emotion/react';

import { Avatar, Button, Icon, Typography } from '@ssa-ui-kit/core';

import { User } from './types';

const container = (theme: Theme) => css`
  display: flex;
  align-items: center;

  button {
    display: none;
  }

  ${theme.mediaQueries.lg} {
    justify-content: space-between;

    button {
      display: block;
    }
  }
`;
const UserCardCredentials = ({
  name,
  email,
}: Partial<Pick<User, 'name' | 'email'>>) => (
  <div css={container}>
    <div
      css={css`
        display: flex;
        align-items: center;
      `}>
      <Avatar
        size={42}
        image={
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fface%2Fface_46.png?alt=media&token=aaa3a75c-4779-4887-b011-352f8dd6c214'
        }
      />
      <div
        css={css`
          padding-inline: 15px;
        `}>
        <Typography variant="subtitle">{name}</Typography>
        <Typography variant="body1">{email}</Typography>
      </div>
    </div>

    <Button
      variant="tertiary"
      size="large"
      endIcon={<Icon name="notification" />}
    />
  </div>
);

export default UserCardCredentials;
