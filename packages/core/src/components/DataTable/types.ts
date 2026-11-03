import { KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react';
import { ColumnResizeMode } from '@components/Table/types';

/** Direction of a {@link DataTableSort}. */
export type DataTableSortDirection = 'asc' | 'desc';

/**
 * How many rows of a {@link DataTable} the user can select: `multiple` adds a
 * checkbox column with a select-all checkbox, `single` a radio column.
 */
export type DataTableSelectionMode = 'none' | 'single' | 'multiple';

/**
 * The column a {@link DataTable} is sorted by. One column at a time; `null`
 * when the rows are in the order they were given.
 */
export interface DataTableSort {
  /** `id` of the sorted column. */
  columnId: string;
  direction: DataTableSortDirection;
}

/**
 * One column of a {@link DataTable}.
 *
 * @example
 * ```tsx
 * const columns: DataTableColumn<Employee>[] = [
 *   { id: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
 *   { id: 'salary', header: 'Salary', cell: (row) => fmt(row.salary), align: 'right' },
 * ];
 * ```
 */
export interface DataTableColumn<Row> {
  /**
   * Stable, unique id. Column state (order, widths, frozen, hidden) and the
   * sort refer to columns by it, so it must not change between renders.
   */
  id: string;
  /** Header cell content. */
  header: ReactNode;
  /**
   * Body cell content for a row. `rowIndex` is the row's position as shown,
   * after sorting, not its index in `data`.
   */
  cell: (row: Row, rowIndex: number) => ReactNode;
  /**
   * Text alignment of the header and body cells.
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Whether clicking the header sorts by this column.
   * @default false
   */
  sortable?: boolean;
  /**
   * The name the server knows this column by, when it differs from `id`.
   * Handed to `onSortChange` as its second argument.
   * @default id
   */
  sortKey?: string;
  /**
   * Sorts the rows in the browser while this column is the sorted one.
   * Without it, sorting only reports the new sort through `onSortChange` and
   * the rows are expected to arrive sorted, which is right for server data.
   *
   * Compare ascending; the table reverses the result for `desc`.
   *
   * @example
   * ```ts
   * sortFn: (a, b) => a.name.localeCompare(b.name)
   * ```
   */
  sortFn?: (a: Row, b: Row) => number;
  /**
   * Starting width in pixels, used until the user resizes the column or
   * `columnState.widths` says otherwise. Columns without one are measured on
   * first layout.
   */
  width?: number;
  /**
   * Narrowest the user can resize this column to, in pixels. Overrides the
   * table's `minColumnWidth`.
   */
  minWidth?: number;
  /**
   * Widest the user can resize this column to, in pixels. Overrides the
   * table's `maxColumnWidth`.
   */
  maxWidth?: number;
  /**
   * Whether the user can resize this column, in a table with
   * `resizableColumns`. Turn it off for actions or checkbox columns.
   * @default true
   */
  resizable?: boolean;
  /**
   * Whether the header offers the freeze menu, in a table with
   * `freezeControls`. The column can still be frozen through `columnState`.
   * @default true
   */
  freezable?: boolean;
  /**
   * Whether the user can move this column, in a table with
   * `reorderableColumns`. A column that cannot move keeps its place, and the
   * others move past it.
   * @default true
   */
  reorderable?: boolean;
  /**
   * Whether the user can hide this column, from its header menu in a table
   * with `hideableColumns`, or from `DataTableColumnPicker`. The column can
   * still be hidden through `columnState`.
   * @default true
   */
  hideable?: boolean;
}

/**
 * Everything about a {@link DataTable}'s columns the user can change, keyed
 * by column id, so it survives columns being added, removed or reordered.
 * Store it whole to remember a user's layout.
 */
export interface DataTableColumnState {
  /**
   * Column ids in display order. Columns missing from it follow, in the
   * order of `columns`.
   */
  order: string[];
  /** Width in pixels per column id. */
  widths: Record<string, number>;
  /** Column ids frozen to each edge. */
  frozen: { start: string[]; end: string[] };
  /** Ids of columns that are not shown. */
  hidden: string[];
}

/**
 * Props of {@link DataTable}.
 *
 * @example
 * ```tsx
 * <DataTable data={rows} columns={columns} />
 * ```
 */
export interface DataTableProps<Row> {
  /** Rows to show, in the order to show them unless a column sorts them. */
  data: Row[];
  /**
   * Column definitions. Every `id` must be unique. Need not be memoised:
   * the table only rebuilds its model when the columns' ids or sort settings
   * change, and always renders with the latest `header` and `cell`.
   */
  columns: DataTableColumn<Row>[];
  /**
   * Stable id of a row, for rows whose id is not in an `id` field, such as
   * `employeeId` or a key built from several fields. Rows are keyed by it
   * and selection and expanded state refer to it.
   *
   * Without it, a row's own `id` (string or number) is used. Rows without
   * either are keyed by position, children under their parent (`"2.0"`),
   * which remounts cells whenever the order changes.
   * @default (row) => String(row.id)
   */
  getRowId?: (row: Row, index: number) => string;

  /**
   * Column layout, for the controlled case. Partial values are filled in
   * with defaults. Hold it in state and update it from
   * `onColumnStateChange`.
   */
  columnState?: Partial<DataTableColumnState>;
  /** Starting column layout, for the uncontrolled case. */
  defaultColumnState?: Partial<DataTableColumnState>;
  /**
   * Called whenever the user changes the layout: on every frame of a resize
   * drag, when moving or hiding a column, and when freezing or unfreezing. Not called for widths the table
   * measures itself on first layout.
   */
  onColumnStateChange?: (columnState: DataTableColumnState) => void;

  /**
   * Lets the user resize columns by dragging the right edge of the header.
   * @default false
   */
  resizableColumns?: boolean;
  /**
   * How a resize spends width. `fit` keeps the table's width: the resizable
   * columns to the right share the change, in proportion to their widths.
   * `expand` grows or shrinks the table instead, so it scrolls sideways.
   * @default 'fit'
   */
  columnResizeMode?: ColumnResizeMode;
  /**
   * Narrowest a column can be resized to, in pixels. A column's own
   * `minWidth` wins.
   * @default 64
   */
  minColumnWidth?: number;
  /**
   * Widest a column can be resized to, in pixels. A column's own `maxWidth`
   * wins. Unbounded when omitted.
   */
  maxColumnWidth?: number;
  /**
   * Gives every header a menu to freeze its column to either edge.
   * @default false
   */
  freezeControls?: boolean;
  /**
   * Lets the user move columns: by dragging the grip at the left of the
   * header, or with "Move left" and "Move right" in the header menu. A column
   * moves only among columns frozen to the same edge, or among the unfrozen
   * ones. The order is kept in `columnState.order`.
   * @default false
   */
  reorderableColumns?: boolean;
  /**
   * Adds "Hide column" to the header menu. The last visible column cannot be
   * hidden. Hidden columns are kept in `columnState.hidden`; bring them back
   * with `DataTableColumnPicker`.
   * @default false
   */
  hideableColumns?: boolean;
  /**
   * Keeps the header in view while the rows scroll. Give the table a height
   * limit through `maxHeight`.
   * @default false
   */
  stickyHeader?: boolean;
  /**
   * Tallest the table gets before it scrolls vertically. Any CSS value.
   * Unbounded when omitted, so only horizontal overflow scrolls.
   */
  maxHeight?: string | number;

  /** Sorted column, for the controlled case. `null` for none. */
  sort?: DataTableSort | null;
  /** Starting sort, for the uncontrolled case. */
  defaultSort?: DataTableSort | null;
  /**
   * Called when a sortable header is clicked. A column starts ascending and
   * toggles between ascending and descending after that. The second argument
   * is the column's `sortKey` (its `id` without one), ready for a request.
   */
  onSortChange?: (sort: DataTableSort | null, sortKey: string | null) => void;

  /**
   * Marks the table busy. Rows already shown stay, dimmed, so a re-fetch
   * after sorting does not make the table jump; with no rows yet,
   * `loadingState` is shown instead.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Shown in place of the rows while loading with none to show.
   * @default 'Loading…'
   */
  loadingState?: ReactNode;
  /**
   * Shown in place of the rows when there are none.
   * @default 'No results'
   */
  emptyState?: ReactNode;
  /**
   * Called when a row is clicked, or when Enter is pressed on a focused row;
   * rows become focusable when this is set. Clicks on a button, link, input
   * or menu inside the row keep their own behaviour.
   *
   * Screen readers do not announce a row as actionable, so also give the
   * row a link or button in a cell when the action matters.
   */
  onRowClick?: (
    row: Row,
    event: MouseEvent<HTMLTableRowElement> | KeyboardEvent<HTMLTableRowElement>,
  ) => void;
  /**
   * Children of a row, shown nested under it, to any depth. Rows with
   * children get an expand button in a column at the start, and their own
   * styling; children are indented. A sorted column sorts the children of
   * each row among themselves.
   *
   * @example
   * ```ts
   * getSubRows: (team) => team.members
   * ```
   */
  getSubRows?: (row: Row) => Row[] | undefined;
  /** Ids of the expanded rows, for the controlled case. */
  expandedRowIds?: string[];
  /**
   * Which rows start expanded, for the uncontrolled case: `true` for all,
   * including rows that arrive later, or a list of ids.
   * @default false
   */
  defaultExpanded?: boolean | string[];
  /** Called with the ids of the expanded rows whenever the user changes them. */
  onExpandedChange?: (expandedRowIds: string[]) => void;

  /**
   * Lets the user select rows: `multiple` adds a checkbox column whose header
   * checkbox selects or clears the rows shown, `single` a radio column.
   * With `getSubRows`, selecting a row selects everything under it, and a
   * row with some of its children selected shows a partial check.
   * Selection is kept as row ids (see `getRowId`), so rows selected on
   * another page stay selected.
   * @default 'none'
   */
  selectionMode?: DataTableSelectionMode;
  /** Ids of the selected rows, for the controlled case. */
  selectedRowIds?: string[];
  /** Ids of the rows selected at first, for the uncontrolled case. */
  defaultSelectedRowIds?: string[];
  /** Called with the ids of the selected rows whenever the user changes them. */
  onSelectionChange?: (selectedRowIds: string[]) => void;
  /**
   * Whether a row can be selected. Rows that cannot get a disabled checkbox
   * and are skipped by the header checkbox.
   *
   * With `getSubRows`, a row that cannot be selected but has rows below it
   * that can keeps an enabled checkbox, which selects those rows. Its own id
   * is never in the selection, even when its checkbox shows checked.
   */
  isRowSelectable?: (row: Row) => boolean;
  /**
   * Accessible name of a row's selection checkbox, such as the person's
   * name. Without it the row is named by its position.
   * @default (row, rowIndex) => `Select row ${rowIndex + 1}`
   */
  getRowLabel?: (row: Row, rowIndex: number) => string;

  /** Rendered below the table, such as `Pagination`. */
  footer?: ReactNode;

  /** Class name of the outer container. */
  className?: string;
  /** Forwarded to the `table` element. */
  ref?: Ref<HTMLTableElement>;
}
