import { BaseSyntheticEvent, KeyboardEventHandler } from 'react';
import type { FieldError, UseFormReturn } from 'react-hook-form';
import type { Interpolation, Theme } from '@emotion/react';

interface ExtendedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  'data-testid'?: string;
}

/**
 * Props for the Input component
 *
 * A flexible text input component with built-in validation, status indicators,
 * icon support, and React Hook Form integration. Supports all standard HTML input
 * types and provides visual feedback for validation states.
 *
 * @example
 * ```tsx
 * // Basic input with React Hook Form
 * const { register } = useForm();
 * <Input
 *   name="email"
 *   type="email"
 *   placeholder="Enter your email"
 *   register={register}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Input with validation
 * <Input
 *   name="password"
 *   type="password"
 *   register={register}
 *   validationSchema={{
 *     required: 'Password is required',
 *     minLength: { value: 8, message: 'Must be at least 8 characters' }
 *   }}
 *   status={errors.password ? 'error' : 'basic'}
 *   errors={errors.password}
 *   showHelperText
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Without React Hook Form: value and onChange go through inputProps
 * <Input
 *   name="search"
 *   placeholder="Search products..."
 *   startElement={<Icon name="search" />}
 *   inputProps={{ value, onChange: (e) => setValue(e.target.value) }}
 * />
 * ```
 *
 * @note React Hook Form integration is optional. Without `register` there is
 * no validation, value and change handler go through `inputProps`, and a
 * console warning is logged. `control` and `setValue` are accepted but unused.
 */
export interface InputProps extends Partial<
  Pick<UseFormReturn, 'register' | 'control' | 'setValue'>
> {
  /**
   * Name attribute for the input, required for React Hook Form integration
   */
  name: string;

  /**
   * Visual validation status of the input
   * - `basic`: Default state, no validation feedback
   * - `error`: Error state with red border and error icon
   * - `success`: Success state with green border and success icon
   * - `custom`: no status border colours and no status icon
   * @default 'basic'
   */
  status?: keyof InputStatusColors;

  /**
   * HTML input type attribute
   * Supports all standard HTML input types (text, email, password, number, etc.)
   * @default 'text'
   */
  type?: string;

  /**
   * Placeholder text displayed when input is empty
   */
  placeholder?: string;

  /**
   * React Hook Form validation schema
   * Object containing validation rules (required, minLength, pattern, etc.)
   */
  validationSchema?: Record<string, unknown>;

  /**
   * Whether the input is disabled
   * Disabled inputs cannot be edited and appear visually muted
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom CSS class name for the input element
   */
  className?: string;

  /**
   * Custom CSS class name for the wrapper container
   */
  wrapperClassName?: string;

  /**
   * Custom CSS class name for the helper text container
   */
  helperClassName?: string;

  /**
   * Not used: has no effect.
   */
  as?: React.ElementType;

  /**
   * React element to display before the input (e.g., icon)
   * Commonly an Icon component
   */
  startElement?: React.ReactElement;

  /**
   * React element to display after the input (e.g., icon or action button).
   * Replaces the status icon.
   */
  endElement?: React.ReactElement;

  /**
   * Custom Emotion CSS styles
   */
  css?: Interpolation<Theme>;

  /**
   * Props passed straight to the `<input>`: `id` (default
   * `formElement-{name}`), `aria-*`, `autoComplete`, and — without `register` —
   * `value` / `onChange`. With `register`, its `onChange` is overridden by the
   * registered one.
   */
  inputProps?: ExtendedInputProps;

  /**
   * Tooltip text to display when hovering over the error icon.
   * Only shown when status is 'error', showStatusIcon is true and there is no
   * endElement.
   */
  errorTooltip?: string;

  /**
   * Tooltip text to display when hovering over success icon
   * Only visible when status is 'success' and showStatusIcon is true
   */
  successTooltip?: string;

  /**
   * Whether to show helper text below the input
   * Displays validation errors, helper text, or character count
   * @default false
   */
  showHelperText?: boolean;

  /**
   * Whether to show status icon (error/success) inside the input
   * Hidden when endElement is provided or input is disabled
   * @default true
   */
  showStatusIcon?: boolean;

  /**
   * Whether to show borders around the input
   * @default true
   */
  showBorders?: boolean;

  /**
   * Helper text to display below the input.
   * Only shown when showHelperText is true; `errors.message` replaces it.
   */
  helperText?: string;

  /**
   * Shows a `count / maxLength` counter in the helper row (needs
   * showHelperText). Display-only: it is not set on the `<input>`, so it does
   * not limit typing. The count updates on key-up.
   */
  maxLength?: number;

  /**
   * React Hook Form field error object
   * Used to display validation error messages
   */
  errors?: FieldError;

  /**
   * Keyboard event handler for keyup events. Called after the character
   * counter updates.
   */
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * Not used: has no effect. Put `onClick` on the element passed as
   * `startElement`.
   */
  onStartElementClick?: (event: BaseSyntheticEvent) => void;

  /**
   * Not used: has no effect. Put `onClick` on the element passed as
   * `endElement`.
   */
  onEndElementClick?: (event: BaseSyntheticEvent) => void;
}

/**
 * Status color mappings for Input component
 * Defines the visual styling for different validation states
 */
export interface InputStatusColors {
  basic: Interpolation<Theme>;
  error: Interpolation<Theme>;
  success: Interpolation<Theme>;
  custom: Interpolation<Theme>;
}

export type InputColors = keyof Theme['colors'];
