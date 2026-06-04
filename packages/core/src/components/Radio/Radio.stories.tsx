import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Typography from '@components/Typography';

import Radio from './Radio';

type Args = Parameters<typeof Radio>[0];

export default {
  title: 'Components/Radio Buttons/Radio',
  component: Radio,
  args: {
    text: 'label',
    color: 'primary',
  },
  argTypes: {
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    className: {
      control: { disable: true },
    },
    colors: {
      control: { disable: true },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta<typeof Radio>;

export const Default: StoryObj<typeof Radio> = (args: Args) => (
  <Fragment>
    <Typography variant="h5">Standalone Radio</Typography>
    <Radio {...args} />
    <Typography variant="h5" css={{ marginTop: 10 }}>
      Checked Radio
    </Typography>
    <Radio {...args} isChecked />
  </Fragment>
);
Default.storyName = 'Radio';

const colorVariants: Array<{ color: Args['color']; label: string }> = [
  { color: 'primary', label: 'Primary (blue)' },
  { color: 'success', label: 'Success (green)' },
];

export const Colors = () => (
  <Fragment>
    {colorVariants.map(({ color, label }) => (
      <Fragment key={color}>
        <Typography variant="h6" css={{ marginTop: 16 }}>
          {label}
        </Typography>
        <div css={{ display: 'flex', gap: 24 }}>
          <Radio
            id={`${color}-unchecked`}
            name={`${color}-group`}
            value="unchecked"
            text="Unchecked"
            color={color}
            onChange={() => {}}
          />
          <Radio
            id={`${color}-checked`}
            name={`${color}-group`}
            value="checked"
            text="Checked"
            color={color}
            isChecked
            onChange={() => {}}
          />
          <Radio
            id={`${color}-disabled`}
            name={`${color}-group`}
            value="disabled"
            text="Disabled"
            color={color}
            isDisabled
            onChange={() => {}}
          />
        </div>
      </Fragment>
    ))}
  </Fragment>
);

const customColors = {
  default: '#9333ea',
  hovered: '#6b21a8',
  disabled: '#dcdcdc',
};

export const CustomColors = () => (
  <Fragment>
    <Typography variant="h6" css={{ marginTop: 16 }}>
      Custom (purple)
    </Typography>
    <div css={{ display: 'flex', gap: 24 }}>
      <Radio
        id="custom-unchecked"
        name="custom-group"
        value="unchecked"
        text="Unchecked"
        color="custom"
        colors={customColors}
        onChange={() => {}}
      />
      <Radio
        id="custom-checked"
        name="custom-group"
        value="checked"
        text="Checked"
        color="custom"
        colors={customColors}
        isChecked
        onChange={() => {}}
      />
      <Radio
        id="custom-disabled"
        name="custom-group"
        value="disabled"
        text="Disabled"
        color="custom"
        colors={customColors}
        isDisabled
        onChange={() => {}}
      />
    </div>
  </Fragment>
);
CustomColors.storyName = 'Custom Colors';
