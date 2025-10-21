import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { mockDataEnabled } from './mockData';
import { StoryComponent } from './StoryComponent';

import { Filters } from '..';

type FiltersType = typeof Filters;

export default {
  title: 'Widgets/Filters',
  component: Filters,
  argTypes: {},
} as Meta<typeof Filters>;

export const Default: StoryObj<FiltersType> = () => {
  return <StoryComponent />;
};

Default.args = {};

export const AllItemsEnabled: StoryObj<FiltersType> = () => {
  return <StoryComponent data={mockDataEnabled} />;
};

AllItemsEnabled.args = {};
