import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { TreeView } from './TreeView';
import { TreeItem } from './types';

const items: TreeItem[] = [
  {
    id: 'assessment',
    label: 'Assessment',
    iconName: 'clipboard-assessment',
    items: [
      { id: 'currencies', label: 'Currencies', iconName: 'user' },
      {
        id: 'cooperation',
        label: 'Cooperation Models',
        iconName: 'user',
        items: [
          { id: 'internal', label: 'Internal' },
          { id: 'external', label: 'External' },
        ],
      },
      { id: 'businesses', label: 'Businesses', iconName: 'user' },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    iconName: 'education',
    items: [
      { id: 'courses', label: 'Courses', iconName: 'open-book' },
      { id: 'exams', label: 'Exams', iconName: 'open-book' },
      { id: 'universities', label: 'Universities', iconName: 'open-book' },
    ],
  },
  {
    id: 'employee',
    label: 'Employee',
    iconName: 'employee',
    items: [
      { id: 'positions', label: 'Positions' },
      { id: 'seniority', label: 'Seniority Levels' },
    ],
  },
];

/** The same tree with icons only on the top level — one of the Figma variants. */
const topLevelIconsOnly: TreeItem[] = items.map((item) => ({
  ...item,
  items: item.items?.map((child) => ({
    ...child,
    iconName: undefined,
    items: child.items?.map((grandChild) => ({
      ...grandChild,
      iconName: undefined,
    })),
  })),
}));

const noIcons: TreeItem[] = topLevelIconsOnly.map((item) => ({
  ...item,
  iconName: undefined,
}));

const files: TreeItem<{ size: string }>[] = [
  {
    id: 'src',
    label: 'src',
    iconName: 'folder',
    items: [
      {
        id: 'components',
        label: 'components',
        iconName: 'folder',
        items: [
          { id: 'button.tsx', label: 'Button.tsx', iconName: 'document' },
          { id: 'input.tsx', label: 'Input.tsx', iconName: 'document' },
        ],
      },
      { id: 'index.ts', label: 'index.ts', iconName: 'document' },
    ],
  },
  { id: 'readme', label: 'README.md', iconName: 'document' },
];

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  decorators: [
    (Story) => (
      <div style={{ width: 256, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: { items, 'aria-label': 'Sections' },
};

/**
 * Icons are per node, so a tree can mix them freely. `reserveIconSpace` keeps
 * the icon column on the rows without one, so their labels stay aligned with
 * their icon-bearing siblings.
 */
export const TopLevelIconsOnly: Story = {
  args: {
    items: topLevelIconsOnly,
    reserveIconSpace: true,
    defaultExpandedIds: ['assessment'],
  },
};

export const WithoutIcons: Story = {
  args: { items: noIcons, defaultExpandedIds: ['education'] },
};

/**
 * The same tree with the icon column held open — labels keep the indent even
 * though no row has an icon.
 */
export const WithReservedIconSpace: Story = {
  args: {
    items: noIcons,
    reserveIconSpace: true,
    defaultExpandedIds: ['education'],
  },
};

/**
 * A selection made on mount opens its ancestors, so a deep-linked node is
 * visible on the first paint rather than after an effect.
 */
export const PreselectedNestedItem: Story = {
  args: { items, defaultSelectedIds: ['external'] },
};

/** Accordion behaviour: expanding a node closes its siblings. */
export const SingleExpand: Story = {
  args: { items, expandMode: 'single' },
};

export const MultiSelect: Story = {
  args: {
    items,
    selectionMode: 'multiple',
    defaultSelectedIds: ['courses', 'exams'],
    defaultExpandedIds: ['education'],
  },
};

/** Only the chevron toggles — for trees whose rows are destinations. */
export const ChevronOnlyToggle: Story = {
  args: { items, toggleOnItemClick: false },
};

export const Disabled: Story = {
  args: {
    items: items.map((item, index) =>
      index === 1 ? { ...item, disabled: true } : item,
    ),
  },
};

/**
 * The dark colour set, for sidebars — this is what `CollapsibleNavBar` uses.
 */
export const DarkTheme: Story = {
  args: { items, theme: 'dark', defaultSelectedIds: ['courses'] },
  decorators: [
    (Story) => (
      <div style={{ width: 256, padding: 16, background: '#2b2d31' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * A file tree: same component, different payload. `meta` carries whatever the
 * consumer needs and comes back through `renderItem` fully typed.
 */
export const FileTree: StoryObj<typeof TreeView<{ size: string }>> = {
  args: {
    items: files,
    'aria-label': 'Files',
    defaultExpandedIds: ['src', 'components'],
  },
};

/**
 * `renderItem` replaces the row's interior only — the `li`, its ARIA and the
 * keyboard handling stay with `TreeView`. Spread `itemProps` on whatever you
 * make interactive and `toggleProps` on the chevron.
 */
export const CustomRow: Story = {
  args: {
    items,
    defaultExpandedIds: ['assessment'],
    renderItem: ({
      item,
      icon,
      level,
      hasItems,
      isExpanded,
      isSelected,
      itemProps,
      toggleProps,
    }) => (
      <div {...itemProps}>
        {icon}
        <span style={{ flex: '1 0 0' }}>{item.label}</span>
        <span style={{ fontSize: 11, opacity: 0.6 }}>
          L{level}
          {isSelected ? ' ✓' : ''}
        </span>
        {hasItems && (
          <button
            {...toggleProps}
            style={{ border: 'none', background: 'none' }}>
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>
    ),
  },
};
