import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Avatar from '@components/Avatar';
import { AvatarSizes } from '@components/Avatar/types';

import { ContextMenu } from './ContextMenu';
import {
  ContextMenuEntry,
  ContextMenuIncludeExcludeEntry,
  ContextMenuItem,
} from './types';

const menuItems: ContextMenuItem<string>[] = [
  { value: 'one', label: 'Menu Item' },
  { value: 'two', label: 'Second menu item' },
  { value: 'three', label: 'A menu item whose label is too long to fit' },
  { value: 'four', label: 'Disabled item', disabled: true },
];

const STATUS = 'linear-gradient(90deg, #ed995d 0%, #edba5d 100%)';

const placeholderAvatar = <Avatar size={AvatarSizes.small} />;

const people: ContextMenuItem<string>[] = [
  {
    value: 'ann',
    label: 'Ann Lee',
    avatar: placeholderAvatar,
    description: 'July, 25th',
  },
  {
    value: 'bob',
    label: 'Bob Stone',
    avatar: placeholderAvatar,
    description: 'July, 26th',
  },
  {
    value: 'cid',
    label: 'Cid Moss',
    avatar: placeholderAvatar,
    description: 'Aug, 2nd',
  },
];

const groups: ContextMenuEntry<string>[] = [
  {
    id: 'project',
    label: 'Project Members',
    items: [
      { value: 'ann', label: 'Ann Lee', avatar: placeholderAvatar },
      { value: 'bob', label: 'Bob Stone', avatar: placeholderAvatar },
    ],
  },
  {
    id: 'staff',
    label: 'Staff Members',
    items: [
      { value: 'cid', label: 'Cid Moss', avatar: placeholderAvatar },
      { value: 'dee', label: 'Dee Park', avatar: placeholderAvatar },
    ],
  },
];

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    docs: {
      description: {
        component:
          'The list of options shown inside a dropdown, typeahead, filter or action menu. ' +
          'It renders only the list; the host component owns the trigger, open state and positioning.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 275 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

/** `single` mode: the selected row gets the selected background and a check. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('one');
    return (
      <ContextMenu<string>
        aria-label="Menu"
        selectionMode="single"
        items={menuItems}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/** `multiple` mode marks rows with checkboxes. */
export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['one']);
    return (
      <ContextMenu<string>
        aria-label="Menu"
        selectionMode="multiple"
        items={menuItems}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/** `status` places a coloured dot before the label. */
export const WithStatus: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <ContextMenu<string>
        aria-label="Menu"
        selectionMode="multiple"
        items={menuItems.map((item) => ({ ...item, status: STATUS }))}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/** People: an avatar before the label and a description on the right. */
export const People: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('bob');
    return (
      <ContextMenu<string>
        aria-label="People"
        selectionMode="single"
        items={people}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/** Titled groups separated by a divider. */
export const Groups: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('ann');
    return (
      <ContextMenu<string>
        aria-label="Members"
        selectionMode="single"
        items={groups}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/**
 * Include / exclude filters, as in FiltersMultiSelect. Click + or −, or
 * highlight a row and press Enter to cycle none → include → exclude. A
 * `selectOnly` row (e.g. a filter group) has a single check-circle.
 */
export const IncludeExclude: Story = {
  render: () => {
    const [value, setValue] = useState<
      ContextMenuIncludeExcludeEntry<string>[]
    >([
      { value: 'f1', type: 'include' },
      { value: 'f2', type: 'exclude' },
    ]);
    return (
      <ContextMenu<string>
        aria-label="Filters"
        selectionMode="includeExclude"
        items={[
          { value: 'f1', label: 'Filter 1' },
          { value: 'f2', label: 'Filter 2' },
          { value: 'g1', label: 'Filter Group 1', selectOnly: true },
          { value: 'f3', label: 'Filter 3' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/** `indicator="checkCircle"`: a blue check-circle, filled when selected. */
export const CheckCircle: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['two']);
    return (
      <ContextMenu<string>
        aria-label="Menu"
        selectionMode="multiple"
        indicator="checkCircle"
        items={menuItems}
        value={value}
        onChange={setValue}
      />
    );
  },
};

/** `selectionMode="none"`: an action menu; rows only fire `onAction`. */
export const ActionMenu: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 120 }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <ContextMenu<string>
      aria-label="Period"
      items={[
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
      ]}
      onAction={(value) => console.log('action', value)}
    />
  ),
};

/** `maxHeight` scrolls the list with a slim scrollbar. */
export const Scrollable: Story = {
  render: () => (
    <ContextMenu<string>
      aria-label="Items"
      selectionMode="single"
      maxHeight={212}
      items={Array.from({ length: 12 }, (_, i) => ({
        value: `item-${i + 1}`,
        label: `Item ${i + 1}`,
      }))}
    />
  ),
};

/** No options. */
export const Empty: Story = {
  render: () => (
    <ContextMenu aria-label="Items" selectionMode="single" items={[]} />
  ),
};
