import {
  BaseInputTemplateProps,
  FormContextType,
  getInputProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import type {
  ChangeHandler,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

import Input from '@components/Input';
import { Field } from '@components/Field';

export const BaseInputTemplate = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: BaseInputTemplateProps<T, S, F>,
) => {
  const {
    id,
    value,
    name,
    disabled,
    schema,
    type,
    options,
    placeholder,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
  } = props;
  const inputProps = getInputProps<T, S, F>(schema, type, options, false);

  const handleChange = onChangeOverride
    ? onChangeOverride
    : ({ target }: React.ChangeEvent<HTMLInputElement>) =>
        onChange(target.value === '' ? options.emptyValue : target.value);

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, target && target.value);

  const handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(id, target && target.value);

  const register: UseFormRegister<FieldValues> = (fieldName) => ({
    onBlur: handleBlur as ChangeHandler,
    onChange: handleChange as ChangeHandler,
    name: fieldName,
    ref: () => {},
  });

  return (
    <Field.Control>
      <Input
        register={register}
        inputProps={{
          id,
          value: value ?? '',
          onFocus: handleFocus,
        }}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        css={{ border: '0 !important' }}
        {...inputProps}
      />
    </Field.Control>
  );
};
