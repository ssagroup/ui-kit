import { useRef, useState } from 'react';
import { Wrapper } from '@components';
import { TableFilters } from '@components/TableFilters';
import { TableFilterConfig } from '@components/TableFilters/types';
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
        <Wrapper css={{ width: 110 }}>
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
