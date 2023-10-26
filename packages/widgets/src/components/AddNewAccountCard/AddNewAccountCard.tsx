import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { Button, Icon } from '@ssa-ui-kit/core';
import { AddNewAccountCardProps } from './types';
import { AccountCard, ResetBtnStyles } from './styles';

export const AddNewAccountCard = ({
  link,
  onclick,
}: AddNewAccountCardProps) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      {typeof onclick === 'function' ? (
        <Button onClick={onclick} css={[ResetBtnStyles, AccountCard]}>
          <Icon name="plus" size={12} color={theme.colors.blueRoyal} />
          Add new account
        </Button>
      ) : (
        <Link to={`${link}`} css={AccountCard}>
          <Icon name="plus" size={12} color={theme.colors.blueRoyal} />
          Add new account
        </Link>
      )}
    </React.Fragment>
  );
};
