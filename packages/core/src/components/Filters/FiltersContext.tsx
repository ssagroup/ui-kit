import {
  BaseSyntheticEvent,
  createContext,
  createRef,
  useContext,
} from 'react';

import { UseTableDataResult } from '@components/TableFilters/hooks/useTableData';
import { mockData } from '@components/TableFilters/stories/mockData';

export const FiltersContext = createContext<UseTableDataResult>({
  checkboxData: mockData,
  selectedItemsByGroup: {},
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onCheckboxToggle: (groupName: string, name: string | number) => () => {
    // no action
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onDropdownChange: (groupName: string, name: string | number) => () => {
    // no action
  },
  onClear: () => {
    // no action
  },
  onReset: () => {
    // no action
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onSubmit: (event?: BaseSyntheticEvent) => {
    // no action
  },
  refsList: [],
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
