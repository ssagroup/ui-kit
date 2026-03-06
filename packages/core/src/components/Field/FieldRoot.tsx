import { Fragment, type HTMLAttributes } from 'react';

import { FieldProvider, FieldContextValue } from './FieldProvider';

/**
 * Props for Field.Root component
 *
 * The root container component for form fields. Provides context for validation status,
 * disabled state, and focus behavior to child Field components. Can render as a div
 * (default) or use the asChild pattern to render without a wrapper.
 *
 * @example
 * ```tsx
 * <Field.Root status="error">
 *   <Field.Label htmlFor="email">Email</Field.Label>
 *   <Field.Control>
 *     <Input id="email" name="email" />
 *   </Field.Control>
 *   <Field.Error>Invalid email address</Field.Error>
 * </Field.Root>
 * ```
 */
export interface FieldRootProps
  extends Partial<FieldContextValue>, HTMLAttributes<HTMLDivElement> {
  /**
   * If true, renders without a wrapper div (asChild pattern)
   * Useful for semantic HTML (e.g., wrapping with fieldset)
   * @default false
   */
  asChild?: boolean;

  /**
   * Child components (typically Field.Label, Field.Control, Field.Description, etc.)
   */
  children: React.ReactNode;
}

/**
 * Field - Compound layout primitives for building accessible form fields.
 *
 * Purpose: use when you need full control over field layout or when building custom
 * form widgets (e.g. JsonSchemaForm, custom inputs). Field does not render an input
 * itself — you compose Field.Root, Field.Label, Field.Control, Field.Description,
 * Field.Error, and Field.Success around Input, Textarea, or other controls. Use
 * TextField for a ready-made text input with label and validation UI.
 *
 * Field.Root - Root container for form field components. Provides context and
 * styling container for form fields. Manages validation status, disabled state,
 * and focus forwarding behavior. Use with Field.Label, Field.Control,
 * Field.Description, Field.Error, and Field.Success components.
 *
 * @category Form Controls
 * @subcategory Layout
 *
 * @example
 * ```tsx
 * // Basic field
 * <Field.Root>
 *   <Field.Label htmlFor="username">Username</Field.Label>
 *   <Field.Control>
 *     <Input id="username" name="username" />
 *   </Field.Control>
 * </Field.Root>
 * ```
 *
 * @example
 * ```tsx
 * // Field with validation
 * <Field.Root status={hasError ? 'error' : 'basic'}>
 *   <Field.Label htmlFor="email">Email</Field.Label>
 *   <Field.Control>
 *     <Input id="email" name="email" />
 *   </Field.Control>
 *   <Field.Error>Email is required</Field.Error>
 * </Field.Root>
 * ```
 *
 * @example
 * ```tsx
 * // Using asChild pattern with fieldset
 * <Field.Root asChild status="error">
 *   <fieldset>
 *     <Field.Label htmlFor="age">Age</Field.Label>
 *     <Field.Control>
 *       <Input id="age" name="age" type="number" />
 *     </Field.Control>
 *   </fieldset>
 * </Field.Root>
 * ```
 *
 * @see {@link Field.Label} - For accessible labels
 * @see {@link Field.Control} - For input wrapper
 * @see {@link Field.Description} - For helper text
 * @see {@link Field.Error} - For error messages
 * @see {@link Field.Success} - For success messages
 *
 * @accessibility
 * - Label/control association via htmlFor on Field.Label
 * - Status (error/success) and disabled flow from context to child components
 * - Optional focus forwarding from Field.Control to the inner input
 */
export const FieldRoot = ({ children, ...props }: FieldRootProps) => {
  const {
    disabled = false,
    status = 'basic',
    forwardFocus = true,
    asChild = false,
    ...divProps
  } = props;

  const Wrapper = asChild ? Fragment : 'div';
  const wrapperProps = asChild ? {} : divProps;

  return (
    <Wrapper {...wrapperProps}>
      <FieldProvider value={{ disabled, status, forwardFocus }}>
        {children}
      </FieldProvider>
    </Wrapper>
  );
};
