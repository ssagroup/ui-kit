import { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';

import DropdownOption from '@components/DropdownOption';

import Dropdown from './Dropdown';

const items = [
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
      description: 'used in order to ovewrite the default style.',
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

export const Basic: StoryObj = (args) => {
  return (
    <Dropdown selectedItem={items[2]} isDisabled={args.isDisabled}>
      {items.map((item, index) => (
        <DropdownOption key={index} value={item.id}>
          {item.value}
        </DropdownOption>
      ))}
    </Dropdown>
  );
};

Basic.args = { isDisabled: false };

export const Simple: StoryObj = (args) => {
  return (
    <Dropdown isDisabled={args.isDisabled}>
      {items.map((item, index) => (
        <DropdownOption key={index} value={item.value} />
      ))}
    </Dropdown>
  );
};

Simple.args = { isDisabled: false };

export const NoItems: StoryObj = () => {
  return (
    <Dropdown>
      {[].length > 0
        ? items.map((item, index) => (
            <DropdownOption key={index} value={item.value} />
          ))
        : null}
    </Dropdown>
  );
};

NoItems.args = { isDisabled: false };

export const Custom: StoryObj = (args) => {
  const CustomDropdown = styled(Dropdown)`
    background: ${({ theme }) => theme.colors.greyLighter};

    &:disabled {
      background: ${({ theme }) => theme.colors.grey};
    }

    &:focus {
      color: white;
      background: ${({ theme }) => theme.colors.grey};

      svg {
        path {
          stroke: white;
        }
      }
    }
  `;
  const CustomOption = styled(DropdownOption)`
    width: auto;
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
    <CustomDropdown isDisabled={args.isDisabled} selectedItem={items[2]}>
      {items.map((item, index) => (
        <CustomOption key={index} value={item.id} label={item.value}>
          {item.value}
          &nbsp;|&nbsp;
          <b>{item.subText}</b>
        </CustomOption>
      ))}
    </CustomDropdown>
  );
};

Custom.args = {
  isDisabled: false,
};
