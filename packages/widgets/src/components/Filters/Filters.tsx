import {
  DropdownOption,
  IDropdownOption,
  MultipleDropdown,
  Wrapper,
} from '@ssa-ui-kit/core';
import { useRefs, useWindowSize } from '@ssa-ui-kit/hooks';
import { TableFilters } from '@components/TableFilters';
import {
  FiltersNames,
  TableFilterConfig,
  TableFiltersView,
} from '@components/TableFilters/types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTableData } from '@components/TableFilters/hooks/useTableData';

export const Filters = ({
  initialState = {} as TableFilterConfig,
}: TableFiltersView) => {
  const onSubmit = (submitData: Record<string, string[]>) => {
    console.log('>>>onSubmit', submitData);
  };

  const { refsByKey, setRef } = useRefs();
  const { checkboxData, selectedItemsByGroup, handleCheckboxToggleByGroup } =
    useTableData({
      initialState,
    });
  const [selectedItemsWithValue, setSelectedItemsWithValue] = useState<
    Record<
      string,
      Array<{
        value: string;
      }>
    >
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
    console.log('>>>Filters: selectedItemsByGroup', selectedItemsByGroup);
  }, [selectedItemsByGroup]);

  useEffect(() => {
    console.log('>>>Filters: checkboxData', checkboxData);
  }, [checkboxData]);
  // const [, setCheckboxData] = useTableDataState();
  // const {
  //   checkboxData,
  //   selectedItemsByGroup,
  //   selectedGroupsCount,
  //   handleCheckboxToggle,
  //   onClear,
  //   onReset,
  //   onSubmit,
  // } = useTableData({
  //   handleCancel,
  //   handleSubmit,
  //   handleClear,
  //   initialState,
  // });

  // useEffect(() => {
  //   setCheckboxData(initialState);
  // }, []);

  useEffect(() => {
    const refs = Object.values(refsByKey);
    console.log('>>>Refs', {
      refs,
      refsByKey,
    });
  }, [refsByKey]);

  const { width } = useWindowSize();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    Object.values(refsByKey)
      .filter(Boolean)
      .map((element) => {
        if (element && wrapperRef.current) {
          element.style.visibility =
            element.offsetLeft < wrapperRef.current.offsetLeft
              ? 'hidden'
              : 'visible';
        }
      });
  }, [width]);

  const handleOnChange =
    (groupName: string) => (items: Array<IDropdownOption>) => {
      const newState = items
        .filter((item) => item.isSelected)
        .map((item) => item.value);
      console.log('>>>handleOnChange', { groupName, items, newState });
      handleCheckboxToggleByGroup(groupName, newState as any);
    };

  return (
    <div
      css={{
        width: 300,
        display: 'flex',
        justifyContent: 'right',
        flex: 'auto',
      }}
      ref={wrapperRef}>
      <Wrapper
        css={{
          justifyContent: 'end',
          width: 690,
          '& > div': {
            minWidth: 'auto',
            marginRight: 10,
          },
        }}>
        {Object.keys(checkboxData).map((groupName) => {
          const accordionInfo = checkboxData[groupName as FiltersNames];
          const selectedItems = selectedItemsWithValue[groupName];
          // console.log('>>>Filters MultipleDropdown selected', {
          //   selectedItems,
          //   accordionInfo,
          // });
          return (
            <MultipleDropdown
              key={accordionInfo.id}
              showPlaceholder={false}
              label={accordionInfo.title}
              setRef={(element: HTMLDivElement) => {
                setRef(element, accordionInfo.title);
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
                    isDisabled={item.isDisabled}
                    // onClick={handleCheckboxToggle(groupName, item.name)}
                    // name={item.name}
                  >
                    {item.content.text}
                  </DropdownOption>
                );
              })}
            </MultipleDropdown>
          );
        })}
      </Wrapper>
      <Wrapper css={{ width: 110 }}>
        <TableFilters initialState={checkboxData} handleSubmit={onSubmit} />
      </Wrapper>
    </div>
  );
};
