import TableCell from '@components/TableCell';
import TableRow from '@components/TableRow';
import { ActionMore } from './ActionMore';
import { Reason } from './Reason';
import { NoControlOrdersItem } from '../types';
import { Exchange, TableTag } from '../../StyledTable';

export const NoControlTableRow = (item: NoControlOrdersItem) => (
  <TableRow aria-disabled={item.isDisabled} isDisabled={item.isDisabled}>
    <TableCell>
      <Exchange exchangeType={item.exchange} showTitle={false} />
    </TableCell>
    <TableCell>{item.account}</TableCell>
    <TableCell>{item.botName}</TableCell>
    <TableCell>{item.botRun}</TableCell>
    <TableCell>{item.orderId}</TableCell>
    <TableCell>
      <TableTag color={item.status ? 'green' : 'pink'}>
        {item.status ? 'Active' : 'Inactive'}
      </TableTag>
    </TableCell>
    <TableCell>
      <Reason>{item.reason}</Reason>
    </TableCell>
    <TableCell>{item.pair}</TableCell>
    <TableCell>{item.orderSize}</TableCell>
    <TableCell>{item.orderType}</TableCell>
    <TableCell>
      <ActionMore row={item} />
    </TableCell>
  </TableRow>
);
