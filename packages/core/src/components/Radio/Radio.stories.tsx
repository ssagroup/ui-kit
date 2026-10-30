import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Typography from '@components/Typography';
import Radio from './Radio';
import { RadioProps } from './types';

type Args = RadioProps;

export default {
  title: 'Components/Radio Buttons/Radio',
  component: Radio,
  args: {
    onChange: fn(),
  },
  argTypes: {
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    id: { control: false },
    onChange: { control: false },
    className: { control: false },
    isChecked: { table: { disable: true } },
    isDisabled: { table: { disable: true } },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof Radio>;

/**
 * A single radio button. The icon follows the `checked` prop only, so Radio
 * is effectively controlled: a click calls `onChange(value)` and nothing
 * changes until the parent passes `checked` back. In practice let
 * `RadioGroup` do that — it injects `name`, `checked` and `onChange` into each
 * child.
 *
 * Every prop in the Controls panel applies here; toggle `checked` to see the
 * selected icon.
 */
export const Default: StoryObj<Args> = {
  args: {
    name: 'billing',
    value: 'monthly',
    text: 'Monthly billing',
    checked: false,
    disabled: false,
    color: 'primary',
  },
  render: (args) => <Radio {...args} />,
};

/**
 * Both palette colours in every state. Disabled radios use `greyFocused40`
 * whether or not they are checked; the filled icon keeps a checked one
 * readable.
 */
export const States: StoryObj<Args> = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['primary', 'success'] as const).map((color) => (
        <div key={color}>
          <Typography variant="h6" css={{ textTransform: 'capitalize' }}>
            {color}
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            <Radio
              {...args}
              color={color}
              name={`${color}-unchecked`}
              value="unchecked"
              text="Unchecked"
            />
            <Radio
              {...args}
              color={color}
              name={`${color}-checked`}
              value="checked"
              text="Checked"
              checked
            />
            <Radio
              {...args}
              color={color}
              name={`${color}-disabled`}
              value="disabled"
              text="Disabled"
              disabled
            />
            <Radio
              {...args}
              color={color}
              name={`${color}-disabled-checked`}
              value="disabled-checked"
              text="Disabled checked"
              checked
              disabled
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * `color="custom"` draws the icon from the `colors` object: `default` for the
 * resting and checked icon, `hovered` and `disabled` for those states. Any
 * colour left out falls back to the primary palette. `colors` is ignored for
 * `primary` and `success`.
 */
export const CustomColors: StoryObj<Args> = {
  args: {
    color: 'custom',
    colors: { default: '#9333ea', hovered: '#6b21a8', disabled: '#dcdcdc' },
  },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Radio
        {...args}
        name="custom-unchecked"
        value="unchecked"
        text="Unchecked"
      />
      <Radio
        {...args}
        name="custom-checked"
        value="checked"
        text="Checked"
        checked
      />
      <Radio
        {...args}
        name="custom-disabled"
        value="disabled"
        text="Disabled"
        disabled
      />
    </div>
  ),
};
