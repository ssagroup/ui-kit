import type { Meta } from '@storybook/react';

import Icon from '@components/Icon';

import Button from './index';
import { GridWrapper, HeaderTitle, sizes, variants } from './helpers';
import React from 'react';

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
      options: ['primary', 'primary-blue', 'secondary', 'tertiary'],
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

export const AllStates = () => (
  <GridWrapper>
    <HeaderTitle>Variant</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {variants.map((variant) => (
      <React.Fragment key={variant}>
        <HeaderTitle css={{ width: 80 }}>{variant}</HeaderTitle>
        {sizes.map((size) => {
          return (
            <Button variant={variant} size={size} key={variant + size}>
              Button
            </Button>
          );
        })}
      </React.Fragment>
    ))}
  </GridWrapper>
);

AllStates.args = {
  name: 'All States',
};

export const Block = { args: { size: 'large', block: true } };

export const StartIcon = {
  args: { startIcon: <Icon name={'notification'} size={16} color="#D0D2DC" /> },
};

export const EndIcon = {
  args: { endIcon: <Icon name={'notification'} size={16} color="#D0D2DC" /> },
};

export const Focused = {
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};
