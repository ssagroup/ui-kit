import { css, Theme } from '@emotion/react';

import { Avatar, Button, Typography, Icon } from '@ssa-ui-kit/core';

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
      <Avatar size={42} image={'/img/face/face_46.png'} />
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
