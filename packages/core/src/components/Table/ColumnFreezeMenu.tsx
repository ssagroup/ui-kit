import { useLayoutEffect, useRef, useState } from 'react';
import { ColumnFreezeMenuProps, ColumnId, FrozenColumns } from './types';
import { useColumnFreezeContext } from './ColumnFreezeContext';
import { ColumnMenu, ColumnMenuAnchor } from './ColumnMenu';
import { getColumnIdOf } from './utils';

const without = (ids: ColumnId[], id: ColumnId) =>
  ids.filter((other) => String(other) !== String(id));

/** Which edge a column is frozen to, if any. */
export const getFrozenEdge = (
  { start, end }: Required<FrozenColumns>,
  id: ColumnId,
): 'start' | 'end' | null => {
  const key = String(id);
  if (start.some((other) => String(other) === key)) return 'start';
  if (end.some((other) => String(other) === key)) return 'end';
  return null;
};

/**
 * The freeze actions for one column's header menu, each with the frozen
 * columns it leads to. Shared by `ColumnFreezeMenu` and `DataTable`.
 */
export const getFreezeMenuItems = (
  frozen: Required<FrozenColumns>,
  id: ColumnId,
) => {
  const rest = {
    start: without(frozen.start, id),
    end: without(frozen.end, id),
  };
  const items: { label: string; next: Required<FrozenColumns> }[] =
    getFrozenEdge(frozen, id)
      ? [{ label: 'Unfreeze column', next: rest }]
      : [
          {
            label: 'Freeze to the left',
            next: { start: [...rest.start, id], end: rest.end },
          },
          {
            label: 'Freeze to the right',
            next: { start: rest.start, end: [...rest.end, id] },
          },
        ];
  if (rest.start.length + rest.end.length > 0) {
    items.push({ label: 'Unfreeze all', next: { start: [], end: [] } });
  }
  return items;
};

/**
 * ColumnFreezeMenu - The freeze/unfreeze menu in a table header cell
 *
 * `TableCellHeader` renders it for you when its `Table` has `freezeControls`.
 * Render it yourself only in a custom header cell, passing the column's id;
 * without one it falls back to the `columnId` or position of the `th` it
 * sits in.
 *
 * Any column can be frozen to either edge. It stays where it is until
 * scrolling would take it out of view, then sticks to that edge while the
 * columns between slide underneath.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <TableCell as="th" data-column-id="email">
 *   Email
 *   <ColumnFreezeMenu columnId="email" />
 * </TableCell>
 * ```
 *
 * @see {@link Table} - `freezeControls` and `frozenColumns`
 * @see {@link useColumnFreezeContext} - whether the table wants the menu
 *
 * @accessibility
 * - The trigger is a labelled button, reachable by keyboard even while hidden
 * - Opening moves focus into the menu (`role="menu"`): arrows, Home, End and
 *   type-to-find move the highlight, Enter or Space picks, Escape closes
 * - Clicks inside the menu do not reach the header cell, so they never sort
 */
export const ColumnFreezeMenu = ({ columnId }: ColumnFreezeMenuProps) => {
  const columnFreeze = useColumnFreezeContext();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [cellId, setCellId] = useState<ColumnId | null>(null);

  // Without an explicit id, the column is only known once the cell is in a row.
  useLayoutEffect(() => {
    if (columnId !== undefined) return;
    const cell = anchorRef.current?.closest('th, td') as
      | HTMLTableCellElement
      | null
      | undefined;
    if (!cell) return;
    const next = getColumnIdOf(cell);
    if (next !== cellId) setCellId(next);
  });

  const id = columnId ?? cellId;
  if (!columnFreeze || id === null) {
    return <ColumnMenuAnchor ref={anchorRef} />;
  }

  const { frozenColumns, setFrozenColumns } = columnFreeze;
  return (
    <ColumnMenu
      ref={anchorRef}
      label="Freeze column"
      triggerLabel="Freeze column options"
      frozen={getFrozenEdge(frozenColumns, id) !== null}
      items={getFreezeMenuItems(frozenColumns, id).map(({ label, next }) => ({
        label,
        onSelect: () => setFrozenColumns(next),
      }))}
    />
  );
};

export default ColumnFreezeMenu;
