import { useController } from 'react-hook-form';

import Checkbox from '@components/Checkbox';

import { IFormCheckboxProps } from './types';

const FormCheckbox = <T,>({
  control,
  name,
  isRequired = false,
  ...props
}: IFormCheckboxProps<T>) => {
  const { field } = useController({
    control,
    name,
    rules: { required: isRequired },
  });

  return (
    <Checkbox
      name={name}
      onChange={(value) => {
        field.onChange(value);
      }}
      isRequired={isRequired}
      {...props}
    />
  );
};

export default FormCheckbox;
