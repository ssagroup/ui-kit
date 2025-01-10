import { DateTime } from 'luxon';
import { propOr } from '@ssa-ui-kit/utils';

export const getNumberSuffix = (date: number) => {
  const th = 'th';
  const rd = 'rd';
  const nd = 'nd';
  const st = 'st';

  if (date === 11 || date === 12 || date === 13) return th;

  const lastDigit = date.toString().slice(-1);

  switch (lastDigit) {
    case '1':
      return st;
    case '2':
      return nd;
    case '3':
      return rd;
    default:
      return th;
  }
};

export const DEFAULT_DATE_FORMAT = 'MMM d';

export const formatDate = (
  sourceDate: string,
  options?: {
    outputDateFormat?: string;
    suffixNeeded?: boolean;
  },
) => {
  const outputDateFormat = propOr(
    DEFAULT_DATE_FORMAT,
    'outputDateFormat',
  )(options || {});
  const suffixNeeded = propOr(true, 'suffixNeeded')(options || {});
  const formattedDate = sourceDate
    ? DateTime.fromFormat(sourceDate, 'dd-LL-y').toFormat(outputDateFormat)
    : '';
  let suffix = '';
  if (formattedDate.length > 0) {
    const day = Number(
      formattedDate.substring(
        formattedDate.lastIndexOf(' ') + 1,
        formattedDate.length,
      ),
    );
    suffix = getNumberSuffix(day);
  }
  if (suffixNeeded) {
    return formattedDate + suffix;
  }
  return formattedDate;
};
