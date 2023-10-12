import { FiltersNames } from '@components/TableFilters/types';
import { DropdownOption, IDropdownOption } from '@ssa-ui-kit/core';
import React, { useEffect, useState } from 'react';
import { useFiltersContext } from './FiltersContext';
import { MultipleDropdownWithObserver } from './MultipleDropdownWithObserver';

export const FiltersBlock = () => {
  const {
    setElementRef,
    handleCheckboxToggleByGroup,
    processVisibility,
    wrapperRef,
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

  const handleIntersection = ({
    wrapperRef,
    elementRef,
  }: {
    wrapperRef?: React.MutableRefObject<HTMLElement | null>;
    elementRef: React.MutableRefObject<HTMLElement | null>;
  }) => {
    const elementOffsetLeft = elementRef.current?.offsetLeft;
    const wrapperOffsetLeft = wrapperRef?.current?.offsetLeft;
    const isIntersected = Number(elementOffsetLeft) < Number(wrapperOffsetLeft);
    console.log('>>>HANDLING intersection', isIntersected, {
      elementRef,
      wrapperRef,
      elementOffsetLeft,
      wrapperOffsetLeft,
      isIntersected,
    });
    if (isIntersected) {
      processVisibility();
    }
  };

  return (
    <>
      {Object.keys(checkboxData).map((groupName) => {
        const accordionInfo = checkboxData[groupName as FiltersNames];
        const selectedItems = selectedItemsWithValue[groupName];
        return (
          <MultipleDropdownWithObserver
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
            }}
            wrapperRef={wrapperRef}
            onIntersection={handleIntersection}>
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
          </MultipleDropdownWithObserver>
        );
      })}
    </>
  );
};
