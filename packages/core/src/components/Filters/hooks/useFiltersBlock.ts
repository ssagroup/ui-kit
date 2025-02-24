import { useEffect, useMemo, useState } from 'react';
import { useFiltersContext } from '../FiltersContext';

export const useFiltersBlock = () => {
  const { onDropdownChange, checkboxData } = useFiltersContext();

  const handleOnChange = (groupName: string) => (item: string | number) => {
    onDropdownChange(groupName, item);
  };

  const [selectedItemsWithValue, setSelectedItemsWithValue] = useState<
    Record<string, Array<{ value: string }>>
  >({});

  const memoSelectedItemsWithValue = useMemo(
    () => selectedItemsWithValue,
    [JSON.stringify(selectedItemsWithValue)],
  );

  useEffect(() => {
    const newData: Record<
      string,
      Array<{
        value: string;
      }>
    > = {};
    Object.keys(checkboxData).map((groupName) => {
      const selectedItems = checkboxData[groupName]['selectedItemsDraft'];
      if (selectedItems) {
        newData[groupName] = selectedItems.map((item) => ({
          value: item,
        }));
      }
    });
    setSelectedItemsWithValue(newData);
  }, [checkboxData]);

  return { selectedItemsWithValue: memoSelectedItemsWithValue, handleOnChange };
};
