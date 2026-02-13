import { VALID_DATE_FORMATS } from '@components/DatePicker/constants';

/**
 * Common date format type used by both DatePicker and DateRangePicker
 * Valid formats: 'mm/dd/yyyy', 'dd/mm/yyyy', 'mm/yyyy', 'yyyy'
 *
 * This type is shared between:
 * - DatePicker (DatePickerFormat)
 * - DateRangePicker (Format)
 * Both are identical, so we use this common type for validation
 */
export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'mm/yyyy' | 'yyyy';

/**
 * Common picker/calendar type used by both DatePicker and DateRangePicker
 * Valid types: 'days', 'months', 'years'
 *
 * This type is shared between:
 * - DateRangePicker (RangePickerType, CalendarType)
 * - DatePicker (CalendarType)
 * All are identical, so we use this common type
 */
export type PickerCalendarType = 'days' | 'months' | 'years';

/**
 * Validates if a value is a valid date format
 * Used by both DatePicker (DateWidget) and DateRangePicker (DateRangeField)
 *
 * This replaces:
 * - isValidFormat (DateRangeField)
 * - isValidDatePickerFormat (DateWidget)
 */
export const isValidDateFormat = (value: unknown): value is DateFormat => {
  return (
    typeof value === 'string' &&
    VALID_DATE_FORMATS.includes(value as DateFormat)
  );
};

/**
 * Valid output formats include:
 * - Input formats: 'mm/dd/yyyy', 'dd/mm/yyyy', 'mm/yyyy', 'yyyy'
 * - ISO formats: 'yyyy-MM-dd', 'yyyy-MM', 'yyyy'
 *
 * Used for outputFormat validation in DateRangeField and DateWidget
 */
export const isValidOutputFormat = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  // Check against valid input formats
  if (VALID_DATE_FORMATS.includes(value as DateFormat)) return true;

  // Check against ISO formats
  const isoFormats = ['yyyy-MM-dd', 'yyyy-MM', 'yyyy'];
  return isoFormats.includes(value);
};
