// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import DropdownOption from '@components/DropdownOption';
import MultipleDropdown from '@components/MultipleDropdown';
import { useFiltersContext } from './FiltersContext';

export const FiltersBlock = () => {
  const { setElementRef, onDropdownChange, checkboxData } = useFiltersContext();
  const handleOnChange = (groupName: string) => (item: string | number) => {
    onDropdownChange(groupName, item);
  };

  const [selectedItemsWithValue, setSelectedItemsWithValue] = useState<
    Record<string, Array<{ value: string }>>
  >({});

  const theme = useTheme();

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
              padding: '11px 15px 9px 10px',
              '& + ul': {
                minWidth: 150,
                maxHeight: '50vh',
              },
              [theme.mediaQueries.md]: {
                padding: '0 15px 0 10px',
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
