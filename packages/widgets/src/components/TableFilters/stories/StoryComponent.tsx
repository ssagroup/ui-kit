import { mockData } from './mockData';
import { useTableData } from '../hooks/useTableData';
import { FiltersContextProvider } from '@components/Filters/FiltersContext';
import { TableFiltersWrapper } from './TableFiltersWrapper';
import { useRef } from 'react';
import { Wrapper } from '@ssa-ui-kit/core';

export const StoryComponent = () => {
  const handleSubmit = (submitData: Record<string, string[]>) => {
    console.log('>>>onSubmit', submitData);
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
