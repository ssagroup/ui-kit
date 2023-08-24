import { Fragment } from 'react';
import { Meta } from '@storybook/react';
import '@storybook/types';

import Switch, { SwitchContextProvider } from './index';
import Typography from '@components/Typography';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    label: {
      description: 'aria-label value',
    },
  },
  decorators: [
    (Story, { args }) => {
      return (
        <Fragment>
          <Typography variant="h5">Checked state</Typography>
          <SwitchContextProvider initialState={true}>
            {Story(args)}
          </SwitchContextProvider>
          <Typography variant="h5" css={{ marginTop: 10 }}>
            Unchecked state
          </Typography>
          <SwitchContextProvider initialState={false}>
            {Story(args)}
          </SwitchContextProvider>
        </Fragment>
      );
    },
  ],
} as Meta<typeof Switch>;

export const Default = {};

export const Focused = {
  title: 'Components/Switch/Focused',
  component: (args) => (
    <Fragment>
      <Typography variant="h5">Checked state (focused)</Typography>
      <SwitchContextProvider initialState={true}>
        <Switch {...args} />
      </SwitchContextProvider>
      <Typography variant="h5" css={{ marginTop: 10 }}>
        Unchecked state (focused)
      </Typography>
      <SwitchContextProvider initialState={false}>
        <Switch {...args} />
      </SwitchContextProvider>
    </Fragment>
  ),
  argTypes: {
    label: {
      description: 'aria-label value',
    },
  },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
} as Meta<typeof Switch>;
