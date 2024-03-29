import { Wrapper } from '@ssa-ui-kit/core';
import { noControlOrdersData } from './mockData';
import { TableList, TableRow } from './components';

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
      <TableList columns={columns}>
        {noControlOrdersData.map((item) => (
          <TableRow key={item.id} {...item} />
        ))}
      </TableList>
    </Wrapper>
  );
};
