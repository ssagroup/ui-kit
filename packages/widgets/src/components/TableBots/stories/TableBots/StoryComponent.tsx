import { Wrapper } from '@ssa-ui-kit/core';
import { TableBots, TableCellBot, TableRowBot } from '../..';
import { TableBotItem } from '../../types';
import { Exchange, PNL, ROI, Trade } from './components';
import { Actions } from './components/Actions/Actions';
import { tableBotsData } from './mockData';

export const TableBotsStory = () => {
  const handleRowClick = (row: TableBotItem) => () => {
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
      <TableBots columns={columns}>
        {tableBotsData.map((item) => (
          <TableRowBot
            aria-disabled={item.isDisabled}
            key={item.id}
            isDisabled={item.isDisabled}
            onClick={item.isDisabled ? undefined : handleRowClick(item)}>
            <TableCellBot>{item.name}</TableCellBot>
            <TableCellBot>{item.creationDate}</TableCellBot>
            <TableCellBot>
              <Exchange exchangeType={item.exchange} />
            </TableCellBot>
            <TableCellBot>
              <Trade tradeType={item.status} />
            </TableCellBot>
            <TableCellBot>{item.pair}</TableCellBot>
            <TableCellBot>
              <PNL {...item.pnl} />
            </TableCellBot>
            <TableCellBot>
              <ROI {...item.roi} />
            </TableCellBot>
            <TableCellBot>
              <Actions row={item} />
            </TableCellBot>
          </TableRowBot>
        ))}
      </TableBots>
    </Wrapper>
  );
};
