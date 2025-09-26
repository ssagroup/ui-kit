import {
  DEFAULT_MASK,
  DEFAULT_MONTH_MASK,
  DEFAULT_YEAR_MASK,
  DATE_MIN,
  DATE_MAX,
  MONTH_DATE_MIN,
  MONTH_DATE_MAX,
  YEAR_DATE_MIN,
  YEAR_DATE_MAX,
  FULL_DATE_LENGTH,
  FULL_MONTH_DATE_LENGTH,
  FULL_YEAR_DATE_LENGTH,
} from '../constants';

export const isMonthOnlyFormat = (format?: string): boolean => {
  if (!format) return false;

  const lowerFormat = format.toLowerCase();
  const hasMonth = lowerFormat.includes('mm');
  const hasYear = lowerFormat.includes('yyyy');
  const hasDay = lowerFormat.includes('dd');

  return hasMonth && hasYear && !hasDay;
};

export const isYearOnlyFormat = (format?: string): boolean => {
  if (!format) return false;

  const lowerFormat = format.toLowerCase();
  const hasYear = lowerFormat.includes('yyyy');
  const hasMonth = lowerFormat.includes('mm');
  const hasDay = lowerFormat.includes('dd');

  return hasYear && !hasMonth && !hasDay;
};

export const getExpectedDateLength = (format?: string): number => {
  if (!format) return FULL_DATE_LENGTH;

  if (isYearOnlyFormat(format)) {
    return FULL_YEAR_DATE_LENGTH;
  }

  if (isMonthOnlyFormat(format)) {
    return FULL_MONTH_DATE_LENGTH;
  }

  return FULL_DATE_LENGTH;
};

export const getMaskForFormat = (format?: string): string => {
  if (isYearOnlyFormat(format)) {
    return DEFAULT_YEAR_MASK;
  }

  if (isMonthOnlyFormat(format)) {
    return DEFAULT_MONTH_MASK;
  }

  return DEFAULT_MASK;
};

export const getDefaultDateRange = (
  format?: string,
): { defaultMin: string; defaultMax: string } => {
  if (isYearOnlyFormat(format)) {
    return {
      defaultMin: YEAR_DATE_MIN,
      defaultMax: YEAR_DATE_MAX,
    };
  }

  if (isMonthOnlyFormat(format)) {
    return {
      defaultMin: MONTH_DATE_MIN,
      defaultMax: MONTH_DATE_MAX,
    };
  }

  return {
    defaultMin: DATE_MIN,
    defaultMax: DATE_MAX,
  };
};
