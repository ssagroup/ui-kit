import React from 'react';
import type { Meta } from '@storybook/react';
import {
  sizes,
  colors,
  HeaderTitle,
  GridWrapper,
} from '@components/Badge/helpers';
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
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {colors.map((color) => {
      return (
        <React.Fragment key={color}>
          {sizes.map((size) => {
            return (
              <Tag color={color} size={size} key={color + size}>
                tag
              </Tag>
            );
          })}
        </React.Fragment>
      );
    })}
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
