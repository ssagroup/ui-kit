import {
  DropdownOption,
  IDropdownOption,
  MultipleDropdown,
} from '@ssa-ui-kit/core';
import React, { useEffect, useState } from 'react';
import { useFiltersContext } from './FiltersContext';

export const FiltersBlock = () => {
  const {
    setElementRef,
    handleCheckboxToggleByGroup,
    selectedItemsByGroup,
    checkboxData,
  } = useFiltersContext();
  const handleOnChange =
    (groupName: string) => (items: Array<IDropdownOption>) => {
      const newState = items
        .filter((item) => item.isSelected)
        .map((item) => item.value);
      handleCheckboxToggleByGroup(groupName, newState as any);
    };

  const [selectedItemsWithValue, setSelectedItemsWithValue] = useState<
    Record<string, Array<{ value: string }>>
  >({});

  useEffect(() => {
    const newData: Record<
      string,
      Array<{
        value: string;
      }>
    > = {};
    Object.keys(selectedItemsByGroup).map((groupName) => {
      const selectedItems = selectedItemsByGroup[groupName];
      newData[groupName] = selectedItems.map((item) => ({
        value: item,
      }));
    });
    setSelectedItemsWithValue(newData);
  }, [selectedItemsByGroup]);

  return (
    <>
      {Object.keys(checkboxData).map((groupName) => {
        const accordionInfo = checkboxData[groupName];
        const selectedItems = selectedItemsWithValue[groupName];
        return (
          <MultipleDropdown
            key={accordionInfo.id}
            showPlaceholder={false}
            label={accordionInfo.title}
            ref={(element) => {
              setElementRef(accordionInfo.id, element);
            }}
            onChange={handleOnChange(groupName)}
            selectedItems={selectedItems}
            css={{
              '& + ul': {
                minWidth: 150,
              },
            }}>
            {Object.keys(accordionInfo.items).map((itemKey) => {
              const item = accordionInfo.items[itemKey];
              return (
                <DropdownOption
                  key={`${accordionInfo.id}${item.name}`}
                  value={item.name}
                  isDisabled={item.isDisabled}>
                  {item.content.text}
                </DropdownOption>
              );
            })}
          </MultipleDropdown>
        );
      })}
    </>
  );
};
