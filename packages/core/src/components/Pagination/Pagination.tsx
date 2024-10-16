import { KeyboardEvent, useState } from 'react';
import { usePaginationRange } from '@ssa-ui-kit/hooks';
import { InputProps } from '@components/Input/types';
import Wrapper from '@components/Wrapper';
import { ArrowButton } from './ArrowButton';
import { PaginationButtons } from './PaginationButtons';
import { PaginationProps } from './types';
import { usePaginationContext } from './PaginationContext';
import { RowsPerPageDropdown } from './components';
import * as S from './styles';

const Pagination = ({
  pagesCount,
  className,
  as,
  ariaLabel,
  isDisabled,
  pageNumberPlaceholder = 'Page №',
  isPageSettingVisible = false,
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
        <Wrapper css={{ width: 'auto', marginRight: 32 }}>
          <S.PageNumberInput
            name="page-number"
            placeholder={pageNumberPlaceholder}
            onKeyUp={handlePageNumberChange}
            status={inputStatus}
            type="number"
            inputProps={{
              autoComplete: 'off',
            }}
            {...manualPageNumberProps}
          />
          <span css={{ textWrap: 'nowrap', fontSize: 14 }}>
            {page || 0} / {pagesCount}
          </span>
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
