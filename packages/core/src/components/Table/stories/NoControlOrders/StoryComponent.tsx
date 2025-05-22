import { noControlOrdersData } from './mockData';
import { TableList, NoControlTableRow } from './components';
import Wrapper from '@components/Wrapper';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableBody from '@components/TableBody';
import TableCellHeader from '@components/TableCellHeader';

export const NoControlOrdersStory = () => {
  const columns = [
    'Exchange',
    'Account',
    'Bot Name',
    'Bot Run',
    'Order Id',
    'Status',
    'Reason',
    'Pair',
    'Order Size',
    'Order Type',
    '',
  ];

  return (
    <Wrapper
      css={{
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}>
      <TableList>
        <TableHead>
          <TableRow>
            {columns.map((columnName) => (
              <TableCellHeader key={`column-${columnName.toLowerCase()}`}>
                {columnName}
              </TableCellHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {noControlOrdersData.map((item) => (
            <NoControlTableRow key={item.id} {...item} />
          ))}
        </TableBody>
      </TableList>
    </Wrapper>
  );
};
