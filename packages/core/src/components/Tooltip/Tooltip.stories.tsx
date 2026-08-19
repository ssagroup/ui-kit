import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useTheme } from '@emotion/react';

import Button from '@components/Button';
import ProgressCircle from '@components/ProgressCircle';
import Typography from '@components/Typography';
import Icon from '@components/Icon';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';

import Tooltip from './index';

type Args = Parameters<typeof Tooltip>[0];

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
    color: {
      options: ['grey', 'white', 'dark', 'nonOpaque'],
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

export const OnClick: StoryObj<typeof Tooltip> = (args: Args) => {
  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button variant="primary" size="medium" text="Click me!" />
      </TooltipTrigger>
      <TooltipContent>Tooltip</TooltipContent>
    </Tooltip>
  );
};

OnClick.args = {
  size: 'large',
};
OnClick.storyName = 'Click';

export const OnHover: StoryObj<typeof Tooltip> = (args: Args) => {
  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button variant="primary" size="medium" text="Hover over me!" />
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

export const CustomContent: StoryObj<typeof Tooltip> = (args: Args) => {
  const theme = useTheme();

  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button
          variant="primary"
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

export const NoArrow: StoryObj<typeof Tooltip> = (args: Args) => {
  const theme = useTheme();

  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button
          variant="primary"
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

export const Opened: StoryObj<typeof Tooltip> = (args: Args) => {
  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button variant="primary" size="medium" text="Hover over me!" />
      </TooltipTrigger>
      <TooltipContent>Tooltip</TooltipContent>
    </Tooltip>
  );
};

Opened.args = {
  enableClick: false,
  enableHover: true,
  size: 'large',
  defaultOpen: true,
};
Opened.parameters = {
  pseudo: {
    hover: true,
    rootSelector: 'body',
  },
};

export const WithDelays: StoryObj<typeof Tooltip> = (args: Args) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '100%',
        maxWidth: '600px',
      }}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Tooltip key={item} {...args}>
          <TooltipTrigger>
            <Button variant="primary" size="medium" text={`Item ${item}`} />
          </TooltipTrigger>
          <TooltipContent>Tooltip for item {item}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

WithDelays.args = {
  enableClick: false,
  enableHover: true,
  size: 'medium',
  hoverOpenDelay: 300,
  hoverCloseDelay: 100,
};

WithDelays.parameters = {
  docs: {
    description: {
      story:
        'Tooltips with delay configuration. Move your mouse quickly across the buttons to see how delays prevent the "traffic light" effect. Configure `hoverOpenDelay` (300ms) and `hoverCloseDelay` (100ms) to control appearance and disappearance timing.',
    },
  },
};

export const Colors: StoryObj<typeof Tooltip> = (args: Args) => {
  const colors = ['grey', 'white', 'dark', 'nonOpaque'] as const;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px',
        justifyContent: 'center',
      }}>
      {colors.map((color) => (
        <Tooltip key={color} {...args} color={color}>
          <TooltipTrigger>
            <Button variant="primary" size="medium" text={color} />
          </TooltipTrigger>
          <TooltipContent>Content</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

Colors.args = {
  enableClick: false,
  enableHover: true,
  size: 'medium',
  placement: 'top',
};

Colors.parameters = {
  docs: {
    description: {
      story:
        'The four surfaces from the design: `grey` (default), `white` (bordered by default), `dark` and `nonOpaque`. The arrow follows the surface color automatically.',
    },
  },
};

export const WithTitle: StoryObj<typeof Tooltip> = (args: Args) => {
  return (
    <Tooltip {...args}>
      <TooltipTrigger>
        <Button variant="primary" size="medium" text="Hover over me!" />
      </TooltipTrigger>
      <TooltipContent title="Headline" maxWidth={200}>
        A short description that wraps onto several lines once the tooltip
        reaches its maximum width.
      </TooltipContent>
    </Tooltip>
  );
};

WithTitle.args = {
  enableClick: false,
  enableHover: true,
  size: 'medium',
  color: 'dark',
  placement: 'top',
};

WithTitle.storyName = 'With title';
WithTitle.parameters = {
  docs: {
    description: {
      story:
        'Pass `title` to `TooltipContent` for the headline layout. `maxWidth` lets the body text wrap — without it the tooltip is sized to its content and stays on one line.',
    },
  },
};

export const BorderAndShadow: StoryObj<typeof Tooltip> = (args: Args) => {
  const variants = [
    { label: 'Bordered', props: { hasBorder: true } },
    {
      label: 'No border',
      props: { color: 'white' as const, hasBorder: false },
    },
    { label: 'No shadow', props: { hasShadow: false } },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px',
        justifyContent: 'center',
      }}>
      {variants.map(({ label, props }) => (
        <Tooltip key={label} {...args} {...props}>
          <TooltipTrigger>
            <Button variant="primary" size="medium" text={label} />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

BorderAndShadow.args = {
  enableClick: false,
  enableHover: true,
  size: 'medium',
  placement: 'top',
};

BorderAndShadow.storyName = 'Border and shadow';
BorderAndShadow.parameters = {
  docs: {
    description: {
      story:
        '`hasBorder` is independent of the color — it defaults to `true` for `white` and `false` for every other surface, and can be flipped either way. `hasShadow` opts out of the drop shadow.',
    },
  },
};
