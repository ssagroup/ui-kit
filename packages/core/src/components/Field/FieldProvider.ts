import { createSafeContext } from '@ssa-ui-kit/hooks';

/**
 * Field context value shared between Field components
 * Provides validation status, disabled state, and focus behavior to child components
 */
export interface FieldContextValue {
  /**
   * Validation status of the field
   * - `basic`: Default state, no validation feedback
   * - `error`: Error state with red styling
   * - `success`: Success state with green styling
   * @default 'basic'
   */
  status: 'error' | 'success' | 'basic';

  /**
   * Whether the field is disabled
   * Disabled fields appear muted and cannot be interacted with
   * @default false
   */
  disabled: boolean;

  /**
   * If true, clicking on FieldControl will forward focus to its child input element
   * This enables clicking anywhere in the control area to focus the input
   * @default true
   */
  forwardFocus: boolean;
}

export const [FieldProvider, useFieldContext] =
  createSafeContext<FieldContextValue>(
    'useFieldContext must be used within a FieldProvider',
  );
