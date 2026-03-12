import { css, Theme } from '@emotion/react';

export const iconButton = (theme: Theme, transparent: boolean) =>
  css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
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
