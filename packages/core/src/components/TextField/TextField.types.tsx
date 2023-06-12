import type { UseFormReturn, FieldError } from 'react-hook-form';

export interface TextFieldProps
  extends Partial<Pick<UseFormReturn, 'register'>> {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  validationSchema?: Record<string, unknown>;
  errors?: FieldError;
  success?: boolean;
  helperText?: string;
  disabled?: boolean;
  rows?: number;
  append?: React.ReactElement;
  multirow?: boolean;
  maxLength?: number;
}
