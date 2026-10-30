import { FieldPath, Control, FieldValues } from 'react-hook-form';

import { RadioGroupProps } from '@components/RadioGroup/types';
import { CommonProps } from '@global-types/emotion';

/**
 * Props for FormRadioGroup: RadioGroup's props without `onChange`, plus the
 * react-hook-form `name` and `control`. Don't pass `value` — the group would
 * become controlled by it instead of following clicks.
 */
export type FormRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupProps,
  'name' | 'onChange'
> & {
  /** Form field path the picked value is written to; also the radios' `name` */
  name: FieldPath<T>;
  /** `control` from `useForm()` */
  control: Control<T>;
} & CommonProps;
