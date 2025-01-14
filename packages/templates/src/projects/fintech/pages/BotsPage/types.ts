import { Bot, PeriodRange } from '@fintech/types';

export interface PNL {
  amount: number;
  currency: string;
  isIncreasing?: boolean | null;
}

export interface ROI {
  amount: number;
}

export interface BotsTableProps {
  children: React.ReactElement<React.PropsWithChildren<Bot>>[];
  columns: string[];
  className?: string;
}

export type SearchType = Record<
  string,
  string | number | boolean | Array<string> | null | undefined | PeriodRange
>;
