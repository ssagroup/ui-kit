import { css, Theme } from '@emotion/react';

/** Box size per `size` value; kept in step with `Button`'s height scale. */
export const buttonSizes: Record<keyof MainSizes, number> = {
  small: 36,
  medium: 46,
  large: 54,
};

/** Icon size per `size` value. */
export const iconSizes: Record<keyof MainSizes, number> = {
  small: 20,
  medium: 24,
  large: 28,
};

export const iconButton = (
  theme: Theme,
  transparent: boolean,
  size: keyof MainSizes = 'small',
) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: buttonSizes[size],
    height: buttonSizes[size],
    padding: 0,
    border: 'none',
    borderRadius: 8,
    backgroundColor: transparent ? 'transparent' : theme.palette.secondary.main,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover:not(:disabled)': {
      backgroundColor: transparent
        ? 'transparent'
        : theme.palette.secondary.dark,
      '& svg': {
        color: theme.palette.primary.main,
      },
      '& svg path': {
        fill: theme.palette.primary.main,
      },
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  });
