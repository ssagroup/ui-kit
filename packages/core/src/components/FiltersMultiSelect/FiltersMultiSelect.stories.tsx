import { useState } from 'react';
import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import Button from '@components/Button';
import Icon from '@components/Icon';

import {
  FiltersMultiSelect,
  FiltersMultiSelectOptions,
  FiltersMultiSelectOption,
  FiltersMultiSelectEmpty,
  Filter,
  SelectedFilter,
  useFilterMultiSelect,
} from '@components/FiltersMultiSelect';

const filters: Filter[] = [
  { id: 'active', label: 'Active users' },
  { id: 'premium', label: 'Premium accounts' },
  { id: 'recent', label: 'Recent sign-ups' },
  { id: 'mobile', label: 'Mobile users' },
  { id: 'churned', label: 'Churned' },
  { id: 'saved-vip', label: 'Saved: VIP customers', group: true },
  { id: 'saved-trial', label: 'Saved: Trial ending soon', group: true },
];

const matches = (filter: Filter, search: string) =>
  filter.label.toLowerCase().includes(search.toLowerCase());

export default {
  title: 'Widgets/FiltersMultiSelect',
  component: FiltersMultiSelect,
  args: {
    label: 'User filters',
    placeholder: 'Search filters',
    description: 'Include (+) or exclude (−) any filter',
    error: 'Pick at least one filter',
    success: 'Filters applied',
    status: 'basic',
    disabled: false,
    searchable: true,
    onChange: fn(),
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['basic', 'error', 'success'] },
    children: { control: false },
    store: { control: false },
    selectedFilters: { control: false },
    emptyNode: { control: false },
    icon: { control: false },
    fieldProps: { control: false },
    inputProps: { control: false },
    register: { control: false },
    onChange: { control: false },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingBottom: 320, maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof FiltersMultiSelect>;

type Story = StoryObj<typeof FiltersMultiSelect>;

/**
 * Each regular filter has a **+** (include) and a **−** (exclude) control;
 * a `group: true` filter — a saved set of filters, say — has a single check.
 * Picked filters show as badges coloured by type, each with a remove button;
 * the cross at the end clears them all.
 *
 * The component does not filter its options. Create the store with
 * `useFilterMultiSelect`, pass it as `store`, and filter the options by
 * `store.search` yourself — that is what lets the search match whatever the
 * options carry, or run on a server.
 *
 * `status` picks which of `description`, `error` and `success` is shown, and
 * colours the border to match.
 */
export const Default: Story = {
  render: function Render(args) {
    const store = useFilterMultiSelect({
      defaultSelectedFilters: [
        { id: 'active', label: 'Active users', type: 'include' },
        { id: 'churned', label: 'Churned', type: 'exclude' },
        { id: 'saved-vip', label: 'Saved: VIP customers', type: 'group' },
      ],
      onChange: args.onChange,
    });

    return (
      <FiltersMultiSelect {...args} store={store}>
        <FiltersMultiSelectOptions>
          {filters
            .filter((filter) => matches(filter, store.search))
            .map((filter) => (
              <FiltersMultiSelectOption key={filter.id} filter={filter}>
                {filter.label}
              </FiltersMultiSelectOption>
            ))}
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};

/**
 * `icon` sits at the start of the field, before the badges. `emptyNode`
 * replaces the "No Items Found" row shown when the list has no options — type
 * something that matches no filter to see it. Wrap it in
 * `FiltersMultiSelectEmpty` to keep the default padding and type.
 */
export const CustomContent: Story = {
  render: function Render(args) {
    const store = useFilterMultiSelect();

    return (
      <FiltersMultiSelect
        {...args}
        store={store}
        icon={<Icon name="user" size={16} />}
        emptyNode={
          <FiltersMultiSelectEmpty>
            No filter matches “{store.search}”
          </FiltersMultiSelectEmpty>
        }>
        <FiltersMultiSelectOptions>
          {filters
            .filter((filter) => matches(filter, store.search))
            .map((filter) => (
              <FiltersMultiSelectOption key={filter.id} filter={filter}>
                {filter.label}
              </FiltersMultiSelectOption>
            ))}
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};

/**
 * The selection is a list of `{ id, label, type }`, where `type` is
 * `'include'`, `'exclude'` or `'group'`. To own it, pass `selectedFilters` to
 * the store and write back from its `onChange`. The store's
 * `selectFilters` / `unselectFilters` change it from outside as well —
 * `unselectFilters` takes the entries from `store.selectedFilters` (it matches
 * by reference).
 */
export const Controlled: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState<SelectedFilter[]>([
      { id: 'premium', label: 'Premium accounts', type: 'include' },
    ]);
    const store = useFilterMultiSelect({
      selectedFilters: selected,
      onChange: (next) => {
        setSelected(next);
        args.onChange?.(next);
      },
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <FiltersMultiSelect {...args} store={store}>
          <FiltersMultiSelectOptions>
            {filters
              .filter((filter) => matches(filter, store.search))
              .map((filter) => (
                <FiltersMultiSelectOption key={filter.id} filter={filter}>
                  {filter.label}
                </FiltersMultiSelectOption>
              ))}
          </FiltersMultiSelectOptions>
        </FiltersMultiSelect>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="secondary"
            onClick={() =>
              store.selectFilters({
                id: 'mobile',
                label: 'Mobile users',
                type: 'exclude',
              })
            }>
            Exclude mobile users
          </Button>
          <Button
            variant="secondary"
            onClick={() => store.unselectFilters(...store.selectedFilters)}>
            Clear
          </Button>
        </div>
        <code>{JSON.stringify(selected)}</code>
      </div>
    );
  },
};
