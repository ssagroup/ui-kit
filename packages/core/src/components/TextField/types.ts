import type { UseFormReturn, FieldError } from 'react-hook-form';
import { InputProps } from '@components/Input/types';

export interface TextFieldProps
  extends InputProps,
    Partial<Pick<UseFormReturn, 'register'>> {
  label?: string;
  errors?: FieldError;
  success?: boolean;
  helperText?: string;
  rows?: number;
  multirow?: boolean;
  maxLength?: number;
}
