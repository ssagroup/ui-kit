import { Wrapper } from '@ssa-ui-kit/core';
import { TableCellBot, TableRowBot } from '../..';
import { Exchange, TableTag } from '../TableBots/components';
import { noControlOrdersData } from './mockData';
import { ActionMore, TableBotsNoControlOrders, Reason } from './components';

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
      <TableBotsNoControlOrders columns={columns}>
        {noControlOrdersData.map((item) => (
          <TableRowBot
            aria-disabled={item.isDisabled}
            key={item.id}
            isDisabled={item.isDisabled}>
            <TableCellBot>
              <Exchange exchangeType={item.exchange} showTitle={false} />
            </TableCellBot>
            <TableCellBot>{item.account}</TableCellBot>
            <TableCellBot>{item.botName}</TableCellBot>
            <TableCellBot>{item.botRun}</TableCellBot>
            <TableCellBot>{item.orderId}</TableCellBot>
            <TableCellBot>
              <TableTag color={item.status ? 'green' : 'pink'}>
                {item.status ? 'Active' : 'Inactive'}
              </TableTag>
            </TableCellBot>
            <TableCellBot>
              <Reason>{item.reason}</Reason>
            </TableCellBot>
            <TableCellBot>{item.pair}</TableCellBot>
            <TableCellBot>{item.orderSize}</TableCellBot>
            <TableCellBot>{item.orderType}</TableCellBot>
            <TableCellBot>
              <ActionMore row={item} />
            </TableCellBot>
          </TableRowBot>
        ))}
      </TableBotsNoControlOrders>
    </Wrapper>
  );
};
