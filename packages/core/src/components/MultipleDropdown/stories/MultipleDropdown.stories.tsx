import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { css } from '@emotion/react';

import DropdownOption from '@components/DropdownOption';
import DropdownOptionGroup from '@components/DropdownOptionGroup';
import Button from '@components/Button';
import { DropdownOptionProps } from '@components/DropdownOptions/types';

import MultipleDropdown from '../MultipleDropdown';
import { DropdownProps } from '../types';

type Args = DropdownProps<DropdownOptionProps>;
type Item = { value: string | number; label: string; subText?: string };

const items: Item[] = [
  { value: 1, label: 'Design', subText: '12 members' },
  { value: 2, label: 'Engineering', subText: '48 members' },
  { value: 3, label: 'Finance', subText: '6 members' },
  { value: 4, label: 'Human Resources', subText: '9 members' },
  { value: 5, label: 'Legal', subText: '4 members' },
  { value: 6, label: 'Marketing', subText: '15 members' },
  { value: 7, label: 'Operations', subText: '21 members' },
  { value: 8, label: 'Product', subText: '11 members' },
  { value: 9, label: 'Sales', subText: '30 members' },
  { value: 10, label: 'Support', subText: '18 members' },
];

const longItems: Item[] = [
  {
    value: 'long-1',
    label:
      'Regional Operations and Customer Success — Central and Eastern Europe',
  },
  { value: 'short', label: 'Short one' },
  {
    value: 'long-2',
    label: 'Platform Infrastructure, Reliability and Developer Experience',
  },
];

const groupedItems = [
  {
    label: 'Fruits',
    items: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'potato', label: 'Potato' },
      { value: 'onion', label: 'Onion', disabled: true },
    ],
  },
];

const dashedContainer = (width: number) => css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: ${width}px;
  padding: 16px;
  border: 1px dashed #c4c4c4;
  border-radius: 12px;
`;

export default {
  title: 'Components/MultipleDropdown',
  component: MultipleDropdown,
  args: {
    onChange: fn(),
  },
  argTypes: {
    selectedItems: { control: false },
    onChange: { control: false },
    children: { control: false },
    className: { control: false },
    isDisabled: { control: false },
    errors: { control: false },
    isOpen: {
      description:
        'Initial open state. Read on mount only — later changes are ignored.',
    },
    width: { control: 'text' },
    maxHeight: { control: 'number' },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree,
    // which expands every option and leaks story-only props such as `key`.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 240 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof MultipleDropdown>;

/**
 * The toggle shows `label`, the first selected option and a `+N` badge for
 * the rest. `selectedItems` is matched to options by `value`. `onChange`
 * receives the toggled option's `value` and whether it is now selected.
 *
 * With `isMultiple={false}` it picks one option and closes; the toggle then
 * shows only the selected value (no `label`), and picking the selected option
 * again just closes the list. For a single choice, prefer `Dropdown`.
 *
 * Every prop in the Controls panel applies here. `isOpen` opens the list on
 * mount; it is read once and is not a controlled prop, so this story remounts
 * the dropdown when the control changes.
 */
export const Default: StoryObj<Args> = {
  args: {
    label: 'Departments',
    selectedItems: [items[0], items[2]],
    isMultiple: true,
    disabled: false,
    isOpen: false,
  },
  render: (args) => (
    <MultipleDropdown key={String(args.isOpen)} {...args}>
      {items.map((item) => (
        <DropdownOption
          key={item.value}
          value={item.value}
          label={item.label}
        />
      ))}
    </MultipleDropdown>
  ),
};

/**
 * `fieldLabel`, `helperText`, `errors` (a react-hook-form `FieldError`) and
 * `success` give the dropdown the same field chrome as `Dropdown` and the other
 * form controls. `fieldLabel` sits above the toggle and is its accessible name;
 * it is separate from `label`, the prefix inside the toggle. `labelBadge` adds
 * a status badge next to the field label and is announced as the toggle's
 * description — it needs a `fieldLabel`.
 */
export const FormField: StoryObj<Args> = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <MultipleDropdown
        {...args}
        fieldLabel="Departments"
        helperText="Choose every department that applies"
        selectedItems={[items[0], items[2]]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        {...args}
        fieldLabel="Departments"
        errors={{ type: 'required', message: 'Pick at least one department' }}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        {...args}
        fieldLabel="Departments"
        success
        helperText="Looks good!"
        selectedItems={[items[1]]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        {...args}
        fieldLabel="Notification channels"
        labelBadge={{ text: 'default' }}
        label="Channels"
        selectedItems={[items[0]]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
    </div>
  ),
};

/**
 * With nothing selected the toggle reads `label: placeholder`.
 * `showPlaceholder={false}` drops the placeholder and shows the `label` alone.
 * Once something is selected both look the same.
 */
export const Placeholder: StoryObj<Args> = {
  args: { label: 'Departments', placeholder: 'Any' },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <MultipleDropdown {...args} selectedItems={[]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
      <MultipleDropdown {...args} selectedItems={[]} showPlaceholder={false}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
    </div>
  ),
};

/**
 * Wrap options in `DropdownOptionGroup` to show them under a title — the same
 * component `Dropdown` uses. Titles are not selectable and keyboard navigation
 * skips them. `selectedItems` and `onChange` work with option values exactly
 * as without groups. `DropdownOptionGroup` must be a direct child of the
 * `MultipleDropdown`.
 */
export const Groups: StoryObj<Args> = {
  args: { label: 'Ingredients', width: 260 },
  render: (args) => (
    <MultipleDropdown
      {...args}
      selectedItems={[{ value: 'apple' }, { value: 'carrot' }]}>
      {groupedItems.map((group) => (
        <DropdownOptionGroup key={group.label} label={group.label}>
          {group.items.map((item) => (
            <DropdownOption
              key={item.value}
              value={item.value}
              label={item.label}
              disabled={item.disabled}
            />
          ))}
        </DropdownOptionGroup>
      ))}
    </MultipleDropdown>
  ),
};

/**
 * Without `width` the dropdown is sized to its content and shows the first
 * selected value and a `+N` badge. A number is pixels and any CSS length is
 * used as-is, so `width="100%"` fills the surrounding container and
 * `width="60%"` is 60% of it. The extra room is filled with as many further
 * values as fit, re-measured on resize; the badge counts the rest.
 *
 * Use the prop rather than a `css` override: `className` and `css` land on the
 * toggle button only, and the prop also clears the base's default
 * `min-width: 180px` and the toggle's `max-width: 250px`, which would
 * otherwise cap the value.
 *
 * Edit the `width` control to try values against the 520px dashed container;
 * the other two dropdowns stay fixed for comparison.
 */
export const Width: StoryObj<Args> = {
  args: { width: '100%' },
  render: (args) => (
    <div css={dashedContainer(520)}>
      <MultipleDropdown
        {...args}
        label={`width="${args.width ?? ''}"`}
        selectedItems={items.slice(0, 7)}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        {...args}
        width={320}
        label="width={320}"
        selectedItems={items.slice(0, 7)}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
      <MultipleDropdown
        {...args}
        width={undefined}
        label="No width"
        selectedItems={items.slice(0, 7)}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
    </div>
  ),
};

/**
 * The toggle text stays on one line and is ellipsised before the `+N` badge;
 * option labels are ellipsised too, with a tooltip holding the full label
 * (after a 1s hover). Give the dropdown an explicit `width` when the options
 * need more room. `maxHeight` (200px by default) caps the list; longer lists
 * scroll.
 */
export const LongContent: StoryObj<Args> = {
  args: { label: 'Teams', maxHeight: 200 },
  render: (args) => (
    <div css={dashedContainer(320)}>
      <MultipleDropdown {...args} selectedItems={longItems}>
        {longItems.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </MultipleDropdown>
    </div>
  ),
};

/**
 * The dropdown keeps the selection internally, seeded from `selectedItems`,
 * and resets it to `selectedItems` whenever the parent re-renders. So keep the
 * selection in state and write back from `onChange` — here the buttons also
 * change it from outside the dropdown.
 */
export const Controlled: StoryObj<Args> = {
  args: { label: 'Departments' },
  render: function Render(args) {
    const [selected, setSelected] = useState<Item[]>([items[1]]);

    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <MultipleDropdown
          {...args}
          selectedItems={selected}
          onChange={(value, isSelected) => {
            setSelected((prev) =>
              isSelected
                ? [...prev, ...items.filter((item) => item.value === value)]
                : prev.filter((item) => item.value !== value),
            );
            args.onChange?.(value, isSelected);
          }}>
          {items.map((item) => (
            <DropdownOption
              key={item.value}
              value={item.value}
              label={item.label}
            />
          ))}
        </MultipleDropdown>
        <Button variant="primary" onClick={() => setSelected(items)}>
          Select all
        </Button>
        <Button variant="secondary" onClick={() => setSelected([])}>
          Clear
        </Button>
      </div>
    );
  },
};

/**
 * `css` and `className` are applied to the toggle button; style the open and
 * focus states through `&[aria-expanded='true']` and `:focus`.
 *
 * Options are not rendered as elements — the dropdown reads their props — so
 * `styled(DropdownOption)` and a `css` prop on an option have no effect. Put
 * custom content in the option's `children` instead, and keep `label` set to
 * plain text: that is what the toggle shows once the option is selected.
 */
export const CustomStyling: StoryObj<Args> = {
  args: { label: 'Departments' },
  render: (args) => (
    <MultipleDropdown
      {...args}
      selectedItems={[items[2]]}
      css={css`
        background: #ff947b;
        :focus {
          background: #ffb566;
        }
        &[aria-expanded='true'] {
          color: #975875;

          svg path {
            stroke: #975875;
          }
        }
      `}>
      {items.map((item) => (
        <DropdownOption key={item.value} value={item.value} label={item.label}>
          {item.label}
          &nbsp;|&nbsp;
          <b>{item.subText}</b>
        </DropdownOption>
      ))}
    </MultipleDropdown>
  ),
};
