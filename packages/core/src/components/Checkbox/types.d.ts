import { Control, FieldPath } from 'react-hook-form';

export interface ICheckboxProps {
  text?: string;
  id?: string;
  onChange: (newState: boolean) => void;
  externalState?: boolean;
  isDisabled?: boolean;
  initialState?: boolean;
  isIndeterminate?: boolean;
  name?: string;
  isRequired?: boolean;
}

export type IFormCheckboxProps<T> = Omit<
  ICheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
