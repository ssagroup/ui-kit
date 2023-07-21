import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from '@emotion/react';

import Button from '@components/Button';
import ProgressCircle from '@components/ProgressCircle';
import Typography from '@components/Typography';
import Icon from '@components/Icon';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';

import Tooltip from './index';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      options: ['bottom', 'left', 'right', 'top'],
      control: {
        type: 'select',
      },
    },
    arrowProps: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '300px',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Tooltip>;

export const OnClick: StoryObj<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button size="medium" text="Click me!" />
      </TooltipTrigger>
      <TooltipContent>Tooltip</TooltipContent>
    </Tooltip>
  );
};

OnClick.args = {
  size: 'large',
};
OnClick.storyName = 'Click';

export const OnHover: StoryObj<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button size="medium" text="Hover over me!" />
      </TooltipTrigger>
      <TooltipContent>Tooltip</TooltipContent>
    </Tooltip>
  );
};

OnHover.args = {
  enableClick: false,
  enableHover: true,
  size: 'large',
};
OnHover.storyName = 'Hover';

export const CustomContent: StoryObj<typeof Tooltip> = (args) => {
  const theme = useTheme();

  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button
          size="medium"
          endIcon={<Icon name="plus" color={theme.colors.white} size={12} />}
        />
      </TooltipTrigger>
      <TooltipContent css={{ textAlign: 'center' }}>
        <Typography variant="h6">Your progress</Typography>
        <div css={{ margin: '0 auto', width: '60px' }}>
          <ProgressCircle
            max={100}
            currentValue={80}
            color="purple"
            infoContent="80%"
            size={60}
          />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

CustomContent.args = {
  size: 'large',
  placement: 'top',
};
CustomContent.storyName = 'Custom content';

export const NoArrow: StoryObj<typeof Tooltip> = (args) => {
  const theme = useTheme();

  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button
          size="small"
          endIcon={<Icon name="check" color={theme.colors.white} size={12} />}
          text="Action"
        />
      </TooltipTrigger>
      <TooltipContent>No arrow</TooltipContent>
    </Tooltip>
  );
};

NoArrow.args = {
  size: 'large',
  hasArrow: false,
  placement: 'left',
};
NoArrow.storyName = 'No arrow';
