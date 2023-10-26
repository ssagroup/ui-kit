import { Wrapper } from '@ssa-ui-kit/core';
import { TableBotItem } from '@components/TableBots/types';
import { ActionMore } from './ActionMore';
import { ActionRun } from './ActionRun';

export const Actions = ({ row }: { row: TableBotItem }) => {
  return (
    <Wrapper>
      <ActionRun row={row} />
      <ActionMore row={row} />
    </Wrapper>
  );
};
