import { createContext } from 'react';

import { TableRowContextContent } from './types';

export const TableRowContext = createContext<TableRowContextContent>({
  row: {},
});

export const TableRowProvider = ({
  children,
  row,
}: {
  children: React.ReactNode;
  row: TableRowContextContent['row'];
}) => {
  return (
    <TableRowContext.Provider
      value={{
        row,
      }}>
      {children}
    </TableRowContext.Provider>
  );
};
