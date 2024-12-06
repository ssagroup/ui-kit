import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  HeaderTitle,
  GridWrapper,
  colors,
} from '@components/Badge/helpers.stories-extra';

import ProgressCircle from './index';

type Args = Parameters<typeof ProgressCircle>[0];

export default {
  title: 'Components/Progress/Circle',
  component: ProgressCircle,
  argTypes: {
    infoContent: {
      table: {
        type: {
          summary: 'string | element',
        },
      },
      type: { name: 'string' },
    },
    color: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: [
        'pink',
        'yellow',
        'green',
        'turquoise',
        'purple',
        'blueLight',
        'blue',
      ],
      control: {
        type: 'select',
      },
    },
  },
} as Meta<typeof ProgressCircle>;

export const Default = {
  args: {
    max: 100,
    currentValue: 50,
    color: 'purple',
    infoContent: '50% done',
    size: 180,
  },
};

const sizes = [80, 130, 180];

export const SizesAndColors: StoryObj<typeof ProgressCircle> = (args: Args) => (
  <GridWrapper>
    <HeaderTitle>Color</HeaderTitle>
    <HeaderTitle>Size: 80</HeaderTitle>
    <HeaderTitle>Size: 130</HeaderTitle>
    <HeaderTitle>Size: 180</HeaderTitle>
    {colors.map((color) => (
      <React.Fragment key={color}>
        <HeaderTitle css={{ width: 80 }}>{color}</HeaderTitle>
        {sizes.map((size) => (
          <ProgressCircle
            color={color}
            size={size}
            key={color + size}
            {...args}
          />
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

SizesAndColors.args = {
  max: 100,
  currentValue: 50,
  infoContent: '50%',
};

SizesAndColors.argTypes = {
  color: {
    control: false,
  },
  size: {
    control: false,
  },
  currentValue: {
    control: false,
  },
  max: {
    control: false,
  },
};
