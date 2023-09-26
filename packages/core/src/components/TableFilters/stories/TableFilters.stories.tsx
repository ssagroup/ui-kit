import type { Meta, StoryObj } from '@storybook/react';
import { StoryComponent } from './StoryComponent';

type PopoverType = typeof StoryComponent;

export default {
  title: 'Components/TableFilters',
  component: StoryComponent,
  argTypes: {},
} as Meta<typeof StoryComponent>;

export const Default: StoryObj<PopoverType> = () => {
  return <StoryComponent />;
};

Default.args = {};
