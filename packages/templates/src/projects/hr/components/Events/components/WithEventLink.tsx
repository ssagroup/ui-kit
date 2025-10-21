import { Link } from 'react-router-dom';

import { css, useTheme } from '@emotion/react';

import { WithLink } from '@ssa-ui-kit/core';

export const WithEventLink = ({
  children,
  className,
  link,
  onClick,
}: Parameters<typeof WithLink>[0]) => {
  const theme = useTheme();
  return link ? (
    <Link
      to={link}
      target="_blank"
      onClick={onClick}
      className={className}
      css={css`
        display: flex;
        width: 100%;
        border-radius: 5px;
        text-decoration: none;
        color: ${theme.colors.greyDarker};
        align-items: center;
        height: 34px !important;
        &:hover {
          background: ${theme.colors.greyLighter};
        }
      `}>
      {children}
    </Link>
  ) : (
    children
  );
};
