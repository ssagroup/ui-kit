import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Checkbox from './Checkbox';
import { CheckboxProps } from './types';

type Args = CheckboxProps;

const notifications = [
  { id: 'notify-email', label: 'Email' },
  { id: 'notify-sms', label: 'SMS' },
  { id: 'notify-push', label: 'Push notifications' },
];

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    onChange: fn(),
  },
  argTypes: {
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    defaultChecked: {
      description:
        'Initial checked state. Read on mount only — later changes are ignored.',
    },
    text: { control: 'text' },
    id: { control: false },
    checked: { control: false },
    onChange: { control: false },
    register: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    isDisabled: { table: { disable: true } },
    externalState: { table: { disable: true } },
    initialState: { table: { disable: true } },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof Checkbox>;

/**
 * Uncontrolled by default: the checkbox keeps its own state, starts from
 * `defaultChecked` and reports every toggle to `onChange(checked)`. The whole
 * label is the click target.
 *
 * Every prop in the Controls panel applies here. `defaultChecked` is read once,
 * so this story remounts the checkbox when the control changes.
 */
export const Default: StoryObj<Args> = {
  args: {
    text: 'Accept terms and conditions',
    color: 'primary',
    defaultChecked: false,
    disabled: false,
    isIndeterminate: false,
  },
  render: (args) => <Checkbox key={String(args.defaultChecked)} {...args} />,
};

/**
 * Every state in both palette colours. A disabled unchecked box goes flat
 * grey; a disabled checked or indeterminate box keeps its fill colour, muted,
 * so a locked-on option still reads as selected.
 *
 * `color="custom"` draws no colours at all — style it through `className` or
 * the `css` prop.
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
            <Checkbox {...args} color={color} text="Unchecked" />
            <Checkbox {...args} color={color} text="Checked" defaultChecked />
            <Checkbox
              {...args}
              color={color}
              text="Indeterminate"
              isIndeterminate
            />
            <Checkbox {...args} color={color} text="Disabled" disabled />
            <Checkbox
              {...args}
              color={color}
              text="Disabled checked"
              defaultChecked
              disabled
            />
            <Checkbox
              {...args}
              color={color}
              text="Disabled indeterminate"
              isIndeterminate
              disabled
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Pass `checked` to own the value. The checkbox then renders exactly what it
 * is given: a click only calls `onChange(next)`, and nothing changes until the
 * parent writes `next` back. Use it when something else (a button, a server
 * response, another field) also sets the value.
 */
export const Controlled: StoryObj<Args> = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Checkbox
          {...args}
          text="Email me a weekly summary"
          checked={checked}
          onChange={(next) => {
            setChecked(next);
            args.onChange?.(next);
          }}
        />
        <Button
          variant="secondary"
          size="small"
          onClick={() => setChecked((value) => !value)}>
          Toggle from outside
        </Button>
      </div>
    );
  },
};

/**
 * `isIndeterminate` shows a minus instead of a tick. It is purely visual and
 * not derived from anything — compute it yourself, typically for a "select
 * all" parent whose children are partly checked. The parent stays controlled
 * through `checked`, so clicking it while indeterminate selects everything.
 */
export const SelectAll: StoryObj<Args> = {
  render: function Render(args) {
    const [selected, setSelected] = useState<string[]>(['notify-email']);
    const allSelected = selected.length === notifications.length;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox
          {...args}
          id="notify-all"
          text="All channels"
          checked={allSelected}
          isIndeterminate={selected.length > 0 && !allSelected}
          onChange={() =>
            setSelected(allSelected ? [] : notifications.map(({ id }) => id))
          }
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            paddingLeft: 28,
          }}>
          {notifications.map(({ id, label }) => (
            <Checkbox
              {...args}
              key={id}
              id={id}
              text={label}
              checked={selected.includes(id)}
              onChange={(next) =>
                setSelected((current) =>
                  next
                    ? [...current, id]
                    : current.filter((value) => value !== id),
                )
              }
            />
          ))}
        </div>
      </div>
    );
  },
};
