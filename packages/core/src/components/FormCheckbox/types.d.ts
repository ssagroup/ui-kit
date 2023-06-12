import { Control, FieldPath, FieldValues } from 'react-hook-form';

export type IFormCheckboxProps<T extends FieldValues> = Omit<
  ICheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
