import { useTheme } from '@emotion/react';
import SwitchBase from './SwitchBase';
import { useSwitchContext } from './SwitchContext';
import { SwitchProps } from './types';

/**
 * Switch - Toggle switch component for binary states
 *
 * A toggle switch component for enabling/disabling features or settings.
 * Displays an on/off toggle that users can click to change state. Must be
 * used within SwitchContextProvider which manages the switch state and
 * provides toggle functionality.
 *
 * Colors are sourced from `theme.palette` for consistency with Button,
 * Checkbox, and Radio. Pass `color="custom"` together with the `colors`
 * object to supply arbitrary CSS color values.
 *
 * The off state always shows a neutral grey background. The disabled state
 * always uses `greyFocused40`, regardless of color variant.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Default (primary / blue)
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable notifications" />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Success (green) variant
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable feature" color="success" />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Disabled (muted grey, cannot toggle)
 * <SwitchContextProvider initialState={true}>
 *   <Switch label="Locked feature" isDisabled />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Custom color escape hatch
 * <SwitchContextProvider initialState={false}>
 *   <Switch
 *     label="Custom toggle"
 *     color="custom"
 *     colors={{ on: '#ff0000', offOutline: '#ff9999' }}
 *   />
 * </SwitchContextProvider>
 * ```
 *
 * @see {@link SwitchContextProvider} - Required parent component for state management
 *
 * @accessibility
 * - Uses role="switch" for proper ARIA semantics
 * - aria-checked reflects current state
 * - aria-readonly reflects disabled state
 * - aria-label provided via label prop
 * - Keyboard accessible (Space/Enter to toggle)
 *
 * @requires SwitchContextProvider - Must be wrapped in SwitchContextProvider
 */
const Switch = ({
  label,
  isDisabled = false,
  color = 'primary',
  colors,
}: SwitchProps) => {
  const theme = useTheme();
  const { isOn, toggle } = useSwitchContext();

  let onColor: string;
  let offOutlineColor: string;

  if (color === 'primary') {
    onColor = theme.palette.primary.main;
    offOutlineColor = theme.palette.primary.light;
  } else if (color === 'success') {
    onColor = theme.palette.success.main;
    offOutlineColor = theme.palette.success.light;
  } else {
    onColor = colors?.on || theme.palette.primary.main;
    offOutlineColor = colors?.offOutline || theme.palette.primary.light;
  }

  return (
    <SwitchBase
      type="button"
      role="switch"
      aria-readonly={isDisabled}
      aria-checked={isOn}
      aria-label={label}
      disabled={isDisabled}
      onClick={() => !isDisabled && toggle()}
      onColor={onColor}
      offOutlineColor={offOutlineColor}
    />
  );
};

export default Switch;
