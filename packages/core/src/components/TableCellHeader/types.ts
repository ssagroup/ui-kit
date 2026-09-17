import { TableCellProps } from '../TableCell/types';

/**
 * Props for the TableCellHeader component
 *
 * A wrapper component that renders TableCell as a th element for table headers.
 * Inherits all props from TableCell but renders as a header cell semantically.
 *
 * @example
 * ```tsx
 * // Basic table cell header
 * <TableRow>
 *   <TableCellHeader>Name</TableCellHeader>
 *   <TableCellHeader>Email</TableCellHeader>
 *   <TableCellHeader>Role</TableCellHeader>
 * </TableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Table cell header with alignment
 * <TableRow>
 *   <TableCellHeader>Name</TableCellHeader>
 *   <TableCellHeader align="center">Status</TableCellHeader>
 *   <TableCellHeader align="right">Price</TableCellHeader>
 * </TableRow>
 * ```
 */
export interface TableCellHeaderProps extends TableCellProps {
  /**
   * Whether this column can be resized inside a `Table` with
   * `resizableColumns`. Set it to `false` to pin a column — an actions or
   * checkbox column, typically — at a width the user cannot change.
   *
   * In the default `fit` mode this also removes the handle from the column to
   * its *left*, because that handle resizes by trading width with this one and
   * would otherwise move a column the user was told they could not move. In
   * `expand` mode nothing pays for a resize, so only this column's own handle
   * goes.
   *
   * Ignored outside a resizable table.
   *
   * @default true
   */
  resizable?: boolean;
}
