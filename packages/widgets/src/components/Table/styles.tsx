import { css, Theme } from '@emotion/react';

const baseBtnStyles = (theme: Theme) => css`
  height: 30px;
  border-radius: 6px;

  ${theme.mediaQueries.md} {
    height: 25px;
  }
`;

export const pageBtnStyles = (theme: Theme) => css`
  ${baseBtnStyles(theme)}

  background: unset;
  box-shadow: unset;
  color: #070821;
  padding: 0 11px;

  ${theme.mediaQueries.md} {
    padding: 0 9px;
  }

  &:hover,
  &:active,
  &:focus {
    background: #eef1f7;
    box-shadow: unset;
  }
`;
