import React from 'react';
import type { Meta } from '@storybook/react';
import { useTheme } from '@emotion/react';
import { HeaderTitle, GridWrapper, colors, sizes, icons } from './helpers';

import Badge from './index';
import Icon from '@components/Icon';

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
        'yellowWarm',
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

export const AllStates = () => (
  <GridWrapper>
    <HeaderTitle>Color</HeaderTitle>
    <HeaderTitle>Small</HeaderTitle>
    <HeaderTitle>Medium</HeaderTitle>
    <HeaderTitle>Large</HeaderTitle>
    {colors.map((color) => (
      <React.Fragment key={color}>
        <HeaderTitle css={{ width: 80 }}>{color}</HeaderTitle>
        {sizes.map((size) => {
          return (
            <Badge color={color} size={size} key={color + size}>
              badge
            </Badge>
          );
        })}
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

export const WithIcon = () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      {icons.map((iconItem, index) => (
        <GridWrapper key={index} css={{ marginBottom: '20px' }}>
          <HeaderTitle css={{ width: 80 }}>{iconItem.icon}</HeaderTitle>
          <Badge
            color={iconItem.color}
            size="small"
            css={{
              display: 'flex',
              height: 'auto',
              padding: '11px',
              borderRadius: '12px',
              boxShadow: `-4px 12px 14px 0px #DAE1E1`,
            }}>
            <Icon name={iconItem.icon} color={theme.colors.white} size={20} />
          </Badge>
        </GridWrapper>
      ))}
    </React.Fragment>
  );
};

WithIcon.args = {
  name: 'With Icon',
};

WithIcon.argTypes = {
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
