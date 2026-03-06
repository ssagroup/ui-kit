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

/**
 * Pagination - Navigation controls for paginated data
 *
 * A comprehensive pagination component that provides navigation controls for
 * paginated content. Supports page navigation with arrow buttons and numbered
 * page buttons, optional manual page input, and optional rows per page selection.
 * Uses PaginationContextProvider to manage page state and navigation.
 *
 * Component structure:
 * - PaginationContextProvider (manages page state - required)
 *   - Pagination (main component)
 *     - RowsPerPageDropdown (optional)
 *     - PageNumberInput (optional)
 *     - ArrowButton (previous)
 *     - PaginationButtons (numbered pages)
 *     - ArrowButton (next)
 *
 * @category Components
 * @subcategory Navigation
 *
 * @example
 * ```tsx
 * // Basic pagination
 * <PaginationContextProvider selectedPage={1}>
 *   <Pagination pagesCount={10} />
 * </PaginationContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // With rows per page dropdown
 * <PaginationContextProvider selectedPage={1} defaultPerPage={25}>
 *   <Pagination
 *     pagesCount={20}
 *     isRowPerPageVisible={true}
 *     rowPerPageProps={{
 *       rowsPerPageText: "Items per page",
 *       rowsPerPageList: [
 *         { id: 1, value: 10 },
 *         { id: 2, value: 25 },
 *         { id: 3, value: 50 },
 *         { id: 4, value: 100 },
 *       ],
 *     }}
 *   />
 * </PaginationContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // With manual page input
 * <PaginationContextProvider selectedPage={3}>
 *   <Pagination
 *     pagesCount={15}
 *     isPageSettingVisible={true}
 *     pageNumberPlaceholder="Go to page"
 *     errorTooltip="Please enter a valid page number"
 *   />
 * </PaginationContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Disabled pagination
 * <PaginationContextProvider selectedPage={5}>
 *   <Pagination pagesCount={10} isDisabled />
 * </PaginationContextProvider>
 * ```
 *
 * @see {@link PaginationContextProvider} - Required context provider for state management
 * @see {@link RowsPerPageDropdown} - Optional component for rows per page selection
 *
 * @requires PaginationContextProvider - Must be wrapped in PaginationContextProvider
 *
 * @accessibility
 * - ARIA navigation role and labels
 * - Keyboard navigation support (Enter for page input)
 * - Arrow keys navigation (via arrow buttons)
 * - Screen reader friendly
 * - Proper focus management
 */
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
