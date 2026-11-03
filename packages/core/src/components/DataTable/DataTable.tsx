import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';
import { useControllableState } from '@ssa-ui-kit/hooks';
import Icon from '@components/Icon';
import Table from '@components/Table';
import TableBody from '@components/TableBody';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import TableContainer from '@components/TableContainer';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import { ColumnMenu, ColumnMenuItem } from '@components/Table/ColumnMenu';
import { getFreezeMenuItems } from '@components/Table/ColumnFreezeMenu';
import { getHeaderCells } from '@components/Table/utils';
import {
  DataTableColumn,
  DataTableColumnState,
  DataTableProps,
  DataTableSort,
} from './types';
import { ExpanderCell, ExpanderHeaderCell } from './ExpanderCell';
import { SelectionCell, SelectionHeaderCell } from './SelectionCell';
import { useColumnReorder } from './useColumnReorder';
import { useDataTableModel } from './useDataTableModel';
import {
  createSelectionTree,
  EMPTY_COLUMN_STATE,
  EXPANDER_COLUMN_WIDTH,
  getAdjacentColumn,
  getFreezeZone,
  getFullOrder,
  getNextSort,
  isInteractiveTarget,
  moveColumn,
  NESTED_INDENT,
  SELECTION_COLUMN_WIDTH,
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
 * With `reorderableColumns` the user can move columns, by dragging the grip
 * in the header or from the header menu. A column only moves among columns
 * frozen to the same edge, or among the unfrozen ones.
 *
 * ### Nested rows
 *
 * `getSubRows` nests rows under rows, to any depth, with an expand button
 * per parent; `expandedRowIds` or `defaultExpanded` say which are open.
 *
 * ### Selection and hidden columns
 *
 * `selectionMode` adds a checkbox (or radio) column; the selection is a list
 * of row ids, reported through `onSelectionChange`. `hideableColumns` adds
 * "Hide column" to the header menu, and `DataTableColumnPicker` brings
 * hidden columns back.
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
    reorderableColumns = false,
    hideableColumns = false,
    stickyHeader = false,
    maxHeight,
    sort,
    defaultSort = null,
    onSortChange,
    isLoading = false,
    loadingState = 'Loading…',
    emptyState = 'No results',
    onRowClick,
    getSubRows,
    expandedRowIds,
    defaultExpanded = false,
    onExpandedChange,
    selectionMode = 'none',
    selectedRowIds,
    defaultSelectedRowIds,
    onSelectionChange,
    isRowSelectable,
    getRowLabel = (_row: Row, rowIndex: number) => `Select row ${rowIndex + 1}`,
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

  // `true` only as the uncontrolled start: every change is a list of ids.
  const [expanded = [], setExpanded] = useControllableState<true | string[]>({
    controlled: 'expandedRowIds' in props,
    value: expandedRowIds,
    defaultValue: defaultExpanded === false ? [] : defaultExpanded,
    finalValue: [],
    onChange: (next) => onExpandedChange?.(next === true ? [] : next),
  });

  const { visibleColumns, rows, tree } = useDataTableModel({
    data,
    columns,
    getRowId,
    getSubRows,
    expanded,
    columnState: currentState,
    sort: currentSort,
  });

  const hasExpander = !!getSubRows;
  const toggleExpanded = (id: string, open: boolean) => {
    const current =
      expanded === true
        ? [...tree.keys()].filter((key) => tree.get(key)!.childIds.length)
        : expanded;
    setExpanded(
      open ? [...current, id] : current.filter((other) => other !== id),
    );
  };

  // Selection, as row ids so it outlives the rows on screen: a page change
  // keeps what was selected on the page before.
  const [selectedIds = [], setSelectedIds] = useControllableState<string[]>({
    controlled: 'selectedRowIds' in props,
    value: selectedRowIds,
    defaultValue: defaultSelectedRowIds ?? [],
    finalValue: [],
    onChange: onSelectionChange,
  });
  const hasSelection = selectionMode !== 'none';
  const selectedSet = new Set(selectedIds);
  const canSelect = (row: Row) => isRowSelectable?.(row) ?? true;
  // Cascades through children in multiple mode; flat data is a tree of
  // leaves, so the same rules apply to it.
  const selection = createSelectionTree(tree, (id) => {
    const node = tree.get(id);
    return !!node && canSelect(node.original);
  });
  const allState = selection.allState(selectedSet);
  const toggleAll = () =>
    setSelectedIds(selection.toggleAll(selectedIds, allState !== 'checked'));
  const setRowSelected = (id: string, selected: boolean) => {
    if (selectionMode === 'single') {
      setSelectedIds(selected ? [id] : []);
    } else {
      setSelectedIds(selection.toggleRow(selectedIds, id, selected));
    }
  };
  const isRowSelected = (id: string) =>
    selectionMode === 'single'
      ? selectedSet.has(id)
      : selection.rowState(id, selectedSet) === 'checked';
  const radioName = useId();

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
  // The selection and expander columns lead, at their own fixed widths.
  const leadingWidths = [
    ...(hasSelection ? [SELECTION_COLUMN_WIDTH] : []),
    ...(hasExpander ? [EXPANDER_COLUMN_WIDTH] : []),
  ];
  const columnWidths = knownWidths.every((width) => width !== undefined)
    ? [...leadingWidths, ...(knownWidths as number[])]
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
    const offset = leadingWidths.length;
    visibleColumns.forEach(({ id }, index) => {
      const width = widths[index + offset];
      if (width !== undefined) next[id] = width;
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

  // Reordering. A column trades places only with visible, movable columns
  // in its own freeze zone, so frozen columns stay where they stick.
  const fullOrder = getFullOrder(columns, currentState.order);
  const isReorderable = (column?: DataTableColumn<Row>) =>
    reorderableColumns && !!column && column.reorderable !== false;
  const slotsFor = (id: string) => {
    const zone = getFreezeZone(currentState.frozen, id);
    return (other: string) =>
      isReorderable(visibleColumns.find((column) => column.id === other)) &&
      getFreezeZone(currentState.frozen, other) === zone;
  };
  const reorder = (id: string, targetId: string) => {
    const order = moveColumn(fullOrder, id, targetId, slotsFor(id));
    if (order) updateColumnState({ order });
  };
  const { drag, getGripProps } = useColumnReorder({
    tableRef,
    canDrop: (id, targetId) => slotsFor(id)(targetId),
    onDrop: reorder,
  });
  const dropSide = (id: string) =>
    drag?.overId !== id
      ? undefined
      : fullOrder.indexOf(id) > fullOrder.indexOf(drag.id)
        ? 'after'
        : 'before';

  // The nearest column each way this one can trade places with; null for
  // a column that cannot move at all.
  const movesOf = (column: DataTableColumn<Row>) =>
    isReorderable(column)
      ? {
          left: getAdjacentColumn(
            fullOrder,
            column.id,
            'left',
            slotsFor(column.id),
          ),
          right: getAdjacentColumn(
            fullOrder,
            column.id,
            'right',
            slotsFor(column.id),
          ),
        }
      : null;

  const menuItemsOf = (
    column: DataTableColumn<Row>,
    moves: ReturnType<typeof movesOf>,
  ) => {
    const items: ColumnMenuItem[] = [];
    if (moves) {
      const sides = [
        ['left', 'Move left'],
        ['right', 'Move right'],
      ] as const;
      for (const [side, label] of sides) {
        const target = moves[side];
        items.push({
          label,
          disabled: target === null,
          onSelect: () => target !== null && reorder(column.id, target),
        });
      }
    }
    if (hideableColumns && column.hideable !== false) {
      items.push({
        label: 'Hide column',
        // Something has to stay on screen.
        disabled: visibleColumns.length <= 1,
        onSelect: () =>
          updateColumnState({
            hidden: [...stateRef.current.hidden, column.id],
          }),
      });
    }
    if (freezeControls && column.freezable !== false) {
      for (const { label, next } of getFreezeMenuItems(
        currentState.frozen,
        column.id,
      )) {
        items.push({
          label,
          onSelect: () =>
            updateColumnState({
              frozen: {
                start: next.start.map(String),
                end: next.end.map(String),
              },
            }),
        });
      }
    }
    return items;
  };

  const columnCount = Math.max(
    visibleColumns.length + (hasSelection ? 1 : 0) + (hasExpander ? 1 : 0),
    1,
  );

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
              {hasSelection && (
                <SelectionHeaderCell
                  mode={selectionMode}
                  checked={allState === 'checked'}
                  indeterminate={allState === 'partial'}
                  disabled={tree.size === 0}
                  onToggle={toggleAll}
                />
              )}
              {hasExpander && <ExpanderHeaderCell />}
              {visibleColumns.map((column) => {
                const direction =
                  currentSort?.columnId === column.id
                    ? currentSort.direction
                    : undefined;
                const moves = movesOf(column);
                // Movable in principle, but alone in its freeze zone.
                const stuck = !!moves && !moves.left && !moves.right;
                const menuItems = menuItemsOf(column, moves);
                return (
                  <TableCellHeader
                    key={column.id}
                    columnId={column.id}
                    align={column.align}
                    resizable={column.resizable !== false}
                    minWidth={column.minWidth}
                    maxWidth={column.maxWidth}
                    // The menu below replaces Table's freeze-only one.
                    freezable={false}
                    css={[S.header, menuItems.length > 0 && S.headerWithMenu]}
                    data-dragging={drag?.id === column.id ? 'true' : undefined}
                    data-drop={dropSide(column.id)}
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
                    {moves && (
                      <span
                        css={S.grip}
                        aria-hidden
                        data-testid="data-table-column-grip"
                        data-disabled={stuck ? 'true' : undefined}
                        {...(stuck ? {} : getGripProps(column.id))}>
                        <Icon name="dragndrop" size={12} />
                      </span>
                    )}
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
                    {menuItems.length > 0 && (
                      <ColumnMenu
                        css={S.headerMenu}
                        label="Column"
                        triggerLabel="Column options"
                        frozen={
                          getFreezeZone(currentState.frozen, column.id) !==
                          'scroll'
                        }
                        items={menuItems}
                      />
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
                  css={[
                    onRowClick && S.clickableRow,
                    row.hasChildren && S.parentRow,
                    isRowSelected(row.id) &&
                      (row.hasChildren ? S.selectedParentRow : S.selectedRow),
                  ]}
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
                  {hasSelection && (
                    <SelectionCell
                      mode={selectionMode}
                      name={radioName}
                      rowId={row.id}
                      label={getRowLabel(row.original, rowIndex)}
                      checked={
                        selectionMode === 'single'
                          ? selectedSet.has(row.id)
                          : selection.rowState(row.id, selectedSet) ===
                            'checked'
                      }
                      indeterminate={
                        selectionMode === 'multiple' &&
                        selection.rowState(row.id, selectedSet) === 'partial'
                      }
                      disabled={
                        selectionMode === 'single'
                          ? !canSelect(row.original)
                          : !selection.isSelectable(row.id)
                      }
                      onChange={(selected) => setRowSelected(row.id, selected)}
                    />
                  )}
                  {hasExpander && (
                    <ExpanderCell
                      hasChildren={row.hasChildren}
                      isExpanded={row.isExpanded}
                      onToggle={() => toggleExpanded(row.id, !row.isExpanded)}
                    />
                  )}
                  {visibleColumns.map((column, columnIndex) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      // Nested rows step in, on the first column only.
                      style={
                        columnIndex === 0 && row.depth > 0
                          ? { paddingLeft: 16 + row.depth * NESTED_INDENT }
                          : undefined
                      }>
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
