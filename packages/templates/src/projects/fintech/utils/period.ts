import { PERIOD_CUSTOM, PERIOD_DAY } from '@fintech/constants';
import { RequestPeriod } from '@fintech/types';

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
