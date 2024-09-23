import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PERIOD_DAY } from '@trading/constants';
import { RequestPeriod } from '@trading/types';
import { PeriodContextContent } from './types';

export const PeriodContext = createContext<PeriodContextContent>({
  period: { period: PERIOD_DAY },
  setPeriod() {
    /* no-op */
  },
});

export const PeriodProvider = ({ children }: { children: React.ReactNode }) => {
  const [period, setPeriod] = useState<RequestPeriod>({ period: PERIOD_DAY });
  const location = useLocation();

  useEffect(() => {
    setPeriod({ period: PERIOD_DAY });
  }, [location]);

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
