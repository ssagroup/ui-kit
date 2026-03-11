import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import DropdownOption from '@components/DropdownOption';
import Button from '@components/Button';
import Avatar from '@components/Avatar';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import Dropdown from './Dropdown';
import { DropdownProps } from './types';
import { DropdownOptionProps } from '../..';

/**
 * Recreates the look from before the "dropdown styles" commit.
 * Grey pill background when closed, dark gradient when open.
 * Uses styled(Dropdown) so theme tokens can be interpolated.
 * The generated className is forwarded to DropdownToggle via className prop.
 */
const LegacyStyledDropdown = styled(Dropdown)`
  background: ${({ theme }) => theme.colors.greyLighter};
  border: none;
  color: ${({ theme }) => theme.colors.greyDarker};

  svg path {
    stroke: ${({ theme }) => theme.colors.greyDarker};
  }

  /*
   * Use && to double the class selector specificity (0,3,0), which beats the
   * internal singleDropdownStyles :focus:not(:disabled) rule at (0,2,0).
   * Without this, clicking to open causes white text on a white background.
   */
  &&[aria-expanded='true'] {
    background: linear-gradient(
      108.3deg,
      ${({ theme }) => theme.colors.greyDarker} -0.36%,
      ${({ theme }) => theme.colors.greyDark} 100%
    );
    color: ${({ theme }) => theme.colors.white};

    svg path {
      stroke: ${({ theme }) => theme.colors.white};
    }
  }

  &:focus:not([aria-expanded='true']):not(:disabled) {
    background: ${({ theme }) => theme.colors.greyFocused};
    color: ${({ theme }) => theme.colors.greyDarker};
  }

  &&:disabled {
    background: ${({ theme }) => theme.colors.grey};
    border: none;
    color: ${({ theme }) => theme.colors.greyDarker60};
    cursor: default;

    svg path {
      stroke: ${({ theme }) => theme.colors.grey20};
    }
  }
`;

type Args = DropdownProps<DropdownOptionProps>;

const managerOptions = [
  {
    id: 1,
    value: 1,
    name: 'Alice Smith',
    label: 'Alice Smith',
    avatar: getStorybookAvatar(0),
  },
  {
    id: 2,
    value: 2,
    name: 'Bob Jones',
    label: 'Bob Jones',
    avatar: getStorybookAvatar(1),
  },
  {
    id: 3,
    value: 3,
    name: 'Carol White',
    label: 'Carol White',
    avatar: getStorybookAvatar(2),
  },
  {
    id: 4,
    value: 4,
    name: 'David Brown',
    label: 'David Brown',
    avatar: getStorybookAvatar(3),
  },
];

const items = [
  { value: 0, label: 'Zero lorem ipsum ipsum', subText: 'subtext' },
  { value: 1, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 2, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 3, label: 'Three lorem ipsum', subText: 'subtext' },
  { value: 10, label: 'Zero lorem ipsum', subText: 'subtext' },
  { value: 11, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 12, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 13, label: 'Three lorem ipsum', subText: 'subtext' },
  { value: 110, label: 'Zero lorem ipsum', subText: 'subtext' },
  { value: 111, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 112, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 113, label: 'Three lorem ipsum', subText: 'subtext' },
  { value: 110, label: 'Zero lorem ipsum', subText: 'subtext' },
  { value: 111, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 112, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 113, label: 'Three lorem ipsum', subText: 'subtext' },
  { value: 210, label: 'Zero lorem ipsum', subText: 'subtext' },
  { value: 211, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 122, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 123, label: 'Three lorem ipsum', subText: 'subtext' },
  { value: 1210, label: 'Zero lorem ipsum', subText: 'subtext' },
  { value: 1211, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 1122, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 1123, label: 'Three lorem ipsum', subText: 'subtext' },
  { value: 1120, label: 'Zero lorem ipsum', subText: 'subtext' },
  { value: 1121, label: 'One lorem ipsum', subText: 'subtext' },
  { value: 1122, label: 'Two lorem ipsum', subText: 'subtext' },
  { value: 1132, label: 'Three lorem ipsum', subText: 'subtext' },
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    'dropdownProps.toggleButton.name': {
      description: 'Custom name attribute for dropdown div.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'dropdownProps',
      },
    },
    'dropdownProps.base.name': {
      description: 'Custom name attribute for the underlying button.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'dropdownProps',
      },
    },
    'dropdownProps.toggleButtonArrow.data-testId': {
      description: 'Custom name attribute for the arrow icon.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'dropdownProps',
      },
    },
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
    <Dropdown
      dropdownProps={args.dropdownProps}
      selectedItem={items[2]}
      isDisabled={args.isDisabled}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value} label={item.label}>
          {item.label}
        </DropdownOption>
      ))}
    </Dropdown>
  );
};

Basic.args = {
  isDisabled: false,
  dropdownProps: {
    base: {
      name: 'dropdown',
    },
    toggleButton: {
      name: 'dropdownToggleName',
    },
    toggleButtonArrow: {
      'data-testId': 'test-attr',
    },
  },
};

export const Opened: StoryObj = (args: Args) => {
  return (
    <Dropdown selectedItem={items[2]} {...args}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value} label={item.label}>
          {item.label}
        </DropdownOption>
      ))}
    </Dropdown>
  );
};

Opened.args = { isOpen: true, isDisabled: false };

export const Disabled: StoryObj<Args> = {
  render: () => (
    <Dropdown selectedItem={items[2]} isDisabled>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value} label={item.label}>
          {item.label}
        </DropdownOption>
      ))}
    </Dropdown>
  ),
};

export const WithAvatars: StoryObj<Args> = {
  render: (args) => (
    <Dropdown
      {...args}
      selectedItem={managerOptions[1]}
      placeholder="Select a person...">
      {managerOptions.map(({ id, name, avatar }) => (
        <DropdownOption
          key={id}
          value={id}
          label={name}
          avatar={<Avatar size={20} image={avatar} />}>
          {name}
        </DropdownOption>
      ))}
    </Dropdown>
  ),
};

WithAvatars.args = { isDisabled: false };

export const LegacyStyle: StoryObj<Args> = {
  name: 'Legacy (Previous Style)',
  render: (args) => (
    <LegacyStyledDropdown {...args} selectedItem={items[2]}>
      {items.slice(0, 5).map((item) => (
        <DropdownOption key={item.value} value={item.value} label={item.label}>
          {item.label}
        </DropdownOption>
      ))}
    </LegacyStyledDropdown>
  ),
};

LegacyStyle.args = { isDisabled: false };

export const Simple: StoryObj = (args: Args) => {
  return (
    <Dropdown isDisabled={args.isDisabled}>
      {items.map((item) => (
        <DropdownOption
          key={item.value}
          value={item.value}
          label={item.label}
        />
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
        <CustomOption key={item.value} value={item.value} label={item.label}>
          {item.label}
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
  const handleChange = (item: (typeof items)[0]) => {
    const newIndex = items.findIndex((i) => i.value === item.value);
    setSelectedIndex(newIndex);
  };
  return (
    <div>
      <Dropdown
        isDisabled={args.isDisabled}
        selectedItem={items[selectedIndex]}
        onChange={handleChange}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Button variant="primary" css={{ marginLeft: 10 }} onClick={handleUpdate}>
        Update selected item
      </Button>
    </div>
  );
};

DynamicallyChangedSelectedItem.args = { isDisabled: false };
