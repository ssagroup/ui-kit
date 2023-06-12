import { css, Theme, SerializedStyles } from '@emotion/react';

type OutlineFn = (
  theme: Theme,
  color?: keyof Theme['colors'],
  borderRadius?: string,
) => SerializedStyles;

/* This is for Safari to make a rounded outline */
export const focusOutline: OutlineFn = (
  theme,
  color?,
  borderRadius = '12px',
) => css`
  &:focus::before {
    ${outlineStyles(theme, color, borderRadius)}
  }
`;

export const outlineStyles: OutlineFn = (
  theme,
  color?,
  borderRadius = '12px',
) => css`
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border: ${`1px solid ${theme.colors[color || 'greyDarker']}`};
  border-radius: ${borderRadius};
`;
