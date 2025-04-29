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
  total: number | string;
  currency: string;
  legendColorPalette?: Array<keyof MainColors | string>;
  chartColorPalette?: string[];
  variant?: 'valueList' | 'withoutValueList';
  fullscreenModeFeature?: boolean;
  tooltipContent?: React.ReactNode;
  tooltipConfig?: Partial<TooltipProps>;
  data: Array<{
    id: string | number;
    value: number;
    label: string;
    [key: string | number | symbol]: unknown;
  }>;
};

export interface BalancePieChartProps
  extends WithTheme,
    Pick<BalanceBase, 'legendColorPalette' | 'chartColorPalette' | 'data'> {
  pieChartProps?: Partial<PieChartProps>;
  activeHighlight?: boolean;
  onFullscreenModeChange?: (isFullscreenMode: boolean) => void;
}

export interface AccountBalanceProps extends BalanceBase {
  title?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  link?: To;
  activeHighlight?: boolean;
  widgetMaxWidth?: string;
  tooltipConfig?: Partial<TooltipProps>;
}

export type BalancePieChartTitleProps = Pick<BalancePieChartProps, 'theme'>;
