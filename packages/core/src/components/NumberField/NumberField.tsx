import {
  NumberFormatOptions,
  unformat,
  format,
  useNumberFormat,
} from '@react-input/number-format';
import { useUncontrolled } from '@ssa-ui-kit/hooks';
import { isNill } from '@ssa-ui-kit/utils';

import { Field, Input } from '@components';
import { InputProps } from '@components/Input/types';
import { FieldRootProps } from '@components/Field/FieldRoot';

/**
 * Props for {@link NumberField}. Also accepts every `Input` prop; `name` is
 * required.
 */
export interface NumberFieldProps extends InputProps {
  /**
   * Target of the label's `htmlFor`. It is not applied to the `<input>`,
   * whose id is always `formElement-{name}`, so pass that same value to link
   * the label to the input.
   */
  id?: string;
  /**
   * Controlled value. Formatted with `numberFormat` before it is shown. Pair
   * with `onChange`. The field is re-formatted from `value` on every
   * keystroke, so a typed decimal separator is dropped; use `defaultValue`
   * for decimal input.
   */
  value?: number;
  /** Starting value when uncontrolled. Formatted with `numberFormat`. */
  defaultValue?: number;
  /** Helper text under the field. */
  description?: React.ReactNode;
  /** Label above the field. */
  label?: React.ReactNode;
  /** Message under the field; pair with `status="success"`. */
  success?: React.ReactNode;
  /** Message under the field; pair with `status="error"`. */
  error?: React.ReactNode;
  /**
   * Field status: `basic`, `error` or `success`.
   * @default 'basic'
   */
  status?: FieldRootProps['status'];
  /**
   * Formatting options from `@react-input/number-format`: `format`
   * (`'decimal' | 'currency' | 'unit' | 'percent'`), `currency`, `unit`,
   * `minimumIntegerDigits`, `maximumIntegerDigits`, `minimumFractionDigits`,
   * `maximumFractionDigits`, `groupDisplay`, `signDisplay`, plus `locales`.
   * `percent` shows `0.5` as `50%` but reports `50`. Currency defaults to
   * exactly two decimals, which makes typing awkward; set
   * `minimumFractionDigits: 0`.
   */
  numberFormat?: NumberFormatOptions & { locales?: Intl.LocalesArgument };
  /**
   * Called with the unformatted number on every edit. Clearing the field
   * reports `0`. Replaced by `register`'s handler when `register` is passed;
   * use react-hook-form's `Controller` instead.
   */
  onChange?: (value: number) => void;
}

/**
 * NumberField - Labelled numeric input that formats the value as the user
 * types and reports a plain number.
 *
 * Built from `Field` and `Input`. Formatting (grouping, decimals, currency,
 * units, locale) comes from `numberFormat`. Works controlled (`value` +
 * `onChange`) or uncontrolled (`defaultValue`).
 *
 * @example
 * ```tsx
 * const [amount, setAmount] = useState(0);
 *
 * <NumberField
 *   name="amount"
 *   id="formElement-amount"
 *   label="Amount"
 *   value={amount}
 *   onChange={setAmount}
 *   numberFormat={{
 *     format: 'currency',
 *     currency: 'USD',
 *     minimumFractionDigits: 0,
 *   }}
 * />
 * ```
 */
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
  const formattedValue = isNill(value) ? value : format(value, numberFormat);
  const formattedDefaultValue = isNill(defaultValue)
    ? defaultValue
    : format(defaultValue, numberFormat);

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
