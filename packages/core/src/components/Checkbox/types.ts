import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { CommonProps } from '@global-types/emotion';
import { MutableRefObject } from 'react';

export interface ICheckboxProps extends CommonProps {
  text?: string;
  id?: string;
  onChange: (newState: boolean) => void;
  externalState?: boolean;
  isDisabled?: boolean;
  initialState?: boolean;
  isIndeterminate?: boolean;
  name?: string;
  isRequired?: boolean;
  ref?: MutableRefObject<HTMLInputElement>;
  color?: 'green' | 'blue' | 'custom';
}

export type IFormCheckboxProps<T extends FieldValues> = Omit<
  ICheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
