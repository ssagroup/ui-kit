import { CommonProps } from '@global-types/emotion';
import { DropdownPositions } from '@components';

/**
 * Props for the RowsPerPageDropdown component
 *
 * A dropdown component that allows users to select the number of rows
 * displayed per page in paginated data. Used within Pagination component
 * to control items per page. Requires PaginationContextProvider.
 *
 * @example
 * ```tsx
 * <PaginationContextProvider selectedPage={1} defaultPerPage={25}>
 *   <Pagination
 *     pagesCount={20}
 *     isRowPerPageVisible={true}
 *     rowPerPageProps={{
 *       selectedItem: 25,
 *       rowsPerPageText: "Items per page",
 *       rowsPerPageList: [
 *         { id: 1, value: 10 },
 *         { id: 2, value: 25 },
 *         { id: 3, value: 50 },
 *       ],
 *     }}
 *   />
 * </PaginationContextProvider>
 * ```
 */
export interface RowsPerPageDropdownProps extends CommonProps {
  /**
   * Currently selected number of rows per page
   * Must match a value in rowsPerPageList
   */
  selectedItem?: number;

  /**
   * Label text displayed before the dropdown
   * @default 'Rows per page'
   */
  rowsPerPageText?: string;

  /**
   * Array of available rows per page options
   * Each item must have id and value properties
   * @default [{ id: 1, value: 10 }, { id: 2, value: 25 }, { id: 3, value: 50 }, { id: 4, value: 100 }]
   */
  rowsPerPageList?: Array<{ id: number; value: number }>;
  /**
   * Controls the opening direction of the options list.
   * - DropdownPositions.auto: opens downward by default; flips upward automatically when
   *   there is insufficient space below the toggle in the viewport
   * - DropdownPositions.top: always opens upward
   * - DropdownPositions.bottom: always opens downward
   * @default DropdownPositions.auto
   */
  dropdownPosition?: DropdownPositions;
}
