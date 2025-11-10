import { css, Theme } from '@emotion/react';

export const content = (theme: Theme) => css`
  h6 {
    line-height: 23px;
  }
  p {
    color: ${theme.colors.greyDarker60};
    line-height: 23px;
  }
`;
