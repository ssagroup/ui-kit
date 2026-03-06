import { useId, useState } from 'react';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { RadioBase } from './RadioBase';
import { RadioProps } from './types';

/**
 * Radio - Radio button component for single selection
 *
 * A radio button component for selecting a single option from a group.
 * Supports controlled and uncontrolled states, palette-based color variants,
 * and full accessibility. Displays a radio icon that changes appearance based
 * on checked state and hover interactions.
 *
 * Colors are sourced from `theme.palette` for consistency with Button and
 * Checkbox. Pass `color="custom"` together with the `colors` object to supply
 * arbitrary CSS color values.
 *
 * Typically used within RadioGroup for managing selection state across
 * multiple radio buttons, but can also be used standalone.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Default (primary / blue)
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
 * // Success (green) variant
 * <Radio
 *   name="status"
 *   value="active"
 *   text="Active"
 *   color="success"
 *   onChange={handleChange}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom color escape hatch
 * <Radio
 *   name="priority"
 *   value="high"
 *   text="High Priority"
 *   color="custom"
 *   colors={{
 *     default: '#ff0000',
 *     hovered: '#cc0000',
 *     disabled: '#cccccc',
 *     focusShadow: 'rgba(255,0,0,0.25)',
 *   }}
 *   onChange={handleChange}
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
  color = 'primary',
  colors,
  className,
  onChange,
}: RadioProps) => {
  const theme = useTheme();

  const autoGenId = useId();
  const [isHovered, setIsHovered] = useState(false);
  const radioId = id || autoGenId;

  let defaultColor: string;
  let hoveredColor: string;
  let disabledColor: string;
  let focusShadowColor: string | undefined;

  if (color === 'primary') {
    defaultColor = theme.palette.primary.main;
    hoveredColor = theme.palette.primary.dark;
    disabledColor = theme.colors.greyFocused40 as string;
    focusShadowColor = theme.colors.blue20;
  } else if (color === 'success') {
    defaultColor = theme.palette.success.main;
    hoveredColor = theme.palette.success.dark;
    disabledColor = theme.colors.greyFocused40 as string;
    focusShadowColor = theme.colors.green40;
  } else {
    defaultColor = colors?.default || theme.palette.primary.main;
    hoveredColor = colors?.hovered || theme.palette.primary.dark;
    disabledColor = colors?.disabled || (theme.colors.greyFocused40 as string);
    focusShadowColor = colors?.focusShadow;
  }

  return (
    <RadioBase
      htmlFor={radioId}
      className={className}
      focusShadowColor={focusShadowColor}
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
