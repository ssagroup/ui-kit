import type { ButtonGroupProps, ButtonGroupItem } from '@ssa-ui-kit/core';
import { RequestPeriod, StatisticsPeriod } from '@fintech/types';

export type PeriodFilterItem = { id: StatisticsPeriod } & Omit<
  ButtonGroupItem,
  'id'
>;

export type PeriodFilterProps = {
  period: RequestPeriod;
  onClick: (period: RequestPeriod) => void;
} & Pick<ButtonGroupProps, 'buttonStyles'>;
