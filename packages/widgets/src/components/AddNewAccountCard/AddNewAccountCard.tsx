import { Link } from 'react-router-dom';
import { Card } from '@ssa-ui-kit/core';
import { AddNewAccountCardProps } from './types';
import { AccountCard } from './styles';

export const AddNewAccountCard = ({
  children,
  link,
  onClick,
}: AddNewAccountCardProps) => {
  return link ? (
    <Link css={{ textDecoration: 'none' }} to={link} onClick={onClick}>
      <Card css={AccountCard} noShadow>
        {children}
      </Card>
    </Link>
  ) : (
    <Card css={AccountCard} noShadow onClick={onClick}>
      {children}
    </Card>
  );
};
