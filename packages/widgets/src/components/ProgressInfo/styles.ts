import { css, Theme } from '@emotion/react';

export const getPieChartStyles = (theme: Theme) => css`
  width: 100%;
  height: 100%;

  max-width: 380px;

  div:nth-of-type(1) {
    width: 120px;
    height: 120px;
  }

  ${theme.mediaQueries.md} {
    div:nth-of-type(1) {
      width: 160px;
      height: 160px;
    }
  }
`;
