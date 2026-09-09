import { useButtonGroupContext } from './ButtonGroupContext';
import { ButtonGroupButtonBase } from './ButtonGroupButtonBase';
import { ButtonGroupButtonProps } from './types';

/**
 * ButtonGroupButton - One button inside a composed `ButtonGroup`.
 *
 * Reads selection state from the enclosing group, so it only needs an `id`.
 * Use this instead of the group's `items` prop when a button needs custom
 * markup or anything else `ButtonGroupItem` cannot express.
 *
 * @category Form Controls
 * @subcategory Action
 *
 * @example
 * ```tsx
 * <ButtonGroup value={period} onClick={({ id }) => setPeriod(id)}>
 *   <ButtonGroupButton id="24h">24h</ButtonGroupButton>
 *   <ButtonGroupButton id="7d" icon={<Icon name="calendar" size={24} />}>
 *     7 days
 *   </ButtonGroupButton>
 * </ButtonGroup>
 * ```
 *
 * @example
 * ```tsx
 * // Icon-only. `aria-label` is the button's only accessible name.
 * <ButtonGroupButton
 *   id="list"
 *   icon={<Icon name="bulleted-list" size={24} />}
 *   aria-label="List view"
 * />
 * ```
 */
export const ButtonGroupButton = ({
  id,
  children,
  icon,
  text,
  'aria-label': ariaLabel,
  disabled = false,
  onClick,
  className,
}: ButtonGroupButtonProps) => {
  const { activeId, onSelect, buttonStyles } = useButtonGroupContext();

  const isActive = activeId === id && !disabled;
  // `text` is what the group reports through its own onClick. A string child is
  // the label already, so use it rather than making the consumer repeat it; an
  // icon-only button has no text at all, so its accessible name stands in.
  // Empty strings fall through rather than winning: a button that renders as
  // icon-only should not report an empty label just because `text=""` was
  // passed explicitly.
  const resolvedText =
    text || (typeof children === 'string' ? children : '') || ariaLabel || '';

  const handleClick = () => {
    onSelect({ id, text: resolvedText, disabled });
    onClick?.();
  };

  return (
    <ButtonGroupButtonBase
      isActive={isActive}
      disabled={disabled}
      onClick={handleClick}
      buttonStyles={buttonStyles}
      className={className}
      icon={icon}
      ariaLabel={ariaLabel}>
      {children}
    </ButtonGroupButtonBase>
  );
};
