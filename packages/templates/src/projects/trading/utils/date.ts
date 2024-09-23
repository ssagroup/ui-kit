import { DateTime } from 'luxon';
import { RequestPeriod } from '@trading/types';
import { isShortPeriod } from './period';

export const TIME_FORMAT = 'HH:mm';
export const TIME_FORMAT_FULL = 'HH:mm:ss';
// cspell:disable-next-line
export const DATE_FORMAT = 'dd MMM';
// cspell:disable-next-line
export const TOOLTIP_DATE_FORMAT = 'd MMM';
// cspell:disable-next-line
export const TOOLTIP_DATE_TIME_FORMAT = 'HH:mm, d MMM';
// cspell:disable-next-line
export const TOOLTIP_DATE_TIME_FULL_FORMAT = 'HH:mm:ss, d MMM';

export const formatDate = (ts: string, period: RequestPeriod) => {
  const d = DateTime.fromISO(ts);

  return d.toFormat(isShortPeriod(period) ? TIME_FORMAT : DATE_FORMAT);
};

export const formatTooltipDate = (ts: string) => {
  return DateTime.fromISO(ts).toFormat(TOOLTIP_DATE_TIME_FORMAT);
};
