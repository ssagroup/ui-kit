import {
  path,
  propOr,
  assocPath,
  PathValue,
  dissocPath,
} from '@ssa-ui-kit/utils';
import {
  useState,
  useLayoutEffect,
  useEffect,
  BaseSyntheticEvent,
} from 'react';
import { AccordionInfo, CheckboxData, TableFiltersView } from '../types';

// TODO: merge data with checkboxData and return in the hook response
// Merged data use in different places of the storybook
// Add disabled option to the DropdownOption? use item.isDisabled for this purpose
export const useTableData = ({
  data,
  initialState = {} as CheckboxData,
  handleCancel,
  handleSubmit,
  handleClear,
}: TableFiltersView) => {
  const [checkboxData, setCheckboxData] = useState(initialState);
  const [persistentData, setPersistentData] = useState({});
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);
  const [selectedItemsByGroup, setSelectedItemsByGroup] = useState<
    Record<string, Array<{ value: string }>>
  >({});
  const localData = Array.isArray(data) ? [...data] : [];
  const selectedItemsByGroupDraft: Record<
    string,
    Array<{ value: string }>
  > = {};
  useLayoutEffect(() => {
    let counter = 0;
    Object.keys(checkboxData).forEach((groupName) => {
      const currentItems = checkboxData[groupName];
      let elementChecked = false;
      Object.keys(currentItems).forEach((itemName) => {
        const currentValue = currentItems[itemName];
        if (elementChecked) {
          return;
        }
        if (currentValue) {
          elementChecked = true;
          counter++;
        }
      });
    });
    setSelectedGroupsCount(counter);
  }, [checkboxData]);

  useEffect(() => {
    let notChangedData = {} as CheckboxData;
    localData.forEach((groupInfo) => {
      const groupInfoData: AccordionInfo['items'] = propOr(
        [],
        'items',
      )(groupInfo);
      const selectedGroupItems: Record<string, boolean> = propOr(
        {},
        groupInfo.id,
      )(checkboxData);
      const selectedItems = Object.keys(selectedGroupItems).map(
        (elementName: string) => ({
          value: elementName,
        }),
      );
      selectedItemsByGroupDraft[groupInfo.id] = selectedItems;
      groupInfoData.forEach((itemInfo) => {
        const initialStateValue = path(itemInfo.content.statePath)(
          initialState,
        );
        if (itemInfo.isDisabled && initialStateValue !== undefined) {
          notChangedData = assocPath<CheckboxData>(
            itemInfo.content.statePath,
            initialStateValue as PathValue,
          )(notChangedData);
        }
      });
    });
    setPersistentData(notChangedData);
    setSelectedItemsByGroup(selectedItemsByGroupDraft);
  }, [data]);

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
    setCheckboxData(() => initialState);
    handleCancel?.();
  };
  const onClear = () => {
    setCheckboxData(persistentData);
    handleClear?.();
  };

  return {
    checkboxData,
    selectedGroupsCount,
    selectedItemsByGroup,
    handleCheckboxChange,
    onSubmit,
    onReset,
    onClear,
  };
};
