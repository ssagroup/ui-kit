import { createContext, useEffect, useState } from 'react';

import { useBotMutationCompleted } from '@fintech/hooks';

import { BOTS_STOPPED } from './constants';
import { BotsContextContent, ReloadReason } from './types';

export const BotsContext = createContext<BotsContextContent>({
  status: BOTS_STOPPED,
  reloadReason: null,
  setStatus() {
    /* no-op */
  },
  resetReloadReason() {
    /* no-op */
  },
  setReloadReason() {
    /* no-op */
  },
});

export const BotsProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] =
    useState<BotsContextContent['status']>(BOTS_STOPPED);

  const [reloadReason, setReloadReason] = useState<ReloadReason | null>(null);

  const resetReloadReason = () => {
    setReloadReason(null);
  };

  const botMutationCompleted = useBotMutationCompleted();

  useEffect(() => {
    const lastMutationName = botMutationCompleted.at(-1);
    if (lastMutationName) {
      setReloadReason(lastMutationName as ReloadReason);
    }
  }, [botMutationCompleted]);

  return (
    <BotsContext.Provider
      value={{
        status,
        reloadReason,
        setStatus,
        resetReloadReason,
        setReloadReason,
      }}>
      {children}
    </BotsContext.Provider>
  );
};
