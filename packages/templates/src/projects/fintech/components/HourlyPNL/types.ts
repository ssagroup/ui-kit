import { ColorsKeys } from '@ssa-ui-kit/core';
import { WidgetInfoLabelProps } from '../WidgetInfoLabel';

export type HourlyPNLProps = {
  average: number;
  last: number;
  min: number;
  max: number;
  isBotDashboard?: boolean;
} & Pick<WidgetInfoLabelProps, 'isIncreasing' | 'currency'>;

export type ProgressPointProps = {
  align?: 'start' | 'end';
  color: ColorsKeys;
} & Pick<WidgetInfoLabelProps, 'title' | 'value' | 'currency'>;
