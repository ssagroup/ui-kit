import { FC } from 'react';

import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

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
  title?: string;
  description?: string;
  cancelText: string;
  submitText: string;
  size: NotificationSizes;
  withShadow?: boolean;
  withBorder?: boolean;
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

  const handleClose = () => {
    onRemove(id);
    onClose?.();
  };

  const handleSubmit = () => {
    onRemove(id);
    onSubmit?.();
  };

  const resolvedIconColor = styleOverrides?.iconColor ?? tokens.iconColor;
  const resolvedCloseIconColor =
    styleOverrides?.closeIconColor ??
    (inheritMainColor ? tokens.accentColor : theme.colors.greyDarker60);

  const hasDescription = !!description;

  return (
    <div
      css={[
        styles.itemWrapperStyles(tokens.tintBg, hasDescription),
        styles.itemSizeStyles[size],
        styles.itemAnimationStyles(position, animationDuration),
        withShadow && styles.shadowStyles(theme),
        withBorder && styles.borderStyles(tokens.accentColor),
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
                css={[styles.titleTextStyles(theme), styleOverrides?.title]}>
                {title}
              </span>
            )}
            <button
              type="button"
              css={[styles.closeBtnStyles, styleOverrides?.closeButton]}
              onClick={handleClose}
              aria-label="Close alert">
              <Icon name="cross" size={12} color={resolvedCloseIconColor} />
            </button>
          </div>

          <p
            css={[
              styles.descriptionStyles(theme),
              styleOverrides?.description,
            ]}>
            {description}
          </p>

          <div css={[styles.actionsRowStyles, styleOverrides?.actions]}>
            {cancelText && onClose && (
              <button
                type="button"
                css={[
                  styles.actionBtnStyles(theme),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleClose}>
                {cancelText}
              </button>
            )}
            {submitText && onSubmit && (
              <button
                type="button"
                css={[
                  styles.actionBtnStyles(theme),
                  styleOverrides?.actionButton,
                ]}
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
                styles.titleTextStyles(theme),
                styles.collapsedTitleStyles,
                styleOverrides?.title,
              ]}>
              {title}
            </span>
          )}

          <div css={[styles.actionsRowStyles, styleOverrides?.actions]}>
            {cancelText && onClose && (
              <button
                type="button"
                css={[
                  styles.actionBtnStyles(theme),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleClose}>
                {cancelText}
              </button>
            )}
            {submitText && onSubmit && (
              <button
                type="button"
                css={[
                  styles.actionBtnStyles(theme),
                  styleOverrides?.actionButton,
                ]}
                onClick={handleSubmit}>
                {submitText}
              </button>
            )}
          </div>

          <button
            type="button"
            css={[styles.closeBtnStyles, styleOverrides?.closeButton]}
            onClick={handleClose}
            aria-label="Close alert">
            <Icon name="cross" size={12} color={resolvedCloseIconColor} />
          </button>
        </>
      )}
    </div>
  );
};
