import { DateTime } from 'luxon';

const UTC_AGGREGATION_PERIODS = ['Daily', 'Weekly', 'Monthly'];
const SHORT_DATE_FORMAT = '%e %b';
const DATETIME_FORMAT = '%H:%M, %d %b';

export const useTimestamp = <T extends { timestamp: string | number }>({
  data,
  aggregationPeriod,
}: {
  data: Array<T>;
  aggregationPeriod?: string;
}) => {
  const isUseUTC = aggregationPeriod
    ? UTC_AGGREGATION_PERIODS.includes(aggregationPeriod)
    : false;
  const timestampFormatForHint = isUseUTC ? SHORT_DATE_FORMAT : DATETIME_FORMAT;
  const localTimezone = DateTime.now().toFormat('ZZZZ');

  const timestampList = data.map(({ timestamp }) => {
    const current = DateTime.fromISO(timestamp as string);
    if (isUseUTC) {
      current.setZone('UTC', { keepLocalTime: true });
    } else {
      current.setZone(localTimezone);
    }
    return current.toISO();
  });

  return {
    timestampList,
    timestampFormatForHint,
  };
};
