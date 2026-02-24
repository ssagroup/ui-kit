import { css, Theme } from '@emotion/react';

export const iconButton = (theme: Theme, transparent: boolean) => css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 0,
  border: 'none',
  borderRadius: 8,
  backgroundColor: transparent ? 'transparent' : theme.colors.greyLighter,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover:not(:disabled)': {
    backgroundColor: transparent ? 'transparent' : theme.colors.greyLighter,
    '& svg': {
      color: theme.colors.blue,
    },
    '& svg path': {
      fill: theme.colors.blue,
    },
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});
