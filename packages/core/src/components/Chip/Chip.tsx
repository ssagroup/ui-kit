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
import { getVariantColors } from './helpers';

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
  const hasDeleteIcon = Boolean(onDelete);

  const { chipStyles, iconColor } = getVariantColors(
    theme,
    variant,
    color,
    disabled,
  );
  const sizeStyles = mapSizes[size];

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
      tabIndex={!disabled && (isClickable || hasDeleteIcon) ? 0 : undefined}
      aria-disabled={disabled ? 'true' : 'false'}
      className={className}
      css={[
        sizeStyles,
        chipStyles,
        isClickable && !disabled ? clickable : undefined,
        disabled ? clickableDisabled : undefined,
        customCss,
      ]}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}>
      {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}
      {leadingIcon && !avatar && <IconWrapper>{leadingIcon}</IconWrapper>}
      <LabelWrapper>{label}</LabelWrapper>
      {hasDeleteIcon && (
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
