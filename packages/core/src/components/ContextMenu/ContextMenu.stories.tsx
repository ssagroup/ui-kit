import { KeyboardEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import Avatar from '@components/Avatar';
import { AvatarSizes } from '@components/Avatar/types';
import Badge from '@components/Badge';
import Icon from '@components/Icon';
import { getStorybookAvatar } from '@storybook-assets/avatars';

import { ContextMenu } from './ContextMenu';
import {
  ContextMenuBaseProps,
  ContextMenuEntry,
  ContextMenuIncludeExcludeEntry,
  ContextMenuItem,
  ContextMenuProps,
} from './types';
import { getContextMenuOptionId, getNextActiveValue } from './utils';

/**
 * The selection props differ per `selectionMode`, so stories take a flat arg
 * shape and each render sets the mode it shows.
 */
type Args = Partial<ContextMenuBaseProps<string>> & {
  selectionMode?: ContextMenuProps['selectionMode'];
  onChange?: (...values: unknown[]) => void;
};

const departments: ContextMenuItem<string>[] = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'finance', label: 'Finance' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'legal', label: 'Legal', disabled: true },
  { value: 'marketing', label: 'Marketing' },
  { value: 'operations', label: 'Operations' },
  { value: 'customer-success', label: 'Customer Success and Support' },
];

const members: ContextMenuEntry<string>[] = [
  {
    id: 'project',
    label: 'Project members',
    items: [
      { value: 'alice', label: 'Alice Smith', avatar: getStorybookAvatar(0) },
      { value: 'bob', label: 'Bob Jones', avatar: getStorybookAvatar(1) },
    ],
  },
  {
    id: 'staff',
    label: 'Staff members',
    items: [
      { value: 'carol', label: 'Carol White', avatar: getStorybookAvatar(2) },
      { value: 'david', label: 'David Brown', avatar: getStorybookAvatar(3) },
      { value: 'erin', label: 'Erin Green', avatar: getStorybookAvatar(4) },
    ],
  },
];

export default {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  args: {
    onAction: fn(),
  },
  argTypes: {
    items: { control: false },
    onAction: { control: false },
    onChange: { control: false },
    onActiveValueChange: { control: false },
    renderItem: { control: false },
    renderGroupLabel: { control: false },
    selectionMode: {
      control: 'inline-radio',
      options: ['none', 'single', 'multiple', 'includeExclude'],
    },
    indicator: {
      control: 'select',
      options: [undefined, 'check', 'checkbox', 'checkCircle', 'none'],
    },
    maxHeight: { control: 'number' },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 275 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<Args>;

/**
 * Pass `items` and a `selectionMode`; the list keeps its own selection
 * (`defaultValue`) unless you pass `value` and `onChange`. `value` is a single
 * value (or `null`) in `single` mode, an array in `multiple` mode and a list of
 * `{ value, type }` entries in `includeExclude` mode.
 *
 * `indicator` changes how selected rows are marked — `check` (default for
 * `single`), `checkbox` (default for `multiple`), `checkCircle` or `none`.
 * `maxHeight` scrolls a long list, and `emptyState` replaces "No items" when
 * `items` is empty. `onAction` fires on every pick in every mode: close the
 * host's popup there.
 *
 * Every prop in the Controls panel applies here. Changing `selectionMode`
 * remounts the list, since each mode keeps a different kind of selection.
 */
export const Default: StoryObj<Args> = {
  args: {
    'aria-label': 'Department',
    selectionMode: 'single',
    indicator: undefined,
    maxHeight: undefined,
    onChange: fn(),
  },
  render: (args) => (
    <ContextMenu<string>
      key={args.selectionMode}
      // The flat story args cover every mode; a real call site passes one.
      {...(args as ContextMenuProps<string>)}
      items={departments}
    />
  ),
};

/**
 * From left to right a row holds the start indicator, a status dot or avatar,
 * `startContent`, the `label`, a `description`, `endContent` and the end
 * indicator. Everything but the label is optional.
 *
 * - `avatar` takes an image URL (rendered as a 24px `Avatar`) or any node.
 * - `status` is a CSS colour or gradient for a 12px dot.
 * - `description` is secondary text on the right, e.g. a date.
 * - `startContent` / `endContent` hold anything the design does not cover.
 * - A text `label` ellipsises and shows the full text in a tooltip after a
 *   hover. For a node label, set `textValue` so type-to-find can match it.
 * - `disabled` rows ignore clicks and are skipped by the keyboard.
 */
export const ItemAnatomy: StoryObj<Args> = {
  render: (args) => (
    <ContextMenu<string>
      {...args}
      aria-label="Assignee"
      selectionMode="single"
      defaultValue="bob"
      items={[
        {
          value: 'alice',
          label: 'Alice Smith',
          avatar: getStorybookAvatar(0),
          description: 'Jul 25',
        },
        {
          value: 'bob',
          label: 'Bob Jones',
          avatar: <Avatar size={AvatarSizes.small} />,
          description: 'Jul 26',
        },
        {
          value: 'review',
          label: 'In review',
          status: 'linear-gradient(90deg, #ed995d 0%, #edba5d 100%)',
        },
        {
          value: 'starred',
          label: 'Starred',
          startContent: <Icon name="star" size={16} />,
          endContent: <Badge color="blue">3</Badge>,
        },
        {
          value: 'long',
          label:
            'Regional Operations and Customer Success — Central and Eastern Europe',
        },
        {
          value: 'locked',
          label: 'Archived project',
          startContent: <Icon name="lock" size={16} />,
          disabled: true,
        },
      ]}
    />
  ),
};

/**
 * Put a `ContextMenuGroup` (`{ id, label, items }`) among `items` for a titled
 * section. Group titles are not selectable and do not stick while scrolling;
 * the keyboard moves across groups as if they were one list. A divider
 * separates two groups that sit next to each other. Groups don't nest.
 */
export const Groups: StoryObj<Args> = {
  render: function Render(args) {
    const [value, setValue] = useState<string | null>('alice');
    return (
      <ContextMenu<string>
        {...args}
        aria-label="Members"
        selectionMode="single"
        items={members}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};

/**
 * `includeExclude` is the filter mode used by FiltersMultiSelect. Every row
 * has + and − controls; clicking the active one clears it, and Enter on a
 * highlighted row cycles none → include → exclude → none. Clicking the row
 * body does nothing.
 *
 * A `selectOnly` row (e.g. a saved filter group) has a single check-circle and
 * is either `selected` or not. `value` is the list of chosen rows, each
 * `{ value, type }`; the selected-row background is not used in this mode.
 */
export const IncludeExclude: StoryObj<Args> = {
  render: function Render(args) {
    const [value, setValue] = useState<
      ContextMenuIncludeExcludeEntry<string>[]
    >([
      { value: 'remote', type: 'include' },
      { value: 'contractors', type: 'exclude' },
    ]);
    return (
      <ContextMenu<string>
        {...args}
        aria-label="Filters"
        selectionMode="includeExclude"
        items={[
          { value: 'remote', label: 'Remote' },
          { value: 'contractors', label: 'Contractors' },
          { value: 'my-team', label: 'My team', selectOnly: true },
          { value: 'managers', label: 'Managers' },
        ]}
        value={value}
        onChange={(next, changed) => {
          setValue(next);
          args.onChange?.(next, changed);
        }}
      />
    );
  },
};

/**
 * With no `selectionMode` (`none`) the list is an action menu: it renders
 * `role="menu"` with `menuitem` rows, keeps no selection and only fires
 * `onAction` with the chosen row's value.
 */
// An action menu has no selection, so it takes no `onChange`.
export const ActionMenu: StoryObj<Omit<Args, 'onChange'>> = {
  render: (args) => (
    <ContextMenu<string>
      {...args}
      aria-label="Report period"
      selectionMode="none"
      items={[
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
      ]}
    />
  ),
};

/**
 * `renderItem(item, state)` replaces the row content between the start and end
 * indicators; `state` says whether the row is `selected`, `active`
 * (highlighted) or `disabled`. `renderGroupLabel(group)` replaces a group
 * title. The row keeps its height, padding, indicators and keyboard handling.
 * Set `textValue` on items whose label is not plain text.
 */
export const CustomRender: StoryObj<Args> = {
  render: (args) => (
    <ContextMenu<string>
      {...args}
      aria-label="Members"
      selectionMode="multiple"
      defaultValue={['bob']}
      items={members}
      renderGroupLabel={(group) => `${group.label} (${group.items.length})`}
      renderItem={(item, state) => (
        <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Avatar size={AvatarSizes.small} image={item.avatar as string} />
          <span>
            {item.label}
            {state.selected && (
              <span style={{ color: '#4178e1' }}> · assigned</span>
            )}
          </span>
        </span>
      )}
    />
  ),
};

/**
 * A host that keeps focus in its own input (like Typeahead) drives the
 * highlight instead of focusing the list:
 *
 * - control the highlight with `activeValue` / `onActiveValueChange`;
 * - move it with `getNextActiveValue(items, active, event.key)`, which returns
 *   `undefined` for keys that are not navigation keys;
 * - point the input's `aria-activedescendant` at
 *   `getContextMenuOptionId(menuId, active)`, with `menuId` being the
 *   ContextMenu's `id`;
 * - take the list out of the tab order (`tabIndex={-1}`) and prevent
 *   `mousedown` on it so clicking a row doesn't blur the input.
 */
export const DrivenFromInput: StoryObj<Args> = {
  render: function Render(args) {
    const [query, setQuery] = useState('');
    const [value, setValue] = useState<string | null>(null);
    const [active, setActive] = useState<string | null>(null);

    const items = departments.filter((item) =>
      String(item.label).toLowerCase().includes(query.toLowerCase()),
    );

    const pick = (next: string) => {
      setValue(next);
      setQuery(String(items.find((item) => item.value === next)?.label ?? ''));
      args.onChange?.(next);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && active != null) {
        event.preventDefault();
        pick(active);
        return;
      }
      const next = getNextActiveValue(items, active, event.key);
      if (next === undefined) return; // not a navigation key
      event.preventDefault();
      setActive(next);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          role="combobox"
          aria-label="Department"
          aria-expanded
          aria-controls="department-menu"
          aria-activedescendant={
            active == null
              ? undefined
              : getContextMenuOptionId('department-menu', active)
          }
          placeholder="Type to filter, arrows to move"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(null);
          }}
          onKeyDown={handleKeyDown}
          style={{ height: 40, padding: '0 12px' }}
        />
        <ContextMenu<string>
          {...args}
          id="department-menu"
          aria-label="Departments"
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          selectionMode="single"
          items={items}
          value={value}
          onChange={pick}
          activeValue={active}
          onActiveValueChange={setActive}
          emptyState="No matching departments"
        />
      </div>
    );
  },
};
