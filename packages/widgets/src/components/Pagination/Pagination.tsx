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
}: IPaginationProps) => {
  const { page, setPage } = usePaginationContext();
  const range = usePaginationRange({ pagesCount, selectedPage: page });

  return (
    <Nav className={className} as={as} aria-label={ariaLabel || 'Pagination'}>
      <ArrowButton
        direction="left"
        onClick={() => {
          if (page && page > 1) {
            setPage(page - 1);
          }
        }}
        isDisabled={page === 1}
        css={{ marginRight: '12px' }}
      />
      <PaginationButtons range={range} selectedPage={page} onClick={setPage} />
      <ArrowButton
        direction="right"
        onClick={() => {
          if (page && page < pagesCount) {
            setPage(page + 1);
          }
        }}
        isDisabled={page === pagesCount}
        css={{ marginLeft: '7px' }}
      />
    </Nav>
  );
};

export default Pagination;
