import React from 'react';

import type { Meta } from '@storybook/react-webpack5';

import {
  colors,
  GridWrapper,
  HeaderTitle,
  sizes,
} from '@components/Badge/helpers.stories-extra';

import Tag from './index';

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
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
    size: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: ['small', 'medium', 'large'],
      control: {
        type: 'inline-radio',
      },
    },
    children: {
      table: {
        type: {
          summary: 'string | element',
        },
      },
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: 'tag',
  },
} as Meta<typeof Tag>;

export const Default = {};

export const AllStates = () => (
  <GridWrapper>
    <HeaderTitle>Color</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {colors.map((color) => (
      <React.Fragment key={color}>
        <HeaderTitle>{color}</HeaderTitle>
        {sizes.map((size) => (
          <Tag color={color} size={size} key={color + size}>
            tag
          </Tag>
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

AllStates.args = {
  name: 'All States',
};

AllStates.argTypes = {
  color: {
    control: false,
  },
  size: {
    control: false,
  },
  children: {
    control: false,
  },
};
