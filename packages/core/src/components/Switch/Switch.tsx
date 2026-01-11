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
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * // Basic switch
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable notifications" />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled switch
 * const [enabled, setEnabled] = useState(false);
 * <SwitchContextProvider initialState={enabled}>
 *   <Switch
 *     label="Dark mode"
 *     isDisabled={false}
 *   />
 * </SwitchContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Disabled switch
 * <SwitchContextProvider initialState={true}>
 *   <Switch label="Premium feature" isDisabled />
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
const Switch = ({ label, isDisabled = false }: SwitchProps) => {
  const { isOn, toggle } = useSwitchContext();

  return (
    <SwitchBase
      type="button"
      role="switch"
      aria-readonly={isDisabled}
      aria-checked={isOn}
      aria-label={label}
      disabled={isDisabled}
      onClick={() => !isDisabled && toggle()}
    />
  );
};
export default Switch;
