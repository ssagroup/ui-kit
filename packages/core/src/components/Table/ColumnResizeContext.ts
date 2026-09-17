import { createContext, useContext } from 'react';
import { ColumnResizeApi } from './types';

/**
 * Null outside a resizable `Table` — deliberately not a "safe" context.
 * `TableCellHeader` reads it on every render to decide whether it owes the
 * table a drag handle, and the answer is usually no.
 */
export const ColumnResizeContext = createContext<ColumnResizeApi | null>(null);

/**
 * The enclosing table's resize API, or `null` when there isn't one.
 *
 * Lets a custom header cell decide whether it owes the table a drag handle,
 * without knowing how its table was configured.
 *
 * @example
 * ```tsx
 * const MyHeaderCell = ({ children }) => {
 *   const columnResize = useColumnResizeContext();
 *
 *   return (
 *     <TableCell as="th">
 *       {children}
 *       {columnResize && <ColumnResizeHandle />}
 *     </TableCell>
 *   );
 * };
 * ```
 *
 * @see {@link useColumnResize} - creates the API this reads
 */
export const useColumnResizeContext = () => useContext(ColumnResizeContext);
