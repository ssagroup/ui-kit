import { Theme } from '@ssa-ui-kit/core';

interface WithTheme {
  theme: Theme;
}

type BalanceBase = {
  total: number | string;
  currency: string;
  data: Array<{
    id: string | number;
    value: number;
    label: string;
    [key: string | number | symbol]: unknown;
  }>;
};

export interface BalancePieChartProps extends WithTheme, BalanceBase {}

export interface AccountBalanceProps extends BalanceBase {
  title?: string;
}
