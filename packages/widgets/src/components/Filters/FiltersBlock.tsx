import React from 'react';
import { FiltersNames } from '@components/TableFilters/types';
import {
  DropdownOption,
  IDropdownOption,
  MultipleDropdown,
} from '@ssa-ui-kit/core';
import { useWindowSize } from '@ssa-ui-kit/hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useFiltersContext } from './FiltersContext';

export const FiltersBlock = () => {
  const {
    handleCheckboxToggleByGroup,
    setRef,
    refsByKey,
    selectedItemsByGroup,
    checkboxData,
    wrapperRef,
  } = useFiltersContext();
  console.log('>>>wrapperRef', wrapperRef);
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

  const { width } = useWindowSize();

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

  useLayoutEffect(() => {
    refsByKey &&
      Object.values(refsByKey)
        .filter(Boolean)
        .map((element) => {
          if (element && wrapperRef && wrapperRef.current) {
            element.style.visibility =
              element.offsetLeft < wrapperRef.current.offsetLeft
                ? 'hidden'
                : 'visible';
          }
        });
  }, [width, selectedItemsByGroup]);

  return (
    <>
      {Object.keys(checkboxData).map((groupName) => {
        const accordionInfo = checkboxData[groupName as FiltersNames];
        const selectedItems = selectedItemsWithValue[groupName];

        return (
          <MultipleDropdown
            key={accordionInfo.id}
            showPlaceholder={false}
            label={accordionInfo.title}
            setRef={(element: HTMLDivElement) => {
              setRef?.(element, accordionInfo.title);
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
