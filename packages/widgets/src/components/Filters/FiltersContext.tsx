import { UseTableDataResult } from '@components/TableFilters/hooks/useTableData';
import { mockData } from '@components/TableFilters/stories/mockData';
import {
  BaseSyntheticEvent,
  createContext,
  createRef,
  useContext,
} from 'react';

export const FiltersContext = createContext<UseTableDataResult>({
  checkboxData: mockData,
  selectedItemsByGroup: {},
  handleCheckboxToggle: (groupName: string, name: string | number) => () => {
    // no action
  },
  onClear: () => {
    // no action
  },
  onReset: () => {
    // no action
  },
  onSubmit: (event?: BaseSyntheticEvent) => {
    // no action
  },
  refsList: [],
  setElementRef: (groupName: string, element: HTMLElement | null) => {
    // no action
  },
  wrapperRef: createRef(),
} as UseTableDataResult);

export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersContextProvider = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & UseTableDataResult) => (
  <FiltersContext.Provider value={rest}>{children}</FiltersContext.Provider>
);
