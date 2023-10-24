import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@ssa-ui-kit/core';
import { Story } from './Story';

export default {
  title: 'Widgets/TableBots',
  component: Table,
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = () => <Story />;

Default.storyName = 'Table bots';
Default.parameters = {
  backgrounds: {
    default: 'main',
    values: [
      {
        name: 'main',
        value: '#D0D1D6',
      },
    ],
  },
};
