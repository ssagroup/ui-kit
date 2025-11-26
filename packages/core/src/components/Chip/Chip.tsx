import { forwardRef } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';

import { ChipProps } from './types';
import {
  ChipBase,
  clickable,
  clickableDisabled,
  IconWrapper,
  AvatarWrapper,
  LabelWrapper,
  DeleteIconButton,
} from './styles';
import { VARIANTS, COLORS, mapSizes, ICON_SIZES } from './constants';
import { colorMap, getVariantStyles } from './helpers';

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
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

  const variantKey = variant ?? VARIANTS.FILLED;
  const colorKey = color ?? COLORS.DEFAULT;
  const colors = colorMap(theme);

  const iconColor = disabled
    ? theme.colors.greyDisabled
    : variantKey === VARIANTS.OUTLINED
      ? colorKey === COLORS.DEFAULT
        ? theme.colors.greyDarker
        : colors[colorKey as keyof typeof colors]
      : colorKey === COLORS.DEFAULT
        ? theme.colors.greyDarker
        : theme.colors.white;

  const iconName: IconProps['name'] = icon ?? 'plus';
  const deleteIconName: IconProps['name'] = deleteIcon ?? 'cross';

  const leadingIcon = (
    <Icon name={iconName} color={iconColor} size={ICON_SIZES[size]} />
  );

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
      aria-disabled={disabled ? 'true' : 'false'}
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
      {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}
      {leadingIcon && !avatar && <IconWrapper>{leadingIcon}</IconWrapper>}
      <LabelWrapper>{label}</LabelWrapper>
      {hasDelete && (
        <DeleteIconButton
          type="button"
          onClick={handleDeleteClick}
          aria-label="Delete"
          disabled={disabled}>
          <Icon
            name={deleteIconName}
            color={iconColor}
            size={ICON_SIZES[size]}
          />
        </DeleteIconButton>
      )}
    </ChipBase>
  );
});
