import { useRef } from 'react';

import { FiltersContextProvider } from '@components/Filters/FiltersContext';
import Wrapper from '@components/Wrapper';

import { useTableData } from '../hooks/useTableData';

import { mockData } from './mockData';
import { TableFiltersWrapper } from './TableFiltersWrapper';

export const StoryComponent = () => {
  const handleSubmit = (submitData: Record<string, string[]>) => {
    console.log('>>>TableFilters onSubmit', submitData);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  const useTableDataResult = useTableData({
    initialState: mockData,
    wrapperRef,
    handleSubmit,
  });

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FiltersContextProvider {...useTableDataResult}>
        <Wrapper direction="column" ref={wrapperRef}>
          <TableFiltersWrapper />
        </Wrapper>
      </FiltersContextProvider>
    </div>
  );
};
