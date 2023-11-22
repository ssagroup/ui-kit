import styled from '@emotion/styled';
import { usePaginationRange } from '@ssa-ui-kit/hooks';

import { ArrowButton } from './ArrowButton';
import { PaginationButtons } from './PaginationButtons';

import { IPaginationProps } from './types';
import { usePaginationContext } from './PaginationContext';

const Nav = styled.nav``;

const Pagination = ({
  pagesCount,
  className,
  as,
  ariaLabel,
  isDisabled,
}: IPaginationProps) => {
  const { page, setPage } = usePaginationContext();
  const range = usePaginationRange({ pagesCount, selectedPage: page });

  return (
    <Nav className={className} as={as} aria-label={ariaLabel || 'Pagination'}>
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
    </Nav>
  );
};

export default Pagination;
