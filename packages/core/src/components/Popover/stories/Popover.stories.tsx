import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from '..';
import { StoryComponent } from './StoryComponent';

type PopoverType = typeof Popover;
type Args = Parameters<PopoverType>[0];

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {},
} as Meta<typeof Popover>;

export const Default: StoryObj<PopoverType> = (args: Args) => {
  return <StoryComponent {...args} />;
};

Default.args = {};
