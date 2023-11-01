import { Wrapper } from '@ssa-ui-kit/core';
import { BotsTable, BotsTableCell, BotsTableRow } from '@components/BotsTable';
import { BotsTableItem } from '@components/BotsTable/types';
import { Exchange, PNL, ROI, Trade, Actions } from './components';
import { botsTableData } from './mockData';

export const BotsTableStory = () => {
  const handleRowClick = (row: BotsTableItem) => () => {
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
      <BotsTable columns={columns}>
        {botsTableData.map((item) => (
          <BotsTableRow
            aria-disabled={item.isDisabled}
            key={item.id}
            isDisabled={item.isDisabled}
            onClick={item.isDisabled ? undefined : handleRowClick(item)}>
            <BotsTableCell>{item.name}</BotsTableCell>
            <BotsTableCell>{item.creationDate}</BotsTableCell>
            <BotsTableCell>
              <Exchange exchangeType={item.exchange} />
            </BotsTableCell>
            <BotsTableCell>
              <Trade tradeType={item.status} />
            </BotsTableCell>
            <BotsTableCell>{item.pair}</BotsTableCell>
            <BotsTableCell>
              <PNL {...item.pnl} />
            </BotsTableCell>
            <BotsTableCell>
              <ROI {...item.roi} />
            </BotsTableCell>
            <BotsTableCell>
              <Actions row={item} />
            </BotsTableCell>
          </BotsTableRow>
        ))}
      </BotsTable>
    </Wrapper>
  );
};
