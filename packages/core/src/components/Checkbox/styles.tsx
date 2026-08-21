import { css, Theme } from '@emotion/react';
import { DISABLED_SURFACE_OVERLAY } from '@styles/disabledSurface';

/**
 * Disabled + checked (or indeterminate) keeps the variant's fill colour, muted
 * by DISABLED_SURFACE_OVERLAY, instead of flattening to grey.
 *
 * Without this the box went `greyFocused40` — a near-white surface — while the
 * tick stayed white, leaving a checked-but-disabled box practically
 * indistinguishable from an unchecked one.
 *
 * Stacking inside the 20x20 box: `::before` is the fill (z-index 1), the icon
 * is z-index 2, and this overlay is `::after` at z-index 1 — same index as the
 * fill, so it paints above it on tree order, and still below the icon.
 */
const disabledCheckedFill = (color: string) => css`
  & input:disabled:checked + div::before,
  & input:disabled:indeterminate + div::before {
    background: ${color};
  }

  & input:disabled:checked + div::after,
  & input:disabled:indeterminate + div::after {
    content: '';
    position: absolute;

    /*
     * Matches ::before's fixed box rather than using inset: 0. ::before is
     * absolutely positioned at a hard 20x20, so it does not follow the laid-out
     * size of the div; an inset-based overlay would drift out of alignment with
     * the fill it is meant to cover.
     */
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius: 6px;
    background: ${DISABLED_SURFACE_OVERLAY};
    pointer-events: none;
    z-index: 1;
  }
`;

/**
 * Styles for the `primary` color variant (blue).
 * Uses `theme.palette.primary` for all interactive state colors:
 * - `light`       → unchecked border (resting)
 * - `main`        → unchecked hover border + checked background
 * - `dark`        → checked hover background
 * - `greyFocused40` → disabled box background when unchecked (checked keeps
 *   `main`, muted — see disabledCheckedFill)
 */
const primaryInput = (theme: Theme) => css`
  & input:disabled:not(:checked, :indeterminate) + div {
    background: ${theme.colors.greyFocused40};
  }
  ${disabledCheckedFill(theme.palette.primary.main)}
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
 * - `main`        → unchecked border + checked background
 * - `dark`        → unchecked hover border + checked hover background
 * - `greyFocused40` → disabled box background when unchecked (checked keeps
 *   `main`, muted — see disabledCheckedFill)
 */
const successInput = (theme: Theme) => css`
  & input:disabled:not(:checked, :indeterminate) + div {
    background: ${theme.colors.greyFocused40};
  }

  ${disabledCheckedFill(theme.palette.success.main)}

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
