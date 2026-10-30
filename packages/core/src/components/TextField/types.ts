import type { UseFormReturn, FieldError } from 'react-hook-form';
import { InputProps } from '@components/Input/types';
import { LabelBadge } from '@components/Label/types';

/**
 * Props for the TextField component
 *
 * A unified text input component that can render as either a single-line Input
 * or multi-line Textarea based on the `multirow` prop. Includes built-in label,
 * helper text, error handling, and character counting. Automatically switches
 * between Input and Textarea components while maintaining consistent API.
 *
 * @example
 * ```tsx
 * // Single-line text field
 * const { register } = useForm();
 * <TextField
 *   name="username"
 *   label="Username"
 *   placeholder="Enter your username"
 *   register={register}
 *   helperText="Choose a unique username"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Multi-line text field
 * <TextField
 *   name="description"
 *   label="Description"
 *   multirow
 *   rows={5}
 *   maxLength={500}
 *   register={register}
 *   helperText="Maximum 500 characters"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Text field with validation
 * <TextField
 *   name="email"
 *   label="Email"
 *   register={register}
 *   errors={errors.email}
 *   helperText="We'll never share your email"
 * />
 * ```
 *
 * @note React Hook Form integration is optional. Without `register` there is
 * no validation; on a single-line field pass `value` / `onChange` (and `name`,
 * for a native form submit) through `inputProps`. A console warning is logged.
 * `register` expects an untyped `useForm()`; cast `formState.errors.x` with
 * `as FieldError`.
 */
export interface TextFieldProps
  extends InputProps, Partial<Pick<UseFormReturn, 'register'>> {
  /**
   * Label text displayed above the field, linked to it via
   * `htmlFor="formElement-{name}"`. Without it an empty `<label>` still
   * renders; name the field with `inputProps['aria-label']` instead.
   */
  label?: string;

  /**
   * Status badge to the right of the label, e.g.
   * `{ text: 'mapped', color: 'primary' }`. Announced as the field's
   * description. Needs a `label`.
   */
  labelBadge?: LabelBadge;

  /**
   * React Hook Form field error. Sets the error status (unless `success` is
   * set) and shows `errors.message` in place of `helperText`.
   */
  errors?: FieldError;

  /**
   * Sets the success status. Takes precedence over `errors`: with both set,
   * the error message shows in green.
   * @default false
   */
  success?: boolean;

  /**
   * Helper text displayed below the field. Replaced by `errors.message` when
   * `errors` is set.
   */
  helperText?: string;

  /**
   * Number of rows. Only applies when `multirow` is true.
   * @default 10
   */
  rows?: number;

  /**
   * Whether to render as multi-line textarea
   * When true, uses Textarea component; when false, uses Input component
   * @default false
   */
  multirow?: boolean;

  /**
   * Shows a `count / maxLength` counter in the helper row. On a single-line
   * field it is display-only (typing is not limited) and updates on key-up;
   * on a multirow field it is also set on the `<textarea>`. The count starts
   * at 0 for a prefilled value. On a single-line field, passing your own
   * `onKeyUp` stops the counter from updating.
   */
  maxLength?: number;
}
