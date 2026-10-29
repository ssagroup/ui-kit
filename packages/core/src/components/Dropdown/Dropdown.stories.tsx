import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { css } from '@emotion/react';
import DropdownOption from '@components/DropdownOption';
import DropdownOptionGroup from '@components/DropdownOptionGroup';
import Button from '@components/Button';
import Avatar, { AvatarSizes } from '@components/Avatar';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import Dropdown from './Dropdown';
import { DropdownPositions, DropdownProps } from './types';
import { DropdownOptionProps } from '../..';

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

const people = ['Alice Smith', 'Bob Jones', 'Carol White', 'David Brown'].map(
  (name, index) => ({
    value: index + 1,
    label: name,
    avatar: getStorybookAvatar(index),
  }),
);

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
  title: 'Components/Dropdown',
  component: Dropdown,
  args: {
    onChange: fn(),
  },
  argTypes: {
    selectedItem: { control: false },
    onChange: { control: false },
    children: { control: false },
    className: { control: false },
    isOpen: {
      description:
        'Initial open state. Read on mount only — later changes are ignored.',
    },
    width: { control: 'text' },
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
} as Meta<typeof Dropdown>;

/**
 * `selectedItem` is matched to an option by `value`, so pass an object whose
 * `value` equals the option's. `onChange` receives the picked option's props
 * (`value`, `label`, …).
 *
 * Every prop in the Controls panel applies here. `isOpen` opens the list on
 * mount; it is read once and is not a controlled prop, so this story remounts
 * the dropdown when the control changes.
 */
export const Default: StoryObj<Args> = {
  args: {
    placeholder: 'Select a department',
    selectedItem: items[1],
    disabled: false,
    isOpen: false,
  },
  render: (args) => (
    <Dropdown key={String(args.isOpen)} {...args}>
      {items.map((item) => (
        <DropdownOption
          key={item.value}
          value={item.value}
          label={item.label}
        />
      ))}
    </Dropdown>
  ),
};

/**
 * `label`, `helperText`, `icon` (shown in the toggle while no selected option
 * has an avatar), `errors` (a react-hook-form `FieldError`) and `success` give
 * the dropdown the same field chrome as the other form controls. `labelBadge`
 * adds a status badge next to the label and is announced as the toggle's
 * description — it needs a `label`.
 */
export const FormField: StoryObj<Args> = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Dropdown
        {...args}
        label="Department"
        helperText="Choose the employee's department"
        selectedItem={items[1]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Dropdown
        {...args}
        label="Department"
        icon="user"
        placeholder="Select a department">
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Dropdown
        {...args}
        label="Department"
        errors={{ type: 'required', message: 'Department is required' }}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Dropdown
        {...args}
        label="Department"
        success
        helperText="Looks good!"
        selectedItem={items[1]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Dropdown
        {...args}
        label="Preferred contact channel"
        labelBadge={{ text: 'default' }}
        selectedItem={items[0]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
    </div>
  ),
};

/**
 * The visible label of an option resolves as **`children` → `label` →
 * `value`**, so `<DropdownOption value="Sales" />` is enough for a plain list.
 *
 * `avatar` fills the leading slot of the row, and the selected option's avatar
 * is repeated in the toggle (`avatarBorder` adds a border there). `disabled`
 * options can't be picked and are skipped by the keyboard.
 */
export const WithAvatars: StoryObj<Args> = {
  args: { placeholder: 'Select a person' },
  render: (args) => (
    <Dropdown {...args} selectedItem={people[1]}>
      {people.map(({ value, label, avatar }) => (
        <DropdownOption
          key={value}
          value={value}
          label={label}
          avatar={
            <Avatar size={AvatarSizes.small} image={avatar} border={false} />
          }
        />
      ))}
    </Dropdown>
  ),
};

/**
 * Wrap options in `DropdownOptionGroup` to show them under a title. Titles are
 * not selectable and keyboard navigation skips them; groups are separated by a
 * divider. Options outside any group can sit next to groups.
 * `DropdownOptionGroup` must be a direct child of the `Dropdown`.
 */
export const Groups: StoryObj<Args> = {
  args: { placeholder: 'Select an ingredient', width: 240 },
  render: (args) => (
    <Dropdown {...args} selectedItem={{ value: 'banana', label: 'Banana' }}>
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
    </Dropdown>
  ),
};

/**
 * Without `width` the dropdown is sized to its content. A number is pixels and
 * any CSS length is used as-is, so `width="100%"` fills the surrounding
 * container and `width="60%"` is 60% of it.
 *
 * Use the prop rather than a `css` override: `className` and `css` land on the
 * toggle button only, which sits inside two wrappers that are themselves sized
 * to content. `dropdownProps.base.style` and `dropdownProps.toggleButton.css`
 * still win over `width` when both are set.
 *
 * Edit the `width` control to try values against the 520px dashed container;
 * the other two dropdowns stay fixed for comparison.
 */
export const Width: StoryObj<Args> = {
  args: { width: '100%' },
  render: (args) => (
    <div css={dashedContainer(520)}>
      <Dropdown
        {...args}
        label={`width="${args.width ?? ''}"`}
        selectedItem={items[0]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Dropdown
        {...args}
        width={320}
        label="width={320}"
        selectedItem={items[0]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
      <Dropdown
        {...args}
        width={undefined}
        label="No width (sized to content)"
        selectedItem={items[0]}>
        {items.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
    </div>
  ),
};

/**
 * The selected value and option labels stay on one line and are ellipsised;
 * nothing grows past its container, and the list is capped at the toggle's
 * width. Every option row has a tooltip with its full label (after a 1s
 * hover). Give the dropdown an explicit `width` when the options need more
 * room than the selected value does.
 */
export const LongContent: StoryObj<Args> = {
  render: (args) => (
    <div css={dashedContainer(320)}>
      <Dropdown {...args} selectedItem={longItems[0]}>
        {longItems.map((item) => (
          <DropdownOption
            key={item.value}
            value={item.value}
            label={item.label}
          />
        ))}
      </Dropdown>
    </div>
  ),
};

/**
 * With the default `dropdownProps.dropdownPosition` of
 * `DropdownPositions.auto` the list opens downward and flips upward on open
 * when there is not enough room below — as here, near the bottom of the
 * viewport. Pass `DropdownPositions.top` or `DropdownPositions.bottom` to
 * force a direction.
 */
export const PositionAuto: StoryObj<Args> = {
  name: 'Position: Auto (near bottom of viewport)',
  decorators: [
    (Story) => (
      <div style={{ position: 'fixed', bottom: 16, left: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Dropdown
      {...args}
      selectedItem={items[2]}
      dropdownProps={{ dropdownPosition: DropdownPositions.auto }}>
      {items.slice(0, 5).map((item) => (
        <DropdownOption
          key={item.value}
          value={item.value}
          label={item.label}
        />
      ))}
    </Dropdown>
  ),
};

/**
 * The dropdown keeps the selection internally, seeded from `selectedItem`, and
 * follows `selectedItem` whenever it changes. To own the selection, keep it in
 * state and write back from `onChange` — here the button also changes it from
 * outside the dropdown.
 */
export const Controlled: StoryObj<Args> = {
  render: function Render(args) {
    const [selected, setSelected] = useState<Item>(items[0]);
    const selectNext = () => {
      const index = items.findIndex((item) => item.value === selected.value);
      setSelected(items[(index + 1) % items.length]);
    };

    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Dropdown
          {...args}
          selectedItem={selected}
          onChange={(item) => {
            setSelected(item as Item);
            args.onChange?.(item);
          }}>
          {items.map((item) => (
            <DropdownOption
              key={item.value}
              value={item.value}
              label={item.label}
            />
          ))}
        </Dropdown>
        <Button variant="primary" onClick={selectNext}>
          Select next
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
  render: (args) => (
    <Dropdown
      {...args}
      selectedItem={items[2]}
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
    </Dropdown>
  ),
};
