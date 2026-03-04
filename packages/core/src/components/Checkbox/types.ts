import { RefObject, ReactNode } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

/**
 * Props for the Checkbox component
 *
 * A form control that allows users to select one or more options from a set.
 * Supports checked, unchecked, indeterminate, and disabled states. Can be used
 * standalone or integrated with React Hook Form for form validation.
 *
 * @example
 * ```tsx
 * // Basic checkbox
 * <Checkbox
 *   id="terms"
 *   text="I agree to the terms"
 *   onChange={(checked) => console.log(checked)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Checkbox with React Hook Form
 * const { register } = useForm();
 * <Checkbox
 *   name="newsletter"
 *   text="Subscribe to newsletter"
 *   register={register}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Controlled checkbox
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   text="Controlled checkbox"
 *   externalState={checked}
 *   onChange={setChecked}
 * />
 * ```
 */
export interface CheckboxProps extends Partial<
  Pick<UseFormReturn, 'register'>
> {
  /**
   * Label text or custom React node to display next to the checkbox
   * Can be a string, number, or any React node
   */
  text?: ReactNode;

  /**
   * Unique identifier for the checkbox input element
   * If not provided, a unique ID will be auto-generated
   */
  id?: string;

  /**
   * Callback function called when checkbox state changes
   * Receives the new checked state (boolean) as parameter
   */
  onChange?: (newState: boolean) => void;

  /**
   * External state control - allows parent component to control checkbox state
   * When provided, the checkbox becomes controlled
   */
  externalState?: boolean;

  /**
   * Whether the checkbox is disabled
   * Disabled checkboxes cannot be interacted with and appear visually muted
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Initial checked state when component mounts
   * Only used for uncontrolled checkboxes
   * @default false
   */
  initialState?: boolean;

  /**
   * Indeterminate state - represents a partially selected state
   * Commonly used in tree structures or "select all" scenarios
   * Visual indicator: shows a minus (-) icon instead of checkmark
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * Name attribute for form submission and React Hook Form integration
   * Required when using with React Hook Form
   * @default ''
   */
  name?: string;

  /**
   * Whether the checkbox is required for form validation
   * @default false
   */
  isRequired?: boolean;

  /**
   * Ref object to access the underlying input element
   */
  ref?: RefObject<HTMLInputElement>;

  /**
   * Color variant of the checkbox — controls the checked and focus-state colors.
   * Sourced from `theme.palette`:
   * - `primary` — blue (uses `palette.primary`); resting border is `palette.primary.light`,
   *   checked fill is `palette.primary.main`, hover fill is `palette.primary.dark`
   * - `success` — green (uses `palette.success`); resting border is `palette.success.main`,
   *   checked fill is `palette.success.main`, hover fill is `palette.success.dark`
   * - `custom` — no built-in color; apply styles via `className` or the `css` prop
   * @default 'primary'
   */
  color?: 'primary' | 'success' | 'custom';

  /**
   * Custom element type to render as (for composition)
   */
  as?: React.ElementType;

  /**
   * Custom CSS class name
   */
  className?: string;
}

export type IFormCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
