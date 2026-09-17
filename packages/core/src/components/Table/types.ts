import {
  AriaAttributes,
  KeyboardEvent,
  PointerEvent,
  RefObject,
  TableHTMLAttributes,
} from 'react';
import { CommonProps } from '@global-types/emotion';

/**
 * How a resize distributes width.
 *
 * - `fit` — the column to the right gives up what the dragged column gains, so
 *   the table's own width never changes. The last column cannot be dragged,
 *   having nothing to its right to trade with.
 * - `expand` — the table grows and the other columns keep their widths, so the
 *   table needs a horizontally scrollable parent.
 */
export type ColumnResizeMode = 'fit' | 'expand';

/** Options shared by `useColumnResize` and `Table`'s resizable mode. */
export interface ColumnResizeOptions {
  /**
   * Column widths in pixels, one per column. Passing this prop puts the table
   * into controlled mode for the life of the component — hold the value in
   * state and update it from `onColumnWidthsChange`, or the columns will not
   * move when dragged.
   */
  columnWidths?: number[];

  /**
   * Starting column widths in pixels, for the uncontrolled case. Omit it and
   * the table measures its own columns on first layout, so it opens at whatever
   * widths it would have had without resizing.
   */
  defaultColumnWidths?: number[];

  /**
   * Called on every width change, including each frame of a drag. Persisting
   * widths is the caller's job — write them to storage or user preferences here
   * and feed them back through `defaultColumnWidths`.
   */
  onColumnWidthsChange?: (columnWidths: number[]) => void;

  /**
   * Narrowest a column can be dragged, in pixels.
   * @default 64
   */
  minColumnWidth?: number;

  /**
   * Widest a column can be dragged, in pixels. Unbounded when omitted.
   */
  maxColumnWidth?: number;

  /**
   * Whether a resize is paid for by the next column or by the table's own
   * width. Defaults to `fit`, which keeps the table exactly as wide as it was
   * — surrounding layout never moves because a user dragged a column.
   *
   * Switch to `expand` when the table lives in its own scroll container and
   * columns should keep the widths the user gave them.
   *
   * @default 'fit'
   */
  columnResizeMode?: ColumnResizeMode;
}

/** Props for the element that starts a drag. Spread onto any element. */
export interface ResizeHandleProps extends Pick<
  AriaAttributes,
  'aria-orientation' | 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'
> {
  role: 'separator';
  tabIndex: number;
  'data-resizing'?: 'true';
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
  onDoubleClick: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

/**
 * Options for {@link useColumnResize}.
 *
 * Everything `Table` accepts for resizing, plus the two escape hatches `Table`
 * itself needs — `enabled` and `controlled`.
 *
 * @example
 * ```tsx
 * useColumnResize({
 *   defaultColumnWidths: [240, 160, 160],
 *   minColumnWidth: 96,
 *   onColumnWidthsChange: saveWidths,
 * });
 * ```
 */
export interface UseColumnResizeOptions extends ColumnResizeOptions {
  /**
   * Whether to measure and track widths at all. `Table` passes its
   * `resizableColumns` prop through so the hook can be called unconditionally.
   * @default true
   */
  enabled?: boolean;

  /**
   * Overrides the controlled/uncontrolled decision, which is otherwise taken
   * from whether `columnWidths` was passed. `Table` sets it explicitly because
   * it rebuilds the options object rather than forwarding its own props.
   */
  controlled?: boolean;
}

/** What `useColumnResize` hands back. */
export interface ColumnResizeApi {
  /** Current width of each column, in pixels. Empty until measured. */
  columnWidths: number[];
  /** Attach to the `table` element so the hook can measure its columns. */
  tableRef: RefObject<HTMLTableElement | null>;
  /** Whether a drag is in progress. */
  isResizing: boolean;
  /** The column being dragged, or `null`. */
  resizingColumnIndex: number | null;
  minColumnWidth: number;
  maxColumnWidth?: number;
  columnResizeMode: ColumnResizeMode;
  /**
   * Sets one column's width, clamped to the min/max. In `fit` mode the width is
   * taken from, or given back to, the column on the right, and the request is
   * clamped by that column's limits as well as this one's.
   */
  setColumnWidth: (index: number, width: number) => void;
  /** Adds to one column's width, clamped to the min/max. */
  resizeColumnBy: (index: number, delta: number) => void;
  /** Restores a column to the width it started at. */
  resetColumn: (index: number) => void;
  /** Builds the props for the drag handle of a given column. */
  getResizeHandleProps: (index: number) => ResizeHandleProps;
}

/**
 * Props for the {@link Table} component.
 *
 * Every attribute of a `table` element, plus the column-resizing options that
 * `resizableColumns` turns on.
 *
 * @example
 * ```tsx
 * <Table resizableColumns minColumnWidth={96}>
 *   {children}
 * </Table>
 * ```
 */
export interface TableProps
  extends
    CommonProps,
    ColumnResizeOptions,
    TableHTMLAttributes<HTMLTableElement> {
  /**
   * Lets columns be resized by dragging the right edge of each header cell.
   *
   * Turning this on switches the table to `table-layout: fixed` once it has
   * measured its columns, truncates overflowing cell content with an ellipsis,
   * and makes every `TableCellHeader` render its own drag handle.
   *
   * By default the table's own width does not change — see
   * `columnResizeMode`.
   *
   * @default false
   */
  resizableColumns?: boolean;
}
