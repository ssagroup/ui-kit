import { Meta } from '@storybook/react';

import Switch, { SwitchContextProvider } from './index';

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
        <SwitchContextProvider initialState={true}>
          {Story(args)}
        </SwitchContextProvider>
      );
    },
  ],
} as Meta<typeof Switch>;

export const Default = {};
