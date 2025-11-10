import {
  format,
  NumberFormatOptions,
  unformat,
  useNumberFormat,
} from '@react-input/number-format';

import { useUncontrolled } from '@ssa-ui-kit/hooks';

import { Field, Input } from '@components';
import { FieldRootProps } from '@components/Field/FieldRoot';
import { InputProps } from '@components/Input/types';

export interface NumberFieldProps extends InputProps {
  id?: string;
  value?: number;
  defaultValue?: number;
  description?: React.ReactNode;
  label?: React.ReactNode;
  success?: React.ReactNode;
  error?: React.ReactNode;
  status?: FieldRootProps['status'];
  numberFormat?: NumberFormatOptions & { locales?: Intl.LocalesArgument };
  onChange?: (value: number) => void;
}

export const NumberField = ({
  id,
  value,
  defaultValue,
  description,
  label,
  success,
  error,
  status,
  numberFormat,
  onChange,
  ...inputProps
}: NumberFieldProps) => {
  const { disabled } = inputProps;
  const formattedValue = value == null ? value : format(value, numberFormat);
  const formattedDefaultValue =
    defaultValue == null ? defaultValue : format(defaultValue, numberFormat);

  const [_value, setValue] = useUncontrolled({
    value: formattedValue,
    defaultValue: formattedDefaultValue,
    finalValue: undefined,
    onChange: (value) => {
      const number = Number(unformat(value, numberFormat?.locales));
      onChange?.(number);
    },
  });

  const inputRef = useNumberFormat(numberFormat);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Field.Root disabled={disabled} status={status}>
      {label && <Field.Label htmlFor={id}>{label}</Field.Label>}
      <Field.Control css={{ padding: '0 14px' }}>
        <Input
          ref={inputRef}
          css={{
            with: 'auto',
            border: '0 !important',
            padding: '2px 0',
            height: '32px',
            borderRadius: 0,
          }}
          inputProps={{
            autoComplete: 'off',
            value: _value,
            onChange: handleChange,
          }}
          status="custom"
          {...inputProps}
        />
      </Field.Control>
      {description && <Field.Description>{description}</Field.Description>}
      {success && <Field.Success>{success}</Field.Success>}
      {error && <Field.Error>{error}</Field.Error>}
    </Field.Root>
  );
};
