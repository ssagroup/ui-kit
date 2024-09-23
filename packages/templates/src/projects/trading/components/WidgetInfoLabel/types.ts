import { Interpolation, Theme } from '@emotion/react';

export interface WidgetInfoLabelProps {
  title: JSX.Element | string;
  value: JSX.Element | string | number;
  currency?: JSX.Element | string;
  className?: string;
  isIncreasing?: boolean | null;
  titleCSS?: Interpolation<Theme>;
  valueCSS?: Interpolation<Theme>;
}
