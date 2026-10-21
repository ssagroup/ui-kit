import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';

import {
  FiltersMultiSelect,
  FiltersMultiSelectOptions,
  FiltersMultiSelectOption,
  FiltersMultiSelectProps,
  FiltersMultiSelectEmpty,
  Filter,
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
      const option = getByText(filterToSelect).closest('[role="option"]');
      await userEvent.click(
        option!.querySelector<HTMLElement>('[data-type="include"]')!,
      );
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

  it('Clicking the active control again removes the filter', async () => {
    const onChange = jest.fn();
    const { getByRole } = setup({
      onChange,
      selectedFilters: [{ id: '1', label: 'Filter 1', type: 'exclude' }],
    });

    await userEvent.click(getByRole('textbox'));
    const option = within(getByRole('listbox')).getAllByRole('option')[0];
    await userEvent.click(
      option.querySelector<HTMLElement>('[data-type="exclude"]')!,
    );

    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('Selects a group filter with its check-circle', async () => {
    const onChange = jest.fn();
    const { getByRole, getByText } = setup({ onChange });

    await userEvent.click(getByRole('textbox'));
    const option = getByText('Filter 3').closest('[role="option"]')!;
    expect(option.querySelector('[data-type="include"]')).toBeNull();
    await userEvent.click(
      option.querySelector<HTMLElement>('[data-type="selected"]')!,
    );

    expect(onChange).toHaveBeenLastCalledWith([
      { id: '3', label: 'Filter 3', type: 'group' },
    ]);
  });

  describe('keyboard', () => {
    it('arrows move the highlight from the search input', async () => {
      const user = userEvent.setup();
      const { getByRole, getAllByRole } = setup();
      const input = getByRole('textbox');

      await user.click(input);
      const options = getAllByRole('option');
      expect(input).toHaveAttribute('aria-controls', getByRole('listbox').id);
      expect(input).not.toHaveAttribute('aria-activedescendant');

      await user.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
      await user.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
      await user.keyboard('{ArrowUp}');
      expect(input).toHaveAttribute('aria-activedescendant', options[0].id);
      expect(input).toHaveFocus();
    });

    it('Enter cycles none → include → exclude → none', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const { getByRole } = setup({ onChange });

      await user.click(getByRole('textbox'));
      await user.keyboard('{ArrowDown}{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([
        { id: '1', label: 'Filter 1', type: 'include' },
      ]);
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([
        { id: '1', label: 'Filter 1', type: 'exclude' },
      ]);
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([]);
    });

    it('Enter toggles a group filter', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const { getByRole } = setup({ onChange });

      await user.click(getByRole('textbox'));
      await user.keyboard('{ArrowUp}{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([
        { id: '3', label: 'Filter 3', type: 'group' },
      ]);
      await user.keyboard('{Enter}');
      expect(onChange).toHaveBeenLastCalledWith([]);
    });

    it('typing clears the highlight', async () => {
      const user = userEvent.setup();
      const { getByRole } = setup();
      const input = getByRole('textbox');

      await user.click(input);
      await user.keyboard('{ArrowDown}');
      expect(input).toHaveAttribute('aria-activedescendant');
      await user.keyboard('F');
      expect(input).not.toHaveAttribute('aria-activedescendant');
    });
  });

  it('reads options inside Fragments and skips other children', async () => {
    const onMouseDown = jest.fn();
    const { getByRole, getAllByRole } = render(
      <FiltersMultiSelect register={jest.fn()}>
        <FiltersMultiSelectOptions onMouseDown={onMouseDown}>
          <>
            <FiltersMultiSelectOption filter={filters[0]}>
              Filter 1
            </FiltersMultiSelectOption>
          </>
          <span>Not an option</span>
          <FiltersMultiSelectOption filter={filters[1]}>
            Filter 2
          </FiltersMultiSelectOption>
        </FiltersMultiSelectOptions>
      </FiltersMultiSelect>,
    );

    const input = getByRole('textbox');
    await userEvent.click(input);
    const options = getAllByRole('option');
    expect(options).toHaveLength(2);

    // A consumer onMouseDown runs, and focus still stays in the input.
    await userEvent.click(options[1]);
    expect(onMouseDown).toHaveBeenCalled();
    expect(input).toHaveFocus();
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
