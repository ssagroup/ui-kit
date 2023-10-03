import { DropdownOption, MultipleDropdown, Wrapper } from '@ssa-ui-kit/core';
import { useRefs, useWindowSize } from '@ssa-ui-kit/hooks';
import { propOr } from '@ssa-ui-kit/utils';
import { TableFilters } from '@components/TableFilters';
import {
  mockData,
  mockInitialState,
} from '@components/TableFilters/stories/mockData';
import { CheckboxData, TableFiltersView } from '@components/TableFilters/types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTableData } from '@components/TableFilters/hooks/useTableData';

export const Filters = ({
  initialState = {} as CheckboxData,
  data,
}: Pick<TableFiltersView, 'initialState' | 'data'>) => {
  const onSubmit = (checkboxData: CheckboxData) => {
    console.log('>>>onSubmit', checkboxData);
  };

  const { refsByKey, setRef } = useRefs();

  const { selectedItemsByGroup } = useTableData({
    data,
    initialState,
  });

  useEffect(() => {
    const refs = Object.values(refsByKey).filter(Boolean);
    console.log('>>>Refs', {
      refs,
      refsByKey,
      selectedItemsByGroup,
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
        {data.map((accordionInfo) => (
          <MultipleDropdown
            key={accordionInfo.id}
            showPlaceholder={false}
            label={accordionInfo.title}
            isDisabled={accordionInfo.isDisabled}
            setRef={(element: HTMLDivElement) => {
              setRef(element, accordionInfo.title);
            }}
            selectedItems={propOr([], accordionInfo.id)(selectedItemsByGroup)}>
            {accordionInfo.items.map((item) => (
              <DropdownOption
                key={`${accordionInfo.id}${item.name}`}
                value={item.name}
                // isDisabled={item.isDisabled}
                // name={item.name}
              >
                {item.content.text}
              </DropdownOption>
            ))}
          </MultipleDropdown>
        ))}
      </Wrapper>
      <Wrapper css={{ width: 110 }}>
        <TableFilters
          data={mockData}
          initialState={mockInitialState}
          handleSubmit={onSubmit}
        />
      </Wrapper>
    </div>
  );
};
