import { Interpolation, Theme } from '@emotion/react';

export interface WidgetInfoLabelProps {
  title: React.JSX.Element | string;
  value: React.JSX.Element | string | number;
  currency?: React.JSX.Element | string;
  className?: string;
  isIncreasing?: boolean | null;
  titleCSS?: Interpolation<Theme>;
  valueCSS?: Interpolation<Theme>;
}
