import { forwardRef } from 'react';
import { useTheme, css, Theme } from '@emotion/react';

import Icon from '@components/Icon';

import { ChipProps } from './types';
import {
  ChipBase,
  small,
  medium,
  large,
  filled,
  filledDisabled,
  outlined,
  outlinedDisabled,
  clickable,
  clickableDisabled,
  iconWrapper,
  avatarWrapper,
  deleteIconWrapper,
} from './styles';

const VARIANTS = {
  OUTLINED: 'outlined',
  FILLED: 'filled',
} as const;

const COLORS = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
} as const;

const mapSizes = {
  small,
  medium,
  large,
};

const colorMap = (theme: Theme) => ({
  primary: theme.colors.blueRoyal,
  success: theme.colors.green,
  error: theme.colors.red,
  info: theme.colors.blueLight,
  warning: theme.colors.yellow,
});

const makeFilled = (theme: Theme, color: string) => css`
  background-color: ${color};
  color: ${theme.colors.white};
  border: none;
`;

const makeOutlined = (theme: Theme, color: string) => css`
  background-color: ${theme.colors.white};
  border: 1px solid ${color};
  color: ${color};
`;

const getVariantColorStyles = (
  theme: Theme,
  variant: 'filled' | 'outlined',
  colorName: 'primary' | 'success' | 'error' | 'info' | 'warning',
) => {
  const colors = colorMap(theme);
  const color = colors[colorName];

  if (!color) {
    return variant === 'outlined' ? outlined(theme) : filled(theme);
  }

  return variant === 'outlined'
    ? makeOutlined(theme, color)
    : makeFilled(theme, color);
};

const getVariantStyles = (
  variant: ChipProps['variant'],
  color: ChipProps['color'],
  disabled: boolean,
  theme: ReturnType<typeof useTheme>,
) => {
  if (disabled) {
    return variant === VARIANTS.OUTLINED
      ? outlinedDisabled(theme)
      : filledDisabled(theme);
  }

  const variantKey = variant ?? VARIANTS.FILLED;
  const colorKey = color ?? COLORS.DEFAULT;

  if (colorKey === COLORS.DEFAULT) {
    return variantKey === VARIANTS.OUTLINED ? outlined(theme) : filled(theme);
  }

  return getVariantColorStyles(
    theme,
    variantKey,
    colorKey as 'primary' | 'success' | 'error' | 'info' | 'warning',
  );
};

const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    label,
    variant = VARIANTS.FILLED,
    color = COLORS.DEFAULT,
    size = 'medium',
    disabled = false,
    icon,
    avatar,
    onDelete,
    deleteIcon,
    onClick,
    clickable: clickableProp,
    className,
    css: customCss,
    ...props
  },
  ref,
) {
  const theme = useTheme();

  const isClickable = !disabled && (onClick || clickableProp);
  const hasDelete = !disabled && onDelete;

  const variantStyles = getVariantStyles(variant, color, disabled, theme);
  const sizeStyles = mapSizes[size];

  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.stopPropagation();
    if (onDelete && !disabled) {
      onDelete(event);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (disabled) return;

    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (onDelete) {
        event.preventDefault();

        const syntheticEvent = {
          ...event,
          stopPropagation: () => {},
          currentTarget: event.currentTarget,
          target: event.target,
        } as unknown as React.MouseEvent<HTMLButtonElement>;
        onDelete(syntheticEvent);
      }
    }

    if (event.key === 'Escape') {
      (event.currentTarget as HTMLElement).blur();
    }
  };

  return (
    <ChipBase
      {...props}
      ref={ref}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable || hasDelete ? 0 : undefined}
      aria-disabled={disabled}
      className={className}
      css={[
        sizeStyles,
        variantStyles,
        isClickable && !disabled ? clickable : undefined,
        disabled ? clickableDisabled : undefined,
        customCss,
      ]}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}>
      {avatar && <span css={avatarWrapper}>{avatar}</span>}
      {icon && !avatar && <span css={iconWrapper}>{icon}</span>}
      <span>{label}</span>
      {hasDelete && (
        <button
          type="button"
          css={deleteIconWrapper}
          onClick={handleDeleteClick}
          aria-label="Delete"
          disabled={disabled}>
          {deleteIcon || (
            <Icon
              name="cross"
              size={size === 'small' ? 12 : size === 'medium' ? 14 : 16}
              color="currentColor"
            />
          )}
        </button>
      )}
    </ChipBase>
  );
});

export default Chip;
