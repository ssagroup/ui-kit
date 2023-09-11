import { FieldPath, Control, FieldValues } from 'react-hook-form';

import { IRadioGroupProps } from '@components/RadioGroup/types';
import { CommonProps } from '@global-types/emotion';

export type IFormRadioGroupProps<T extends FieldValues> = Omit<
  IRadioGroupProps,
  'name' | 'onChange'
> & {
  name: FieldPath<T>;
  control: Control<T>;
} & CommonProps;
