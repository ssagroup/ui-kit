/**
 * @internal
 *
 * Renders a single toast card inside the `<Toast>` portal container.
 * Not part of the public API — consumers call `showToast(params)` to trigger
 * toasts and configure appearance via `<Toast>` component props.
 *
 * Compared to `AlertItem`, `ToastItem` adds:
 * - **Auto-dismiss timer** with hover-pause support
 * - **Progress bar** (`withProgress`) that drains over the toast lifetime
 * - **`color` prop** driving background, text, icon, and border colors
 * - **`renderProp`** for fully custom inner content
 */

import { FC, JSX } from 'react';

import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';
import { ColorsKeys } from '@global-types/emotion';

import { darkenColor, getContrastColor, isColorDark } from '@utils/colorUtils';
import { useAutoDismiss } from '../hooks/useAutoDismiss';
import * as styles from './styles';
import { ToastVariants } from './types';

// Default timeout used by the component (4 s) — defined in Toast.tsx as prop
// default, but ToastItem also needs to know it has a timer active.

export interface ToastItemProps {
  id: string;
  variant: ToastVariants;
  /**
   * Theme color key or arbitrary CSS color. When provided:
   * - Background = resolved color
   * - Text/close icon = auto-contrast (white on dark, greyDarker on light)
   * - Status icon = contrast on dark bg, 35%-darkened shade on light bg
   * - Border + progress bar = 35%-darkened shade
   */
  color?: ColorsKeys | string;
  title?: string;
  description?: string;
  cancelText?: string;
  submitText?: string;
  size: NotificationSizes;
  withShadow?: boolean;
  withBorder?: boolean;
  animationDuration: number;
  position: NotificationPositions;
  /** `undefined` = no auto-dismiss */
  timeout?: number;
  withProgress?: boolean;
  /**
   * Progress bar color. When provided, takes priority over the automatic
   * darkened-`color` shade and the component-level `progressColor` default.
   * Accepts a theme color key or any CSS color string.
   */
  progressColor?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  onRemove: (id: string) => void;
  /** Fully replaces inner content. Outer card + progress bar still render. */
  renderProp?: (close: () => void) => JSX.Element;
}

export const ToastItem: FC<ToastItemProps> = ({
  id,
  variant,
  color,
  title,
  description,
  cancelText,
  submitText,
  size,
  withShadow,
  withBorder,
  animationDuration,
  position,
  timeout,
  withProgress = false,
  progressColor,
  onClose,
  onSubmit,
  onRemove,
  renderProp,
}) => {
  const theme = useTheme();
  const tokens = styles.getVariantTokens(theme, variant);

  // ─── Color resolution ───────────────────────────────────────────────────────

  // Resolve theme key → actual color value; fall back to raw CSS string
  const resolvedColor: string | undefined = color
    ? (theme.colors[color as ColorsKeys] ?? (color as string))
    : undefined;

  const bg = resolvedColor ?? tokens.bg;
  const dark = resolvedColor
    ? isColorDark(resolvedColor)
    : variant === ToastVariants.dark;
  const textColor = resolvedColor
    ? getContrastColor(
        resolvedColor,
        theme.colors.greyDarker!,
        theme.colors.white!,
      )
    : tokens.textColor;

  // On light bg: darken the color for icon/border; on dark bg: use contrast (white)
  const accentColor = resolvedColor
    ? dark
      ? theme.colors.white!
      : darkenColor(resolvedColor)
    : tokens.iconColor;

  const borderColor = resolvedColor
    ? darkenColor(resolvedColor)
    : tokens.borderColor;

  // Precedence: explicit progressColor prop → auto darkened `color` → blueNotification
  const resolvedProgressColor =
    progressColor ??
    (resolvedColor
      ? darkenColor(resolvedColor)
      : theme.colors.blueNotification!);

  const resolvedCloseIconColor = dark
    ? theme.colors.white
    : theme.colors.greyDarker60!;

  // ─── Auto-dismiss with hover-pause ──────────────────────────────────────────

  const { isPaused, handleMouseEnter, handleMouseLeave } = useAutoDismiss(
    timeout,
    () => {
      onRemove(id);
      onClose?.();
    },
  );

  // ─── Dismiss helpers ────────────────────────────────────────────────────────

  const handleClose = () => {
    onRemove(id);
    onClose?.();
  };

  const handleSubmit = () => {
    onRemove(id);
    onSubmit?.();
  };

  // ─── Derived layout flags ───────────────────────────────────────────────────

  const hasDescription = !!description;
  const showProgress = withProgress && !!timeout;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      css={[
        styles.itemWrapperStyles(bg, hasDescription),
        styles.itemSizeStyles[size],
        styles.itemAnimationStyles(position, animationDuration),
        withShadow && styles.shadowStyles(theme),
        withBorder && styles.borderStyles(borderColor),
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {renderProp ? (
        renderProp(handleClose)
      ) : (
        <>
          <div css={styles.iconColStyles}>
            <Icon name="check-circle" color={accentColor} size={24} />
          </div>

          {hasDescription ? (
            <div css={styles.contentColStyles}>
              <div css={styles.expandedHeaderRowStyles}>
                {title && (
                  <span css={styles.titleTextStyles(textColor)}>{title}</span>
                )}
                <button
                  type="button"
                  css={styles.closeBtnStyles}
                  onClick={handleClose}
                  aria-label="Close toast">
                  <Icon name="cross" size={12} color={resolvedCloseIconColor} />
                </button>
              </div>

              <p css={styles.descriptionStyles(textColor)}>{description}</p>

              <div css={styles.actionsRowStyles}>
                {cancelText && onClose && (
                  <button
                    type="button"
                    css={styles.actionBtnStyles(textColor)}
                    onClick={handleClose}>
                    {cancelText}
                  </button>
                )}
                {submitText && onSubmit && (
                  <button
                    type="button"
                    css={styles.actionBtnStyles(textColor)}
                    onClick={handleSubmit}>
                    {submitText}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {title && (
                <span
                  css={[
                    styles.titleTextStyles(textColor),
                    styles.collapsedTitleStyles,
                  ]}>
                  {title}
                </span>
              )}

              <div css={styles.actionsRowStyles}>
                {cancelText && onClose && (
                  <button
                    type="button"
                    css={styles.actionBtnStyles(textColor)}
                    onClick={handleClose}>
                    {cancelText}
                  </button>
                )}
                {submitText && onSubmit && (
                  <button
                    type="button"
                    css={styles.actionBtnStyles(textColor)}
                    onClick={handleSubmit}>
                    {submitText}
                  </button>
                )}
              </div>

              <button
                type="button"
                css={styles.closeBtnStyles}
                onClick={handleClose}
                aria-label="Close toast">
                <Icon name="cross" size={12} color={resolvedCloseIconColor} />
              </button>
            </>
          )}
        </>
      )}

      {/* Progress bar — always below content, clipped by wrapper's overflow:hidden */}
      {showProgress && (
        <div css={styles.progressBarContainerStyles}>
          <div
            css={styles.progressBarStyles(
              theme,
              timeout!,
              resolvedProgressColor as ColorsKeys,
            )}
            // Inline style for play-state so the animation resumes from its
            // current position on hover-resume — changing an Emotion class
            // would restart the animation from 0%.
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      )}
    </div>
  );
};
