import { createContext, useState } from 'react';
import { DEFAULT_SORT } from '@trading/pages/BotsPage/components/BotsTable/consts';
import { SortInfo } from '@trading/pages/BotsPage/components/BotsTable/types';
import { TableContextContent } from './types';

export const TableContext = createContext<TableContextContent>({
  sortColumn: undefined,
  sortOrder: undefined,
  defaultSort: DEFAULT_SORT,
  setSortColumn() {
    /* no-op */
  },
  setSortOrder() {
    /* no-op */
  },
  setDefaultSort() {
    /* no-op */
  },
});

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [sortColumn, setSortColumn] =
    useState<TableContextContent['sortColumn']>();

  const [sortOrder, setSortOrder] =
    useState<TableContextContent['sortOrder']>();

  const [defaultSort, setDefaultSort] =
    useState<SortInfo<string>>(DEFAULT_SORT);

  return (
    <TableContext.Provider
      value={{
        sortColumn,
        sortOrder,
        defaultSort,
        setSortColumn,
        setSortOrder,
        setDefaultSort,
      }}>
      {children}
    </TableContext.Provider>
  );
};
