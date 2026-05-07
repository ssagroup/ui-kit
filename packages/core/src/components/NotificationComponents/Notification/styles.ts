import { css, Theme } from '@emotion/react';

// ─── Re-export shared structural styles ──────────────────────────────────────

export {
  containerStyles,
  itemSizeStyles,
  itemAnimationStyles,
  shadowStyles,
  borderStyles,
  actionsRowStyles,
  closeBtnStyles,
  collapsedTitleStyles,
} from '@components/NotificationComponents/styles';

import { NotificationVariants } from './types';

// ─── Variant color tokens ─────────────────────────────────────────────────────

export interface NotificationVariantTokens {
  bg: string;
  iconColor: string;
  borderColor: string;
  textColor: string;
}

export const getVariantTokens = (
  theme: Theme,
  variant: NotificationVariants,
): NotificationVariantTokens => {
  const map: Record<NotificationVariants, NotificationVariantTokens> = {
    [NotificationVariants.secondary]: {
      bg: theme.palette.secondary.light,
      iconColor: theme.colors.greyDarker60!,
      borderColor: theme.colors.greyFocused!,
      textColor: theme.colors.greyDarker!,
    },
    [NotificationVariants.neutral]: {
      bg: theme.colors.white!,
      iconColor: theme.colors.greyDarker60!,
      borderColor: theme.colors.greyOutline!,
      textColor: theme.colors.greyDarker!,
    },
    [NotificationVariants.dark]: {
      bg: theme.colors.greyBackground!,
      iconColor: theme.colors.white!,
      borderColor: theme.colors.greyBackground!,
      textColor: theme.colors.white!,
    },
  };

  return map[variant];
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
  gap: 12px;
  box-sizing: border-box;
  background: ${background};
  align-items: ${hasDescription ? 'flex-start' : 'center'};
`;

// ─── Icon column ──────────────────────────────────────────────────────────────
// Larger than Alert/Toast (avatar-sized) and vertically centred with the
// header row regardless of whether a description is present.

export const iconColStyles = css`
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  padding-top: 2px;
`;

// ─── Content column ───────────────────────────────────────────────────────────

export const contentColStyles = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

// ─── Header row: title · date · close ─────────────────────────────────────────

export const headerRowStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ─── Text styles ──────────────────────────────────────────────────────────────

export const titleTextStyles = (textColor: string) => css`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${textColor};
  flex: 1;
  min-width: 0;
  word-break: break-word;
`;

export const dateTextStyles = (theme: Theme, textColor?: string) => css`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: ${textColor ?? theme.colors.greyDarker60};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const descriptionStyles = (textColor: string) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: ${textColor};
  opacity: 0.8;
  margin: 0;
  word-break: break-word;
`;

export const actionBtnStyles = (textColor: string) => css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  height: max-content;
  letter-spacing: 0.2px;
  color: ${textColor};
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
`;
