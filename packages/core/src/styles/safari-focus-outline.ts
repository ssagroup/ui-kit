import { css, Theme, SerializedStyles } from '@emotion/react';

type OutlineFn = (
  theme: Pick<Theme, 'colors' | 'mediaQueries'>,
  color?: keyof Theme['colors'],
  borderRadius?: string,
  borderStyle?: React.CSSProperties['borderStyle'],
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
  borderStyle = 'solid',
) => css`
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-style: ${borderStyle};
  border-width: 1px;
  border-color: ${theme.colors[color || 'greyDarker']};
  border-radius: ${borderRadius};
`;
