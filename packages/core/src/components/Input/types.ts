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
 * // Input with icons and helper text
 * <Input
 *   name="search"
 *   placeholder="Search products..."
 *   startElement={<Icon name="search" />}
 *   endElement={<Icon name="clear" onClick={handleClear} />}
 *   helperText="Type to search"
 *   showHelperText
 * />
 * ```
 *
 * @note React Hook Form integration is optional. If `register` is not provided,
 * the component will still work but validation features will be unavailable.
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
   * - `custom`: Custom styling (no default status styling)
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
   * Custom element type to render as (for composition)
   */
  as?: React.ElementType;

  /**
   * React element to display before the input (e.g., icon)
   * Commonly an Icon component
   */
  startElement?: React.ReactElement;

  /**
   * React element to display after the input (e.g., icon or action button)
   * Commonly an Icon component or clear button
   */
  endElement?: React.ReactElement;

  /**
   * Custom Emotion CSS styles
   */
  css?: Interpolation<Theme>;

  /**
   * Additional props to pass directly to the underlying input element
   * Includes all standard HTML input attributes
   */
  inputProps?: ExtendedInputProps;

  /**
   * Tooltip text to display when hovering over error icon
   * Only visible when status is 'error' and showStatusIcon is true
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
   * Helper text to display below the input
   * Only shown when showHelperText is true and no errors are present
   */
  helperText?: string;

  /**
   * Maximum character length for the input
   * When provided with showHelperText, displays character count (e.g., "45 / 100")
   */
  maxLength?: number;

  /**
   * React Hook Form field error object
   * Used to display validation error messages
   */
  errors?: FieldError;

  /**
   * Keyboard event handler for keyup events
   * Also used internally for character counting when maxLength is provided
   */
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;

  /**
   * Click handler for the start element
   * Useful for making start icons interactive (e.g., toggle password visibility)
   */
  onStartElementClick?: (event: BaseSyntheticEvent) => void;

  /**
   * Click handler for the end element
   * Useful for making end icons interactive (e.g., clear button)
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
