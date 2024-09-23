import { RequestPeriod } from '@trading/types';

export type PeriodContextContent = {
  period: RequestPeriod;
  setPeriod: (period: RequestPeriod) => void;
};
