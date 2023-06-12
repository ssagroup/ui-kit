import { css, Theme } from '@emotion/react';

export const inner = css`
  width: 120px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #fff;
`;

export const label = (theme: Theme) => css`
  font-weight: 600;

  color: ${theme.colors.greyDarker60};
`;
