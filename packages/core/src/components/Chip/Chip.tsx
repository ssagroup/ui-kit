import { forwardRef } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { ChipProps } from './types';
import {
  ChipBase,
  clickable,
  clickableDisabled,
  iconWrapper,
  avatarWrapper,
  deleteIconWrapper,
} from './styles';
import { VARIANTS, COLORS, mapSizes } from './constants';
import { getVariantStyles } from './helpers';

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
