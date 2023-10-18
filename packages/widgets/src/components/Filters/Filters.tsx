import { Wrapper } from '@ssa-ui-kit/core';
import { TableFilters } from '@components/TableFilters';
import { TableFilterConfig } from '@components/TableFilters/types';
import { useRef, useState } from 'react';
import {
  UseTableDataParameters,
  UseTableDataResult,
  useTableData,
} from '@components/TableFilters/hooks/useTableData';
import { FiltersContextProvider } from './FiltersContext';
import { FiltersBlock } from './FiltersBlock';
import { FilterBlockWrapper } from './FilterBlockWrapper';
import { FiltersWrapper } from './FiltersWrapper';
import { useVisibility } from './hooks/useVisibility';

export const Filters = ({
  checkboxData: initialState = {} as TableFilterConfig,
  handleSubmit,
  handleCancel,
  handleClear,
}: Pick<UseTableDataResult, 'checkboxData'> &
  Pick<
    UseTableDataParameters,
    'handleSubmit' | 'handleCancel' | 'handleClear'
  >) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hiddenCheckboxData, setHiddenCheckboxData] =
    useState<TableFilterConfig>({});

  const useTableDataResult = useTableData({
    initialState,
    wrapperRef,
    handleSubmit,
    handleCancel,
    handleClear,
  });

  const { checkboxData, refsList } = useTableDataResult;

  const handleVisibilityProcessed = () => {
    const newHiddenCheckboxData: TableFilterConfig = {};
    const groupNames = Object.keys(checkboxData);
    refsList.forEach((currentRef, index) => {
      const groupName = groupNames[index];
      const isNotVisible = currentRef.current?.style.visibility === 'hidden';
      if (isNotVisible) {
        newHiddenCheckboxData[groupName] = checkboxData[groupName];
      }
    });
    setHiddenCheckboxData(newHiddenCheckboxData);
  };

  useVisibility({
    checkboxData,
    refsList,
    wrapperRef,
    onVisibilityProcessed: handleVisibilityProcessed,
  });

  return (
    <FiltersWrapper ref={wrapperRef}>
      <FiltersContextProvider {...useTableDataResult}>
        <FilterBlockWrapper>
          <FiltersBlock />
        </FilterBlockWrapper>
        <Wrapper css={{ width: 110 }}>
          <TableFilters
            {...useTableDataResult}
            checkboxData={hiddenCheckboxData}
          />
        </Wrapper>
      </FiltersContextProvider>
    </FiltersWrapper>
  );
};
