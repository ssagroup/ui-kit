import { CommonProps } from '@global-types/emotion';
import { InputProps } from '@components/Input/types';
import { RowsPerPageDropdownProps } from './components/RowsPerPageDropdown/types';

/**
 * Props for the Pagination component
 *
 * A comprehensive pagination component that provides navigation controls for
 * paginated data. Supports page navigation, manual page input, and rows per page
 * selection. Requires PaginationContextProvider to manage page state.
 *
 * @example
 * ```tsx
 * <PaginationContextProvider selectedPage={1}>
 *   <Pagination pagesCount={10} />
 * </PaginationContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // With rows per page dropdown
 * <PaginationContextProvider selectedPage={1} defaultPerPage={25}>
 *   <Pagination
 *     pagesCount={20}
 *     isRowPerPageVisible={true}
 *     rowPerPageProps={{
 *       rowsPerPageList: [
 *         { id: 1, value: 10 },
 *         { id: 2, value: 25 },
 *         { id: 3, value: 50 },
 *       ],
 *     }}
 *   />
 * </PaginationContextProvider>
 * ```
 *
 * @example
 * ```tsx
 * // With manual page input
 * <PaginationContextProvider selectedPage={3}>
 *   <Pagination
 *     pagesCount={15}
 *     isPageSettingVisible={true}
 *     pageNumberPlaceholder="Go to page"
 *   />
 * </PaginationContextProvider>
 * ```
 */
export interface PaginationProps extends CommonProps {
  /**
   * Total number of pages
   * Required to calculate page range and navigation limits
   */
  pagesCount: number;

  /**
   * ARIA label for the pagination navigation
   * @default 'Pagination'
   */
  ariaLabel?: string;

  /**
   * Whether the pagination is disabled
   * Disabled pagination prevents all navigation actions
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Placeholder text for manual page input
   * Only shown when isPageSettingVisible is true
   * @default 'Page №'
   */
  pageNumberPlaceholder?: string;

  /**
   * Whether to show manual page number input
   * Allows users to jump directly to a specific page
   * @default false
   */
  isPageSettingVisible?: boolean;

  /**
   * Whether to show rows per page dropdown
   * Allows users to control how many items are displayed per page
   * @default false
   */
  isRowPerPageVisible?: boolean;

  /**
   * Whether to show page count display (e.g., "3 / 15")
   * Only shown when isPageSettingVisible is true
   * @default true
   */
  isPageFromCountVisible?: boolean;

  /**
   * Props for the rows per page dropdown
   * Only used when isRowPerPageVisible is true
   */
  rowPerPageProps?: RowsPerPageDropdownProps;

  /**
   * Props for the manual page number input
   * Only used when isPageSettingVisible is true
   */
  manualPageNumberProps?: InputProps;

  /**
   * Error tooltip message for invalid page number input
   * @default 'The value is out of range'
   */
  errorTooltip?: string;
}

/**
 * Props for PaginationButtons component
 * Internal component that renders the numbered page buttons
 */
export interface PaginationButtonsProps {
  /**
   * Array of page numbers to display
   */
  range: number[];

  /**
   * Currently selected page number
   */
  selectedPage?: number;

  /**
   * Callback function when a page button is clicked
   */
  onClick: (page: number) => void;

  /**
   * Whether the buttons are disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Props for ArrowButton component
 * Internal component for previous/next navigation arrows
 */
export interface ArrowButtonProps {
  /**
   * Direction of the arrow button
   */
  direction: 'left' | 'right';

  /**
   * Callback function when arrow button is clicked
   */
  onClick: () => void;

  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props for PageButton component
 * Internal component for individual page number buttons
 */
export interface PageButtonProps {
  /**
   * Callback function when page button is clicked
   */
  onClick: () => void;

  /**
   * Page number or ellipsis string to display
   */
  page: number | string;

  /**
   * Whether this page is currently selected
   */
  isSelected: boolean;

  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Pagination context value
 * Provides page state and navigation functions to child components
 */
export interface PaginationContextProps {
  /**
   * Current page number (1-indexed)
   */
  page?: number;

  /**
   * Number of items per page
   */
  perPage: number;

  /**
   * Function to set the current page number
   */
  setPage: React.Dispatch<React.SetStateAction<number | undefined>>;

  /**
   * Function to set the number of items per page
   */
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Props for PaginationContextProvider component
 * Context provider that manages pagination state for child components
 *
 * @example
 * ```tsx
 * <PaginationContextProvider selectedPage={1} defaultPerPage={25}>
 *   <Pagination pagesCount={10} />
 * </PaginationContextProvider>
 * ```
 */
export interface PaginationContextProviderProps {
  /**
   * Initial selected page number (1-indexed)
   */
  selectedPage?: number;

  /**
   * Default number of items per page
   * @default 10
   */
  defaultPerPage?: number;

  /**
   * Child components that use pagination context
   * Must include Pagination component
   */
  children: React.ReactNode;
}
