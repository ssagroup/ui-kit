import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { TableRowProps } from './types';

/**
 * TableRow - Table row component for table data
 *
 * A styled tr element that represents a single row in a table. Used within
 * TableHead or TableBody sections. Supports disabled state for non-interactive
 * rows. Works with TableCell or TableCellHeader components.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table row in body
 * <TableBody>
 *   <TableRow>
 *     <TableCell>John Doe</TableCell>
 *     <TableCell>john@example.com</TableCell>
 *     <TableCell>Admin</TableCell>
 *   </TableRow>
 * </TableBody>
 * ```
 *
 * @example
 * ```tsx
 * // Table row with click handler
 * <TableRow onClick={() => handleRowClick(item)}>
 *   <TableCell>{item.name}</TableCell>
 *   <TableCell>{item.email}</TableCell>
 * </TableRow>
 * ```
 *
 * @example
 * ```tsx
 * // Disabled table row (aria-disabled is automatically set)
 * <TableRow isDisabled>
 *   <TableCell>Disabled Row</TableCell>
 * </TableRow>
 * ```
 *
 * @see {@link Table} - Parent table component
 * @see {@link TableHead} - Header section (use TableCellHeader in rows)
 * @see {@link TableBody} - Body section (use TableCell in rows)
 * @see {@link TableCell} - Data cell component
 * @see {@link TableCellHeader} - Header cell component
 *
 * @accessibility
 * - Semantic HTML tr element
 * - Automatically sets aria-disabled when isDisabled is true
 * - Keyboard accessible when clickable
 * - Proper table structure for screen readers
 */

/* Removed CSS selector `& tr:first-of-type { padding-left: 18px; }` - don't see any diff in nested tables */
const TableRowBase = styled.tr<TableRowProps>`
  display: table-row;
  outline: 0;
  vertical-align: middle;

  border: none;
  padding: 0 16px;
  height: 44px;
  ${({ isDisabled }) =>
    isDisabled && {
      opacity: 0.6,
      cursor: 'default',
      userSelect: 'none',
    }}
`;

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ isDisabled, ...props }, ref) => (
    <TableRowBase
      ref={ref}
      isDisabled={isDisabled}
      aria-disabled={isDisabled ? 'true' : undefined}
      {...props}
    />
  ),
);

TableRow.displayName = 'TableRow';

export default TableRow;
