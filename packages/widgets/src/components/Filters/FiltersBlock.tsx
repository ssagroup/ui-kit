import { DropdownOption, MultipleDropdown } from '@ssa-ui-kit/core';
import React, { useEffect, useState } from 'react';
import { useFiltersContext } from './FiltersContext';

export const FiltersBlock = () => {
  const { setElementRef, handleCheckboxToggle, checkboxData } =
    useFiltersContext();
  const handleOnChange = (groupName: string) => (item: string | number) => {
    handleCheckboxToggle(groupName, item);
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
