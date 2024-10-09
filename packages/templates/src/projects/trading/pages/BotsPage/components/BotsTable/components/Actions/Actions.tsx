import { useMatches } from 'react-router-dom';
import { Wrapper } from '@ssa-ui-kit/core';
import { BotStatusProvider } from '@trading/contexts';
import { ActionMore } from './ActionMore';
import { BotsActionRun } from './BotsActionRun';
import { ActionsProps } from './types';

export const Actions = ({ row }: ActionsProps) => {
  const match = useMatches();

  const isArchivePage = match[match.length - 1].pathname.includes('/archive');

  if (isArchivePage) {
    return null;
  }
  return (
    <BotStatusProvider>
      <Wrapper>
        <BotsActionRun row={row} />
        <ActionMore row={row} />
      </Wrapper>
    </BotStatusProvider>
  );
};
