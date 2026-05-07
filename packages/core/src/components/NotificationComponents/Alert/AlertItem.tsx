import { FC } from 'react';

import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import Button from '@components/Button';
import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';
import { ColorsKeys } from '@global-types/emotion';
import { darkenColor, getContrastColor, isColorDark } from '@utils/colorUtils';

import { AlertStyleOverrides, AlertVariants } from './types';
import * as styles from './styles';

/**
 * @internal
 *
 * Renders a single alert card inside the `<Alert>` portal container.
 * This component is **not part of the public API** — consumers should call
 * `showAlert(params)` to trigger alerts and configure appearance via the
 * `<Alert>` component's props (`withShadow`, `withBorder`, `styles`, etc.).
 *
 * Direct use of `AlertItem` is only intended for static previews in Storybook
 * stories or tests where portal/observer overhead is unwanted.
 *
 * Layout modes:
 * - **Expanded** — when `description` is provided: title + description + action row + close button in header
 * - **Collapsed** — no description: title + action row + close button all on one line
 *
 * Action buttons are **opt-in**: a button only renders when its label text
 * AND its callback are both present (`cancelText + onClose`, `submitText + onSubmit`).
 */
export interface AlertItemProps {
  id: string;
  variant: AlertVariants;
  /**
   * Solid background color. When provided, the variant tokens are ignored and
   * text/icon/border colors are auto-derived for contrast via `colorUtils`.
   * Accepts a theme color key or any CSS color string.
   */
  color?: ColorsKeys | string;
  title?: string;
  description?: string;
  cancelText: string;
  submitText: string;
  size: NotificationSizes;
  withShadow?: boolean;
  withBorder?: boolean;
  /** Ignored when `color` is set — color fully drives all derived colors. */
  inheritMainColor?: boolean;
  animationDuration: number;
  position: NotificationPositions;
  onClose?: () => void;
  onSubmit?: () => void;
  onRemove: (id: string) => void;
  styleOverrides?: AlertStyleOverrides;
}

export const AlertItem: FC<AlertItemProps> = ({
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
  inheritMainColor,
  animationDuration,
  position,
  onClose,
  onSubmit,
  onRemove,
  styleOverrides,
}) => {
  const theme = useTheme();
  const tokens = styles.getVariantTokens(theme, variant);

  // ─── Color resolution ───────────────────────────────────────────────────────

  // Resolve theme key → actual CSS color; fall back to raw CSS string
  const resolvedColor: string | undefined = color
    ? (theme.colors[color as ColorsKeys] ?? (color as string))
    : undefined;

  const bg = resolvedColor ?? tokens.tintBg;

  // When `color` is passed, auto-derive all derived colors; otherwise use variant tokens
  const dark = resolvedColor ? isColorDark(resolvedColor) : false;
  const textColor: string | undefined = resolvedColor
    ? getContrastColor(
        resolvedColor,
        theme.colors.greyDarker!,
        theme.colors.white!,
      )
    : undefined;
  const iconColor = resolvedColor
    ? dark
      ? theme.colors.white!
      : darkenColor(resolvedColor)
    : tokens.iconColor;
  const borderColor = resolvedColor
    ? darkenColor(resolvedColor)
    : tokens.accentColor;
  const closeIconColor = resolvedColor
    ? dark
      ? theme.colors.white
      : theme.colors.greyDarker60!
    : inheritMainColor
      ? tokens.accentColor
      : theme.colors.greyDarker60;

  // styleOverrides can still pin specific colors on top of everything above
  const resolvedIconColor = styleOverrides?.iconColor ?? iconColor;
  const resolvedCloseIconColor =
    styleOverrides?.closeIconColor ?? closeIconColor;

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleClose = () => {
    onRemove(id);
    onClose?.();
  };

  const handleSubmit = () => {
    onRemove(id);
    onSubmit?.();
  };

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
      ]}>
      <div css={[styles.iconColStyles, styleOverrides?.icon]}>
        <Icon
          name={styles.variantIcons[variant]}
          color={resolvedIconColor}
          size={24}
        />
      </div>

      {hasDescription ? (
        <div css={styles.contentColStyles}>
          <div css={styles.expandedHeaderRowStyles}>
            {title && (
              <span
                css={[
                  styles.titleTextStyles(theme, textColor),
                  styleOverrides?.title,
                ]}>
                {title}
              </span>
            )}
            <Icon
              name="cross"
              size={18}
              color={resolvedCloseIconColor}
              css={[styles.closeBtnStyles, styleOverrides?.closeButton]}
              onClick={handleClose}
              aria-label="Close alert"
            />
          </div>

          <p
            css={[
              styles.descriptionStyles(theme, textColor),
              styleOverrides?.description,
            ]}>
            {description}
          </p>

          <div css={[styles.actionsRowStyles, styleOverrides?.actions]}>
            {cancelText && onClose && (
              <Button
                variant="tertiary"
                css={[
                  styles.actionBtnStyles(theme, textColor),
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
                  styles.actionBtnStyles(theme, textColor),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleSubmit}>
                {submitText}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          {title && (
            <span
              css={[
                styles.titleTextStyles(theme, textColor),
                styles.collapsedTitleStyles,
                styleOverrides?.title,
              ]}>
              {title}
            </span>
          )}

          <div css={[styles.actionsRowStyles, styleOverrides?.actions]}>
            {cancelText && onClose && (
              <Button
                variant="tertiary"
                css={[
                  styles.actionBtnStyles(theme, textColor),
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
                  styles.actionBtnStyles(theme, textColor),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleSubmit}>
                {submitText}
              </Button>
            )}
          </div>

          <Icon
            name="cross"
            size={18}
            color={resolvedCloseIconColor}
            css={[styles.closeBtnStyles, styleOverrides?.closeButton]}
            onClick={handleClose}
            aria-label="Close alert"
          />
        </>
      )}
    </div>
  );
};
