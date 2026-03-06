import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

/**
 * TableHead - Header section container for table columns
 *
 * A styled thead element that wraps table header rows. Provides styling
 * for the table header section including bold font weight, border styling,
 * and rounded corners. Used with TableRow and TableCellHeader components.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * // Basic table head
 * <Table>
 *   <TableHead>
 *     <TableRow>
 *       <TableCellHeader>Name</TableCellHeader>
 *       <TableCellHeader>Email</TableCellHeader>
 *       <TableCellHeader>Role</TableCellHeader>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     // data rows go here
 *   </TableBody>
 * </Table>
 * ```
 *
 * @see {@link Table} - Parent table component
 * @see {@link TableRow} - Row component for header
 * @see {@link TableCellHeader} - Header cell component
 * @see {@link TableBody} - Body section component
 *
 * @accessibility
 * - Semantic HTML thead element
 * - Proper table structure for screen readers
 * - Supports ARIA attributes via CommonProps
 */
const TableHead = styled.thead<CommonProps>`
  display: table-header-group;
  background: none;
  font-size: 12px;

  & tr {
    box-shadow: inset 0 -1px 0 #eaecf0;
    white-space: nowrap;
    font-weight: 700;

    &:first-of-type {
      border-top-left-radius: 20px;
    }
    &:last-child {
      cursor: default;
      border-top-right-radius: 20px;
    }

    & td,
    & th {
      font-weight: 700;
      box-shadow: rgb(234, 236, 240) 0 -1px 0 inset;
      &:first-of-type {
        padding-left: 16px;
        border-top-left-radius: 20px;
      }
      &:last-child {
        border-top-right-radius: 20px;
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;

export default TableHead;
