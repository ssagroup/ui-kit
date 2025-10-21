import React from 'react';

import { css } from '@emotion/react';
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

export const CustomStyles = () => (
  <div>
    <div>
      <h3>Individual Properties Approach</h3>
      <p>
        Using individual style properties: color, background, border, boxShadow
      </p>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          marginTop: '10px',
          marginBottom: '30px',
          alignItems: 'center',
        }}>
        <Tag
          key={'custom-small-tag'}
          size="small"
          customStyles={{
            color: '#e74c3c',
            background: '#fadbd8',
            border: '1px solid #c0392b',
            boxShadow: '0 4px 8px rgba(231, 76, 60, 0.3)',
          }}>
          tag
        </Tag>
        <Tag
          key={'custom-medium-tag'}
          size="medium"
          customStyles={{
            color: '#27ae60',
            background: 'linear-gradient(135deg, #d5f4e6, #a9dfbf)',
            border: '1px solid #2ecc71',
            boxShadow: '0 4px 8px rgba(39, 174, 96, 0.3)',
          }}>
          tag
        </Tag>
        <Tag
          key={'custom-large-tag'}
          size="large"
          customStyles={{
            color: '#8e44ad',
            background: '#f4ecf7',
            border: '1px dashed #9b59b6',
            boxShadow: '0 6px 12px rgba(142, 68, 173, 0.4)',
          }}>
          tag
        </Tag>
      </div>
    </div>

    <div>
      <h3>CSS Property Approach</h3>
      <p>Using the css property with all styles defined inside</p>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          marginTop: '10px',
          marginBottom: '30px',
          alignItems: 'center',
        }}>
        <Tag
          key={'custom-small-tag-css'}
          size="small"
          customStyles={{
            css: css`
              color: #e74c3c;
              background: #fadbd8;
              border: 1px solid #c0392b;
              box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
            `,
          }}>
          tag
        </Tag>
        <Tag
          key={'custom-medium-tag-css'}
          size="medium"
          customStyles={{
            css: css`
              color: #27ae60;
              background: linear-gradient(135deg, #d5f4e6, #a9dfbf);
              border: 1px solid #2ecc71;
              box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
            `,
          }}>
          tag
        </Tag>
        <Tag
          key={'custom-large-tag-css'}
          size="large"
          customStyles={{
            css: css`
              color: #8e44ad;
              background: #f4ecf7;
              border: 1px dashed #9b59b6;
              box-shadow: 0 6px 12px rgba(142, 68, 173, 0.4);
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 16px rgba(142, 68, 173, 0.6);
              }
            `,
          }}>
          tag
        </Tag>
      </div>
    </div>

    <div>
      <h3>Comparison</h3>
      <p>Both approaches should produce identical results for basic styles:</p>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          marginTop: '10px',
        }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', marginBottom: '5px', color: '#666' }}>
            Individual Props
          </div>
          <Tag
            key={'custom-medium-tag-comparison'}
            size="medium"
            customStyles={{
              color: '#3498db',
              background: '#ebf3fd',
              border: '1px solid #2980b9',
              boxShadow: '0 2px 4px rgba(52, 152, 219, 0.2)',
            }}>
            tag
          </Tag>
        </div>
        <div style={{ margin: '0 10px', fontSize: '18px', color: '#999' }}>
          ≡
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px', marginBottom: '5px', color: '#666' }}>
            CSS Property
          </div>
          <Tag
            key={'custom-medium-tag-css-comparison'}
            size="medium"
            customStyles={{
              css: css`
                color: #3498db;
                background: #ebf3fd;
                border: 1px solid #2980b9;
                box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
              `,
            }}>
            tag
          </Tag>
        </div>
      </div>
    </div>
  </div>
);

CustomStyles.args = {
  name: 'Custom Styles Demo',
};

CustomStyles.argTypes = {
  color: {
    control: false,
  },
  size: {
    control: false,
  },
  children: {
    control: false,
  },
  customStyles: {
    control: false,
  },
};
