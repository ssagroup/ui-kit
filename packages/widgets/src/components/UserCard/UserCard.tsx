import { Fragment } from 'react';

import { css, Theme } from '@emotion/react';

import { Icon } from '@ssa-ui-kit/core';

import { User } from './types';
import UserCardBMI from './UserCardBMI';
import UserCardCredentials from './UserCardCredentials';

const container = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;

  ${theme.mediaQueries.lg} {
    grid-template-columns: auto;
  }
`;

const UserCard = ({ user }: { user: User | null }) => (
  <Fragment>
    <div css={container}>
      <div
        css={(theme: Theme) => css`
          ${theme.mediaQueries.lg} {
            display: none;
          }
        `}>
        <label
          htmlFor="aside"
          css={css`
            cursor: pointer;
          `}>
          <Icon name="carrot-left" size={16} />
        </label>
      </div>

      <UserCardCredentials name={user?.name} email={user?.email} />
    </div>

    <UserCardBMI weight={user?.weight} height={user?.height} age={user?.age} />
  </Fragment>
);

export default UserCard;
