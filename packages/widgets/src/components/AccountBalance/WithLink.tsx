import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { AccountBalanceProps } from './types';

export const WithLink = ({
  link,
  onClick,
  children,
  className,
}: Pick<AccountBalanceProps, 'link' | 'onClick'> & {
  children: React.ReactNode;
  className?: string;
}) =>
  link ? (
    <Link
      to={link}
      onClick={onClick}
      className={className}
      css={css`
        text-decoration: none;
        div {
          cursor: pointer;
        }
      `}>
      {children}
    </Link>
  ) : (
    children
  );
