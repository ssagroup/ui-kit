import { DropdownOption, MultipleDropdown, Wrapper } from '@ssa-ui-kit/core';
import { useRefs, useWindowSize } from '@ssa-ui-kit/hooks';
import { TableFilters } from '@components/TableFilters';
import {
  FiltersNames,
  TableFilterConfig,
  TableFiltersView,
} from '@components/TableFilters/types';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useTableDataState } from '@components/TableFilters/hooks/useTableDataState';
import { useTableData } from '@components/TableFilters/hooks/useTableData';
import { propOr } from '@ssa-ui-kit/utils';

export const Filters = ({
  initialState = {} as TableFilterConfig,
}: Pick<TableFiltersView, 'initialState'>) => {
  const onSubmit = (submitData: TableFilterConfig) => {
    console.log('>>>onSubmit', submitData);
  };

  const { refsByKey, setRef } = useRefs();
  const [checkboxData, setCheckboxData] = useTableDataState();
  const { selectedItemsByGroup } = useTableData({});

  useEffect(() => {
    setCheckboxData(initialState);
  }, []);

  useEffect(() => {
    const refs = Object.values(refsByKey).filter(Boolean);
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
          return (
            <MultipleDropdown
              key={accordionInfo.id}
              showPlaceholder={false}
              label={accordionInfo.title}
              setRef={(element: HTMLDivElement) => {
                setRef(element, accordionInfo.title);
              }}
              selectedItems={propOr([], accordionInfo.id)(selectedItemsByGroup)}
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
        <TableFilters handleSubmit={onSubmit} />
      </Wrapper>
    </div>
  );
};
