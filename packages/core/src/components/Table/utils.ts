import { ColumnId } from './types';

/** The cells that define the column grid — the first header row, or row one. */
export const getHeaderCells = (table: HTMLTableElement | null) => {
  const row = table?.tHead?.rows[0] ?? table?.rows[0];
  return row ? Array.from(row.cells) : [];
};

/**
 * Marks a structural column the table adds on its own, such as the toggle
 * column `NestedTableRow` puts in front of every row. It has no id of its own,
 * is skipped when columns are numbered, and freezes to the start only when the
 * column right after it does.
 */
export const EXPANDER_ATTR = 'data-column-expander';

export const isExpanderCell = (cell: HTMLTableCellElement) =>
  cell.hasAttribute(EXPANDER_ATTR);

/**
 * The id each cell answers to: its `columnId`, else its position counting only
 * the columns the app itself rendered. `null` for expander cells.
 */
export const getColumnKeys = (cells: HTMLTableCellElement[]) => {
  let position = 0;
  return cells.map((cell) => {
    if (isExpanderCell(cell)) return null;
    const index = position++;
    return cell.dataset.columnId ?? String(index);
  });
};

/**
 * The id of the column a header cell belongs to: its `columnId`, else its
 * position as a number. `null` for an expander. See getColumnKeys.
 */
export const getColumnIdOf = (cell: HTMLTableCellElement): ColumnId | null => {
  if (isExpanderCell(cell)) return null;
  if (cell.dataset.columnId !== undefined) return cell.dataset.columnId;
  const row = cell.parentElement as HTMLTableRowElement | null;
  const cells = row ? Array.from(row.cells) : [cell];
  return cells.slice(0, cells.indexOf(cell)).filter((c) => !isExpanderCell(c))
    .length;
};
