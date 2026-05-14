import { css, keyframes, Theme } from '@emotion/react';

import type { MapIconsType } from '@components';

import { ToastVariants } from './types';
import { ColorsKeys } from '@global-types/emotion';
import { semanticVariantIcons } from '@components/NotificationComponents/styles';

// ─── Re-export shared structural styles ──────────────────────────────────────

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
} from '@components/NotificationComponents/styles';

// ─── Variant color tokens ────────────────────────────────────────────────────

export interface ToastVariantTokens {
  /** Card background color */
  bg: string;
  /** Status icon fill */
  iconColor: string;
  /** Border color (used when `withBorder` is true and no custom `color` prop) */
  borderColor: string;
  /** Text color for title / description */
  textColor: string;
  /**
   * Progress bar color for this variant.
   * Semantic variants (success, warning, error, primary) use their accent color
   * to keep the bar visually consistent with the icon. Surface variants fall
   * back to the theme's `blueNotification`.
   */
  progressColor: string;
}

export const getVariantTokens = (
  theme: Theme,
  variant: ToastVariants,
): ToastVariantTokens => {
  const map: Record<ToastVariants, ToastVariantTokens> = {
    [ToastVariants.success]: {
      bg: `color-mix(in srgb, ${theme.palette.success.light} 8%, white)`,
      iconColor: theme.palette.success.main,
      borderColor: theme.palette.success.main,
      textColor: theme.colors.greyDarker!,
      progressColor: theme.palette.success.main,
    },
    [ToastVariants.warning]: {
      bg: `color-mix(in srgb, ${theme.palette.warning.main} 8%, white)`,
      iconColor: theme.palette.warning.main,
      borderColor: theme.palette.warning.main,
      textColor: theme.colors.greyDarker!,
      progressColor: theme.palette.warning.main,
    },
    [ToastVariants.error]: {
      bg: `color-mix(in srgb, ${theme.palette.error.light} 8%, white)`,
      iconColor: theme.palette.error.main,
      borderColor: theme.palette.error.main,
      textColor: theme.colors.greyDarker!,
      progressColor: theme.palette.error.main,
    },
    [ToastVariants.primary]: {
      bg: `color-mix(in srgb, ${theme.palette.primary.light} 8%, white)`,
      iconColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      textColor: theme.colors.greyDarker!,
      progressColor: theme.palette.primary.main,
    },
    [ToastVariants.secondary]: {
      bg: theme.palette.secondary.light,
      iconColor: theme.colors.greyDarker60!,
      borderColor: theme.colors.greyFocused!,
      textColor: theme.colors.greyDarker!,
      progressColor: theme.colors.blueNotification!,
    },
    [ToastVariants.neutral]: {
      bg: theme.colors.white!,
      iconColor: theme.colors.greyDarker60!,
      borderColor: theme.colors.greyOutline!,
      textColor: theme.colors.greyDarker!,
      progressColor: theme.colors.blueNotification!,
    },
    [ToastVariants.dark]: {
      bg: theme.colors.greyBackground!,
      iconColor: theme.colors.white!,
      borderColor: theme.colors.greyBackground!,
      textColor: theme.colors.white!,
      progressColor: theme.colors.blueNotification!,
    },
  };

  return map[variant];
};

export const variantIcons: Record<ToastVariants, keyof MapIconsType> = {
  ...semanticVariantIcons,
  [ToastVariants.neutral]: 'check-circle',
  [ToastVariants.secondary]: 'check-circle',
  [ToastVariants.dark]: 'check-circle',
};

// ─── Toast item wrapper ───────────────────────────────────────────────────────
// Unlike Alert (which layers a rgba tint over white via backgroundImage),
// Toast backgrounds are always fully opaque — variant tokens and custom `color`
// values are solid colors. The wrapper uses `overflow: hidden` so the progress
// bar is clipped to the card's border-radius.

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
  overflow: hidden;
`;

// ─── Text styles (accept explicit color to support `color` prop contrast) ────

export const titleTextStyles = (textColor: string) => css`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${textColor};
  word-break: break-word;
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

// ─── Progress bar ─────────────────────────────────────────────────────────────
// The bar is absolutely positioned at the bottom of the card (overflow: hidden
// on the wrapper clips it to the card's border-radius).
//
// `animation-play-state` is controlled via inline `style` prop (not a class)
// so the animation resumes from its paused position when hover ends — changing
// an Emotion-generated class would restart the animation from 0%.

const drainProgress = keyframes`
  from { width: 100%; }
  to   { width: 0%;   }
`;

export const progressBarContainerStyles = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: transparent;
`;

/**
 * Returns the base progress-bar styles including the drain animation.
 * Pass `animation-play-state` separately via an inline `style` prop so the
 * animation can be paused/resumed without resetting.
 */
export const progressBarStyles = (
  theme: Theme,
  timeout: number,
  color: ColorsKeys,
) => css`
  height: 100%;
  width: 100%;
  background: ${theme.colors[color] ?? color};
  animation: ${drainProgress} ${timeout}ms linear forwards;
  border-radius: 0 0 8px 8px;
`;
