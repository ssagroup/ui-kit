import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { Controller, useForm } from 'react-hook-form';

import Button from '@components/Button';
import { NumberField, NumberFieldProps } from './NumberField';

type Args = NumberFieldProps;

const column = { display: 'flex', flexDirection: 'column', gap: 16 } as const;

export default {
  title: 'Components/NumberField',
  component: NumberField,
  args: {
    name: 'amount',
    id: 'formElement-amount',
    label: 'Amount',
    placeholder: 'Enter a number',
    description: 'Up to 5 integer digits and 2 decimals',
    numberFormat: {
      maximumIntegerDigits: 5,
      maximumFractionDigits: 2,
    },
    onChange: fn(),
  },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['basic', 'error', 'success'],
    },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'text' },
    value: { control: false },
    onChange: { control: false },
    register: { control: false },
    control: { control: false },
    setValue: { control: false },
    validationSchema: { control: false },
    errors: { control: false },
    inputProps: { control: false },
    startElement: { control: false },
    endElement: { control: false },
    onKeyUp: { control: false },
    as: { control: false },
    css: { control: false },
    onStartElementClick: { control: false },
    onEndElementClick: { control: false },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<Args>;

/**
 * NumberField is a labelled input that formats the number as you type
 * (grouping, decimals, currency, units) and reports a plain `number` through
 * `onChange`.
 *
 * Without `value` it is uncontrolled: `defaultValue` sets the starting number.
 * Clearing the field reports `0`.
 *
 * The `<input>` gets `id="formElement-{name}"`, and the label points at `id`.
 * Pass `id="formElement-{name}"` so the label is linked to the input.
 *
 * Every prop in the Controls panel applies here. `numberFormat` changes the
 * format live; `status` with `error` / `success` shows the message under the
 * field.
 */
export const Default: StoryObj<Args> = {
  render: (args) => <NumberField {...args} />,
};

/**
 * `numberFormat` takes the options of `@react-input/number-format`: `format`
 * (`'decimal'`, `'currency'`, `'unit'`), `currency`, `unit`, digit limits,
 * `groupDisplay` and `signDisplay`, plus `locales` for separators and symbol
 * placement. The same number is shown in each field below.
 *
 * Set `minimumFractionDigits: 0` for currency. Currency defaults to exactly
 * two decimals, and fixed decimals make typing awkward: Backspace turns a
 * decimal into `0` instead of deleting it, and after the first digit the
 * caret lands behind `.00`, so the next digits are dropped.
 *
 * Avoid `format: 'percent'` for now: the field shows `50%` for `0.5` but
 * reports `50` back.
 */
export const Formats: StoryObj<Args> = {
  args: { description: undefined, defaultValue: 1234.5 },
  render: (args) => (
    <div style={column}>
      <div>
        <NumberField
          {...args}
          name="price"
          id="formElement-price"
          label="Price (USD)"
          numberFormat={{
            format: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
          }}
        />
      </div>
      <div>
        <NumberField
          {...args}
          name="price-eur"
          id="formElement-price-eur"
          label="Price (EUR, German)"
          numberFormat={{
            format: 'currency',
            currency: 'EUR',
            locales: 'de-DE',
            minimumFractionDigits: 0,
          }}
        />
      </div>
      <div>
        <NumberField
          {...args}
          name="distance"
          id="formElement-distance"
          label="Distance"
          numberFormat={{
            format: 'unit',
            unit: 'kilometer',
            maximumFractionDigits: 1,
          }}
        />
      </div>
      <div>
        <NumberField
          {...args}
          name="quantity"
          id="formElement-quantity"
          label="Quantity (whole numbers)"
          numberFormat={{ maximumFractionDigits: 0, groupDisplay: false }}
        />
      </div>
    </div>
  ),
};

/**
 * To control the field, pass `value` and write the number from `onChange`
 * back to state. `value` is formatted with `numberFormat` before it is shown.
 *
 * A controlled field is re-formatted from `value` on every keystroke, so it
 * suits whole numbers: a typed decimal separator is dropped before the next
 * digit arrives, and emptying the field shows `0`. For decimal input, leave
 * the field uncontrolled (`defaultValue` + `onChange`).
 */
export const Controlled: StoryObj<Args> = {
  args: {
    description: 'Whole numbers, up to 5 digits',
    numberFormat: { maximumIntegerDigits: 5, maximumFractionDigits: 0 },
  },
  render: function Render(args) {
    const [value, setValue] = useState(9999);
    return (
      <div style={column}>
        <NumberField
          {...args}
          value={value}
          onChange={(next) => {
            setValue(next);
            args.onChange?.(next);
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Value: {value}</span>
          <Button size="small" variant="secondary" onClick={() => setValue(0)}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * With react-hook-form, wrap NumberField in a `Controller` and pass its
 * `value` and `onChange`. Don't pass `register`: it replaces NumberField's
 * own change handler, and the field stops formatting and reporting numbers.
 *
 * Map the field's error to `status="error"` and `error`.
 */
export const WithReactHookForm: StoryObj<Args> = {
  render: function Render(args) {
    const { control, handleSubmit } = useForm({
      defaultValues: { quantity: 0 },
    });
    const [submitted, setSubmitted] = useState<number>();
    return (
      <form
        style={column}
        onSubmit={handleSubmit((data) => setSubmitted(data.quantity))}>
        <Controller
          name="quantity"
          control={control}
          rules={{ min: { value: 1, message: 'Order at least 1' } }}
          render={({ field, fieldState }) => (
            <NumberField
              {...args}
              name="quantity"
              id="formElement-quantity"
              label="Quantity"
              description="At least 1"
              numberFormat={{ maximumFractionDigits: 0 }}
              value={field.value}
              onChange={field.onChange}
              status={fieldState.error ? 'error' : 'basic'}
              error={fieldState.error?.message}
            />
          )}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button type="submit" size="small">
            Submit
          </Button>
          {submitted !== undefined && <span>Submitted: {submitted}</span>}
        </div>
      </form>
    );
  },
};
