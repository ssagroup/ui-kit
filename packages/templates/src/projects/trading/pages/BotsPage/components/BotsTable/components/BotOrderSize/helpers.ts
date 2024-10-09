import { DateTime } from 'luxon';
import { Enum } from '@trading/types';

export const getColorsForLastOrder = (
  strategy: string | null,
  timestamp: string | null,
  colorsForLastOrder: Enum[],
) => {
  const defaultResult = colorsForLastOrder?.find(
    (item) => item.key === '_Default',
  );
  const result =
    colorsForLastOrder.find((item) => item.key === strategy) || defaultResult;

  if (!timestamp) return result?.value?.higher;

  const startDate = DateTime.fromISO(timestamp);
  const currentDate = DateTime.now();

  const duration = currentDate
    .diff(startDate)
    .shiftTo('hours', 'minutes')
    .toObject();

  const hours = Number(duration.hours);
  const minutes = Number(duration.minutes);

  const calculatedMinutes = hours * 60 + minutes;
  const calculatedHours = calculatedMinutes / 60;

  const sortedByUpToHours = result?.value?.period?.sort(
    ({ upToHours: upToHoursPrev }, { upToHours: upToHoursNext }) =>
      upToHoursPrev - upToHoursNext,
  );

  const foundElement = sortedByUpToHours?.find(
    ({ upToHours }) => upToHours > calculatedHours,
  );

  if (!foundElement) {
    return result?.value?.higher;
  }

  return foundElement.value;
};
