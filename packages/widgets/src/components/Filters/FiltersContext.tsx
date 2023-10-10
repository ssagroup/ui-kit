import {
  UseTableDataResult,
  useTableData,
} from '@components/TableFilters/hooks/useTableData';
import { mockData } from '@components/TableFilters/stories/mockData';
import { createContext, useContext } from 'react';

export const FiltersContext = createContext<UseTableDataResult>({
  checkboxData: mockData,
  selectedGroupsCount: 0,
  selectedItemsByGroup: {},
  handleCheckboxToggle: (groupName: string, name: string) => () => {
    // no action
  },
} as UseTableDataResult);

export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersContextProvider = ({
  children,
  checkboxData,
  selectedItemsByGroup,
  selectedGroupsCount,
  wrapperRef,
  elementsRef,
  setElementRef,
  handleCheckboxToggle,
  handleCheckboxToggleByGroup,
  onSubmit,
  onReset,
  onClear,
}: {
  children: React.ReactNode;
} & ReturnType<typeof useTableData>) => (
  <FiltersContext.Provider
    value={{
      checkboxData,
      selectedItemsByGroup,
      selectedGroupsCount,
      wrapperRef,
      elementsRef,
      setElementRef,
      handleCheckboxToggle,
      handleCheckboxToggleByGroup,
      onClear,
      onReset,
      onSubmit,
    }}>
    {children}
  </FiltersContext.Provider>
);
