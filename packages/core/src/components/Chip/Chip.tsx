import { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import { IconProps } from '@components/Icon/types';
import { ChipProps } from './types';
import {
  ChipBase,
  clickable,
  clickableBase,
  clickableDisabled,
  clickableOutlinedDefault,
  IconWrapper,
  AvatarWrapper,
  TitleWrapper,
  LabelWrapper,
  DeleteIconButton,
} from './styles';
import { VARIANTS, COLORS, mapSizes, ICON_SIZES } from './constants';
import { getVariantColors } from './helpers';

/**
 * Chip - Compact component for tags, labels, and removable items.
 *
 * Colors are driven by `theme.palette` for semantic values, allowing palette
 * overrides in a custom theme to flow through automatically.
 *
 * ### Color / Palette mapping
 * - `default`   — neutral: white bg (outlined) / greyLighter bg (filled), uses `theme.colors`
 * - `primary`   — blue, uses `theme.palette.primary`
 * - `secondary` — grey, uses `theme.palette.secondary` (dark text)
 * - `success`   — green, uses `theme.palette.success`
 * - `error`     — red, uses `theme.palette.error`
 * - `warning`   — orange, uses `theme.palette.warning`
 *
 * ### Variant / Palette token mapping
 * - `filled`   — `palette.main` background, white text (dark for `secondary`)
 * - `outlined` — `palette.light` background, `palette.main` border, `palette.dark` text
 *
 * @category Components
 * @subcategory Display
 *
 * @example
 * ```tsx
 * // Basic chip — default color, filled
 * <Chip label="React" />
 * ```
 *
 * @example
 * ```tsx
 * // Removable palette-colored tag
 * <Chip
 *   label="TypeScript"
 *   onDelete={(e) => removeTag('typescript')}
 *   color="primary"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Outlined chip using palette light/main/dark
 * <Chip
 *   label="Filter: Active"
 *   icon="filter"
 *   onClick={() => openFilterDialog()}
 *   variant="outlined"
 *   color="secondary"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Chip with avatar
 * <Chip
 *   label="John Doe"
 *   avatar={<Avatar size={20} image="/avatar.jpg" />}
 *   onDelete={() => removeUser()}
 * />
 * ```
 *
 * @see {@link Avatar} - For user avatar integration
 * @see {@link Icon} - For chip icons
 * @see {@link Tag} - Alternative component for simpler use cases
 *
 * @accessibility
 * - Keyboard navigable (Tab to focus)
 * - Delete with Backspace/Delete keys
 * - Escape to blur
 * - Proper ARIA roles and attributes
 * - Screen reader announcements for actions
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    label,
    title,
    variant = VARIANTS.FILLED,
    color = COLORS.DEFAULT,
    size = 'medium',
    disabled = false,
    icon,
    avatar,
    onDelete,
    deleteIcon,
    showIcon = true,
    onClick,
    clickable: clickableProp,
    className,
    css: customCss,
    ...props
  },
  ref,
) {
  const theme = useTheme();

  const isClickable = Boolean(!disabled && (onClick || clickableProp));
  const hasDeleteIcon = Boolean(onDelete);

  const { chipStyles, iconColor } = getVariantColors(
    theme,
    variant,
    color,
    disabled,
    isClickable,
  );
  const sizeStyles = mapSizes[size];

  const clickableStyles =
    variant === VARIANTS.OUTLINED ? clickableBase : clickable;
  const outlinedDefaultClickableStyles =
    variant === VARIANTS.OUTLINED && color === COLORS.DEFAULT && isClickable
      ? clickableOutlinedDefault(theme)
      : undefined;

  const iconName: IconProps['name'] | null = showIcon ? (icon ?? 'plus') : null;
  const deleteIconName: IconProps['name'] = deleteIcon ?? 'cross';

  const leadingIcon = iconName ? (
    <Icon name={iconName} color={iconColor} size={ICON_SIZES[size]} />
  ) : null;

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
        isClickable && !disabled ? clickableStyles : undefined,
        outlinedDefaultClickableStyles,
        disabled ? clickableDisabled : undefined,
        customCss,
      ]}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}>
      {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}
      {leadingIcon && !avatar && <IconWrapper>{leadingIcon}</IconWrapper>}
      {title && <TitleWrapper>{title}</TitleWrapper>}
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
