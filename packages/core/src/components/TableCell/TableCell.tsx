import styled from '@emotion/styled';
import { TableCellProps } from './types';

/**
 * TableCell - Table data cell component
 *
 * A styled td element that represents a single data cell in a table row.
 * Used within TableRow components in the TableBody section. Supports
 * text alignment customization. For header cells, use TableCellHeader instead.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table cell
 * <TableRow>
 *   <TableCell>John Doe</TableCell>
 *   <TableCell>john@example.com</TableCell>
 *   <TableCell>Admin</TableCell>
 * </TableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Table cell with center alignment
 * <TableRow>
 *   <TableCell>Name</TableCell>
 *   <TableCell align="center">Status</TableCell>
 *   <TableCell align="right">Price</TableCell>
 * </TableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Table cell with custom content
 * <TableRow>
 *   <TableCell>
 *     <Badge color="success">Active</Badge>
 *   </TableCell>
 *   <TableCell>
 *     <Button size="small">Edit</Button>
 *   </TableCell>
 * </TableRow>
 * ```
 *
 * @see {@link Table} - Parent table component
 * @see {@link TableRow} - Row component (use this in TableBody)
 * @see {@link TableCellHeader} - Header cell component (use in TableHead)
 * @see {@link TableHead} - Header section component
 * @see {@link TableBody} - Body section component
 *
 * @accessibility
 * - Semantic HTML td element
 * - Proper table structure for screen readers
 * - Supports ARIA attributes via CommonProps
 */
const TableCell = styled.td<TableCellProps>`
  display: table-cell;

  vertical-align: inherit;
  text-align: ${({ align }) => (align ? align : 'left')};

  border: none;
  padding: 0 16px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  height: 44px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;

export default TableCell;
