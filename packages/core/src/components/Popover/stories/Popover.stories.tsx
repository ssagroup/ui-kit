import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { offset, flip, shift } from '@floating-ui/react';
import { Popover } from '..';
import {
  PopoverTrigger,
  PopoverContent,
  PopoverHeading,
  PopoverDescription,
  PopoverClose,
} from '..';
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

export const Positioning: StoryObj<PopoverType> = () => {
  return (
    <div
      style={{
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
      }}>
      <Popover placement="left">
        <PopoverTrigger>Left</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Left Placement</PopoverHeading>
          <PopoverDescription>
            This popover appears to the left of the trigger element.
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
      <Popover placement="top">
        <PopoverTrigger>Top</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Top Placement</PopoverHeading>
          <PopoverDescription>
            This popover appears above the trigger element.
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
      <Popover placement="bottom">
        <PopoverTrigger>Bottom</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Bottom Placement</PopoverHeading>
          <PopoverDescription>
            This popover appears below the trigger element (default).
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
      <Popover placement="right">
        <PopoverTrigger>Right</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Right Placement</PopoverHeading>
          <PopoverDescription>
            This popover appears to the right of the trigger element.
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
};
Positioning.args = {};

export const AdvancedPositioning: StoryObj<PopoverType> = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        height: '400px',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* Auto-flip on collision */}
      <Popover
        placement="top"
        floatingOptions={{
          middleware: [
            // Add offset
            offset(10),
            // Flip to opposite side on collision
            flip(),
            // Shift within view
            shift({ padding: 8 }),
          ],
        }}>
        <PopoverTrigger>Smart Positioning</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Smart Positioning</PopoverHeading>
          <PopoverDescription>
            This popover automatically adjusts its position to stay in view. It
            will flip to the opposite side if there&#39;s not enough space.
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
      {/* Always stay in viewport */}
      <Popover
        placement="bottom-start"
        floatingOptions={{
          strategy: 'fixed',
        }}>
        <PopoverTrigger>Fixed Strategy</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Fixed Strategy</PopoverHeading>
          <PopoverDescription>
            This popover uses fixed positioning strategy, which positions
            relative to the viewport instead of the document.
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
      {/* Custom offset */}
      <Popover
        placement="right"
        floatingOptions={{
          middleware: [offset({ mainAxis: 20, crossAxis: 10 })],
        }}>
        <PopoverTrigger>Custom Offset</PopoverTrigger>
        <PopoverContent>
          <PopoverHeading variant="h4">Custom Offset</PopoverHeading>
          <PopoverDescription>
            This popover has a custom offset of 20px on the main axis and 10px
            on the cross axis.
          </PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
};
AdvancedPositioning.args = {};
