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
export type TableCellHeaderProps = TableCellProps;
