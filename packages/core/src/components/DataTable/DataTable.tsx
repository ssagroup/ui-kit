import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import Icon from '@components/Icon';
import Table from '@components/Table';
import TableBody from '@components/TableBody';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import TableContainer from '@components/TableContainer';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import { getHeaderCells } from '@components/Table/utils';
import { DataTableColumnState, DataTableProps, DataTableSort } from './types';
import { useDataTableModel } from './useDataTableModel';
import {
  EMPTY_COLUMN_STATE,
  getNextSort,
  isInteractiveTarget,
  toColumnState,
} from './utils';
import * as S from './styles';

/**
 * DataTable - A table driven by data: give it rows and column definitions
 * and it renders, sorts and lays out the columns itself.
 *
 * Use it for interactive data tables. For a static table whose markup you
 * want to write by hand, use `Table` and its row and cell components, which
 * this is built from.
 *
 * ### Sorting
 *
 * Mark a column `sortable` and clicking its header reports a new sort through
 * `onSortChange`: ascending first, then toggling. By default the table only
 * reports it, expecting the server to send the rows back sorted, and passes
 * the column's `sortKey` along for the request. Give the column a `sortFn` to
 * sort the rows in the browser instead.
 *
 * ### Column layout
 *
 * Widths, frozen columns, order and hidden columns live in one
 * `DataTableColumnState`, keyed by column id. Read it from
 * `onColumnStateChange`, store it, and pass it back through
 * `defaultColumnState` to remember a user's layout.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * const columns: DataTableColumn<Employee>[] = [
 *   { id: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
 *   { id: 'role', header: 'Role', cell: (row) => row.role },
 * ];
 *
 * <DataTable
 *   data={employees}
 *   columns={columns}
 *   getRowId={(row) => row.id}
 *   sort={sort}
 *   onSortChange={(next, sortKey) => {
 *     setSort(next);
 *     refetch({ sortBy: sortKey, descending: next?.direction === 'desc' });
 *   }}
 *   isLoading={isFetching}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Resizable, freezable columns whose layout is remembered
 * <DataTable
 *   data={rows}
 *   columns={columns}
 *   resizableColumns
 *   freezeControls
 *   defaultColumnState={loadLayout()}
 *   onColumnStateChange={saveLayout}
 * />
 * ```
 *
 * @see {@link Table} - the building blocks, for hand-written tables
 */
const DataTable = <Row,>(props: DataTableProps<Row>) => {
  const {
    data,
    columns,
    getRowId,
    columnState,
    defaultColumnState,
    onColumnStateChange,
    resizableColumns = false,
    columnResizeMode = 'fit',
    minColumnWidth,
    maxColumnWidth,
    freezeControls = false,
    stickyHeader = false,
    maxHeight,
    sort,
    defaultSort = null,
    onSortChange,
    isLoading = false,
    loadingState = 'Loading…',
    emptyState = 'No results',
    onRowClick,
    footer,
    className,
    ref,
  } = props;

  // Controlled by the prop's presence, like Table.
  const [currentState = EMPTY_COLUMN_STATE, setColumnState] =
    useControllableState<DataTableColumnState>({
      controlled: 'columnState' in props,
      value: columnState && toColumnState(columnState),
      defaultValue: toColumnState(defaultColumnState),
      onChange: onColumnStateChange,
    });
  const stateRef = useRef(currentState);
  stateRef.current = currentState;
  const updateColumnState = (patch: Partial<DataTableColumnState>) =>
    setColumnState({ ...stateRef.current, ...patch });

  // Controlled by the prop's presence too, so `sort={null}` still means
  // "the caller owns the sort, and there is none".
  const [currentSort = null, setSort] =
    useControllableState<DataTableSort | null>({
      controlled: 'sort' in props,
      value: sort,
      defaultValue: defaultSort,
      finalValue: null,
    });

  const { visibleColumns, rows } = useDataTableModel({
    data,
    columns,
    getRowId,
    columnState: currentState,
    sort: currentSort,
  });

  // Widths the table measured itself. Kept apart from the column state: they
  // are not the user's choice, so they are neither reported nor stored.
  const [measuredWidths, setMeasuredWidths] = useState<Record<string, number>>(
    {},
  );
  const widthOf = (id: string) =>
    currentState.widths[id] ??
    visibleColumns.find((column) => column.id === id)?.width ??
    measuredWidths[id];
  const knownWidths = visibleColumns.map(({ id }) => widthOf(id));
  // Until every column has a width the table stays in automatic layout, so
  // the missing ones can be measured at their natural size.
  const columnWidths = knownWidths.every((width) => width !== undefined)
    ? (knownWidths as number[])
    : [];

  const tableRef = useRef<HTMLTableElement | null>(null);
  const setTableRef = useCallback(
    (node: HTMLTableElement | null) => {
      tableRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  useLayoutEffect(() => {
    if (!resizableColumns || columnWidths.length) return;
    const measured: Record<string, number> = {};
    for (const cell of getHeaderCells(tableRef.current)) {
      const id = cell.dataset.columnId;
      if (id === undefined || widthOf(id) !== undefined) continue;
      const width = cell.getBoundingClientRect().width;
      // jsdom measures everything as 0; stay in automatic layout there.
      if (!width) return;
      measured[id] = width;
    }
    if (Object.keys(measured).length) {
      setMeasuredWidths((current) => ({ ...current, ...measured }));
    }
  });

  const handleColumnWidthsChange = (widths: number[]) => {
    const next = { ...stateRef.current.widths };
    visibleColumns.forEach(({ id }, index) => {
      if (widths[index] !== undefined) next[id] = widths[index];
    });
    updateColumnState({ widths: next });
  };

  const handleSortClick = (columnId: string) => {
    const column = columns.find(({ id }) => id === columnId);
    if (!column) return;
    const next = getNextSort(currentSort, columnId);
    setSort(next);
    onSortChange?.(next, column.sortKey ?? column.id);
  };

  const columnCount = Math.max(visibleColumns.length, 1);

  return (
    <div css={S.root} className={className}>
      <TableContainer maxHeight={maxHeight}>
        <Table
          ref={setTableRef}
          aria-busy={isLoading || undefined}
          resizableColumns={resizableColumns}
          columnResizeMode={columnResizeMode}
          columnWidths={columnWidths}
          onColumnWidthsChange={handleColumnWidthsChange}
          minColumnWidth={minColumnWidth}
          maxColumnWidth={maxColumnWidth}
          frozenColumns={currentState.frozen}
          onFrozenColumnsChange={(frozen) =>
            updateColumnState({
              frozen: {
                start: frozen.start.map(String),
                end: frozen.end.map(String),
              },
            })
          }
          freezeControls={freezeControls}
          stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => {
                const direction =
                  currentSort?.columnId === column.id
                    ? currentSort.direction
                    : undefined;
                return (
                  <TableCellHeader
                    key={column.id}
                    columnId={column.id}
                    align={column.align}
                    resizable={column.resizable !== false}
                    freezable={column.freezable !== false}
                    aria-sort={
                      direction === 'asc'
                        ? 'ascending'
                        : direction === 'desc'
                          ? 'descending'
                          : column.sortable
                            ? 'none'
                            : undefined
                    }
                    // Without resizing there is no colgroup, so a declared
                    // width goes on the header cell instead.
                    style={
                      !resizableColumns && column.width !== undefined
                        ? { width: column.width }
                        : undefined
                    }>
                    {column.sortable ? (
                      <button
                        type="button"
                        css={S.sortButton}
                        onClick={() => handleSortClick(column.id)}>
                        <span css={S.headerLabel}>{column.header}</span>
                        {direction && (
                          <Icon
                            name={
                              direction === 'asc' ? 'arrow-up' : 'arrow-down'
                            }
                            size={10}
                            data-testid="data-table-sort-icon"
                          />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </TableCellHeader>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody css={isLoading && rows.length ? S.busyBody : undefined}>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnCount} css={S.stateCell}>
                  <div role="status">
                    {isLoading ? loadingState : emptyState}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  css={onRowClick ? S.clickableRow : undefined}
                  // Reachable by keyboard too: Enter on the focused row opens
                  // it, like following a link.
                  tabIndex={onRowClick ? 0 : undefined}
                  onClick={
                    onRowClick
                      ? (event) => {
                          if (
                            isInteractiveTarget(
                              event.target,
                              event.currentTarget,
                            )
                          ) {
                            return;
                          }
                          onRowClick(row.original, event);
                        }
                      : undefined
                  }
                  onKeyDown={
                    onRowClick
                      ? (event) => {
                          // Only the row itself: Enter on a control inside
                          // it belongs to that control.
                          if (
                            event.key !== 'Enter' ||
                            event.target !== event.currentTarget
                          ) {
                            return;
                          }
                          event.preventDefault();
                          onRowClick(row.original, event);
                        }
                      : undefined
                  }>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.cell(row.original, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {footer}
    </div>
  );
};

export default DataTable;
