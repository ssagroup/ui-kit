import TableCell from '@components/TableCell/TableCell';
import { TableCellHeaderProps } from './types';

/**
 * TableCellHeader - Table header cell component
 *
 * A wrapper component that renders TableCell as a semantic th element for
 * table headers. Used within TableRow components in the TableHead section.
 * Provides the same styling and props as TableCell but with proper semantic
 * HTML for header cells.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table header
 * <TableHead>
 *   <TableRow>
 *     <TableCellHeader>Name</TableCellHeader>
 *     <TableCellHeader>Email</TableCellHeader>
 *     <TableCellHeader>Role</TableCellHeader>
 *   </TableRow>
 * </TableHead>
 * ```
 *
 * @example
 * ```tsx
 * // Table header with alignment
 * <TableHead>
 *   <TableRow>
 *     <TableCellHeader>Product</TableCellHeader>
 *     <TableCellHeader align="center">Quantity</TableCellHeader>
 *     <TableCellHeader align="right">Price</TableCellHeader>
 *   </TableRow>
 * </TableHead>
 * ```
 *
 * @example
 * ```tsx
 * // Table header with custom content
 * <TableHead>
 *   <TableRow>
 *     <TableCellHeader>
 *       <Icon name="user" /> User
 *     </TableCellHeader>
 *     <TableCellHeader>Email</TableCellHeader>
 *   </TableRow>
 * </TableHead>
 * ```
 *
 * @see {@link Table} - Parent table component
 * @see {@link TableHead} - Header section component (use this component here)
 * @see {@link TableRow} - Row component (use in TableHead)
 * @see {@link TableCell} - Data cell component (use in TableBody)
 * @see {@link TableBody} - Body section component
 *
 * @accessibility
 * - Semantic HTML th element (renders as th)
 * - Proper table header semantics for screen readers
 * - Supports ARIA attributes via TableCellProps
 * - Better accessibility than using TableCell in headers
 */
const TableCellHeader = (props: TableCellHeaderProps) => (
  <TableCell as="th" {...props} />
);

export default TableCellHeader;
