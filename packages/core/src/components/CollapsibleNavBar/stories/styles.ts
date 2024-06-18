import { Theme, css } from '@emotion/react';

export const ResponsiveLogo = (theme: Theme) => css`
  width: 48px;
  height: 42px;
  &:hover: {
    filter: drop-shadow(0px 5px 5px ${theme.colors.grey});
  }
  display: none;
  ${theme.mediaQueries.md} {
    display: block;
  }
  ${theme.mediaQueries.lg} {
    width: 55px;
    height: 48px;
    margin-left: 7px;
    &:has(~ div > input[type='checkbox']:checked) {
      margin-left: 34px;
    }
  }
`;
