import { Wrapper } from '@ssa-ui-kit/core';
import { TableFilters } from '@components/TableFilters';
import {
  TableFilterConfig,
  TableFiltersView,
} from '@components/TableFilters/types';
import { useRef } from 'react';
import {
  UseTableDataParameters,
  useTableData,
} from '@components/TableFilters/hooks/useTableData';
import { FiltersContextProvider } from './FiltersContext';
import { FiltersBlock } from './FiltersBlock';
import { FilterBlockWrapper } from './FilterBlockWrapper';
import { FiltersWrapper } from './FiltersWrapper';
import { useRefs } from '@ssa-ui-kit/hooks';

export const Filters = ({
  checkboxData: initialState = {} as TableFilterConfig,
  handleSubmit,
  handleCancel,
  handleClear,
}: Pick<TableFiltersView, 'checkboxData'> &
  Pick<
    UseTableDataParameters,
    'handleSubmit' | 'handleCancel' | 'handleClear'
  >) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { refsByKey, setRef } = useRefs();

  const useTableDataResult = useTableData({
    initialState,
    wrapperRef,
    setRef,
    handleSubmit,
    handleCancel,
    handleClear,
  });

  return (
    <FiltersWrapper ref={wrapperRef}>
      <FiltersContextProvider {...useTableDataResult}>
        <FilterBlockWrapper>
          <FiltersBlock />
        </FilterBlockWrapper>
        <Wrapper css={{ width: 110 }}>
          <TableFilters {...useTableDataResult} />
        </Wrapper>
      </FiltersContextProvider>
    </FiltersWrapper>
  );
};
