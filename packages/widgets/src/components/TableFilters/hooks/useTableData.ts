import { pathOr, propOr } from '@ssa-ui-kit/utils';
import { useState, BaseSyntheticEvent, useEffect } from 'react';
import { TableFiltersView, TableFilterConfig } from '../types';

// TODO: merge data with checkboxData and return in the hook response
// Merged data use in different places of the storybook
// Add disabled option to the DropdownOption? use item.isDisabled for this purpose
export const useTableData = ({
  initialState,
  handleCancel,
  handleSubmit,
  handleClear,
}: TableFiltersView) => {
  const [checkboxData, setCheckboxData] = useState<TableFilterConfig>(
    {} as TableFilterConfig,
  );
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);
  const [selectedItemsByGroup, setSelectedItemsByGroup] = useState<
    Record<string, string[]>
  >({});
  const selectedItemsByGroupDraft: Record<string, string[]> = {};

  useEffect(() => {
    if (initialState) {
      const data = JSON.parse(JSON.stringify(initialState));
      Object.keys(initialState).forEach((groupName) => {
        const groupInfo = propOr({}, groupName)(initialState);
        const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
        data[groupName]['selectedItemsDraft'] = groupInfoSelectedItems;
        selectedItemsByGroupDraft[groupInfo.id] = groupInfoSelectedItems;
      });
      setSelectedItemsByGroup(selectedItemsByGroupDraft);
      setCheckboxData(data);
    }
  }, []);

  useEffect(() => {
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      selectedItemsByGroupDraft[groupInfo.id] = groupInfoSelectedItems;
    });
    setSelectedItemsByGroup(selectedItemsByGroupDraft);
  }, [checkboxData]);

  useEffect(() => {
    console.log('>>>CHANGED: selectedItemsByGroup', selectedItemsByGroup);
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
      ? currentState.filter((stateName) => stateName !== name)
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
    console.log('>>>handleCheckboxToggleByGroup', groupName, newState);
    setSelectedItemsByGroup({
      ...selectedItemsByGroup,
      [groupName]: newState,
    });
  };

  const onSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
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
    selectedGroupsCount,
    selectedItemsByGroup,
    checkboxData,
    setCheckboxData,
    handleCheckboxToggle,
    handleCheckboxToggleByGroup,
    onSubmit,
    onReset,
    onClear,
  };
};

export type UseTableDataResult = ReturnType<typeof useTableData>;
