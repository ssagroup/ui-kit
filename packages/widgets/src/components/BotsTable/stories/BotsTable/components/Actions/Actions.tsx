import { Wrapper } from '@ssa-ui-kit/core';
import { BotsTableItem } from '@components/BotsTable/types';
import { ActionMore } from './ActionMore';
import { ActionRun } from './ActionRun';

export const Actions = ({ row }: { row: BotsTableItem }) => {
  return (
    <Wrapper>
      <ActionRun row={row} />
      <ActionMore row={row} />
    </Wrapper>
  );
};
