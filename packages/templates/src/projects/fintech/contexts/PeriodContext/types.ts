import { RequestPeriod } from '@fintech/types';

export type PeriodContextContent = {
  period: RequestPeriod;
  setPeriod: (period: RequestPeriod) => void;
};
