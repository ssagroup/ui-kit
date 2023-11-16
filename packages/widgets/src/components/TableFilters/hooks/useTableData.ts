import { useState, BaseSyntheticEvent, useEffect, createRef } from 'react';
import { assocPath, propOr } from '@ssa-ui-kit/utils';
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
  updatedCheckboxData?: TableFilterConfig;
  handleCancel?: () => void;
  handleClear?: () => void;
  handleSubmit?: (data: Record<string, string[]>) => void;
}

export const useTableData = ({
  initialState,
  wrapperRef,
  updatedCheckboxData,
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

  const proceedSettingCheckboxData = (newCheckboxData?: TableFilterConfig) => {
    console.log('>>>proceedSettingCheckboxData', newCheckboxData);
    if (newCheckboxData) {
      const data = JSON.parse(JSON.stringify(newCheckboxData));
      Object.keys(newCheckboxData).forEach((groupName) => {
        const groupInfo = propOr({}, groupName)(newCheckboxData);
        const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
        data[groupName]['selectedItemsDraft'] = groupInfoSelectedItems;
      });
      setCheckboxData(data);
    }
  };

  useEffect(() => {
    proceedSettingCheckboxData(initialState);
  }, []);

  useEffect(() => {
    proceedSettingCheckboxData(updatedCheckboxData);
  }, [updatedCheckboxData]);

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
