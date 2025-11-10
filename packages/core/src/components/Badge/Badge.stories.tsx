import React from 'react';

import { useTheme } from '@emotion/react';
import type { Meta } from '@storybook/react-webpack5';

import Icon from '@components/Icon';

import {
  colors,
  GridWrapper,
  HeaderTitle,
  icons,
  sizes,
} from './helpers.stories-extra';
import Badge from './index';

export default {
  title: 'Components/Badge',
  component: Badge,
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
              padding: '5px',
              borderRadius: '6px',
              boxShadow: '-4px 12px 14px 0px #DAE1E1',

              [`${theme.mediaQueries.md}`]: {
                padding: '11px',
                borderRadius: '12px',

                [`> svg`]: {
                  width: '20px',
                  height: '20px',
                },
              },
            }}>
            <Icon name={iconItem.icon} color={theme.colors.white} size={14} />
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

export const WithCustomColor = () => {
  return (
    <Badge color={'#F7931A'} size="medium">
      Custom color
    </Badge>
  );
};
