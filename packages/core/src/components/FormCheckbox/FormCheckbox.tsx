import { ChangeEvent } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import Checkbox from '@components/Checkbox';

import { FormCheckboxProps } from './types';

const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  isRequired = false,
  ...props
}: FormCheckboxProps<T>) => {
  const { field } = useController({
    control,
    name,
    rules: { required: isRequired },
  });

  return (
    <Checkbox
      name={name}
      onChange={(value) => {
        field.onChange(value as unknown as ChangeEvent);
      }}
      isRequired={isRequired}
      {...props}
    />
  );
};

export default FormCheckbox;
