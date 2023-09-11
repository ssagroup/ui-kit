import { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';

import DropdownOption from '@components/DropdownOption';

import MultipleDropdown from './MultipleDropdown';
import { css } from '@emotion/react';

type Args = Parameters<typeof MultipleDropdown>[0];

const items = [
  { value: 1, label: 'One lorem ipsum One lorem ipsum', subText: 'subtext' },
  { value: 2, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 3, label: 'Three lorem ipsum', subText: 'subtext' },
];

export default {
  title: 'Components/MultipleDropdown',
  component: MultipleDropdown,
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
} as Meta<typeof MultipleDropdown>;

export const Basic: StoryObj = (args: Args) => {
  return (
    <MultipleDropdown {...args}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value}>
          {item.label}
        </DropdownOption>
      ))}
    </MultipleDropdown>
  );
};

Basic.args = {
  isDisabled: false,
  isMultiple: true,
  selectedItems: [items[0], items[2]],
  label: 'Strategy',
};

export const Single: StoryObj = (args: Args) => {
  return (
    <MultipleDropdown isDisabled={args.isDisabled} isMultiple={args.isMultiple}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value}>
          {item.label}
        </DropdownOption>
      ))}
    </MultipleDropdown>
  );
};

Single.args = {
  isDisabled: false,
  isMultiple: false,
  selectedItems: [items[0]],
};

export const Opened: StoryObj = (args: Args) => {
  return (
    <MultipleDropdown
      selectedItems={args.selectedItems}
      isMultiple={args.isMultiple}
      label={args.label}
      {...args}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value}>
          {item.label}
        </DropdownOption>
      ))}
    </MultipleDropdown>
  );
};

Opened.args = {
  isOpen: true,
  isDisabled: false,
  label: 'Strategy',
  isMultiple: true,
  selectedItems: [items[1]],
};

export const Simple: StoryObj = (args: Args) => {
  return (
    <MultipleDropdown {...args}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value} />
      ))}
    </MultipleDropdown>
  );
};

Simple.args = { isDisabled: false, label: 'Strategy' };

export const NoItems: StoryObj = () => {
  return <MultipleDropdown label="Strategy">{null}</MultipleDropdown>;
};

NoItems.args = { isDisabled: false };

export const Custom: StoryObj = (args: Args) => {
  // Color palette: https://mycolor.space/?hex=%23FF69B4&sub=1
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
    <MultipleDropdown
      isDisabled={args.isDisabled}
      selectedItems={[items[2]]}
      label="Strategy"
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
        <CustomOption key={item.value} value={item.value} label={item.label}>
          {item.label}
          &nbsp;|&nbsp;
          <b>{item.subText}</b>
        </CustomOption>
      ))}
    </MultipleDropdown>
  );
};

Custom.args = {
  isDisabled: false,
};
