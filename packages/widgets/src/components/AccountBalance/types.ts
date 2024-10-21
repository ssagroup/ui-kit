import { MainColors, Theme } from '@ssa-ui-kit/core';
import type { To } from 'react-router-dom';

interface WithTheme {
  theme: Theme;
}

type BalanceBase = {
  total: number | string;
  currency: string;
  legendColorPalette?: Array<keyof MainColors | string>;
  chartColorPalette?: string[];
  variant?: 'valueList' | 'withoutValueList';
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
  className?: string;
  onClick?: () => void;
  link?: To;
}

export type BalancePieChartTitleProps = Pick<
  BalancePieChartProps,
  'total' | 'currency' | 'theme'
>;
