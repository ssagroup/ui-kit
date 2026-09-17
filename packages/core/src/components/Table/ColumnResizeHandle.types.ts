import { HTMLAttributes } from 'react';

/**
 * Props for the ColumnResizeHandle component
 *
 * @example
 * ```tsx
 * // Inside a TableCellHeader, index taken from the cell
 * <ColumnResizeHandle />
 * ```
 *
 * @example
 * ```tsx
 * // Explicit column, for a header that does not map one cell per column
 * <ColumnResizeHandle columnIndex={2} label="Created at" />
 * ```
 */
export interface ColumnResizeHandleProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  // The props getResizeHandleProps owns. They are spread after these, so
  // passing one would silently replace the drag wiring — better a compile
  // error than a handle that renders correctly and does nothing.
  | 'role'
  | 'tabIndex'
  | 'onPointerDown'
  | 'onPointerMove'
  | 'onPointerUp'
  | 'onPointerCancel'
  | 'onDoubleClick'
  | 'onKeyDown'
> {
  /**
   * Which column this handle resizes. Defaults to the `cellIndex` of the cell
   * the handle is rendered in, which is only wrong when a header cell spans
   * more than one column.
   */
  columnIndex?: number;

  /**
   * Column name used in the handle's accessible label. Defaults to the text of
   * the cell the handle sits in.
   */
  label?: string;
}
