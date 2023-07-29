import { css, Theme } from '@emotion/react';

export const TitleWrapper = (theme: Theme) => css`
  display: flex;

  h6 {
    line-height: 1.625rem;
    margin-left: 10px;

    color: ${theme.colors.greyDarker60};
  }
`;

export const ContentWrapper = css`
  position: relative;
  width: 100%;
  padding-top: 20px;
`;
