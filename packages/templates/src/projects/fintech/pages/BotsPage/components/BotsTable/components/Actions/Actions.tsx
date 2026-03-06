import { useLocation } from 'react-router-dom';
import { Wrapper } from '@ssa-ui-kit/core';
import { BotStatusProvider } from '@fintech/contexts';
import { ActionMore } from './ActionMore';
import { BotsActionRun } from './BotsActionRun';
import { ActionsProps } from './types';

export const Actions = ({ row }: ActionsProps) => {
  const location = useLocation();

  const isArchivePage =
    location.pathname.endsWith('/archive') ||
    location.pathname.endsWith('/archive/');

  if (isArchivePage) {
    return null;
  }

  return (
    <BotStatusProvider>
      <Wrapper>
        <BotsActionRun row={row} />
        <ActionMore />
      </Wrapper>
    </BotStatusProvider>
  );
};
