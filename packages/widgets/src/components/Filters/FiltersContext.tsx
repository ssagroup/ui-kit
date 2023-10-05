import {
  UseTableDataResult,
  useTableData,
} from '@components/TableFilters/hooks/useTableData';
import { TableFiltersView } from '@components/TableFilters/types';
import { createContext, useContext } from 'react';

export const FiltersContext = createContext<UseTableDataResult>(
  {} as UseTableDataResult,
);

export const useFiltersContext = () => useContext(FiltersContext);

export const FiltersContextProvider = ({
  children,
  initialState,
  handleCancel,
  handleSubmit,
  handleClear,
}: {
  children: React.ReactNode;
} & TableFiltersView) => {
  const {
    checkboxData,
    selectedItemsByGroup,
    selectedGroupsCount,
    setCheckboxData,
    handleCheckboxToggle,
    handleCheckboxToggleByGroup,
    onClear,
    onReset,
    onSubmit,
  } = useTableData({
    handleCancel,
    handleSubmit,
    handleClear,
    initialState,
  });

  return (
    <FiltersContext.Provider
      value={{
        checkboxData,
        selectedItemsByGroup,
        selectedGroupsCount,
        setCheckboxData,
        handleCheckboxToggle,
        handleCheckboxToggleByGroup,
        onClear,
        onReset,
        onSubmit,
      }}>
      {children}
    </FiltersContext.Provider>
  );
};
