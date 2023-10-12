import { pathOr, propOr } from '@ssa-ui-kit/utils';
import { useState, BaseSyntheticEvent, useEffect } from 'react';
import { TableFilterConfig } from '../types';
import { useVisibility } from '@components/Filters/hooks/useVisibility';

export interface UseTableDataParameters {
  initialState?: TableFilterConfig;
  wrapperRef?: React.RefObject<HTMLElement>;
  handleCancel?: () => void;
  handleClear?: () => void;
  handleSubmit?: (data: Record<string, string[]>) => void;
}

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
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);
  const [selectedItemsByGroup, setSelectedItemsByGroup] = useState<
    Record<string, string[]>
  >({});

  const useVisibilityResult = useVisibility(checkboxData, wrapperRef);

  const addSelectedItemsDraft = () => {
    if (initialState) {
      const data = JSON.parse(JSON.stringify(initialState));
      const selectedItemsByGroupDraft: Record<string, string[]> = {};
      Object.keys(initialState).forEach((groupName) => {
        const groupInfo = propOr({}, groupName)(initialState);
        const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
        data[groupName]['selectedItemsDraft'] = groupInfoSelectedItems;
        selectedItemsByGroupDraft[groupInfo.id] = groupInfoSelectedItems;
      });
      setSelectedItemsByGroup(selectedItemsByGroupDraft);
      setCheckboxData(data);
    }
  };

  useEffect(() => {
    addSelectedItemsDraft();
  }, []);

  useEffect(() => {
    const selectedItemsByGroupDraft: Record<string, string[]> = {};
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      selectedItemsByGroupDraft[groupInfo.id] = groupInfoSelectedItems;
    });
    setSelectedItemsByGroup(selectedItemsByGroupDraft);
  }, [checkboxData]);

  useEffect(() => {
    const length = Object.keys(selectedItemsByGroup)
      .map((groupName) => {
        return selectedItemsByGroup[groupName].length;
      })
      .filter((length) => length > 0).length;
    setSelectedGroupsCount(length);
  }, [selectedItemsByGroup]);

  const handleCheckboxToggle = (groupName: string, name: string) => () => {
    const currentState = propOr<Record<string, any>, string[]>(
      [],
      groupName,
    )(selectedItemsByGroup);
    const newState = currentState.includes(name)
      ? currentState.filter((stateName: string) => stateName !== name)
      : [...currentState, name];
    setSelectedItemsByGroup({
      ...selectedItemsByGroup,
      [groupName]: newState,
    });
  };

  const handleCheckboxToggleByGroup = (
    groupName: string,
    newState: string[],
  ) => {
    setSelectedItemsByGroup({
      ...selectedItemsByGroup,
      [groupName]: newState,
    });
  };

  const onSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const data = JSON.parse(JSON.stringify(checkboxData));
    Object.keys(checkboxData).forEach((groupName) => {
      data[groupName]['selectedItems'] = selectedItemsByGroup[groupName];
    });
    setCheckboxData(data);

    handleSubmit?.(selectedItemsByGroup);
  };

  const onReset = () => {
    const selectedItemsByGroupDraft: Record<string, string[]> = {};
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      selectedItemsByGroupDraft[groupInfo.id] = groupInfoSelectedItems;
    });
    setSelectedItemsByGroup(selectedItemsByGroupDraft);
    handleCancel?.();
  };

  const onClear = () => {
    const selectedItemsByGroupDraft: Record<string, string[]> = {};
    Object.keys(checkboxData).forEach((groupName) => {
      selectedItemsByGroupDraft[groupName] = [];
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      for (const itemName of groupInfoSelectedItems) {
        const isDisabled = pathOr(false, [
          groupName,
          'items',
          itemName,
          'isDisabled',
        ])(checkboxData);
        if (isDisabled) {
          selectedItemsByGroupDraft[groupName].push(itemName);
        }
      }
    });
    setSelectedItemsByGroup(selectedItemsByGroupDraft);
    handleClear?.();
  };

  return {
    checkboxData,
    selectedItemsByGroup,
    selectedGroupsCount,
    wrapperRef,
    ...useVisibilityResult,
    handleCheckboxToggle,
    handleCheckboxToggleByGroup,
    onSubmit,
    onReset,
    onClear,
  };
};

export type UseTableDataResult = ReturnType<typeof useTableData>;
