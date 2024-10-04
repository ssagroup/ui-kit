import { PERIOD_CUSTOM, PERIOD_DAY } from '@trading/constants';
import { RequestPeriod } from '@trading/types';

export const isShortCustomPeriod = (requestPeriod: RequestPeriod): boolean => {
  if (
    !requestPeriod ||
    requestPeriod.period !== PERIOD_CUSTOM ||
    !requestPeriod.periodRange
  ) {
    return false;
  }

  const { start, end } = requestPeriod.periodRange;

  const msInDay = 24 * 60 * 60 * 1000;
  const diffInDays = Math.abs((end.getTime() - start.getTime()) / msInDay);

  return diffInDays <= 1;
};

export const isShortPeriod = (requestPeriod: RequestPeriod): boolean => {
  return (
    requestPeriod &&
    (requestPeriod.period === PERIOD_DAY || isShortCustomPeriod(requestPeriod))
  );
};
