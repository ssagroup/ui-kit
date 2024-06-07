import { Link } from 'react-router-dom';
import { AccountCard } from './styles';
import { Card } from '@components';
import { AddNewAccountCardProps } from '.';

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
