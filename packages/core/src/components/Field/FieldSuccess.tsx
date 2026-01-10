import FormHelperText from '@components/FormHelperText';

import { useFieldContext } from './FieldProvider';

/**
 * Props for Field.Success component
 *
 * Success message component that only displays when field status is 'success'.
 * Automatically hidden when field is in 'basic' or 'error' state.
 */
export interface FieldSuccessProps {
  /**
   * Success message text to display
   */
  children: React.ReactNode;
}

/**
 * Field.Success - Success message for form fields
 *
 * Displays success/validation confirmation messages below form controls.
 * Only visible when the field status is 'success'. Automatically styled with
 * success colors and hidden when status is 'basic' or 'error'.
 *
 * @category Form Controls
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Field.Root status={isValid ? 'success' : 'basic'}>
 *   <Field.Label htmlFor="username">Username</Field.Label>
 *   <Field.Control>
 *     <Input id="username" name="username" />
 *   </Field.Control>
 *   <Field.Success>Username is available!</Field.Success>
 * </Field.Root>
 * ```
 *
 * @accessibility
 * - Uses role="status" for screen reader announcements
 * - Visible only when status is 'success'
 */
export const FieldSuccess = ({ children }: FieldSuccessProps) => {
  const ctx = useFieldContext();

  if (ctx.status !== 'success') {
    return null;
  }

  return (
    <FormHelperText status="success" data-testid="field-success">
      {children}
    </FormHelperText>
  );
};
