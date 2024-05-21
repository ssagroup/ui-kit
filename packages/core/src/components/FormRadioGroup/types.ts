import { FieldPath, Control, FieldValues } from 'react-hook-form';

import { RadioGroupProps } from '@components/RadioGroup/types';
import { CommonProps } from '@global-types/emotion';

export type FormRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupProps,
  'name' | 'onChange'
> & {
  name: FieldPath<T>;
  control: Control<T>;
} & CommonProps;
