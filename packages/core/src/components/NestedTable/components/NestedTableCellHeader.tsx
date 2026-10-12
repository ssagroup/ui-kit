import ColumnResizeHandle from '@components/Table/ColumnResizeHandle';
import ColumnFreezeMenu from '@components/Table/ColumnFreezeMenu';
import { useColumnResizeContext } from '@components/Table/ColumnResizeContext';
import { useColumnFreezeContext } from '@components/Table/ColumnFreezeContext';
import { NestedTableCellBase } from './NestedTableCellBase';
import { NestedTableCellHeaderProps } from '../types';

/**
 * NestedTableCellHeader - Column header cell for a `NestedTable`.
 *
 * The nested counterpart of `TableCellHeader`: renders a `th` styled like a
 * `NestedTableCell`, and carries the column's drag handle when the table has
 * `resizableColumns` and its freeze menu when the table has `freezeControls`.
 * Outside those modes it is just a header cell, so it is safe to use in every
 * nested table.
 *
 * Use it in the header `NestedTableRow` (the one with `isHeader`). The
 * toggle column the row adds in front gets no handle or menu, and does not
 * count as a column — `0` is the first header cell you render.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <TableHead>
 *   <NestedTableRow isHeader>
 *     <NestedTableCellHeader columnId="team">Team</NestedTableCellHeader>
 *     <NestedTableCellHeader columnId="size">Headcount</NestedTableCellHeader>
 *     <NestedTableCellHeader columnId="actions" resizable={false} freezable={false} />
 *   </NestedTableRow>
 * </TableHead>
 * ```
 *
 * @see {@link NestedTable} - `resizableColumns`, `frozenColumns`, `freezeControls`
 * @see {@link TableCellHeader} - the same cell for a plain `Table`
 *
 * @accessibility
 * - Renders a semantic `th`
 * - The resize handle and freeze menu are keyboard operable
 */
export const NestedTableCellHeader = ({
  children,
  resizable = true,
  freezable = true,
  columnId,
  ...props
}: React.PropsWithChildren<NestedTableCellHeaderProps>) => {
  const columnResize = useColumnResizeContext();
  const columnFreeze = useColumnFreezeContext();

  return (
    <NestedTableCellBase
      as="th"
      // Read back by the table, exactly as for TableCellHeader.
      data-column-pinned={columnResize && !resizable ? 'true' : undefined}
      data-column-id={columnId === undefined ? undefined : String(columnId)}
      adornment={
        columnFreeze?.freezeControls &&
        freezable && <ColumnFreezeMenu columnId={columnId} />
      }
      trailing={columnResize && resizable && <ColumnResizeHandle />}
      {...props}>
      {children}
    </NestedTableCellBase>
  );
};
