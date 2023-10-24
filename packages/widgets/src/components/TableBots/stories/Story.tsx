import { Wrapper } from '@ssa-ui-kit/core';
import { TableBots, TableCellBot, TableRowBot } from '..';
import { Exchange, Trade, PNL, ROI } from './components';
import { tableBotsData } from './mockData';
import { TableBotItem } from '../types';
import { Actions } from './components/Actions/Actions';
import { SyntheticEvent } from 'react';

export const Story = () => {
  // TODO: don't trigger handle if clicked by the action row
  const handleRowClick =
    (row: TableBotItem) => (event: SyntheticEvent<HTMLDivElement>) => {
      console.log('>>>event', event);
      alert(JSON.stringify(row));
    };

  return (
    <Wrapper
      css={{
        width: '100%',
        height: '100%',
      }}>
      <TableBots>
        {tableBotsData.map((item) => (
          <TableRowBot
            aria-disabled={item.isDisabled}
            key={item.id}
            isDisabled={item.isDisabled}
            onClick={handleRowClick(item)}>
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
              <Actions status={item.status} />
            </TableCellBot>
          </TableRowBot>
        ))}
      </TableBots>
    </Wrapper>
  );
};
