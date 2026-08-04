import { useButtonGroupContext } from './ButtonGroupContext';
import { ButtonGroupButtonBase } from './ButtonGroupButtonBase';
import { ButtonGroupButtonProps } from './types';

/**
 * ButtonGroupButton - One button inside a composed `ButtonGroup`.
 *
 * Reads selection state from the enclosing group, so it only needs an `id`.
 * Use this instead of the group's `items` prop when a button needs an icon,
 * custom markup, or anything else `ButtonGroupItem` cannot express.
 *
 * @category Form Controls
 * @subcategory Action
 *
 * @example
 * ```tsx
 * <ButtonGroup value={period} onClick={({ id }) => setPeriod(id)}>
 *   <ButtonGroupButton id="24h">24h</ButtonGroupButton>
 *   <ButtonGroupButton id="7d">
 *     <Icon name="calendar" size={14} /> 7 days
 *   </ButtonGroupButton>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroupButton = ({
  id,
  children,
  text,
  disabled = false,
  onClick,
  className,
}: ButtonGroupButtonProps) => {
  const { activeId, onSelect, buttonStyles } = useButtonGroupContext();

  const isActive = activeId === id && !disabled;
  // `text` is what the group reports through its own onClick. A string child is
  // the label already, so use it rather than making the consumer repeat it.
  const resolvedText = text ?? (typeof children === 'string' ? children : '');

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
      className={className}>
      {children}
    </ButtonGroupButtonBase>
  );
};
