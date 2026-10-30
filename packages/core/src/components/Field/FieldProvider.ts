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
   * Whether the field is disabled. Greys out the label and the control box;
   * it does not disable the control itself, so pass `disabled` to it too
   * @default false
   */
  disabled: boolean;

  /**
   * If true, clicking anywhere in Field.Control focuses its single
   * `forwardRef` child. Does not affect `controlRef`, which Field.Control
   * always focuses on click
   * @default true
   */
  forwardFocus: boolean;
}

export const [FieldProvider, useFieldContext] =
  createSafeContext<FieldContextValue>(
    'useFieldContext must be used within a FieldProvider',
  );
