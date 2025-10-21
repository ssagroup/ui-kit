import { createContext, useEffect, useState } from 'react';

import { PERIOD_DAY } from '@fintech/constants';
import { RequestPeriod } from '@fintech/types';

import { PeriodContextContent } from './types';

export const PeriodContext = createContext<PeriodContextContent>({
  period: { period: PERIOD_DAY },
  setPeriod() {
    /* no-op */
  },
});

export const PeriodProvider = ({ children }: { children: React.ReactNode }) => {
  const [period, setPeriod] = useState<RequestPeriod>({ period: PERIOD_DAY });

  useEffect(() => {
    setPeriod({ period: PERIOD_DAY });
  }, []);

  return (
    <PeriodContext.Provider
      value={{
        period,
        setPeriod,
      }}>
      {children}
    </PeriodContext.Provider>
  );
};
