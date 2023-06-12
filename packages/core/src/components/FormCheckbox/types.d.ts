import { Control, FieldPath } from 'react-hook-form';

export type IFormCheckboxProps<T> = Omit<
  ICheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
