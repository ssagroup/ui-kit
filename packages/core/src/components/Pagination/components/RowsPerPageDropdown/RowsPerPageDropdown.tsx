import { useTheme } from '@emotion/react';
import DropdownOption from '@components/DropdownOption/DropdownOption';
import Typography from '@components/Typography/Typography';
import Wrapper from '@components/Wrapper/Wrapper';
import Dropdown from '@components/Dropdown/Dropdown';
import { usePaginationContext } from '@components/Pagination/PaginationContext';
import { RowsPerPageDropdownProps } from './types';
import { DEFAULT_PER_PAGE_VALUE, ROWS_PER_PAGE_LIST } from '../../constants';

/**
 * RowsPerPageDropdown - Dropdown component for selecting rows per page
 *
 * A dropdown component that allows users to select the number of rows
 * displayed per page in paginated data. Used within Pagination component
 * when isRowPerPageVisible is true. Requires PaginationContextProvider
 * to access and update the perPage state.
 *
 * @category Components
 * @subcategory Navigation
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
 *
 * @see {@link Pagination} - Parent component that uses this component
 * @see {@link PaginationContextProvider} - Required context provider
 * @see {@link Dropdown} - Base dropdown component used internally
 *
 * @requires PaginationContextProvider - Must be used within PaginationContextProvider
 *
 * @accessibility
 * - ARIA attributes via Dropdown component
 * - Keyboard navigation support
 * - Screen reader friendly
 */
export const RowsPerPageDropdown = ({
  selectedItem = DEFAULT_PER_PAGE_VALUE,
  rowsPerPageList = ROWS_PER_PAGE_LIST,
  rowsPerPageText = 'Rows per page',
  ...rest
}: RowsPerPageDropdownProps) => {
  const theme = useTheme();
  const { setPerPage } = usePaginationContext();

  const selectedItemForDropdown =
    rowsPerPageList.find(({ value }) => value === selectedItem) ||
    rowsPerPageList[0];

  const onChange: Parameters<typeof Dropdown>[0]['onChange'] = ({ value }) => {
    setPerPage(value as number);
  };

  return (
    <Wrapper css={{ width: 'auto', ul: { width: 'auto' } }}>
      <Typography
        variant="subtitle"
        css={{
          fontSize: 14,
          lineHeight: 1,
          textWrap: 'nowrap',
        }}>
        {rowsPerPageText}:
      </Typography>
      <Dropdown
        selectedItem={selectedItemForDropdown}
        onChange={onChange}
        css={{
          marginLeft: 10,
          marginRight: 15,
          background: 'none',
          color: '#070821',
          gap: 5,
          padding: 0,
          '&:focus': {
            color: '#070821',
            background: 'none',
            '&::before': {
              display: 'none',
            },
          },
          '& svg path': {
            stroke: theme.colors.greyDarker,
          },
        }}
        {...rest}>
        {rowsPerPageList.map((item) => (
          <DropdownOption key={item.id} value={item.value}>
            {item.value}
          </DropdownOption>
        ))}
      </Dropdown>
    </Wrapper>
  );
};
