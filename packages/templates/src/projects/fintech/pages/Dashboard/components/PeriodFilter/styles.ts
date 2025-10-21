import { css, Theme } from '@emotion/react';

export const getPeriodButtonStyles = (theme: Theme) => css`
  height: 100%;
  max-height: 47px;
  border-color: #eef1f7;
  border-style: solid;
  border-width: 1px 0;
  min-width: 30px;
  padding: 8px 6.6px;

  &:first-of-type {
    border-width: 1px 0 1px 1px;
  }

  &:last-of-type {
    border-width: 1px 1px 1px 0;
  }

  p {
    min-width: 18px;
  }

  ${theme.mediaQueries.md} {
    min-width: 40px;
    p {
      font-size: calc(7px + 0.38vw);
    }
  }

  ${theme.mediaQueries.lg} {
    min-width: initial;
    p {
      font-size: 13.3px;
    }
  }
`;
