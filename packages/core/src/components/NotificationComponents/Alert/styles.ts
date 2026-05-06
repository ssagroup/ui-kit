import { css, keyframes, SerializedStyles, Theme } from '@emotion/react';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { AlertVariants } from './types';
import { MapIconsType } from '@components';

// ─── Slide-in keyframes ──────────────────────────────────────────────────────

const slideFromTop = keyframes`
  from { transform: translateY(-12px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
`;

const slideFromBottom = keyframes`
  from { transform: translateY(12px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

const slideFromLeft = keyframes`
  from { transform: translateX(-12px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
`;

const slideFromRight = keyframes`
  from { transform: translateX(12px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
`;

const animationByPosition: Record<
  NotificationPositions,
  ReturnType<typeof keyframes>
> = {
  [NotificationPositions.centerTop]: slideFromTop,
  [NotificationPositions.centerBottom]: slideFromBottom,
  [NotificationPositions.leftTop]: slideFromLeft,
  [NotificationPositions.leftBottom]: slideFromLeft,
  [NotificationPositions.rightTop]: slideFromRight,
  [NotificationPositions.rightBottom]: slideFromRight,
};

// ─── Portal container ────────────────────────────────────────────────────────

const positionMap: Record<NotificationPositions, SerializedStyles> = {
  [NotificationPositions.centerTop]: css`
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  [NotificationPositions.centerBottom]: css`
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  `,
  [NotificationPositions.leftTop]: css`
    top: 16px;
    left: 16px;
    align-items: flex-start;
  `,
  [NotificationPositions.leftBottom]: css`
    bottom: 16px;
    left: 16px;
    align-items: flex-start;
  `,
  [NotificationPositions.rightTop]: css`
    top: 16px;
    right: 16px;
    align-items: flex-end;
  `,
  [NotificationPositions.rightBottom]: css`
    bottom: 16px;
    right: 16px;
    align-items: flex-end;
  `,
};

export const containerStyles = (position: NotificationPositions) => css`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${positionMap[position]}
`;

// ─── Variant color tokens ────────────────────────────────────────────────────

export interface VariantTokens {
  /** Color of the status icon */
  iconColor: string;
  /** Lighter color used for border and close icon when inheritMainColor is true */
  accentColor: string;
  /** Subtle tinted background used when inheritMainColor is true */
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

// ─── Item wrapper ────────────────────────────────────────────────────────────

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

export const itemSizeStyles: Record<NotificationSizes, SerializedStyles> = {
  [NotificationSizes.small]: css`
    width: 400px;
    max-width: calc(100vw - 32px);
  `,
  [NotificationSizes.large]: css`
    width: 760px;
    max-width: calc(100vw - 32px);
  `,
};

export const itemAnimationStyles = (
  position: NotificationPositions,
  duration: number,
) => css`
  animation: ${animationByPosition[position]} ${duration}ms ease-out forwards;
`;

export const shadowStyles = (theme: Theme) => css`
  box-shadow: 0 4px 16px ${theme.colors.greyShadow};
`;

export const borderStyles = (borderColor: string) => css`
  border: 1px solid ${borderColor};
`;

// ─── Icon column ─────────────────────────────────────────────────────────────

export const iconColStyles = css`
  display: flex;
  flex-shrink: 0;
  padding-top: 2px;
`;

// ─── Expanded layout (has description) ───────────────────────────────────────

export const contentColStyles = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
  align-self: flex-start;
`;

export const expandedHeaderRowStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// ─── Collapsed layout (no description) ───────────────────────────────────────

export const collapsedTitleStyles = css`
  flex: 1;
  min-width: 0;
`;

// ─── Shared text & action styles ─────────────────────────────────────────────

export const titleTextStyles = (theme: Theme) => css`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${theme.colors.greyDarker};
  word-break: break-word;
`;

export const descriptionStyles = (theme: Theme) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: ${theme.colors.greyDarker80};
  margin: 0;
  word-break: break-word;
`;

export const actionsRowStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const actionBtnStyles = (theme: Theme) => css`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.2px;
  color: ${theme.colors.greyDarker80};

  &:hover {
    color: ${theme.colors.greyDarker};
  }
`;

export const closeBtnStyles = css`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;
  line-height: 0;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;
