import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import DropdownOption from '@components/DropdownOption';
import Button from '@components/Button';

import MultipleDropdown from '../MultipleDropdown';
import { items } from './consts';

type Args = Parameters<typeof MultipleDropdown>[0];

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

export const PlaceholderHidden: StoryObj = (args: Args) => {
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

PlaceholderHidden.args = {
  isDisabled: false,
  isMultiple: true,
  selectedItems: [],
  showPlaceholder: false,
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

Simple.args = { isDisabled: false, label: 'Strategy', selectedItems: [] };

export const NoItems: StoryObj = () => {
  return <MultipleDropdown label="Strategy">{null}</MultipleDropdown>;
};

NoItems.args = { isDisabled: false, selectedItems: [] };

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

export const DynamicallyChangedItems = (args: Args) => {
  const [localItems, setLocalItems] = useState(items);

  const handleUpdate = () => {
    setLocalItems((state) => [
      ...state,
      {
        value: state[state.length - 1].value + 1,
        label: `#${state[state.length - 1].value + 1} lorem ipsum`,
        subText: 'subtext',
      },
    ]);
  };
  return (
    <div>
      <MultipleDropdown {...args}>
        {localItems.map((item) => (
          <DropdownOption key={item.value} value={item.value}>
            {item.label}
          </DropdownOption>
        ))}
      </MultipleDropdown>
      <Button variant="info" css={{ marginLeft: 10 }} onClick={handleUpdate}>
        Update items
      </Button>
    </div>
  );
};

DynamicallyChangedItems.args = {
  isDisabled: false,
  isMultiple: true,
  selectedItems: [items[0], items[2]],
  label: 'Strategy2',
};
