import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import DropdownOption from '@components/DropdownOption';
import Button from '@components/Button';
import Dropdown from './Dropdown';
import { DropdownProps } from './types';
import { DropdownOptionProps } from '../..';

type Args = DropdownProps<DropdownOptionProps>;

const items = [
  { id: 0, value: 'Zero lorem ipsum', subText: 'subtext' },
  { id: 1, value: 'One lorem ipsum', subText: 'subtext' },
  { id: 2, value: 'Two lorem ipsum', subText: 'subtext' },
  { id: 3, value: 'Three lorem ipsum', subText: 'subtext' },
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    onChange: {
      control: {
        disable: true,
      },
    },
    className: {
      description: 'Used in order to overwrite the default style',
      table: {
        type: {
          summary: 'StyledComponent',
        },
      },
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, { args }) => {
      const noop = () => {
        /* no-op */
      };
      return (
        <div style={{ paddingBottom: 200 }}>
          {Story({ ...args, onChange: noop })}
        </div>
      );
    },
  ],
} as Meta<typeof Dropdown>;

export const Basic: StoryObj = (args: Args) => {
  return (
    <Dropdown selectedItem={items[2]} isDisabled={args.isDisabled}>
      {items.map((item) => (
        <DropdownOption key={item.id} value={item.id}>
          {item.value}
        </DropdownOption>
      ))}
    </Dropdown>
  );
};

Basic.args = { isDisabled: false };

export const Opened: StoryObj = (args: Args) => {
  return (
    <Dropdown selectedItem={items[2]} {...args}>
      {items.map((item) => (
        <DropdownOption key={item.id} value={item.id}>
          {item.value}
        </DropdownOption>
      ))}
    </Dropdown>
  );
};

Opened.args = { isOpen: true, isDisabled: false };

export const Simple: StoryObj = (args: Args) => {
  return (
    <Dropdown isDisabled={args.isDisabled}>
      {items.map((item) => (
        <DropdownOption key={item.id} value={item.value} />
      ))}
    </Dropdown>
  );
};

Simple.args = { isDisabled: false };

export const NoItems: StoryObj = () => {
  return <Dropdown>{null}</Dropdown>;
};

NoItems.args = { isDisabled: false };

export const Custom: StoryObj = (args: Args) => {
  // Color palette: https://mycolor.space/?hex=%23FF69B4&sub=1
  const CustomOption = styled(DropdownOption)`
    width: auto;
    height: auto;
    padding: 10px;

    text-align: left;
    line-height: 18px;
    font-size: 16px;

    background: hotpink;
    color: white;

    :hover {
      background: pink;
    }

    b {
      color: white;
    }
  `;

  return (
    <Dropdown
      isDisabled={args.isDisabled}
      selectedItem={items[2]}
      css={css`
        background: #ff947b;
        :focus {
          background: #ffb566;
        }
        &[aria-expanded='true'] {
          color: #975875;

          svg {
            path {
              stroke: #975875;
            }
          }
        }
      `}>
      {items.map((item) => (
        <CustomOption key={item.id} value={item.id} label={item.value}>
          {item.value}
          &nbsp;|&nbsp;
          <b>{item.subText}</b>
        </CustomOption>
      ))}
    </Dropdown>
  );
};

Custom.args = {
  isDisabled: false,
};

export const DynamicallyChangedSelectedItem: StoryObj = (args: Args) => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleUpdate = () => {
    const newIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
    setSelectedIndex(newIndex);
  };
  return (
    <div>
      <Dropdown
        isDisabled={args.isDisabled}
        selectedItem={items[selectedIndex]}>
        {items.map((item) => (
          <DropdownOption key={item.id} value={item.value} />
        ))}
      </Dropdown>
      <Button variant="info" css={{ marginLeft: 10 }} onClick={handleUpdate}>
        Update selected item
      </Button>
    </div>
  );
};

DynamicallyChangedSelectedItem.args = { isDisabled: false };
