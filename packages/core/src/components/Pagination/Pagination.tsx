import { KeyboardEvent, useState } from 'react';

import { usePaginationRange } from '@ssa-ui-kit/hooks';

import { InputProps } from '@components/Input/types';
import Wrapper from '@components/Wrapper';

import { ArrowButton } from './ArrowButton';
import { RowsPerPageDropdown } from './components';
import { PaginationButtons } from './PaginationButtons';
import { usePaginationContext } from './PaginationContext';
import * as S from './styles';
import { PaginationProps } from './types';

const Pagination = ({
  pagesCount,
  className,
  as,
  ariaLabel,
  isDisabled,
  pageNumberPlaceholder = 'Page №',
  errorTooltip = 'The value is out of range',
  isPageSettingVisible = false,
  isPageFromCountVisible = true,
  isRowPerPageVisible = false,
  rowPerPageProps,
  manualPageNumberProps,
}: PaginationProps) => {
  const { page, setPage } = usePaginationContext();
  const range = usePaginationRange({ pagesCount, selectedPage: page });
  const [inputStatus, setInputStatus] = useState<InputProps['status']>('basic');
  const handlePageNumberChange = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      const { value: inputValue } = event.currentTarget;
      const newPageNumber = Number(inputValue);
      if (newPageNumber > 0 && newPageNumber <= pagesCount) {
        setInputStatus('basic');
        setPage(Number(inputValue));
      } else {
        setInputStatus('error');
      }
    }
  };

  return (
    <S.PaginationNav
      className={className}
      as={as}
      aria-label={ariaLabel || 'Pagination'}>
      {isRowPerPageVisible && <RowsPerPageDropdown {...rowPerPageProps} />}
      {isPageSettingVisible && (
        <Wrapper css={{ width: 'auto', marginRight: 5 }}>
          <S.PageNumberInput
            name="page-number"
            placeholder={pageNumberPlaceholder}
            onKeyUp={handlePageNumberChange}
            status={inputStatus}
            type="number"
            errorTooltip={errorTooltip}
            inputProps={{
              autoComplete: 'off',
            }}
            {...manualPageNumberProps}
          />
          {isPageFromCountVisible && (
            <span css={{ textWrap: 'nowrap', fontSize: 14, marginLeft: 16 }}>
              {page || 0} / {pagesCount}
            </span>
          )}
        </Wrapper>
      )}
      <Wrapper>
        <ArrowButton
          direction="left"
          onClick={() => {
            if (page) {
              setPage(page - 1);
            }
          }}
          isDisabled={
            isDisabled ||
            pagesCount == null ||
            pagesCount <= 1 ||
            page == null ||
            page === 1
          }
          css={{ marginRight: '12px' }}
        />
        <PaginationButtons
          range={range}
          selectedPage={page}
          onClick={setPage}
          isDisabled={isDisabled}
        />
        <ArrowButton
          direction="right"
          onClick={() => {
            if (page) {
              setPage(page + 1);
            }
          }}
          isDisabled={
            isDisabled ||
            pagesCount == null ||
            pagesCount <= 1 ||
            page == null ||
            page === pagesCount
          }
          css={{ marginLeft: '7px' }}
        />
      </Wrapper>
    </S.PaginationNav>
  );
};

export default Pagination;
