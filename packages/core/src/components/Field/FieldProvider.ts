import { createSafeContext } from '@ssa-ui-kit/hooks';

export interface FieldContextValue {
  status: 'error' | 'success' | 'basic';
  disabled: boolean;

  /**
   * If true, ReactElement children will be focused if FieldControl is clicked.
   */
  forwardFocus: boolean;
}

export const [FieldProvider, useFieldContext] =
  createSafeContext<FieldContextValue>(
    'useFieldContext must be used within a FieldProvider',
  );
