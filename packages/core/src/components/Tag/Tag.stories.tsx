import type { Meta } from '@storybook/react';

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
    children: '0',
  },
} as Meta<typeof Tag>;

export const Default = {};
