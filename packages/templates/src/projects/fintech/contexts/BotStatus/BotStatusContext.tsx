import { createContext, useEffect, useState } from 'react';

import { BOT_STATUS, BotStatusContextContent } from './types';

export const BotStatusContext = createContext<BotStatusContextContent>({
  id: null,
  mutationStatus: null,
  setId() {
    /* no-op */
  },
  setMutationStatus() {
    /* no-op */
  },
});

export const BotStatusProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [id, setId] = useState<number | null>(null);
  const [mutationStatus, setMutationStatus] = useState<BOT_STATUS>(null);

  useEffect(() => {
    return () => {
      setMutationStatus(null);
    };
  }, [id]);

  return (
    <BotStatusContext.Provider
      value={{
        mutationStatus,
        id,
        setMutationStatus,
        setId,
      }}>
      {children}
    </BotStatusContext.Provider>
  );
};
