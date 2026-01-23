/**
 * Props for the Switch component
 *
 * Toggle switch component for binary on/off states. Must be used within
 * SwitchContextProvider to access toggle state and functionality.
 *
 * @example
 * ```tsx
 * <SwitchContextProvider initialState={false}>
 *   <Switch label="Enable notifications" />
 * </SwitchContextProvider>
 * ```
 */
export interface SwitchProps {
  /**
   * Accessible label for the switch
   * Used as aria-label for screen readers
   */
  label: string;

  /**
   * Whether the switch is disabled
   * Disabled switches cannot be toggled
   * @default false
   */
  isDisabled?: boolean;
}
