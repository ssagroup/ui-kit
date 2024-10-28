import { Link, To } from 'react-router-dom';
import { css } from '@emotion/react';

export const WithLink = ({
  link,
  onClick,
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  link?: To;
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
