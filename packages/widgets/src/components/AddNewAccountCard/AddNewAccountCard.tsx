import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@ssa-ui-kit/core';
import { AddNewAccountCardProps } from './types';
import { AccountCard, ResetBtnStyles } from './styles';
import { css } from '@emotion/react';

export const AddNewAccountCard = ({
  children,
  link,
  onClick,
}: AddNewAccountCardProps) => {
  return (
    <Card
      noShadow
      css={css`
        ${AccountCard}
      `}>
      {children}
      {/* {typeof onclick === 'function' ? (
        <div onClick={onClick}>{children}</div>
      ) : (
        <Link to={link ? link : ''} css={AccountCard}>
          {children}
        </Link>
      )} */}
    </Card>
  );
};
