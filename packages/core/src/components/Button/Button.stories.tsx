import type { Meta } from '@storybook/react-webpack5';

import Icon from '@components/Icon';

import Button from './index';
import {
  GridWrapper,
  HeaderTitle,
  sizes,
  variants,
} from './helpers.stories-extra';
import React from 'react';

export default {
  title: 'Components/Button',
  component: Button,
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
      options: [
        'primary',
        'secondary',
        'tertiary',
        'custom',
        'error',
        'warning',
        'success',
      ],
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
    variant: 'custom',
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
        {sizes.map((size) => (
          <Button variant={variant} size={size} key={variant + size}>
            Button
          </Button>
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

AllStates.args = {
  name: 'All States',
};
AllStates.parameters = {
  docs: {
    description: {
      story:
        'Use **custom** for new code; **tertiary** is legacy (same appearance, kept for compatibility).',
    },
  },
};

export const StartIcon = {
  args: {
    variant: 'primary',
    startIcon: <Icon name={'notification'} size={16} color="#D0D2DC" />,
  },
};

export const EndIcon = {
  args: {
    variant: 'primary',
    endIcon: <Icon name={'notification'} size={16} color="#D0D2DC" />,
  },
};

export const Focused = {
  args: { variant: 'primary' },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export const Disabled = () => (
  <GridWrapper>
    <HeaderTitle>Variant</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {variants.map((variant) => (
      <React.Fragment key={variant}>
        <HeaderTitle css={{ width: 80 }}>{variant}</HeaderTitle>
        {sizes.map((size) => (
          <Button variant={variant} size={size} key={variant + size} isDisabled>
            Button
          </Button>
        ))}
      </React.Fragment>
    ))}
  </GridWrapper>
);

Disabled.parameters = {
  docs: {
    description: {
      story:
        'Use **custom** for new code; **tertiary** is legacy (same appearance, kept for compatibility).',
    },
  },
};

export const WithCustomStyles = () => (
  <div css={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <HeaderTitle css={{ textAlign: 'left', marginBottom: 12 }}>
        Outlined — override tertiary with border
      </HeaderTitle>
      <div css={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {sizes.map((size) => (
          <Button
            key={size}
            size={size}
            css={{
              border: '2px solid #4178E1',
              color: '#4178E1',
              borderRadius: 8,
              '&:hover': { background: 'rgba(65, 120, 225, 0.08)' },
            }}>
            Button
          </Button>
        ))}
      </div>
    </div>
    <div>
      <HeaderTitle css={{ textAlign: 'left', marginBottom: 12 }}>
        Override primary — custom brand color
      </HeaderTitle>
      <div css={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {sizes.map((size) => (
          <Button
            key={size}
            variant="primary"
            size={size}
            css={{
              background: '#7B47EB',
              '&:hover': { background: '#6A3AD8' },
              '&:focus': { background: '#9061F0' },
            }}>
            Button
          </Button>
        ))}
      </div>
    </div>
  </div>
);

WithCustomStyles.storyName = 'With Custom Styles (css prop)';
