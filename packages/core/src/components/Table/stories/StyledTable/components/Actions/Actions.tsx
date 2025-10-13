import Wrapper from '@components/Wrapper';

import { StyledTableItem } from '../../types';

import { ActionMore } from './ActionMore';
import { ActionRun } from './ActionRun';

export const Actions = ({ row }: { row: StyledTableItem }) => {
  return (
    <Wrapper>
      <ActionRun row={row} />
      <ActionMore row={row} />
    </Wrapper>
  );
};
