import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { AccountBalanceProps } from './types';

export const WithLink = ({
  link,
  onClick,
  children,
}: Pick<AccountBalanceProps, 'link' | 'onClick'> & {
  children: React.ReactNode;
}) =>
  link ? (
    <Link
      to={link}
      onClick={onClick}
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
