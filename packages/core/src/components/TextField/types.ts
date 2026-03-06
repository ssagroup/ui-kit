import type { UseFormReturn, FieldError } from 'react-hook-form';
import { InputProps } from '@components/Input/types';

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
 * @note React Hook Form integration is optional. If `register` is not provided,
 * the component will still work but validation features will be unavailable.
 */
export interface TextFieldProps
  extends InputProps, Partial<Pick<UseFormReturn, 'register'>> {
  /**
   * Label text displayed above the input field
   */
  label?: string;

  /**
   * React Hook Form field error object
   * Used to display validation error messages
   */
  errors?: FieldError;

  /**
   * Whether to display success state styling
   * When true, status is set to 'success'
   * @default false
   */
  success?: boolean;

  /**
   * Helper text displayed below the input
   * Shown when no errors are present
   */
  helperText?: string;

  /**
   * Number of rows for multi-row text fields
   * Only applies when `multirow` is true
   * @default undefined (uses Textarea default)
   */
  rows?: number;

  /**
   * Whether to render as multi-line textarea
   * When true, uses Textarea component; when false, uses Input component
   * @default false
   */
  multirow?: boolean;

  /**
   * Maximum character length
   * When provided, displays character count (e.g., "45 / 500")
   */
  maxLength?: number;
}
