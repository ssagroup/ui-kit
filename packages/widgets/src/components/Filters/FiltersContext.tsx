import { UseTableDataResult } from '@components/TableFilters/hooks/useTableData';
import { mockData } from '@components/TableFilters/stories/mockData';
import { createContext, useContext } from 'react';

export const FiltersContext = createContext<UseTableDataResult>({
  checkboxData: mockData,
  selectedItemsByGroup: {},
  handleCheckboxToggle: (groupName: string, name: string) => () => {
    // no action
  },
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
