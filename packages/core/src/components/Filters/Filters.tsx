import { useRef, useState } from 'react';

import { TableFilters } from '@components/TableFilters';
import {
  useTableData,
  UseTableDataParameters,
  UseTableDataResult,
} from '@components/TableFilters/hooks/useTableData';
import { TableFilterConfig } from '@components/TableFilters/types';
import Wrapper from '@components/Wrapper';

import { FilterBlockWrapper } from './FilterBlockWrapper';
import { FiltersBlock } from './FiltersBlock';
import { FiltersContextProvider } from './FiltersContext';
import { FiltersWrapper } from './FiltersWrapper';
import { useVisibility } from './hooks/useVisibility';

export const Filters = ({
  checkboxData: initialState = {} as TableFilterConfig,
  updatedCheckboxData,
  handleSubmit,
  handleCancel,
  handleClear,
  handleDropdownChange,
}: Pick<UseTableDataResult, 'checkboxData'> & {
  updatedCheckboxData?: TableFilterConfig;
} & Pick<
    UseTableDataParameters,
    'handleSubmit' | 'handleCancel' | 'handleClear' | 'handleDropdownChange'
  >) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hiddenCheckboxData, setHiddenCheckboxData] =
    useState<TableFilterConfig>({});

  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);

  const useTableDataResult = useTableData({
    initialState,
    updatedCheckboxData,
    wrapperRef,
    handleSubmit,
    handleCancel,
    handleClear,
    handleDropdownChange,
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

  const handleMoreButtonVisibleChange = (isVisible: boolean) => {
    setIsMoreButtonVisible(isVisible);
  };

  useVisibility({
    checkboxData,
    refsList,
    wrapperRef,
    onVisibilityProcessed: handleVisibilityProcessed,
  });

  return (
    <FiltersWrapper ref={wrapperRef} isMoreButtonVisible={isMoreButtonVisible}>
      <FiltersContextProvider {...useTableDataResult}>
        <FilterBlockWrapper>
          <FiltersBlock />
        </FilterBlockWrapper>
        <Wrapper css={{ width: 110, zIndex: 1 }}>
          <TableFilters
            {...useTableDataResult}
            checkboxData={hiddenCheckboxData}
            handleMoreButtonVisibleChange={handleMoreButtonVisibleChange}
          />
        </Wrapper>
      </FiltersContextProvider>
    </FiltersWrapper>
  );
};
