import { TableLoader } from '@fintech/components';

import { Table, Wrapper } from '@ssa-ui-kit/core';

import { Body, Header } from './components';
import { COLUMN_API_NAMES, COLUMNS } from './consts';
import { BotsTableProps } from './types';

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
