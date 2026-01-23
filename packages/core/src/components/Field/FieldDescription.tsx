import FormHelperText from '@components/FormHelperText';

import { useFieldContext } from './FieldProvider';

/**
 * Props for Field.Description component
 *
 * Helper text component that only displays when field status is 'basic'.
 * Automatically hidden when field is in 'error' or 'success' state to avoid
 * conflicting with Field.Error or Field.Success messages.
 */
export interface FieldDescriptionProps {
  /**
   * Helper text content to display
   */
  children: React.ReactNode;
}

/**
 * Field.Description - Helper text for form fields
 *
 * Displays descriptive helper text below form controls. Only visible when
 * the field status is 'basic' (hidden when status is 'error' or 'success'
 * to avoid conflicts with validation messages).
 *
 * @category Form Controls
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label htmlFor="password">Password</Field.Label>
 *   <Field.Control>
 *     <Input id="password" name="password" type="password" />
 *   </Field.Control>
 *   <Field.Description>
 *     Must be at least 8 characters with one number
 *   </Field.Description>
 * </Field.Root>
 * ```
 */
export const FieldDescription = ({ children }: FieldDescriptionProps) => {
  const ctx = useFieldContext();

  if (ctx.status !== 'basic') {
    return null;
  }

  return (
    <FormHelperText status="basic" data-testid="field-description">
      {children}
    </FormHelperText>
  );
};
