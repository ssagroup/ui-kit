import { useUncontrolled } from '@ssa-ui-kit/hooks';

export type Filter = {
  id: string;
  label: string;
  group?: true;
};

export type SelectedFilter = Omit<Filter, 'group'> & {
  type: 'include' | 'exclude' | 'group';
};

export interface UseFiltersMultiSelectOptions {
  opened?: boolean;
  defaultOpened?: boolean;
  selectedFilters?: SelectedFilter[];
  defaultSelectedFilters?: SelectedFilter[];
  search?: string;
  defaultSearch?: string;
  onChange?: (value: SelectedFilter[]) => void;
  onOpenedChange?: (opened: boolean) => void;
  onDropdownClose?: () => void;
  onDropdownOpen?: () => void;
  onSearchChange?: (search: string) => void;
}

export function useFilterMultiSelect({
  opened,
  defaultOpened,
  selectedFilters,
  defaultSelectedFilters,
  search,
  defaultSearch,
  onChange,
  onOpenedChange,
  onDropdownClose,
  onDropdownOpen,
  onSearchChange,
}: UseFiltersMultiSelectOptions = {}) {
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange: onOpenedChange,
  });
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

  const toggleDropdown = (open?: boolean) => {
    const _open = open ?? !_opened;
    setOpened(_open);
    if (_open) {
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
    opened: _opened,
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
