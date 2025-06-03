import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Popover } from '..';
import { StoryComponent } from './StoryComponent';
import { PopoverOptions } from '../types';

type PopoverType = typeof Popover;
export type Args = Parameters<PopoverType>[0];

export default {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {},
} as Meta<typeof Popover>;

export const Default: StoryObj<PopoverType> = () => {
  return <StoryComponent />;
};

Default.args = {};

export const InteractionsEnabledOnHover: StoryObj<PopoverType> = (
  args: PopoverOptions,
) => {
  return <StoryComponent {...args} />;
};

InteractionsEnabledOnHover.args = {
  interactionsEnabled: 'hover',
};

export const InteractionsEnabledOnHoverAndClick: StoryObj<PopoverType> = (
  args: PopoverOptions,
) => {
  return <StoryComponent {...args} />;
};

InteractionsEnabledOnHoverAndClick.args = {
  interactionsEnabled: 'both',
};
