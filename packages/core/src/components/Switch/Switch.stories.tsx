import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import Button from '@components/Button';
import Typography from '@components/Typography';
import Switch from './Switch';
import { SwitchProps } from './types';

type Args = SwitchProps;

const rows: Array<{
  title: string;
  color: SwitchProps['color'];
  colors?: SwitchProps['colors'];
}> = [
  { title: 'Primary', color: 'primary' },
  { title: 'Success', color: 'success' },
  {
    title: 'Custom',
    color: 'custom',
    colors: { on: '#9333ea', offOutline: '#d8b4fe' },
  },
];

const states = [
  { caption: 'Off', defaultChecked: false, disabled: false },
  { caption: 'On', defaultChecked: true, disabled: false },
  { caption: 'Disabled off', defaultChecked: false, disabled: true },
  { caption: 'Disabled on', defaultChecked: true, disabled: true },
];

export default {
  title: 'Components/Switch',
  component: Switch,
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: { description: 'Accessible name (`aria-label`); not shown.' },
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    defaultChecked: {
      description:
        'Initial on state. Read on mount only — later changes are ignored.',
    },
    checked: { control: false },
    onChange: { control: false },
    isDisabled: { table: { disable: true } },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof Switch>;

/**
 * Uncontrolled: the switch starts from `defaultChecked`, flips on click and
 * reports the new state to `onChange(checked)`. `label` is only the
 * accessible name — Switch renders no text, so put a visible label next to
 * it.
 *
 * Every prop in the Controls panel applies here. `defaultChecked` is read
 * once, so this story remounts the switch when the control changes.
 */
export const Default: StoryObj<Args> = {
  args: {
    label: 'Email notifications',
    defaultChecked: false,
    disabled: false,
    color: 'primary',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Switch key={String(args.defaultChecked)} {...args} />
      <Typography variant="body1" aria-hidden>
        {args.label}
      </Typography>
    </div>
  ),
};

/**
 * The off track is always neutral grey; `color` sets the on track and the
 * outline shown on an off switch when it is hovered or focused. A disabled
 * switch keeps its on colour, muted, so a locked-on setting still reads as
 * on. With `color="custom"`, `colors.on` and `colors.offOutline` replace the
 * palette and hover darkens the track with an overlay.
 */
export const States: StoryObj<Args> = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'max-content repeat(4, 96px)',
        justifyContent: 'start',
        gap: 16,
        alignItems: 'center',
      }}>
      {rows.map(({ title, color, colors }) => (
        <div key={title} style={{ display: 'contents' }}>
          <Typography variant="h6">{title}</Typography>
          {states.map(({ caption, defaultChecked, disabled }) => (
            <div
              key={caption}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}>
              <Switch
                {...args}
                label={`${title} ${caption}`}
                color={color}
                colors={colors}
                defaultChecked={defaultChecked}
                disabled={disabled}
              />
              <Typography variant="caption">{caption}</Typography>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Pass `checked` to own the value: a click only calls `onChange(next)` and
 * nothing moves until the parent writes `next` back. Use it when something
 * else — another control, a saved setting, a server response — also sets the
 * value.
 */
export const Controlled: StoryObj<Args> = {
  render: function Render(args) {
    const [isOn, setIsOn] = useState(true);

    return (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Switch
          {...args}
          label="Dark mode"
          checked={isOn}
          onChange={(next) => {
            setIsOn(next);
            args.onChange?.(next);
          }}
        />
        <Typography variant="body1">
          Dark mode is {isOn ? 'on' : 'off'}
        </Typography>
        <Button variant="secondary" size="small" onClick={() => setIsOn(false)}>
          Reset
        </Button>
      </div>
    );
  },
};
