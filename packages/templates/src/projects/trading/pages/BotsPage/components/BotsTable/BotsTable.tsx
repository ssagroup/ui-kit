import { useMatches } from 'react-router-dom';
import { Wrapper } from '@ssa-ui-kit/core';
import { BotsTableWrapper } from '@ssa-ui-kit/widgets';
import { TableLoader } from '@trading/components';
import { useBots } from '@trading/contexts';
import { BotsTableProps } from './types';
import { Body, Header } from './components';
import { COLUMNS, COLUMN_API_NAMES } from './consts';

export const BotsTable = ({
  botsResponse,
  allRowsDisabled,
  onRowClick,
  handleSortingChange,
}: BotsTableProps) => {
  const match = useMatches();
  const isArchivePage = match[match.length - 1].pathname.includes('/archive');
  const { reloadReason } = useBots();
  const isFilterApplied =
    !reloadReason && (botsResponse.isFetching || botsResponse.isError);

  return (
    <Wrapper
      css={[
        {
          marginBottom: 20,
          minWidth: 340,
          overflowX: 'auto',
        },
        isArchivePage
          ? {
              ' tr td:last-child': {
                display: 'none',
              },
              ' thead td:nth-last-child(2)': {
                borderTopRightRadius: 20,
              },
              ' tbody tr:last-child td:nth-last-child(2)': {
                borderBottomRightRadius: 20,
              },
            }
          : {},
      ]}>
      <BotsTableWrapper
        css={{
          filter: isFilterApplied ? 'blur(5px)' : 'none',
          pointerEvents: isFilterApplied ? 'none' : 'auto',
        }}>
        <Header
          handleSortingChange={handleSortingChange}
          columns={COLUMNS}
          columnsApiNames={COLUMN_API_NAMES}
        />
        <Body
          botsResponse={botsResponse}
          onRowClick={onRowClick}
          allRowsDisabled={allRowsDisabled}
        />
      </BotsTableWrapper>
      <TableLoader isLoading={!reloadReason && botsResponse.isFetching} />
    </Wrapper>
  );
};
