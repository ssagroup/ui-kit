import type { To } from 'react-router-dom';

import {
  MainColors,
  PieChartProps,
  Theme,
  TooltipProps,
} from '@ssa-ui-kit/core';

interface WithTheme {
  theme: Theme;
}

type BalanceBase = {
  legendColorPalette?: Array<keyof MainColors | string>;
  chartColorPalette?: string[];
  data: Array<{
    id: string | number;
    value: number;
    label: string;
    [key: string | number | symbol]: unknown;
  }>;
};

export interface BalancePieChartProps extends WithTheme, BalanceBase {
  pieChartProps?: Partial<PieChartProps>;
  activeHighlight?: boolean;
  onFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}

export interface AccountBalanceProps extends BalanceBase {
  activeHighlight?: boolean;
  className?: string;
  currency: string;
  fullscreenModeFeature?: boolean;
  link?: To;
  title?: React.ReactNode;
  tooltip?: {
    config?: Partial<TooltipProps>;
    content?: React.ReactNode;
    classNames?: {
      trigger?: string;
      content?: string;
    };
  };
  total: number | string;
  variant?: 'valueList' | 'withoutValueList';
  widgetMaxWidth?: string;
  onClick?: () => void;
}
