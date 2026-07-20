export const DEFAULT_MASK_FORMAT = 'mm/dd/yyyy';
export const DEFAULT_MONTH_MASK_FORMAT = 'mm/yyyy';
export const DEFAULT_YEAR_MASK_FORMAT = 'yyyy';
export const DEFAULT_MASK = '__/__/____';
export const DEFAULT_MONTH_MASK = '__/____';
export const DEFAULT_YEAR_MASK = '____';
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const VALID_DATE_FORMATS = [
  'mm/dd/yyyy',
  'dd/mm/yyyy',
  'mm/yyyy',
  'yyyy',
] as const;

export const DATE_MIN = '01/01/1900';
export const DATE_MAX = '01/01/2150';
export const MONTH_DATE_MIN = '01/1900';
export const MONTH_DATE_MAX = '01/2150';
export const YEAR_DATE_MIN = '1900';
export const YEAR_DATE_MAX = '2150';
export const OUT_OF_RANGE = 'The date is out of the defined range';
export const INVALID_DATE = 'Invalid date';
export const FULL_DATE_LENGTH = 10;
export const FULL_MONTH_DATE_LENGTH = 7;
export const FULL_YEAR_DATE_LENGTH = 4;

/**
 * Time support is layered on top of a date format rather than being a separate
 * set of formats, so `showTimePicker` works with any picker type without
 * widening the shared `DateFormat` union (which `JsonSchemaForm` validates
 * against).
 */
export const TIME_MASK_FORMAT_SUFFIX = ' HH:mm';
export const TIME_MASK_SUFFIX = ' __:__';
export const TIME_LENGTH = 6;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
/** 15-minute steps by default; pass `minuteStep={1}` for the Figma-literal list. */
export const DEFAULT_MINUTE_STEP = 15;

export const PICKER_TYPE = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years',
} as const;

export const CALENDAR_TYPE = {
  DAYS: 'days',
  MONTHS: 'months',
  YEARS: 'years',
} as const;
