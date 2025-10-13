import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { CheckboxProps } from '../..';

export type FormCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
