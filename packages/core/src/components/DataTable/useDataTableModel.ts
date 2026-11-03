import { useMemo, useRef } from 'react';
import {
  columnOrderingFeature,
  columnVisibilityFeature,
  createSortedRowModel,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type RowData,
} from '@tanstack/react-table';
import { DataTableColumn, DataTableColumnState, DataTableSort } from './types';
import { getColumnsSignature } from './utils';

// Module scope: TanStack rebuilds its models whenever this object changes.
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  columnOrderingFeature,
  columnVisibilityFeature,
});

interface UseDataTableModelOptions<Row> {
  data: Row[];
  columns: DataTableColumn<Row>[];
  getRowId?: (row: Row, index: number) => string;
  columnState: DataTableColumnState;
  sort: DataTableSort | null;
}

/** A visible row, in display order, with what rendering needs. */
export interface DataTableModelRow<Row> {
  id: string;
  original: Row;
}

/**
 * Turns the public props into rows and columns in display order. The only
 * place TanStack Table is used, so it never reaches the public API.
 */
export const useDataTableModel = <Row>({
  data,
  columns,
  getRowId,
  columnState,
  sort,
}: UseDataTableModelOptions<Row>) => {
  // Header and cell renderers, and sort functions, are read from here, so the
  // model does not have to be rebuilt each time `columns` is recreated.
  const columnsRef = useRef(columns);
  columnsRef.current = columns;
  const getRowIdRef = useRef(getRowId);
  getRowIdRef.current = getRowId;

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
    getRowId: (row: RowData, index: number) =>
      getRowIdRef.current?.(row as Row, index) ?? String(index),
    // Rows arrive sorted unless the sorted column sorts them itself.
    manualSorting: !sortedColumn?.sortFn,
    state: {
      sorting,
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
    }));

  return { visibleColumns, rows };
};
