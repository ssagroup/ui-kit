import { useState, Fragment } from 'react';

import { usePaginationRange } from '@ssa-ui-kit/hooks';

import { ArrowButton } from './ArrowButton';
import { PaginationButtons } from './PaginationButtons';

import { IPaginationProps } from './types';

/**
 * Props: onPageChange or context?
 * */
const Pagination = ({ pagesCount, selectedPage }: IPaginationProps) => {
  const [page, setPage] = useState(selectedPage);
  const range = usePaginationRange({ pagesCount, selectedPage: page });

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Pagination;
