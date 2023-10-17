import { assocPath, pathOr, propOr } from '@ssa-ui-kit/utils';
import { useState, BaseSyntheticEvent, useEffect, createRef } from 'react';
import { TableFilterConfig } from '../types';

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

  const addSelectedItemsDraft = () => {
    if (initialState) {
      const data = JSON.parse(JSON.stringify(initialState));
      Object.keys(initialState).forEach((groupName) => {
        const groupInfo = propOr({}, groupName)(initialState);
        const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
        data[groupName]['selectedItemsDraft'] = groupInfoSelectedItems;
      });
      setCheckboxData(data);
    }
  };

  useEffect(() => {
    addSelectedItemsDraft();
  }, []);

  const handleCheckboxToggle = (groupName: string, name: string | number) => {
    const draftPath = [groupName, 'selectedItemsDraft'];
    const selectedItemsDraft = pathOr<TableFilterConfig, string[]>(
      [],
      draftPath,
    )(checkboxData);
    const newSelectedItems = selectedItemsDraft.includes(`${name}`)
      ? selectedItemsDraft.filter((currentItemName) => currentItemName !== name)
      : [...selectedItemsDraft, name];
    setCheckboxData(assocPath(draftPath, newSelectedItems));
  };

  const onSubmit = (event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    let newData = JSON.parse(JSON.stringify(checkboxData));
    const submitData: Record<string, string[]> = {};
    Object.keys(newData).forEach((groupName) => {
      newData = assocPath(
        [groupName, 'selectedItems'],
        newData[groupName]['selectedItemsDraft'],
      )(newData);
      submitData[groupName] = newData[groupName]['selectedItemsDraft'];
    });
    setCheckboxData(newData);
    handleSubmit?.(submitData);
  };

  const onReset = () => {
    let newData = JSON.parse(JSON.stringify(checkboxData));
    Object.keys(newData).forEach((groupName) => {
      newData = assocPath(
        [groupName, 'selectedItemsDraft'],
        newData[groupName]['selectedItems'],
      )(newData);
    });
    setCheckboxData(newData);
    handleCancel?.();
  };

  const onClear = () => {
    let newData = JSON.parse(JSON.stringify(checkboxData));
    Object.keys(checkboxData).forEach((groupName) => {
      const notChangedData: string[] = [];
      const selectedItems = checkboxData[groupName].selectedItems;
      const currentItems = checkboxData[groupName].items;
      Object.keys(checkboxData[groupName].items).forEach((itemKey) => {
        const itemInfo = currentItems[itemKey];
        if (itemInfo.isDisabled && selectedItems.includes(itemInfo.name)) {
          notChangedData.push(itemInfo.name);
        }
      });
      newData = assocPath(
        [groupName, 'selectedItemsDraft'],
        notChangedData,
      )(newData);
    });
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
