import type { Meta } from '@storybook/react';

import Icon from '@components/Icon';

import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button triggers an action or event.',
      },
    },
  },
  argTypes: {
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
    startIcon: {
      description: 'Icon to be displayed before the text.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: {
        disable: true,
      },
    },
    endIcon: {
      description: 'Icon to be displayed after the text.',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      control: {
        disable: true,
      },
    },
    variant: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: ['primary', 'secondary', 'tertiary'],
      control: {
        type: 'inline-radio',
      },
    },
    ref: {
      control: {
        disable: true,
      },
    },
    key: {
      control: {
        disable: true,
      },
    },
  },
  args: {
    text: 'Button',
    size: 'small',
    variant: 'primary',
    type: 'button',
  },
} as Meta<typeof Button>;

export const Default = {};

export const Small = {
  args: {
    size: 'small',
    text: 'Button',
  },
};

export const Medium = {
  args: { size: 'medium' },
};

export const Large = { args: { size: 'large' } };

export const Block = { args: { size: 'large', block: true } };

export const startIcon = {
  args: { startIcon: <Icon name={'notification'} size={16} color="#D0D2DC" /> },
};

export const endIcon = {
  args: { endIcon: <Icon name={'notification'} size={16} color="#D0D2DC" /> },
};
