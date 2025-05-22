import { Wrapper, Table } from '@ssa-ui-kit/core';
import { TableLoader } from '@fintech/components';
import { BotsTableProps } from './types';
import { Body, Header } from './components';
import { COLUMNS, COLUMN_API_NAMES } from './consts';

export const BotsTable = ({
  response,
  allRowsDisabled,
  handleSortingChange,
}: BotsTableProps) => (
  <Wrapper
    css={{
      marginBottom: 20,
      minWidth: 340,
      overflowX: 'auto',
    }}>
    <Table>
      <Header
        handleSortingChange={handleSortingChange}
        columns={COLUMNS}
        columnsApiNames={COLUMN_API_NAMES}
      />
      <Body response={response} allRowsDisabled={allRowsDisabled} />
    </Table>
    <TableLoader isLoading={false} />
  </Wrapper>
);
