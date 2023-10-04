import { assocPath, dissocPath, propOr } from '@ssa-ui-kit/utils';
import {
  useState,
  useLayoutEffect,
  BaseSyntheticEvent,
  useEffect,
} from 'react';
import { FiltersNames, TableFiltersView, TableFilterConfig } from '../types';
import { useTableDataState } from './useTableDataState';

// TODO: merge data with checkboxData and return in the hook response
// Merged data use in different places of the storybook
// Add disabled option to the DropdownOption? use item.isDisabled for this purpose
export const useTableData = ({
  initialState,
  handleCancel,
  handleSubmit,
  handleClear,
}: TableFiltersView) => {
  const [checkboxData, setCheckboxData] = useTableDataState();
  useEffect(() => {
    if (initialState) {
      setCheckboxData(initialState);
    }
  }, []);
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);
  const [selectedItemsByGroup, setSelectedItemsByGroup] = useState<
    Record<string, Array<{ value: string }>>
  >({});
  const selectedItemsByGroupDraft: Record<
    string,
    Array<{ value: string }>
  > = {};
  useLayoutEffect(() => {
    let counter = 0;
    let data = JSON.parse(JSON.stringify(checkboxData));
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      data = assocPath(
        [groupName, 'selectedItemsDraft'],
        groupInfoSelectedItems,
      )(data);

      let elementChecked = false;
      if (elementChecked) {
        return;
      }
      if (groupInfoSelectedItems.length > 0) {
        elementChecked = true;
        counter++;
      }
    });
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      selectedItemsByGroupDraft[groupInfo.id] = groupInfoSelectedItems;
    });
    setSelectedGroupsCount(counter);
    setSelectedItemsByGroup(selectedItemsByGroupDraft);
    if (JSON.stringify(data) !== JSON.stringify(checkboxData)) {
      console.log('>>>useTableData: setting checkbox data...', checkboxData);
      setCheckboxData(data);
    }
  }, [checkboxData]);

  const handleCheckboxChange = (path: string[]) => (newState: boolean) => {
    if (newState) {
      setCheckboxData(assocPath(path, newState));
    } else {
      setCheckboxData(dissocPath(path));
    }
  };

  const onSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    handleSubmit?.(checkboxData);
  };

  const onReset = () => {
    const result: TableFilterConfig = JSON.parse(JSON.stringify(checkboxData));
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = propOr({}, groupName)(checkboxData);
      const groupInfoSelectedItems = propOr([], 'selectedItems')(groupInfo);
      result[groupName as FiltersNames]['selectedItemsDraft'] =
        groupInfoSelectedItems;
    });
    setCheckboxData(result);
    handleCancel?.();
  };

  const onClear = () => {
    const result: TableFilterConfig = JSON.parse(JSON.stringify(checkboxData));
    Object.keys(checkboxData).forEach((groupName) => {
      const groupInfo = checkboxData[groupName as FiltersNames];
      const groupItems = groupInfo.items;
      const selectedItems: string[] = [];
      Object.keys(groupItems).map((itemKey) => {
        const itemInfo = groupItems[itemKey];
        if (itemInfo.isDisabled) {
          selectedItems.push(itemInfo.name);
        }
      });
      result[groupName as FiltersNames]['selectedItems'] = selectedItems;
    });
    setCheckboxData(result);
    handleClear?.();
  };

  return {
    selectedGroupsCount,
    selectedItemsByGroup,
    handleCheckboxChange,
    onSubmit,
    onReset,
    onClear,
  };
};
