import FormHelperText from '@components/FormHelperText';

import { useFieldContext } from './FieldProvider';

/**
 * Props for Field.Error component
 *
 * Error message component that only displays when field status is 'error'.
 * Automatically hidden when field is in 'basic' or 'success' state.
 */
export interface FieldErrorProps {
  /**
   * Error message text to display
   */
  children: React.ReactNode;
}

/**
 * Field.Error - Error message for form fields
 *
 * Displays error messages below form controls. Only visible when the field
 * status is 'error'. Automatically styled with error colors and hidden when
 * status is 'basic' or 'success'.
 *
 * @category Form Controls
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Field.Root status={errors.email ? 'error' : 'basic'}>
 *   <Field.Label htmlFor="formElement-email">Email</Field.Label>
 *   <Field.Control>
 *     <Input name="email" />
 *   </Field.Control>
 *   <Field.Error>
 *     {errors.email?.message || 'Email is required'}
 *   </Field.Error>
 * </Field.Root>
 * ```
 *
 * @accessibility
 * - Visible only when status is 'error'
 * - Sets no live-region role and is not linked to the control with
 *   `aria-describedby`
 */
export const FieldError = ({ children }: FieldErrorProps) => {
  const ctx = useFieldContext();

  if (ctx.status !== 'error') {
    return null;
  }

  return (
    <FormHelperText status="error" data-testid="field-error">
      {children}
    </FormHelperText>
  );
};
