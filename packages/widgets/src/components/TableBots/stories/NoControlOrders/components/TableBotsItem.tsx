import { TableCellBot, TableRowBot } from '@components/TableBots';
import { Exchange, TableTag } from '@components/TableBots/stories/TableBots';
import { NoControlOrdersItem } from '@components/TableBots/types';

import { ActionMore } from './ActionMore';
import { Reason } from './Reason';

export const TableBotsRow = (item: NoControlOrdersItem) => (
  <TableRowBot aria-disabled={item.isDisabled} isDisabled={item.isDisabled}>
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
);
