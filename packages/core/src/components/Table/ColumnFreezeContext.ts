import { createContext, useContext } from 'react';
import { ColumnFreezeApi } from './types';

/**
 * Null outside a `Table` that freezes columns or offers freeze controls, so
 * header cells in an ordinary table stay exactly as they were.
 */
export const ColumnFreezeContext = createContext<ColumnFreezeApi | null>(null);

/**
 * The enclosing table's column-freezing state, or `null` when it has none.
 *
 * Lets a custom header cell render {@link ColumnFreezeMenu} only when the
 * table asked for freeze controls.
 *
 * @example
 * ```tsx
 * const MyHeaderCell = ({ children }) => {
 *   const columnFreeze = useColumnFreezeContext();
 *
 *   return (
 *     <TableCell as="th">
 *       {children}
 *       {columnFreeze?.freezeControls && <ColumnFreezeMenu />}
 *     </TableCell>
 *   );
 * };
 * ```
 */
export const useColumnFreezeContext = () => useContext(ColumnFreezeContext);
