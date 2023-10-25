import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@ssa-ui-kit/core';
import { TableBotsStory } from './TableBotsStory';

export default {
  title: 'Widgets/TableBots',
  component: Table,
} as Meta<typeof Table>;

export const TableBots: StoryObj<typeof Table> = () => <TableBotsStory />;

TableBots.parameters = {
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
