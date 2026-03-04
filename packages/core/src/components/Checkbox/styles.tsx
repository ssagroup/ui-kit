import { css, Theme } from '@emotion/react';

/**
 * Styles for the `primary` color variant (blue).
 * Uses `theme.palette.primary` for all interactive state colors:
 * - `light`  → unchecked border (resting)
 * - `main`   → unchecked hover border + checked background
 * - `dark`   → checked hover background
 */
const primaryInput = (theme: Theme) => css`
  & input:disabled + div,
  & input:indeterminate:disabled + div {
    background: ${theme.colors.greyFocused};
  }
  & input:not(:checked, :indeterminate, :disabled) + div::before {
    border: 1.5px solid ${theme.palette.primary.light};
  }
  & input:not(:checked, :indeterminate, :disabled) + div:hover::before {
    border: 1.5px solid ${theme.palette.primary.main};
  }
  & input:not(:disabled):checked + div::before,
  & input:not(:disabled):indeterminate + div::before {
    background: ${theme.palette.primary.main};
  }
  & input:not(:disabled):checked + div:hover::before,
  & input:not(:disabled):indeterminate + div:hover::before {
    background: ${theme.palette.primary.dark};
  }
  & input:not(:disabled):checked + div + span {
    color: ${theme.colors.greyDropdownText};
  }
`;

/**
 * Styles for the `success` color variant (green).
 * Uses `theme.palette.success` for all interactive state colors:
 * - `main`  → unchecked border + checked background
 * - `dark`  → unchecked hover border + checked hover background
 */
const successInput = (theme: Theme) => css`
  & input:disabled + div,
  & input:indeterminate:disabled + div {
    background: ${theme.colors.greyFocused};
  }

  & input:not(:checked, :indeterminate, :disabled) + div::before {
    border: 1.5px solid ${theme.palette.success.main};
  }

  & input:not(:checked, :indeterminate, :disabled) + div:hover::before {
    border: 1.5px solid ${theme.palette.success.dark};
  }

  & input:not(:disabled):checked + div::before,
  & input:not(:disabled):indeterminate + div::before {
    background: ${theme.palette.success.main};
  }

  & input:not(:disabled):checked + div:hover::before,
  & input:not(:disabled):indeterminate + div:hover::before {
    background: ${theme.palette.success.dark};
  }
`;

export const checkboxStyles = {
  primaryInput,
  successInput,
};
