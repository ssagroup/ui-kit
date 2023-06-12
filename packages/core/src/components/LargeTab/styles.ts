import { css, Theme } from '@emotion/react';

export const topTextStyle = (theme: Theme) => css`
  fontSize: '15.5px',
  lineHeight: '22px',
  fontWeight: 300,
  color: ${theme.colors.greyDarker60},
  margin: 0,
`;

export const bottomTextStyle = (theme: Theme) => css`
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '18px',
  color: ${theme.colors.greyDarker},
  margin: '3px 0 0 0',
`;
