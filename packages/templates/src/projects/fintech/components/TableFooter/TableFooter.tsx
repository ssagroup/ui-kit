import { useTheme } from '@emotion/react';
import {
  ROWS_PER_PAGE_LIST,
  RowsPerPageDropdown,
} from '@fintech/components/RowsPerPageDropdown';

import { Wrapper } from '@ssa-ui-kit/core';
import { Pagination } from '@ssa-ui-kit/core';

import { TableFooterProps } from './types';

export const TableFooter = ({
  handleRowsPerPageChange,
  pagesCount,
  selectedItem = ROWS_PER_PAGE_LIST[1].value,
}: TableFooterProps) => {
  const theme = useTheme();
  return (
    <Wrapper
      css={{
        paddingBottom: 120,
        justifyContent: 'right',
        flexDirection: 'column-reverse',
        gap: 18,
        '& > div button': {
          marginRight: 0,
        },
        [theme.mediaQueries.md]: {
          flexDirection: 'row',
          gap: 0,
          '& > div button': {
            marginRight: 37,
          },
        },
      }}>
      <RowsPerPageDropdown
        onChange={handleRowsPerPageChange}
        selectedItem={selectedItem}
      />
      <Pagination pagesCount={pagesCount} />
    </Wrapper>
  );
};
