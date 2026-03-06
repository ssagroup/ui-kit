import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Typography from '@components/Typography';
import Switch, { SwitchContextProvider } from './index';
import { SwitchProps } from './types';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    label: {
      description: 'aria-label value',
    },
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    colors: {
      control: { disable: true },
    },
  },
  args: {
    label: 'Toggle feature',
    color: 'primary',
  },
} as Meta<typeof Switch>;

export const Default: StoryObj<typeof Switch> = {
  render: (args) => (
    <Fragment>
      <Typography variant="h5">On</Typography>
      <SwitchContextProvider initialState={true}>
        <Switch {...args} />
      </SwitchContextProvider>
      <Typography variant="h5" css={{ marginTop: 10 }}>
        Off
      </Typography>
      <SwitchContextProvider initialState={false}>
        <Switch {...args} />
      </SwitchContextProvider>
    </Fragment>
  ),
};

const paletteVariants: Array<{ color: SwitchProps['color']; label: string }> = [
  { color: 'primary', label: 'Primary (blue)' },
  { color: 'success', label: 'Success (green)' },
];

const customVariants: Array<{
  label: string;
  colors: SwitchProps['colors'];
}> = [
  {
    label: 'Custom — coral',
    colors: { on: '#FF6B6B', offOutline: '#FFB3B3' },
  },
  {
    label: 'Custom — teal',
    colors: { on: '#4ECDC4', offOutline: '#A8E6E2' },
  },
];

export const Colors: StoryObj<typeof Switch> = {
  render: () => (
    <Fragment>
      {paletteVariants.map(({ color, label }) => (
        <div key={color} css={{ marginBottom: '20px' }}>
          <Typography variant="h6" css={{ marginBottom: 8 }}>
            {label}
          </Typography>
          <div css={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}>
              <Typography variant="caption">On</Typography>
              <SwitchContextProvider initialState={true}>
                <Switch label={`${color} on`} color={color} />
              </SwitchContextProvider>
            </div>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}>
              <Typography variant="caption">Disabled</Typography>
              <SwitchContextProvider initialState={true}>
                <Switch label={`${color} disabled`} color={color} isDisabled />
              </SwitchContextProvider>
            </div>
          </div>
        </div>
      ))}

      {customVariants.map(({ label, colors }) => (
        <div key={label} css={{ marginBottom: '20px' }}>
          <Typography variant="h6" css={{ marginBottom: 8 }}>
            {label}
          </Typography>
          <div css={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}>
              <Typography variant="caption">On</Typography>
              <SwitchContextProvider initialState={true}>
                <Switch label={`${label} on`} color="custom" colors={colors} />
              </SwitchContextProvider>
            </div>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}>
              <Typography variant="caption">Off</Typography>
              <SwitchContextProvider initialState={false}>
                <Switch label={`${label} off`} color="custom" colors={colors} />
              </SwitchContextProvider>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  ),
};

export const Disabled: StoryObj<typeof Switch> = {
  render: (args) => (
    <Fragment>
      <Typography variant="h5">Disabled — On</Typography>
      <SwitchContextProvider initialState={true}>
        <Switch {...args} isDisabled />
      </SwitchContextProvider>
      <Typography variant="h5" css={{ marginTop: 10 }}>
        Disabled — Off
      </Typography>
      <SwitchContextProvider initialState={false}>
        <Switch {...args} isDisabled />
      </SwitchContextProvider>
    </Fragment>
  ),
};
