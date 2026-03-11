import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import DropdownOption from '@components/DropdownOption';
import Button from '@components/Button';
import { focusOutline } from '@styles/safari-focus-outline';

import MultipleDropdown from '../MultipleDropdown';
import { items } from './consts';

/**
 * Recreates the MultipleDropdown look from before the "dropdown styles" commit.
 * Key differences vs the new design:
 *   - border-radius: 5px (was 12px)
 *   - border: greyDropdownMain (was grey → primary)
 *   - color: greyDropdownText (was greyDarker)
 *   - blue background when items are selected (blueDropdownWithSelectedItems)
 *   - focus ring via ::before pseudo-element with greyDropdownFocused
 *
 * The blue background is shown statically here since the story always has
 * pre-selected items (it was selection-state-dependent in the old component).
 * Uses &&& (triple class selector) to exceed the specificity of the new
 * hover/focus rules (which use pseudo-classes like :hover:not(:disabled),
 * giving them specificity 0,2,0 — three repeated classes gives us 0,3,0).
 */
const LegacyMultipleDropdown = styled(MultipleDropdown)`
  &&& {
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.greyDropdownText};
    border: 1px solid ${({ theme }) => theme.colors.greyDropdownMain};
    background: ${({ theme }) =>
      theme.colors.blueDropdownWithSelectedItems ?? theme.colors.white};
  }

  ${({ theme }) => focusOutline(theme, 'greyDropdownFocused', '5px')}

  &&&:focus {
    border-color: ${({ theme }) => theme.colors.greyDropdownFocused};
  }

  &&&:focus::before {
    border-color: ${({ theme }) => theme.colors.greyDropdownFocused};
  }

  &&&:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.greyDropdownMain};
  }
`;

/*
 * styled(MultipleDropdown) only forwards className to DropdownToggle —
 * it cannot reach the options list. This wrapper restores the old 2px
 * checkbox border-radius that was in DropdownOptionButton before the refactor.
 */
const LegacyCheckboxWrapper = styled.div`
  & label input + div,
  & label input + div::before {
    border-radius: 2px;
  }
`;

type Args = Parameters<typeof MultipleDropdown>[0];

export default {
  title: 'Components/MultipleDropdown',
  component: MultipleDropdown,
  argTypes: {
    selectedItems: {
      description:
        'List of currently selected items. Each entry must match one of the DropdownOption values.',
      control: { disable: true },
      table: {
        type: { summary: 'DropdownOptionProps[]' },
        defaultValue: { summary: '[]' },
      },
    },
    isMultiple: {
      description:
        'Enables multi-select mode — each option toggles independently. When `false` the dropdown behaves like a single-select and closes on pick.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    isDisabled: {
      description: 'Disables the dropdown, preventing any user interaction.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      description: 'Text shown in the toggle button when no item is selected.',
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Select something'" },
      },
    },
    showPlaceholder: {
      description:
        'When `true` the placeholder value is included in the displayed list. Set to `false` to hide it and only show the badge count.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    isOpen: {
      description:
        'Controlled open state. When provided, overrides the internal open/close logic.',
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    label: {
      description:
        'Label prefix shown in the toggle button before the selected value(s), e.g. `label="Strategy"` renders "Strategy: Value".',
      control: 'text',
      table: { type: { summary: 'string' } },
    },
    onChange: {
      description:
        'Callback fired when an option is toggled. Receives the option value and whether it was selected or deselected.',
      control: { disable: true },
    },
    className: {
      description:
        'Custom CSS class forwarded to the toggle button. Useful for styling via `styled(MultipleDropdown)`.',
      table: { type: { summary: 'StyledComponent' } },
      control: { disable: true },
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

export const LegacyStyle: StoryObj<Args> = {
  name: 'Legacy (Previous Style)',
  render: (args) => (
    <LegacyCheckboxWrapper>
      <LegacyMultipleDropdown
        {...args}
        selectedItems={[items[0], items[2]]}
        label="Strategy">
        {items.map((item) => (
          <DropdownOption key={item.value} value={item.value}>
            {item.label}
          </DropdownOption>
        ))}
      </LegacyMultipleDropdown>
    </LegacyCheckboxWrapper>
  ),
};

LegacyStyle.args = { isDisabled: false, isMultiple: true };

export const Disabled: StoryObj<Args> = {
  render: () => (
    <MultipleDropdown label="Strategy" isDisabled selectedItems={[items[0]]}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value}>
          {item.label}
        </DropdownOption>
      ))}
    </MultipleDropdown>
  ),
};

Disabled.args = { isDisabled: true };

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
      <Button variant="primary" css={{ marginLeft: 10 }} onClick={handleUpdate}>
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
