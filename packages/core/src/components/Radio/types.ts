/**
 * Props for the Radio component
 *
 * Radio button component for single selection from a group of options.
 * Supports controlled and uncontrolled states, palette-based color variants,
 * and full accessibility. Typically used within RadioGroup for managing
 * selection state.
 *
 * Colors are driven by `theme.palette`:
 * - `primary` (default) — blue; uses `palette.primary.main` for resting/checked,
 *   `palette.primary.dark` for hover.
 * - `success` — green; uses `palette.success.main` for resting/checked,
 *   `palette.success.dark` for hover.
 * - `custom` — no built-in color; provide exact values via the `colors` object.
 *
 * @example
 * ```tsx
 * // Basic radio button (primary / blue by default)
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
 * // Success (green) variant
 * <Radio
 *   name="status"
 *   value="active"
 *   text="Active"
 *   color="success"
 *   onChange={(value) => handleChange(value)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom color via escape hatch
 * <Radio
 *   name="priority"
 *   value="high"
 *   text="High Priority"
 *   color="custom"
 *   colors={{
 *     default: '#ff0000',
 *     hovered: '#cc0000',
 *     disabled: '#cccccc',
 *     focusShadow: 'rgba(255, 0, 0, 0.25)',
 *   }}
 *   onChange={(value) => handleChange(value)}
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
   * Palette-based color variant.
   * - `primary` — blue (uses `palette.primary`)
   * - `success` — green (uses `palette.success`)
   * - `custom` — unstyled; supply exact colors via the `colors` prop
   * @default 'primary'
   */
  color?: 'primary' | 'success' | 'custom';

  /**
   * Fine-grained color overrides — only applied when `color="custom"`.
   * Allows overriding every interactive state independently.
   */
  colors?: {
    /** Resting (and checked) icon color */
    default?: string;
    /** Hover icon color */
    hovered?: string;
    /** Disabled state icon color */
    disabled?: string;
    /** Focus ring drop-shadow color */
    focusShadow?: string;
  };
}
