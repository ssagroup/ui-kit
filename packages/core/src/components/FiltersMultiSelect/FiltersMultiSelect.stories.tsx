import { type Meta, type StoryObj } from '@storybook/react-webpack5';

import { useToggle } from '@ssa-ui-kit/hooks';

import Button from '@components/Button';
import {
  Filter,
  FiltersMultiSelect,
  FiltersMultiSelectEmpty,
  FiltersMultiSelectOption,
  FiltersMultiSelectOptions,
  useFilterMultiSelect,
} from '@components/FiltersMultiSelect';
import Icon from '@components/Icon';

const meta = {
  title: 'Widgets/FiltersMultiSelect',
  component: FiltersMultiSelect,
  args: {
    placeholder: 'Select filters',
    label: 'Filters',
    description: 'Helper text',
    error: 'Error message',
    success: 'Success message',
  },
  argTypes: {},
} satisfies Meta<typeof FiltersMultiSelect>;

export default meta;
type Story = StoryObj<typeof FiltersMultiSelect>;

const filters: Filter[] = [
  { id: '1', label: 'Filter 1' },
  { id: '2', label: 'Filter 2' },
  { id: '3', label: 'Filter Group 1', group: true },
  { id: '4', label: 'Filter 4' },
  { id: '5', label: 'Filter 5' },
  { id: '6', label: 'Filter 6' },
  { id: '7', label: 'Filter 7' },
  { id: '8', label: 'Filter Group 2', group: true },
];

export const Default: Story = {
  render: (args) => {
    const store = useFilterMultiSelect({
      defaultSelectedFilters: [
        { id: '1', label: 'Filter 1', type: 'include' },
        { id: '2', label: 'Filter 2', type: 'exclude' },
        { id: '3', label: 'Filter Group 1', type: 'group' },
      ],
    });
    const filtersToShow = filters.filter((filter) =>
      filter.label.toLowerCase().includes(store.search.toLowerCase()),
    );
    return (
      <FiltersMultiSelect {...args} store={store}>
        <FiltersMultiSelectOptions>
          {filtersToShow.map((filter) => (
            <FiltersMultiSelectOption key={filter.id} filter={filter}>
              {filter.label}
            </FiltersMultiSelectOption>
          ))}
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const store = useFilterMultiSelect();
    const filtersToShow = filters.filter((filter) =>
      filter.label.toLowerCase().includes(store.search.toLowerCase()),
    );
    return (
      <FiltersMultiSelect
        {...args}
        store={store}
        icon={<Icon size={16} name="user" />}>
        <FiltersMultiSelectOptions>
          {filtersToShow.map((filter) => (
            <FiltersMultiSelectOption key={filter.id} filter={filter}>
              {filter.label}
            </FiltersMultiSelectOption>
          ))}
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};

export const WithStatus: Story = {
  render: (args) => {
    const [status, toggleStatus] = useToggle([
      'error',
      'success',
      'basic',
    ] as const);
    const store = useFilterMultiSelect();
    const filtersToShow = filters.filter((filter) =>
      filter.label.toLowerCase().includes(store.search.toLowerCase()),
    );
    return (
      <div>
        <Button onClick={() => toggleStatus()}>Toggle status</Button>
        <FiltersMultiSelect
          {...args}
          status={status}
          store={store}
          onChange={(filters) => console.log(filters)}>
          <FiltersMultiSelectOptions>
            {filtersToShow.map((filter) => (
              <FiltersMultiSelectOption key={filter.id} filter={filter}>
                {filter.label}
              </FiltersMultiSelectOption>
            ))}
          </FiltersMultiSelectOptions>
        </FiltersMultiSelect>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const store = useFilterMultiSelect({
      defaultSelectedFilters: [
        { id: '1', label: 'Filter 1', type: 'include' },
        { id: '2', label: 'Filter 2', type: 'exclude' },
        { id: '3', label: 'Filter 3', type: 'group' },
      ],
    });
    return (
      <FiltersMultiSelect {...args} store={store} disabled>
        <FiltersMultiSelectOptions>
          <FiltersMultiSelectOption
            key="1"
            filter={{ id: '1', label: 'Filter 1' }}>
            Filter 1
          </FiltersMultiSelectOption>
          <FiltersMultiSelectOption
            key="2"
            filter={{ id: '2', label: 'Filter 2' }}>
            Filter 2
          </FiltersMultiSelectOption>
          <FiltersMultiSelectOption
            key="3"
            filter={{ id: '3', label: 'Filter 3', group: true }}>
            Filter Group
          </FiltersMultiSelectOption>
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};

export const Empty: Story = {
  render: (args) => {
    const store = useFilterMultiSelect({ defaultOpened: true });
    return (
      <FiltersMultiSelect {...args} store={store}>
        <FiltersMultiSelectOptions>{null}</FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};

export const WithCustomEmptyNode: Story = {
  render: (args) => {
    const store = useFilterMultiSelect({ defaultOpened: true });
    return (
      <FiltersMultiSelect
        {...args}
        store={store}
        emptyNode={
          <FiltersMultiSelectEmpty>Custom Empty Node</FiltersMultiSelectEmpty>
        }>
        <FiltersMultiSelectOptions>{null}</FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    );
  },
};
