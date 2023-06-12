import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import RadioGroup from '@components/RadioGroup';

import { IFormRadioGroupProps } from './types';

const FormRadioGroup = <T extends FieldValues>({
  name,
  isRequired = false,
  control,
  children,
  ...props
}: IFormRadioGroupProps<T>) => {
  const { field } = useController<T>({
    control,
    name,
    rules: { required: isRequired },
  });

  return (
    <RadioGroup
      name={field.name}
      onChange={(value) => {
        field.onChange(value);
      }}
      isRequired={isRequired}
      {...props}>
      {children}
    </RadioGroup>
  );
};

export default FormRadioGroup;
