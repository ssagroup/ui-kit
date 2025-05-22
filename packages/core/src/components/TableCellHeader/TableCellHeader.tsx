import TableCell from '@components/TableCell/TableCell';

const TableCellHeader = (props: React.ComponentProps<typeof TableCell>) => (
  <TableCell as="th" {...props} />
);

export default TableCellHeader;
