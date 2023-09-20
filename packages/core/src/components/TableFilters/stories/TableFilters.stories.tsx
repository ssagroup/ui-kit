import type { Meta, StoryObj } from '@storybook/react';
import { TableFilters } from '..';
import { StoryComponent } from './StoryComponent';

type PopoverType = typeof TableFilters;
export type Args = Parameters<PopoverType>[0];

export default {
  title: 'Components/TableFilters',
  component: TableFilters,
  argTypes: {},
} as Meta<typeof TableFilters>;

export const Default: StoryObj<PopoverType> = () => {
  return <StoryComponent />;
};

Default.args = {};
