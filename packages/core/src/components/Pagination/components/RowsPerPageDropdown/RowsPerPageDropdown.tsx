import { useTheme } from '@emotion/react';
import DropdownOption from '@components/DropdownOption/DropdownOption';
import Typography from '@components/Typography/Typography';
import Wrapper from '@components/Wrapper/Wrapper';
import Dropdown from '@components/Dropdown/Dropdown';
import { usePaginationContext } from '@components/Pagination/PaginationContext';
import { RowsPerPageDropdownProps } from './types';
import { DEFAULT_PER_PAGE_VALUE, ROWS_PER_PAGE_LIST } from '../../constants';

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
