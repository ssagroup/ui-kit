import { useMemo, useRef } from 'react';
import {
  columnOrderingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createSortedRowModel,
  rowExpandingFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type RowData,
} from '@tanstack/react-table';
import { DataTableColumn, DataTableColumnState, DataTableSort } from './types';
import { getColumnsSignature, getOwnRowId } from './utils';

// Module scope: TanStack rebuilds its models whenever this object changes.
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  columnOrderingFeature,
  columnVisibilityFeature,
  rowExpandingFeature,
  expandedRowModel: createExpandedRowModel(),
});

interface UseDataTableModelOptions<Row> {
  data: Row[];
  columns: DataTableColumn<Row>[];
  getRowId?: (row: Row, index: number) => string;
  getSubRows?: (row: Row) => Row[] | undefined;
  /** Ids of the expanded rows, or `true` for all of them. */
  expanded: true | string[];
  columnState: DataTableColumnState;
  sort: DataTableSort | null;
}

/** A visible row, in display order, with what rendering needs. */
export interface DataTableModelRow<Row> {
  id: string;
  original: Row;
  /** 0 for a top-level row, 1 for its children, and so on. */
  depth: number;
  hasChildren: boolean;
  isExpanded: boolean;
}

/** Where a row sits in the tree, expanded or not. */
export interface DataTableTreeNode<Row> {
  original: Row;
  parentId?: string;
  childIds: string[];
}

/**
 * Turns the public props into rows and columns in display order. The only
 * place TanStack Table is used, so it never reaches the public API.
 */
export const useDataTableModel = <Row>({
  data,
  columns,
  getRowId,
  getSubRows,
  expanded,
  columnState,
  sort,
}: UseDataTableModelOptions<Row>) => {
  // Header and cell renderers, and sort functions, are read from here, so the
  // model does not have to be rebuilt each time `columns` is recreated.
  const columnsRef = useRef(columns);
  columnsRef.current = columns;
  const getRowIdRef = useRef(getRowId);
  getRowIdRef.current = getRowId;
  const getSubRowsRef = useRef(getSubRows);
  getSubRowsRef.current = getSubRows;
  const hasSubRows = !!getSubRows;
  // Stable, so TanStack does not rebuild the tree for an inline function.
  const subRowsAccessor = useMemo(
    () =>
      hasSubRows
        ? (row: RowData) => getSubRowsRef.current?.(row as Row) as RowData[]
        : undefined,
    [hasSubRows],
  );

  const signature = getColumnsSignature(columns);
  const columnDefs = useMemo(
    () =>
      columnsRef.current.map((column) => ({
        id: column.id,
        // TanStack only sorts columns that have an accessor. The value itself
        // is unused: the comparator works on whole rows.
        accessorFn: (row: Row) => row,
        enableSorting: !!column.sortFn,
        sortFn: (a: { original: Row }, b: { original: Row }) =>
          columnsRef.current
            .find(({ id }) => id === column.id)
            ?.sortFn?.(a.original, b.original) ?? 0,
      })),
    // Only the signature: renderers and comparators are read through the ref.
    [signature],
  );

  const sorting = useMemo(
    () =>
      sort ? [{ id: sort.columnId, desc: sort.direction === 'desc' }] : [],
    [sort],
  );
  const expandedState = useMemo(
    () =>
      expanded === true
        ? true
        : Object.fromEntries(expanded.map((id) => [id, true])),
    [expanded],
  );
  const columnVisibility = useMemo(
    () => Object.fromEntries(columnState.hidden.map((id) => [id, false])),
    [columnState.hidden],
  );

  const sortedColumn = sort
    ? columns.find(({ id }) => id === sort.columnId)
    : undefined;

  const table = useTable({
    features,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: columnDefs as any,
    // TanStack wants object rows; ours are, but the public generic stays
    // unconstrained so its types never leak out.
    data: data as unknown as RowData[],
    // getRowId wins, then the row's own `id`. Without either, a child is
    // keyed under its parent, so ids stay unique across the tree.
    getRowId: (row: RowData, index: number, parent?: { id: string }) =>
      getRowIdRef.current?.(row as Row, index) ??
      getOwnRowId(row) ??
      (parent ? `${parent.id}.${index}` : String(index)),
    getSubRows: subRowsAccessor,
    // The expanded state is ours; never let new data reset it.
    autoResetExpanded: false,
    // Rows arrive sorted unless the sorted column sorts them itself.
    manualSorting: !sortedColumn?.sortFn,
    state: {
      sorting,
      expanded: expandedState,
      columnOrder: columnState.order,
      columnVisibility,
    },
  });

  const byId = new Map(columns.map((column) => [column.id, column]));
  const visibleColumns = table
    .getVisibleLeafColumns()
    .flatMap((column) => byId.get(column.id) ?? []);
  const rows: DataTableModelRow<Row>[] = table
    .getRowModel()
    .rows.map((row) => ({
      id: row.id,
      original: row.original as Row,
      depth: row.depth,
      hasChildren: row.subRows.length > 0,
      isExpanded: row.subRows.length > 0 && row.getIsExpanded(),
    }));

  // Every row, shown or collapsed away, for selection to cascade through.
  const tree = new Map<string, DataTableTreeNode<Row>>(
    table.getCoreRowModel().flatRows.map((row) => [
      row.id,
      {
        original: row.original as Row,
        parentId: row.parentId,
        childIds: row.subRows.map((child) => child.id),
      },
    ]),
  );

  return { visibleColumns, rows, tree };
};
