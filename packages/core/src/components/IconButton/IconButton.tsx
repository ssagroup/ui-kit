import { useTheme } from '@emotion/react';
import Icon from '@components/Icon';
import Tooltip from '@components/Tooltip';
import TooltipContent from '@components/TooltipContent';
import TooltipTrigger from '@components/TooltipTrigger';
import { iconButton, iconSizes } from './styles';
import type { IconButtonProps } from './types';

/**
 * IconButton - Square icon-only button for icon actions
 *
 * A compact button that displays a single icon from the kit (e.g. edit, bin, search).
 * Uses the kit's Icon and theme. Good for row actions, toolbars, and secondary actions
 * where a text label is not needed. Optional tooltip on hover and full style overrides
 * via a single styles prop.
 *
 * Features:
 * - Any icon from the kit via icon name
 * - Optional tooltip (title) on hover via kit Tooltip
 * - Optional aria-label; defaults to raw icon name for screen readers
 * - Single styles prop: button, iconColor, icon (all overridable)
 * - Transparent or grey background variant; disabled state
 * - `size` matching Button's scale, so the two align in a toolbar
 *
 * @category Form Controls
 * @subcategory Action
 *
 * @example
 * ```tsx
 * <IconButton icon="edit" onClick={onEdit} aria-label="Edit" />
 * ```
 *
 * @example
 * ```tsx
 * <IconButton icon="bin" onClick={onDelete} title="Delete" transparent />
 * ```
 *
 * @example
 * ```tsx
 * // Sized to match a medium Button beside it, submitting the surrounding form
 * <IconButton icon="check" size="medium" type="submit" aria-label="Save" />
 * ```
 *
 * @example
 * ```tsx
 * <IconButton
 *   icon="search"
 *   onClick={onSearch}
 *   styles={{ button: { marginLeft: 8 }, iconColor: theme.colors.blue }}
 * />
 * ```
 */
export const IconButton = ({
  icon,
  onClick,
  type = 'button',
  size = 'small',
  'aria-label': ariaLabel,
  title,
  disabled = false,
  transparent = false,
  styles,
}: IconButtonProps) => {
  const theme = useTheme();
  const resolvedAriaLabel = ariaLabel ?? String(icon);
  const iconColorResolved = styles?.iconColor ?? theme.colors.greyDarker;

  const button = (
    <button
      type={type}
      aria-label={resolvedAriaLabel}
      onClick={onClick}
      disabled={disabled}
      css={[iconButton(theme, transparent, size), styles?.button]}>
      <Icon
        name={icon}
        size={iconSizes[size]}
        color={iconColorResolved}
        css={styles?.icon}
      />
    </button>
  );

  if (title) {
    return (
      <Tooltip enableHover enableClick={false}>
        <TooltipTrigger>{button}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
};
