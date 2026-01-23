import { useId, useState } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { RadioBase } from './RadioBase';
import { RadioProps } from './types';

/**
 * Radio - Radio button component for single selection
 *
 * A radio button component for selecting a single option from a group.
 * Supports controlled and uncontrolled states, custom styling, and full
 * accessibility. Displays a radio icon that changes appearance based on
 * checked state and hover interactions.
 *
 * Typically used within RadioGroup component for managing selection state
 * across multiple radio buttons, but can also be used standalone with
 * controlled state management.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Basic radio button
 * <Radio
 *   id="option1"
 *   name="choice"
 *   value="option1"
 *   text="Option 1"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled radio button
 * const [selected, setSelected] = useState('option1');
 * <Radio
 *   name="theme"
 *   value="dark"
 *   text="Dark Mode"
 *   isChecked={selected === 'dark'}
 *   onChange={setSelected}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Radio with custom colors
 * <Radio
 *   name="priority"
 *   value="high"
 *   text="High Priority"
 *   colors={{
 *     default: '#ff0000',
 *     hovered: '#cc0000',
 *     disabled: '#cccccc'
 *   }}
 * />
 * ```
 *
 * @see {@link RadioGroup} - For managing groups of radio buttons
 *
 * @accessibility
 * - Full keyboard navigation (Arrow keys to navigate group, Space to select)
 * - Proper ARIA attributes (role="radio", aria-checked)
 * - Screen reader friendly
 * - Focus management with visible focus indicators
 */
const Radio = ({
  id,
  name = '',
  value,
  isChecked,
  isDisabled,
  isRequired,
  text,
  colors,
  className,
  onChange,
}: RadioProps) => {
  const theme = useTheme();

  const autoGenId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const radioId = id || autoGenId;

  const disabledColor = colors?.disabled || theme.colors.greyFocused40;
  const hoveredColor = colors?.hovered || theme.colors.green60;
  const defaultColor = colors?.default || theme.colors.green;

  return (
    <RadioBase
      htmlFor={radioId}
      className={className}
      focusShadowColor={colors?.focusShadow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <input
        id={radioId}
        type="radio"
        value={value}
        checked={isChecked}
        onChange={() => typeof onChange === 'function' && onChange(value)}
        disabled={isDisabled}
        required={isRequired}
        name={name}
      />
      <Icon
        name={isChecked ? 'radio-on' : 'circle'}
        size={20}
        color={
          isDisabled ? disabledColor : isHovered ? hoveredColor : defaultColor
        }
      />
      {text ? <span data-testid={id}>{text}</span> : null}
    </RadioBase>
  );
};

export default Radio;
