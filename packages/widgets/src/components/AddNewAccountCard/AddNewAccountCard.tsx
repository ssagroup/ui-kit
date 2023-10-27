import { Link } from 'react-router-dom';
import { Card } from '@ssa-ui-kit/core';
import { AddNewAccountCardProps } from './types';
import { AccountCard } from './styles';

export const AddNewAccountCard = ({
  children,
  link,
  onClick,
}: AddNewAccountCardProps) => {
  return (
    <Card onClick={onClick} noShadow css={AccountCard}>
      {link ? <Link to={link}>{children}</Link> : <span>{children}</span>}
    </Card>
  );
};
