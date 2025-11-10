import { ChangeHandler, FieldValues, UseFormRegister } from 'react-hook-form';

import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

import { useToggle } from '@ssa-ui-kit/hooks';

import Button from '@components/Button';
import { Field } from '@components/Field';
import Icon from '@components/Icon';
import Input from '@components/Input';

export const PasswordWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const {
    id,
    value,
    name,
    disabled,
    options,
    placeholder,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
  } = props;
  const [visible, toggleVisibility] = useToggle();

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
        type={visible ? 'text' : 'password'}
        endElement={
          <Button
            variant="tertiary"
            endIcon={
              <Icon name={visible ? 'invisible' : 'visible'} size={16} />
            }
            onClick={() => toggleVisibility()}
          />
        }
      />
    </Field.Control>
  );
};
