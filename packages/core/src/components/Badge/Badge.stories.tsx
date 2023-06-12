import type { Meta } from '@storybook/react';

import Badge from './index';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Badge is for informing users about the status of an item.',
      },
    },
  },
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
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string | element',
        },
      },
    },
  },
  args: {
    size: 'medium',
    children: 'badge',
  },
} as Meta<typeof Badge>;

export const Default = {};
