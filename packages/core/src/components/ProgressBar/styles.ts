import { css, Theme } from '@emotion/react';

export const wrapper = (theme: Theme) => css`
  position: relative;
  background-color: ${theme.colors.greyLighter};
  border-radius: 12px;
  box-shadow: inset 0 -1px 1px ${theme.colors.white30};
`;

export const bar = () => css`
  position: absolute;
  display: block;
  bottom: 0;
  border-radius: 12px;
`;
