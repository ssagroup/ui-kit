import Wrapper from '@components/Wrapper';
import Table from '@components/Table/Table';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import TableHead from '@components/TableHead';
import TableCellHeader from '@components/TableCellHeader';
import { Exchange, PNL, ROI, Trade, Actions } from './components';
import { botsTableData } from './mockData';
import { StyledTableItem } from './types';

export const StyledTableStory = () => {
  const handleRowClick = (row: StyledTableItem) => () => {
    alert(JSON.stringify(row));
  };

  const columns = [
    'Name',
    'Creation Date',
    'Exchange',
    'Status',
    'Pair',
    'PNL',
    'ROI',
    '',
  ];

  return (
    <Wrapper
      css={{
        width: '100%',
        height: '100%',
      }}>
      <Table>
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
          {botsTableData.map((item) => (
            <TableRow
              aria-disabled={item.isDisabled}
              key={item.id}
              isDisabled={item.isDisabled}
              onClick={item.isDisabled ? undefined : handleRowClick(item)}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.creationDate}</TableCell>
              <TableCell>
                <Exchange exchangeType={item.exchange} />
              </TableCell>
              <TableCell>
                <Trade tradeType={item.status} />
              </TableCell>
              <TableCell>{item.pair}</TableCell>
              <TableCell>
                <PNL {...item.pnl} />
              </TableCell>
              <TableCell>
                <ROI {...item.roi} />
              </TableCell>
              <TableCell>
                <Actions row={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
};
