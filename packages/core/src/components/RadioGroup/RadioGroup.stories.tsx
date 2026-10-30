import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Button from '@components/Button';
import Radio from '@components/Radio';
import Typography from '@components/Typography';
import RadioGroup from './RadioGroup';
import { RadioGroupProps } from './types';

type Args = RadioGroupProps;

const fieldsetStyle = { border: 0, margin: 0, padding: 0 };
const legendStyle = { padding: 0, marginBottom: 8, fontWeight: 500 };

export default {
  title: 'Components/Radio Buttons/RadioGroup',
  component: RadioGroup,
  args: {
    onChange: fn(),
  },
  argTypes: {
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    defaultValue: {
      control: 'text',
      description:
        'Initially selected value. Read on mount only — later changes are ignored.',
    },
    value: { control: false },
    onChange: { control: false },
    children: { control: false },
    className: { control: false },
    externalState: { table: { disable: true } },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof RadioGroup>;

/**
 * Uncontrolled by default: the group starts from `defaultValue`, moves on
 * click and reports the picked radio's `value` to `onChange`. It gives every
 * child the shared `name` (so the arrow keys work), `checked` and `onChange`;
 * a child's own `color` wins over the group's.
 *
 * RadioGroup adds no layout — style it with `className` or `css`, here a flex
 * row. Only direct `Radio` children render: wrappers and fragments are
 * dropped.
 *
 * Every prop in the Controls panel applies here. `defaultValue` is read once,
 * so this story remounts the group when the control changes.
 */
export const Default: StoryObj<Args> = {
  args: {
    name: 'billing',
    defaultValue: 'monthly',
    color: 'primary',
    isRequired: false,
  },
  render: (args) => (
    <fieldset style={fieldsetStyle}>
      <legend style={legendStyle}>Billing period</legend>
      <RadioGroup
        key={String(args.defaultValue)}
        {...args}
        css={{ display: 'flex', gap: 24 }}>
        <Radio id="billing-monthly" value="monthly" text="Monthly" />
        <Radio id="billing-yearly" value="yearly" text="Yearly" />
        <Radio
          id="billing-lifetime"
          value="lifetime"
          text="Lifetime"
          disabled
        />
      </RadioGroup>
    </fieldset>
  ),
};

/**
 * Stack the radios with a flex column. Use a vertical list when labels are
 * long or there are more than three or four options.
 */
export const Vertical: StoryObj<Args> = {
  args: {
    name: 'delivery',
    defaultValue: 'standard',
  },
  render: (args) => (
    <fieldset style={fieldsetStyle}>
      <legend style={legendStyle}>Delivery</legend>
      <RadioGroup
        {...args}
        css={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio
          id="delivery-standard"
          value="standard"
          text="Standard — 3 to 5 days"
        />
        <Radio
          id="delivery-express"
          value="express"
          text="Express — next day"
        />
        <Radio id="delivery-pickup" value="pickup" text="Pick up in store" />
      </RadioGroup>
    </fieldset>
  ),
};

/**
 * Pass `value` to own the selection: the group renders exactly what it is
 * given and a click only calls `onChange(next)`. Setting `value` back to
 * `undefined` clears the selection — the group stays controlled as long as
 * the `value` prop is present, even when it is `undefined`.
 */
export const Controlled: StoryObj<Args> = {
  args: {
    name: 'size',
  },
  render: function Render(args) {
    const [size, setSize] = useState<string | number | undefined>('medium');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>T-shirt size</legend>
          <RadioGroup
            {...args}
            value={size}
            onChange={(next) => {
              setSize(next);
              args.onChange(next);
            }}
            css={{ display: 'flex', gap: 24 }}>
            <Radio id="size-small" value="small" text="Small" />
            <Radio id="size-medium" value="medium" text="Medium" />
            <Radio id="size-large" value="large" text="Large" />
          </RadioGroup>
        </fieldset>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setSize('large')}>
            Select Large
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setSize(undefined)}>
            Clear
          </Button>
          <Typography variant="body1">Selected: {size ?? 'none'}</Typography>
        </div>
      </div>
    );
  },
};
