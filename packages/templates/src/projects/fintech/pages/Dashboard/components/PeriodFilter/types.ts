import { RequestPeriod, StatisticsPeriod } from '@fintech/types';

import type { ButtonGroupItem, ButtonGroupProps } from '@ssa-ui-kit/core';

export type PeriodFilterItem = { id: StatisticsPeriod } & Omit<
  ButtonGroupItem,
  'id'
>;

export type PeriodFilterProps = {
  period: RequestPeriod;
  onClick: (period: RequestPeriod) => void;
} & Pick<ButtonGroupProps, 'buttonStyles'>;
