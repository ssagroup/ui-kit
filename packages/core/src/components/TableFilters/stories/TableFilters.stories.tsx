import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { StoryComponent } from './StoryComponent';

import { TableFilters } from '..';

type TableFiltersType = typeof TableFilters;

export default {
  title: 'Widgets/TableFilters',
  component: TableFilters,
  argTypes: {},
} as Meta<TableFiltersType>;

export const Default: StoryObj<TableFiltersType> = () => {
  return <StoryComponent />;
};

Default.args = {};
