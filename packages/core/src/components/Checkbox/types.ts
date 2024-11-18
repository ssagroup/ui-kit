import { MutableRefObject, ReactNode } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

export interface CheckboxProps
  extends Partial<Pick<UseFormReturn, 'register'>> {
  text?: ReactNode;
  id?: string;
  onChange?: (newState: boolean) => void;
  externalState?: boolean;
  isDisabled?: boolean;
  initialState?: boolean;
  isIndeterminate?: boolean;
  name?: string;
  isRequired?: boolean;
  ref?: MutableRefObject<HTMLInputElement>;
  color?: 'green' | 'blue' | 'custom';
  as?: React.ElementType;
  className?: string;
}

export type IFormCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
