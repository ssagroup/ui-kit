import { FieldPath, Control } from 'react-hook-form';

import { IRadioGroupProps } from '@components/RadioGroup/types';

export type IFormRadioGroupProps<T> = Omit<
  IRadioGroupProps,
  'name' | 'onChange'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
