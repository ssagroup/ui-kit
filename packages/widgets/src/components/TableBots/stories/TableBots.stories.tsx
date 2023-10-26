import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@ssa-ui-kit/core';
import { TableBotsStory } from './TableBots/StoryComponent';
import { NoControlOrdersStory } from './NoControlOrders/StoryComponent';

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

export const NoControlOrders: StoryObj<typeof Table> = () => (
  <NoControlOrdersStory />
);

NoControlOrders.parameters = {
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
