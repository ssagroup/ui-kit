/**
 * @internal
 *
 * Renders a single notification card inside the `<Notification>` portal container.
 * Not part of the public API — consumers call `showNotification(params)` to trigger
 * notifications and configure appearance via `<Notification>` component props.
 *
 * Layout:
 * ```
 * [icon]  Title                    date  [×]
 *         Description text here.
 *         Cancel   Submit
 * ```
 *
 * The icon column accepts:
 * - A named icon string → rendered via `<Icon>`
 * - Any ReactNode (img, Avatar, etc.) → rendered as-is
 * - Omitted → falls back to `"user"` icon
 *
 * Action buttons are opt-in: a button only renders when both its label text
 * AND its callback are present (`cancelText + onClose`, `submitText + onSubmit`).
 */

import { FC, ReactNode } from 'react';

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
import { NotificationStyleOverrides, NotificationVariants } from './types';
import { MapIconsType } from '@components';
import Button from '@components/Button';

export interface NotificationItemProps {
  id: string;
  variant: NotificationVariants;
  /**
   * Solid background color. When provided, variant token colors are ignored and
   * text/icon/border colors are auto-derived for contrast.
   */
  color?: ColorsKeys | string;
  /** Pre-formatted timestamp string (e.g. `"11 days ago"`). */
  date?: string;
  /**
   * Icon for the left column.
   * - `string` → rendered as a named `<Icon>`
   * - `ReactNode` → rendered as-is
   * - omitted → falls back to `"user"` icon
   */
  icon?: string | ReactNode;
  title?: string;
  description?: string;
  cancelText: string;
  submitText: string;
  size: NotificationSizes;
  withShadow?: boolean;
  withBorder?: boolean;
  animationDuration: number;
  position: NotificationPositions;
  /** `undefined` = no auto-dismiss */
  timeout?: number;
  onClose?: () => void;
  onSubmit?: () => void;
  onRemove: (id: string) => void;
  styleOverrides?: NotificationStyleOverrides;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  id,
  variant,
  color,
  date,
  icon,
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
  onClose,
  onSubmit,
  onRemove,
  styleOverrides,
}) => {
  const theme = useTheme();
  const tokens = styles.getVariantTokens(theme, variant);

  // ─── Color resolution ───────────────────────────────────────────────────────

  const resolvedColor: string | undefined = color
    ? (theme.colors[color as ColorsKeys] ?? (color as string))
    : undefined;

  const bg = resolvedColor ?? tokens.bg;
  const dark = resolvedColor
    ? isColorDark(resolvedColor)
    : variant === NotificationVariants.dark;
  const textColor = resolvedColor
    ? getContrastColor(
        resolvedColor,
        theme.colors.greyDarker!,
        theme.colors.white!,
      )
    : tokens.textColor;
  const iconColor = resolvedColor
    ? dark
      ? theme.colors.white!
      : darkenColor(resolvedColor)
    : tokens.iconColor;
  const borderColor = resolvedColor
    ? darkenColor(resolvedColor)
    : tokens.borderColor;
  const closeIconColor = dark
    ? theme.colors.white!
    : theme.colors.greyDarker60!;

  const resolvedIconColor = styleOverrides?.iconColor ?? iconColor;
  const resolvedCloseIconColor =
    styleOverrides?.closeIconColor ?? closeIconColor;

  // ─── Date text color — muted relative to the title ────────────────────────
  // On dark backgrounds (variant dark or custom dark color) use semi-transparent
  // white so the date is readable but visually secondary to the title.
  // On light backgrounds fall through to greyDarker60 inside dateTextStyles.
  const dateMutedColor = dark ? 'rgba(255, 255, 255, 0.6)' : undefined;

  // ─── Auto-dismiss timer (optional) ──────────────────────────────────────────

  const { handleMouseEnter, handleMouseLeave } = useAutoDismiss(timeout, () => {
    onRemove(id);
    onClose?.();
  });

  // ─── Dismiss helpers ────────────────────────────────────────────────────────

  const handleClose = () => {
    onRemove(id);
    onClose?.();
  };

  const handleSubmit = () => {
    onRemove(id);
    onSubmit?.();
  };

  // ─── Icon element ────────────────────────────────────────────────────────────

  const iconSize = size === NotificationSizes.large ? 46 : 36;

  const iconElement =
    typeof icon === 'string' ? (
      <Icon
        name={icon as keyof MapIconsType}
        color={resolvedIconColor}
        size={iconSize}
      />
    ) : icon != null ? (
      icon
    ) : (
      <Icon name="user" color={resolvedIconColor} size={iconSize} />
    );

  // ─── Derived flags ───────────────────────────────────────────────────────────

  const hasDescription = !!description;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      css={[
        styles.itemWrapperStyles(bg, hasDescription),
        styles.itemSizeStyles[size],
        styles.itemAnimationStyles(position, animationDuration),
        withShadow && styles.shadowStyles(theme),
        withBorder && styles.borderStyles(borderColor),
        styleOverrides?.root,
      ]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {/* ── Icon column ────────────────────────────────────────────────────── */}
      <div css={[styles.iconColStyles, styleOverrides?.icon]}>
        {iconElement}
      </div>

      {/* ── Content column ─────────────────────────────────────────────────── */}
      <div css={styles.contentColStyles}>
        {/* Header: title · date · close */}
        <div css={styles.headerRowStyles}>
          {title && (
            <span
              css={[styles.titleTextStyles(textColor), styleOverrides?.title]}>
              {title}
            </span>
          )}
          {date && (
            <span
              css={[
                styles.dateTextStyles(theme, dateMutedColor),
                styleOverrides?.date,
              ]}>
              {date}
            </span>
          )}
          <Icon
            name="cross"
            css={[styles.closeBtnStyles, styleOverrides?.closeButton]}
            onClick={handleClose}
            aria-label="Close notification"
            size={18}
            color={resolvedCloseIconColor}
          />
        </div>

        {/* Description */}
        {hasDescription && (
          <p
            css={[
              styles.descriptionStyles(textColor),
              styleOverrides?.description,
            ]}>
            {description}
          </p>
        )}

        {/* Actions */}
        {((cancelText && onClose) || (submitText && onSubmit)) && (
          <div css={[styles.actionsRowStyles, styleOverrides?.actions]}>
            {cancelText && onClose && (
              <Button
                variant="tertiary"
                css={[
                  styles.actionBtnStyles(textColor),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleClose}>
                {cancelText}
              </Button>
            )}
            {submitText && onSubmit && (
              <Button
                variant="tertiary"
                css={[
                  styles.actionBtnStyles(textColor),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleSubmit}>
                {submitText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
