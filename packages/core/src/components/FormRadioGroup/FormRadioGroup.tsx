import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import RadioGroup from '@components/RadioGroup';

import { FormRadioGroupProps } from './types';
import { ChangeEvent } from 'react';

/**
 * FormRadioGroup - RadioGroup bound to a react-hook-form field
 *
 * Registers the field through `useController` and writes the picked radio's
 * value into the form. It takes the same `Radio` children and props as
 * RadioGroup, plus `name` and `control`.
 *
 * Writing only goes one way: the radios do not follow the form value, so
 * `defaultValues`, `reset()` and `setValue()` do not move the selection —
 * pass a matching `defaultValue` to start selected. Validation errors are not
 * rendered; read `formState.errors` and show your own message.
 *
 * @category Form Controls
 * @subcategory Input
 *
 * @example
 * ```tsx
 * const { control } = useForm<{ tree: string }>();
 * <FormRadioGroup name="tree" control={control} isRequired>
 *   <Radio id="tree-oak" value="oak" text="Oak" />
 *   <Radio id="tree-spruce" value="spruce" text="Spruce" />
 * </FormRadioGroup>
 * ```
 *
 * @see {@link RadioGroup}
 */
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
