import { useControllableState, useUncontrolled } from '@ssa-ui-kit/hooks';

import { resolveOpenState } from '@utils/deprecation';

/** One option of a FiltersMultiSelect. */
export type Filter = {
  /** Unique id; selected filters are matched by it. */
  id: string;
  /** Text of the row and of its badge once selected. */
  label: string;
  /** A select-only row (one check instead of include / exclude). */
  group?: true;
};

/** A picked filter: `'group'` for group rows, otherwise include or exclude. */
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
  /** Controlled selection; update it from `onChange`. */
  selectedFilters?: SelectedFilter[];
  /** Initial selection, for uncontrolled use. */
  defaultSelectedFilters?: SelectedFilter[];
  /** Controlled search text; update it from `onSearchChange`. */
  search?: string;
  /** Initial search text, for uncontrolled use. */
  defaultSearch?: string;
  /** Called with the whole new selection on every change. */
  onChange?: (value: SelectedFilter[]) => void;
  /** Called when the list closes. */
  onDropdownClose?: () => void;
  /** Called when the list opens. */
  onDropdownOpen?: () => void;
  /** Called with the new search text as the user types. */
  onSearchChange?: (search: string) => void;
}

/**
 * useFilterMultiSelect - State for a `FiltersMultiSelect`: selection, search
 * text and open state, each controlled or uncontrolled.
 *
 * Returns the store to pass as the component's `store`:
 * - `selectedFilters`, `search`, `open` — current state
 * - `selectFilters(...filters)` — adds filters, or changes their `type`
 * - `unselectFilters(...filters)` — removes the given entries; matched by
 *   reference, so pass entries from `selectedFilters`
 * - `isSelected(id)` — the selected entry for `id`, if any
 * - `setSearch(text)`, `toggleDropdown(open?)`
 *
 * @example
 * ```tsx
 * const store = useFilterMultiSelect({
 *   defaultSelectedFilters: [{ id: 'active', label: 'Active', type: 'include' }],
 *   onChange: (filters) => console.log(filters),
 * });
 * ```
 */
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
