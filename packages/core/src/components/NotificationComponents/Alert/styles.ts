import { Theme } from '@emotion/react';
import { css } from '@emotion/react';

import { MapIconsType } from '@components';

import { AlertVariants } from './types';

// ─── Re-export shared structural styles ──────────────────────────────────────
// Consuming components (`AlertItem`, `Alert`) import `* as styles from './styles'`
// so all shared exports need to be reachable from this file.

export {
  containerStyles,
  itemSizeStyles,
  itemAnimationStyles,
  shadowStyles,
  borderStyles,
  iconColStyles,
  contentColStyles,
  expandedHeaderRowStyles,
  collapsedTitleStyles,
  actionsRowStyles,
  closeBtnStyles,
} from '../styles';

// ─── Variant color tokens ────────────────────────────────────────────────────

export interface VariantTokens {
  /** Color of the status icon */
  iconColor: string;
  /** Accent color used for border and close icon when inheritMainColor is true */
  accentColor: string;
  /** Solid background color for the card */
  tintBg: string;
}

export const getVariantTokens = (
  theme: Theme,
  variant: AlertVariants,
): VariantTokens => {
  const map: Record<AlertVariants, VariantTokens> = {
    [AlertVariants.success]: {
      iconColor: theme.palette.success.main,
      accentColor: theme.palette.success.main,
      tintBg: `color-mix(in srgb, ${theme.palette.success.light} 8%, white)`,
    },
    [AlertVariants.warning]: {
      iconColor: theme.palette.warning.main,
      accentColor: theme.palette.warning.main,
      tintBg: `color-mix(in srgb, ${theme.palette.warning.main} 8%, white)`,
    },
    [AlertVariants.error]: {
      iconColor: theme.palette.error.main,
      accentColor: theme.palette.error.main,
      tintBg: `color-mix(in srgb, ${theme.palette.error.light} 8%, white)`,
    },
    [AlertVariants.primary]: {
      iconColor: theme.palette.primary.main,
      accentColor: theme.palette.primary.main,
      tintBg: `color-mix(in srgb, ${theme.palette.primary.light} 8%, white)`,
    },
    [AlertVariants.neutral]: {
      iconColor: theme.colors.greyDarker60!,
      accentColor: theme.colors.grey!,
      tintBg: theme.colors.white!,
    },
    [AlertVariants.secondary]: {
      iconColor: theme.colors.greyDarker60!,
      accentColor: theme.colors.grey!,
      tintBg: theme.palette.secondary.light,
    },
  };

  return map[variant];
};

export const variantIcons: Record<AlertVariants, keyof MapIconsType> = {
  [AlertVariants.success]: 'check-circle',
  [AlertVariants.warning]: 'attention-circle',
  [AlertVariants.error]: 'attention-circle',
  [AlertVariants.primary]: 'information',
  [AlertVariants.neutral]: 'check-circle',
  [AlertVariants.secondary]: 'check-circle',
};

// ─── Item wrapper ─────────────────────────────────────────────────────────────

export const itemWrapperStyles = (
  background: string,
  hasDescription: boolean,
) => css`
  position: relative;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  gap: 10px;
  box-sizing: border-box;
  background: ${background};
  align-items: ${hasDescription ? 'flex-start' : 'center'};
`;

// ─── Text & action styles ─────────────────────────────────────────────────────
// Accept an optional `textColor` so the `color` prop can override theme defaults
// without a separate styleOverrides entry.

export const titleTextStyles = (theme: Theme, textColor?: string) => css`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${textColor ?? theme.colors.greyDarker};
  word-break: break-word;
`;

export const descriptionStyles = (theme: Theme, textColor?: string) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: ${textColor ?? theme.colors.greyDarker80};
  margin: 0;
  word-break: break-word;
`;

export const actionBtnStyles = (theme: Theme, textColor?: string) => css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  height: max-content;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: ${textColor ?? theme.colors.greyDarker80};

  &:hover {
    color: ${textColor ?? theme.colors.greyDarker};
  }
`;
