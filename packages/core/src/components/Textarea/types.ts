import { ReactEventHandler } from 'react';
import type { UseFormReturn } from 'react-hook-form';

/**
 * Props for the Textarea component
 *
 * A multi-line text input component with React Hook Form integration and validation.
 * Supports character limits, paste handling, and all standard textarea features.
 *
 * @example
 * ```tsx
 * // Basic textarea with React Hook Form
 * const { register } = useForm();
 * <Textarea
 *   name="message"
 *   placeholder="Enter your message"
 *   register={register}
 *   rows={5}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Textarea with validation and character limit
 * <Textarea
 *   name="description"
 *   register={register}
 *   validationSchema={{
 *     required: 'Description is required',
 *     maxLength: { value: 500, message: 'Maximum 500 characters' }
 *   }}
 *   maxLength={500}
 *   rows={10}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Read-only textarea
 * <Textarea
 *   name="readonly-content"
 *   register={register}
 *   readOnly
 *   rows={8}
 * />
 * ```
 *
 * @note React Hook Form integration is optional, but without `register` the
 * textarea has no `name` attribute, no value/onChange props (read it through
 * the ref, or `setCountChar` for changes) and logs a console warning.
 * `register` expects an untyped `useForm()`.
 */
export interface TextareaProps extends Partial<
  Pick<UseFormReturn, 'register'>
> {
  /**
   * Name attribute for the textarea, required for React Hook Form integration
   */
  name: string;

  /**
   * Placeholder text displayed when textarea is empty
   */
  placeholder?: string;

  /**
   * React Hook Form validation schema
   * Object containing validation rules (required, maxLength, pattern, etc.)
   */
  validationSchema?: Record<string, unknown>;

  /**
   * Whether the textarea is disabled
   * Disabled textarea elements cannot be edited
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the textarea is read-only
   * Read-only textarea elements can be focused and scrolled but not edited
   * @default false
   */
  readOnly?: boolean;

  /**
   * Number of visible text rows
   * Determines the initial height of the textarea
   * @default 10
   */
  rows?: number;

  /**
   * Maximum character length, set on the `<textarea>`: typing stops at the
   * limit. Textarea shows no counter; build one with `setCountChar`.
   */
  maxLength?: number;

  /**
   * Visual validation status (aligns with Input/TextField palette behavior).
   * - `basic`: default border/outline (theme.colors grey)
   * - `error`: error state (theme.palette.error)
   * - `success`: success state (theme.palette.success)
   * - `custom`: same as basic
   * @default 'basic'
   */
  status?: 'basic' | 'error' | 'success' | 'custom';

  /**
   * Element to render instead of `<textarea>` (Emotion `as`).
   */
  as?: React.ElementType;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Title attribute for the textarea element
   * Provides tooltip text on hover
   */
  title?: string;

  /**
   * HTML id attribute for the textarea (e.g. for label htmlFor).
   * Defaults to `formElement-${name}` when not provided.
   */
  id?: string;

  /**
   * Ids of the elements describing the textarea — a label badge, helper text
   */
  'aria-describedby'?: string;

  /**
   * Paste event handler
   * Fired when content is pasted into the textarea
   */
  onPaste?: React.ClipboardEventHandler<HTMLTextAreaElement>;

  /**
   * Called with the change event on every edit, before the registered
   * `onChange`. Use it to drive a character counter, or to read the value
   * without react-hook-form.
   */
  setCountChar?: ReactEventHandler;
}
