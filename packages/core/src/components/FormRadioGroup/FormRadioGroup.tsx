import { ChangeEvent } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import RadioGroup from '@components/RadioGroup';

import { FormRadioGroupProps } from './types';

const FormRadioGroup = <T extends FieldValues>({
  name,
  isRequired = false,
  control,
  children,
  ...props
}: FormRadioGroupProps<T>) => {
  const { field } = useController<T>({
    control,
    name,
    rules: { required: isRequired },
  });

  return (
    <RadioGroup
      name={field.name}
      onChange={(value) => {
        field.onChange(value as unknown as ChangeEvent);
      }}
      isRequired={isRequired}
      {...props}>
      {children}
    </RadioGroup>
  );
};

export default FormRadioGroup;
