import { useControllableState, useUncontrolled } from '@ssa-ui-kit/hooks';

import { resolveOpenState } from '@utils/deprecation';

export type Filter = {
  id: string;
  label: string;
  group?: true;
};

export type SelectedFilter = Omit<Filter, 'group'> & {
  type: 'include' | 'exclude' | 'group';
};

export interface UseFiltersMultiSelectOptions {
  /**
   * Controlled open state of the dropdown. When provided, the parent must
   * update it from `onOpenChange`.
   */
  open?: boolean;
  /** Initial open state of the dropdown. */
  defaultOpen?: boolean;
  /** Called with the state the dropdown is moving to. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Controlled open state of the dropdown.
   *
   * @deprecated Use `open` instead — `opened` is removed in the next major
   * release.
   */
  opened?: boolean;
  /**
   * Initial open state of the dropdown.
   *
   * @deprecated Use `defaultOpen` instead — `defaultOpened` is removed in the
   * next major release.
   */
  defaultOpened?: boolean;
  /**
   * Called with the state the dropdown is moving to.
   *
   * @deprecated Use `onOpenChange` instead — `onOpenedChange` is removed in the
   * next major release.
   */
  onOpenedChange?: (open: boolean) => void;
  selectedFilters?: SelectedFilter[];
  defaultSelectedFilters?: SelectedFilter[];
  search?: string;
  defaultSearch?: string;
  onChange?: (value: SelectedFilter[]) => void;
  onDropdownClose?: () => void;
  onDropdownOpen?: () => void;
  onSearchChange?: (search: string) => void;
}

export function useFilterMultiSelect(
  options: UseFiltersMultiSelectOptions = {},
) {
  const {
    selectedFilters,
    defaultSelectedFilters,
    search,
    defaultSearch,
    onChange,
    onDropdownClose,
    onDropdownOpen,
    onSearchChange,
  } = options;

  const openState = resolveOpenState('FiltersMultiSelect', options, {
    controlledAlias: 'opened',
    defaultAlias: 'defaultOpened',
    changeAlias: 'onOpenedChange',
  });

  const [openValue, setOpen] = useControllableState<boolean>({
    controlled: openState.isControlled,
    value: openState.open,
    defaultValue: openState.defaultOpen,
    finalValue: false,
    onChange: openState.onOpenChange,
  });
  const _open = Boolean(openValue);
  const [_selectedFilters, setSelectedFilters] = useUncontrolled({
    value: selectedFilters,
    defaultValue: defaultSelectedFilters,
    finalValue: [],
    onChange,
  });
  const [_search, setSearch] = useUncontrolled({
    value: search,
    defaultValue: defaultSearch,
    finalValue: '',
    onChange: onSearchChange,
  });

  const toggleDropdown = (nextOpen?: boolean) => {
    const _nextOpen = nextOpen ?? !_open;
    setOpen(_nextOpen);
    if (_nextOpen) {
      onDropdownOpen?.();
    } else {
      onDropdownClose?.();
    }
  };

  const selectFilters = (...filters: SelectedFilter[]) => {
    const filtersArray = Array.isArray(filters) ? filters : [filters];
    const newFilters = [..._selectedFilters];

    filtersArray.forEach((filter) => {
      const index = newFilters.findIndex((f) => f.id === filter.id);
      if (index === -1) {
        newFilters.push(filter);
      } else if (newFilters[index].type !== filter.type) {
        newFilters[index] = filter;
      }
    });

    setSelectedFilters(newFilters);
  };
  const unselectFilters = (...filters: SelectedFilter[]) => {
    const filtersArray = Array.isArray(filters) ? filters : [filters];
    const newFilters = _selectedFilters.filter(
      (f) => !filtersArray.includes(f),
    );
    setSelectedFilters(newFilters);
  };

  const isSelected = (id: string) => _selectedFilters.find((f) => f.id === id);

  return {
    open: _open,
    /**
     * @deprecated Read `open` instead — the `opened` key is removed from the
     * store in the next major release.
     */
    opened: _open,
    selectedFilters: _selectedFilters,
    search: _search,
    toggleDropdown,
    selectFilters,
    unselectFilters,
    isSelected,
    setSearch,
  };
}

export type UseFiltersMultiSelectStore = ReturnType<
  typeof useFilterMultiSelect
>;
