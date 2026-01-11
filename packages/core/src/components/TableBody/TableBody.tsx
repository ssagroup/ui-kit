import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * TableBody - Body section container for table data rows
 *
 * A styled tbody element that wraps table data rows. Provides styling
 * for the table body section including hover effects on rows, rounded
 * corners for the last row, and proper spacing. Used with TableRow and
 * TableCell components.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table body
 * <Table>
 *   <TableHead>
 *     // header rows go here
 *   </TableHead>
 *   <TableBody>
 *     {data.map(item => (
 *       <TableRow key={item.id}>
 *         <TableCell>{item.name}</TableCell>
 *         <TableCell>{item.email}</TableCell>
 *         <TableCell>{item.role}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 *
 * @example
 * ```tsx
 * // Table body with disabled rows (aria-disabled is automatically set)
 * <TableBody>
 *   {items.map(item => (
 *     <TableRow
 *       key={item.id}
 *       isDisabled={item.disabled}>
 *       <TableCell>{item.name}</TableCell>
 *     </TableRow>
 *   ))}
 * </TableBody>
 * ```
 *
 * @see {@link Table} - Parent table component
 * @see {@link TableRow} - Row component for data
 * @see {@link TableCell} - Data cell component
 * @see {@link TableHead} - Header section component
 *
 * @accessibility
 * - Semantic HTML tbody element
 * - Proper table structure for screen readers
 * - Hover effects respect aria-disabled attribute
 * - Supports ARIA attributes via CommonProps
 */
const TableBody = styled.tbody<CommonProps>`
  display: table-row-group;

  & tr:last-child td:first-of-type {
    border-bottom-left-radius: 20px;
  }
  & tr:last-child td:last-child {
    border-bottom-right-radius: 20px;
  }
  & tr:not([aria-disabled='true']):hover {
    & td {
      background-color: #eef1f7;
    }
  }
`;

export default TableBody;
