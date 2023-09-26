import type { Meta, StoryObj } from '@storybook/react';
import { StoryComponent } from './StoryComponent';
import { TableFilters } from '..';

type PopoverType = typeof TableFilters;

export default {
  title: 'Widgets/TableFilters',
  component: TableFilters,
  argTypes: {},
} as Meta<typeof TableFilters>;

export const Default: StoryObj<PopoverType> = () => {
  return <StoryComponent />;
};

Default.args = {};
