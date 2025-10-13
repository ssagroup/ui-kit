import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import {
  Filter,
  FiltersMultiSelect,
  FiltersMultiSelectEmpty,
  FiltersMultiSelectOption,
  FiltersMultiSelectOptions,
  FiltersMultiSelectProps,
  useFilterMultiSelect,
} from './';

describe('FiltersMultiSelect', () => {
  const filters: Filter[] = [
    { id: '1', label: 'Filter 1' },
    { id: '2', label: 'Filter 2' },
    { id: '3', label: 'Filter 3', group: true },
  ];

  const setup = (props: Partial<FiltersMultiSelectProps> = {}) =>
    render(
      <FiltersMultiSelect
        placeholder="Select filters"
        register={jest.fn()}
        {...props}>
        <FiltersMultiSelectOptions>
          {filters.map((filter) => (
            <FiltersMultiSelectOption key={filter.id} filter={filter}>
              {filter.label}
            </FiltersMultiSelectOption>
          ))}
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>,
    );

  it('Renders without selected filters', () => {
    const { queryByRole, getByRole } = setup();

    expect(getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Select filters',
    );

    const listbox = queryByRole('listbox');
    expect(listbox).not.toBeInTheDocument();
  });

  it('Renders with selected filters', () => {
    const { getByRole, container } = setup({
      selectedFilters: [
        { id: '1', label: 'Filter 1', type: 'include' },
        { id: '2', label: 'Filter 2', type: 'exclude' },
        { id: '3', label: 'Filter 3', type: 'group' },
      ],
    });

    expect(getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Select filters',
    );

    const selectedFilters = container.querySelectorAll('[data-filter-type]');
    expect(selectedFilters).toHaveLength(3);
  });

  it('Should clear all selected filters', async () => {
    const onChange = jest.fn();

    const Component = () => {
      const store = useFilterMultiSelect({
        onChange,
        defaultSelectedFilters: [
          { id: '1', label: 'Filter 1', type: 'include' },
          { id: '2', label: 'Filter 2', type: 'exclude' },
          { id: '3', label: 'Filter 3', type: 'group' },
        ],
      });
      return (
        <FiltersMultiSelect store={store} register={jest.fn()}>
          <FiltersMultiSelectOptions>
            {filters.map((filter) => (
              <FiltersMultiSelectOption key={filter.id} filter={filter}>
                {filter.label}
              </FiltersMultiSelectOption>
            ))}
          </FiltersMultiSelectOptions>
        </FiltersMultiSelect>
      );
    };
    const { getByTestId, container } = render(<Component />);

    const clearAllButton = getByTestId('clear-all-filters');
    await userEvent.click(clearAllButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([]);

    const selectedFilters = container.querySelectorAll('[data-filter-type]');
    expect(selectedFilters).toHaveLength(0);
  });

  it('Should open the dropdown when clicking on the input', async () => {
    const { getByRole, queryAllByRole } = setup();

    await userEvent.click(getByRole('textbox'));
    const options = queryAllByRole('option');
    expect(options).toHaveLength(filters.length);
  });

  it('Renders with an empty items array', async () => {
    const { getByRole, queryAllByRole, getByText } = render(
      <FiltersMultiSelect register={jest.fn()}>
        <FiltersMultiSelectOptions>{null}</FiltersMultiSelectOptions>
      </FiltersMultiSelect>,
    );

    await userEvent.click(getByRole('textbox'));
    const options = queryAllByRole('option');
    expect(options).toHaveLength(0);

    expect(getByText('No Items Found')).toBeInTheDocument();
  });

  it('Renders with an custom empty items array', async () => {
    const { getByRole, queryAllByRole, getByText } = render(
      <FiltersMultiSelect
        register={jest.fn()}
        emptyNode={
          <FiltersMultiSelectEmpty>No Items (custom)</FiltersMultiSelectEmpty>
        }>
        <FiltersMultiSelectOptions>{null}</FiltersMultiSelectOptions>
      </FiltersMultiSelect>,
    );

    await userEvent.click(getByRole('textbox'));
    const options = queryAllByRole('option');
    expect(options).toHaveLength(0);

    expect(getByText('No Items (custom)')).toBeInTheDocument();
  });

  it('Should select filters', async () => {
    const onChange = jest.fn();
    const { getByRole, getByText, container } = setup({ onChange });

    const filtersToSelect = ['Filter 2', 'Filter 1'];

    await userEvent.click(getByRole('textbox'));

    for (const filterToSelect of filtersToSelect) {
      const filterSpan = getByText(filterToSelect);
      const addButton = within(filterSpan.parentElement!).getAllByRole(
        'button',
      )[0];
      await userEvent.click(addButton);
    }

    const selectedFilters = container.querySelectorAll('[data-filter-type]');
    expect(selectedFilters).toHaveLength(2);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, [
      { id: '2', label: 'Filter 2', type: 'include' },
    ]);
    expect(onChange).toHaveBeenNthCalledWith(2, [
      { id: '2', label: 'Filter 2', type: 'include' },
      { id: '1', label: 'Filter 1', type: 'include' },
    ]);
  });

  it('Helper text should be displayed', () => {
    const { getByText } = setup({ description: 'Helper text' });
    expect(getByText('Helper text')).toBeInTheDocument();
  });

  it('Error text should be displayed', () => {
    const { getByText } = setup({ status: 'error', error: 'Error text' });
    expect(getByText('Error text')).toBeInTheDocument();
  });

  it('Success text should be displayed', () => {
    const { getByText } = setup({ status: 'success', success: 'Success text' });
    expect(getByText('Success text')).toBeInTheDocument();
  });
});
