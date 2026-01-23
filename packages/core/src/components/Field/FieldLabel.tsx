import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

import { useFieldContext } from './FieldProvider';

/**
 * Props for Field.Label component
 *
 * Accessible label component that automatically respects the disabled state
 * from Field.Root context. Should be associated with form controls via htmlFor prop.
 */
export interface FieldLabelProps extends LabelProps {
  /**
   * Label text content
   */
  children: React.ReactNode;

  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Field.Label - Accessible label for form fields
 *
 * Provides an accessible label that automatically respects the disabled state
 * from the Field.Root context. Should be associated with form controls using
 * the htmlFor prop matching the control's id.
 *
 * @category Form Controls
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * <Field.Root>
 *   <Field.Label htmlFor="email">Email Address</Field.Label>
 *   <Field.Control>
 *     <Input id="email" name="email" />
 *   </Field.Control>
 * </Field.Root>
 * ```
 *
 * @accessibility
 * - Properly associated with form controls via htmlFor/id
 * - Respects disabled state from Field context
 * - Screen reader friendly
 */
export const FieldLabel = ({ children, ...props }: FieldLabelProps) => {
  const ctx = useFieldContext();
  return (
    <Label isDisabled={ctx.disabled} {...props}>
      {children}
    </Label>
  );
};
