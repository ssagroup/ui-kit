/**
 * Shared structural styles for notification components (Alert, Toast, …).
 *
 * Everything here is purely layout / animation with no semantic color
 * meaning — safe to import from any notification component.
 *
 * Component-specific styles (variant tokens, item wrapper, text colors)
 * live in each component's own `styles.ts`.
 */

import { css, keyframes, SerializedStyles, Theme } from '@emotion/react';

import type { MapIconsType } from '@components';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

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

// ─── Card size ───────────────────────────────────────────────────────────────

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

// ─── Slide-in animation ───────────────────────────────────────────────────────

export const itemAnimationStyles = (
  position: NotificationPositions,
  duration: number,
) => css`
  animation: ${animationByPosition[position]} ${duration}ms ease-out forwards;
`;

// ─── Shadow & border ─────────────────────────────────────────────────────────

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

// ─── Actions row & close button ───────────────────────────────────────────────

export const actionsRowStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
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

// ─── Semantic variant icons ───────────────────────────────────────────────────
// Shared icon mapping for the four semantic variants used by both Alert and Toast.
// Each component spreads this map and adds its own surface-level variants on top.

export const semanticVariantIcons: Record<
  'success' | 'warning' | 'error' | 'primary',
  keyof MapIconsType
> = {
  success: 'check-circle',
  warning: 'attention-circle',
  error: 'attention-circle',
  primary: 'information',
};
