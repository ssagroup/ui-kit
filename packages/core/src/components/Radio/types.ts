/**
 * Props for the Radio component
 *
 * Radio button component for single selection from a group of options.
 * Supports controlled and uncontrolled states, custom colors, and accessibility
 * features. Typically used within RadioGroup for managing selection state.
 *
 * @example
 * ```tsx
 * // Basic radio button
 * <Radio
 *   id="option1"
 *   name="choice"
 *   value="option1"
 *   text="Option 1"
 *   onChange={(value) => handleChange(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled radio button
 * <Radio
 *   name="theme"
 *   value="dark"
 *   text="Dark Mode"
 *   isChecked={selectedTheme === 'dark'}
 *   onChange={(value) => setSelectedTheme(value)}
 * />
 * ```
 */
export interface RadioProps {
  /**
   * Unique identifier for the radio input
   * If not provided, a unique ID will be auto-generated
   */
  id?: string;

  /**
   * Value of the radio button
   * Passed to onChange callback when selected
   */
  value: string;

  /**
   * Name attribute for grouping radio buttons
   * Radio buttons with the same name form a group
   * @default ''
   */
  name?: string;

  /**
   * Whether the radio button is checked
   * Use for controlled component pattern
   */
  isChecked?: boolean;

  /**
   * Whether the radio button is disabled
   * Disabled radios cannot be selected
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the radio button is required for form validation
   * @default false
   */
  isRequired?: boolean;

  /**
   * Callback function called when radio is selected
   * Receives the radio's value as parameter
   */
  onChange?: (value: string) => void;

  /**
   * Label text displayed next to the radio button
   */
  text?: string;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Custom color scheme for the radio button
   * Allows overriding default, hover, disabled, and focus colors
   */
  colors?: {
    /** Default color when unchecked */
    default?: string;
    /** Hover color */
    hovered?: string;
    /** Disabled state color */
    disabled?: string;
    /** Focus ring shadow color */
    focusShadow?: string;
  };
}
