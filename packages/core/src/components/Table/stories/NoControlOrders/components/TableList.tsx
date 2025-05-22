import Table from '@components/Table/Table';
import { StyledTableProps } from '../../StyledTable/types';

export const TableList = ({ children, ...rest }: StyledTableProps) => (
  <Table
    css={{
      '& thead tr': {
        position: 'relative',
        '& td:last-child': {
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 40,
            height: 40,
            borderRadius: 20,
            background: '#fff',
            clipPath: 'inset(0 0 50% 50%)',
          },
          '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 0,
            width: 20,
            height: 20,
            background: '#D0D1D6',
            zIndex: -1,
          },
        },
      },
      '& tr td:last-child': {
        position: 'sticky',
        height: 44,
        right: 0,
        padding: 0,
      },
    }}
    {...rest}>
    {children}
  </Table>
);
