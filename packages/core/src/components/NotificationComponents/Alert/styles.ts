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
      iconColor: theme.colors.green!,
      accentColor: theme.colors.greenLighter!,
      tintBg: theme.colors.greenLighterRGB!,
    },
    [AlertVariants.warning]: {
      iconColor: theme.colors.yellow!,
      accentColor: theme.colors.yellowLighter!,
      tintBg: theme.colors.yellowLighter20RGB!,
    },
    [AlertVariants.error]: {
      iconColor: theme.colors.red!,
      accentColor: theme.colors.redLighter!,
      tintBg: theme.colors.red6RGB!,
    },
    [AlertVariants.hint]: {
      iconColor: theme.colors.blueNotification!,
      accentColor: theme.colors.blueLighter!,
      tintBg: theme.colors.blue6RGB!,
    },
    [AlertVariants.neutral]: {
      iconColor: theme.colors.greyDarker60!,
      accentColor: theme.colors.grey!,
      tintBg: theme.colors.white!,
    },
    [AlertVariants.default]: {
      iconColor: theme.colors.greyDarker40!,
      accentColor: theme.colors.greyOutline!,
      tintBg: theme.colors.greyLighter!,
    },
  };

  return map[variant];
};

export const variantIcons: Record<AlertVariants, keyof MapIconsType> = {
  [AlertVariants.success]: 'check-circle',
  [AlertVariants.warning]: 'attention-circle',
  [AlertVariants.error]: 'attention-circle',
  [AlertVariants.hint]: 'information',
  [AlertVariants.neutral]: 'check-circle',
  [AlertVariants.default]: 'check-circle',
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
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: ${textColor ?? theme.colors.greyDarker80};

  &:hover {
    color: ${textColor ?? theme.colors.greyDarker};
  }
`;
