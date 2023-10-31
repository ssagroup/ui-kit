import { BotsTableCell, BotsTableRow } from '@components/BotsTable';
import { Exchange, TableTag } from '@components/BotsTable/stories/BotsTable';
import { ActionMore } from './ActionMore';
import { Reason } from './Reason';
import { NoControlOrdersItem } from '../types';

export const TableRow = (item: NoControlOrdersItem) => (
  <BotsTableRow aria-disabled={item.isDisabled} isDisabled={item.isDisabled}>
    <BotsTableCell>
      <Exchange exchangeType={item.exchange} showTitle={false} />
    </BotsTableCell>
    <BotsTableCell>{item.account}</BotsTableCell>
    <BotsTableCell>{item.botName}</BotsTableCell>
    <BotsTableCell>{item.botRun}</BotsTableCell>
    <BotsTableCell>{item.orderId}</BotsTableCell>
    <BotsTableCell>
      <TableTag color={item.status ? 'green' : 'pink'}>
        {item.status ? 'Active' : 'Inactive'}
      </TableTag>
    </BotsTableCell>
    <BotsTableCell>
      <Reason>{item.reason}</Reason>
    </BotsTableCell>
    <BotsTableCell>{item.pair}</BotsTableCell>
    <BotsTableCell>{item.orderSize}</BotsTableCell>
    <BotsTableCell>{item.orderType}</BotsTableCell>
    <BotsTableCell>
      <ActionMore row={item} />
    </BotsTableCell>
  </BotsTableRow>
);
