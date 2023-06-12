import type { Meta } from '@storybook/react';

import Stepper from './index';

export default {
  title: 'Components/Stepper',
  component: Stepper,
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
  },
} as Meta<typeof Stepper>;

export const Default = {
  args: {
    color: 'green',
    steps: [
      {
        title: '1500ml',
        caption: '11am - 2pm',
        done: false,
      },
      {
        title: '500ml',
        caption: '11am - 2pm',
        done: false,
      },
      {
        title: '1000ml',
        caption: '9am - 11am',
        done: true,
      },
      {
        title: '700ml',
        caption: '6am - 0am',
        done: true,
      },
    ],
  },
};
