import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '@ssa-ui-kit/core';
import { BotsTableStory } from './BotsTable/StoryComponent';
import { NoControlOrdersStory } from './NoControlOrders/StoryComponent';

export default {
  title: 'Trading/BotsTable',
  component: Table,
} as Meta<typeof Table>;

export const BotsTable: StoryObj<typeof Table> = () => <BotsTableStory />;

BotsTable.parameters = {
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
