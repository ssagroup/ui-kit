import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * Table - Base table component for displaying tabular data
 *
 * A styled table element that serves as the foundation for displaying
 * structured tabular data. Works in conjunction with TableHead, TableBody,
 * TableRow, TableCell, and TableCellHeader components to create complete
 * data tables with proper semantics and styling.
 *
 * Component structure:
 * - Table (root container)
 *   - TableHead (header section with column headers)
 *     - TableRow
 *       - TableCellHeader (header cells)
 *   - TableBody (body section with data rows)
 *     - TableRow (data rows)
 *       - TableCell (data cells)
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table
 * <Table>
 *   <TableHead>
 *     <TableRow>
 *       <TableCellHeader>Name</TableCellHeader>
 *       <TableCellHeader>Email</TableCellHeader>
 *       <TableCellHeader>Role</TableCellHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     {users.map(user => (
 *       <TableRow key={user.id}>
 *         <TableCell>{user.name}</TableCell>
 *         <TableCell>{user.email}</TableCell>
 *         <TableCell>{user.role}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 *
 * @example
 * ```tsx
 * // Table with custom styling
 * <Table css={{ border: '1px solid #ccc' }}>
 *   <TableHead>
 *     <TableRow>
 *       <TableCellHeader>Column 1</TableCellHeader>
 *       <TableCellHeader align="center">Column 2</TableCellHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Data 1</TableCell>
 *       <TableCell align="center">Data 2</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 *
 * @see {@link TableHead} - Header section component
 * @see {@link TableBody} - Body section component
 * @see {@link TableRow} - Row component
 * @see {@link TableCell} - Data cell component
 * @see {@link TableCellHeader} - Header cell component
 *
 * @accessibility
 * - Semantic HTML table element
 * - Proper table structure for screen readers
 * - Keyboard navigation support
 * - ARIA attributes when needed
 */
const Table = styled.table<CommonProps>`
  display: table;

  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;

  background: none;
`;

export default Table;
