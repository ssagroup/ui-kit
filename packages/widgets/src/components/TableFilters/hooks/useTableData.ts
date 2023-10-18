import { assocPath, propOr } from '@ssa-ui-kit/utils';
import { useState, BaseSyntheticEvent, useEffect, createRef } from 'react';
import { TableFilterConfig } from '../types';
import {
  getCheckboxChangedItems,
  getClearData,
  getResetData,
  getSubmitData,
} from '../utils/handlers';

export interface UseTableDataParameters {
  initialState?: TableFilterConfig;
  wrapperRef?: React.RefObject<HTMLElement>;
  handleCancel?: () => void;
  handleClear?: () => void;
  handleSubmit?: (data: Record<string, string[]>) => void;
}

// TableFilters
// unit tests
//    Filters
//    TableFilters
// PlayRight tests?
//    Filters
//    TableFilters
export const useTableData = ({
  initialState,
  wrapperRef,
  handleCancel,
  handleSubmit,
  handleClear,
}: UseTableDataParameters) => {
  const [checkboxData, setCheckboxData] = useState<TableFilterConfig>(
    {} as TableFilterConfig,
  );

  const [refsList, setRefsList] = useState<
    Array<React.MutableRefObject<HTMLElement | null>>
  >([]);
  const [groupNames, setGroupNames] = useState<string[]>([]);

  const setElementRef = (groupName: string, element: HTMLElement | null) => {
    if (element !== null && !groupNames.includes(groupName)) {
      const newRef: React.MutableRefObject<HTMLElement | null> =
        createRef<HTMLElement>();
      newRef.current = element;
      setRefsList((currentList) => [...currentList, newRef]);
      setGroupNames((currentList) => [...currentList, groupName]);
    }
  };

  useEffect(() => {
    if (initialState) {
      const data = JSON.parse(JSON.stringify(initialState));
      Object.keys(initialState).forEach((groupName) => {
        const groupInfo = propOr({}, groupName)(initialState);
        const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
        data[groupName]['selectedItemsDraft'] = groupInfoSelectedItems;
      });
      setCheckboxData(data);
    }
  }, []);

  const handleCheckboxToggle = (groupName: string, name: string | number) => {
    const { items, path } = getCheckboxChangedItems(
      checkboxData,
      groupName,
      name,
    );
    setCheckboxData(assocPath(path, items));
  };

  const onSubmit = (event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const { submitCheckboxData, dataForSubmit } = getSubmitData(checkboxData);
    setCheckboxData(submitCheckboxData);
    handleSubmit?.(dataForSubmit);
  };

  const onReset = () => {
    const resetData = getResetData(checkboxData);
    setCheckboxData(resetData);
    handleCancel?.();
  };

  const onClear = () => {
    const newData = getClearData(checkboxData);
    setCheckboxData(newData);
    handleClear?.();
  };

  return {
    checkboxData,
    wrapperRef,
    refsList,
    setElementRef,
    handleCheckboxToggle,
    onSubmit,
    onReset,
    onClear,
  };
};

export type UseTableDataResult = ReturnType<typeof useTableData>;
