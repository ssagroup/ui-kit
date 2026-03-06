import type {
  RangePickerType,
  DateRangePickerProps,
} from '@components/DateRangePicker/types';
import { isValidDateFormat, isValidOutputFormat } from './dateFormats';

/**
 * Props that need special handling (validation/transformation) or are RJSF-controlled
 * These are extracted explicitly and NOT spread
 */
export type NonSpreadableProps =
  | 'format'
  | 'rangePickerType'
  | 'outputFormat'
  | 'name'
  | 'onChange'
  | 'value'
  | 'defaultValue';

/**
 * Props that can be automatically spread from uiOptions
 * New props added to DateRangePickerProps will automatically be included here
 */
export type SpreadableFromUiOptions = Omit<
  DateRangePickerProps,
  NonSpreadableProps
>;

/**
 * Extract props that need transformation/validation from uiOptions
 */
export const extractTransformedProps = (uiOptions: Record<string, unknown>) => {
  const rawOutputFormat = uiOptions.outputFormat;
  const outputFormat = isValidOutputFormat(rawOutputFormat)
    ? rawOutputFormat
    : 'yyyy-MM-dd'; // Default to ISO format if invalid

  return {
    rangePickerType:
      (uiOptions.rangePickerType as RangePickerType) ||
      ('days' as RangePickerType),
    outputFormat,
    format: isValidDateFormat(uiOptions.format) ? uiOptions.format : undefined,
  };
};

/**
 * Extract props that can be spread automatically from uiOptions
 * Filters out props that need special handling
 */
export const extractSpreadableProps = (
  uiOptions: Record<string, unknown>,
): Partial<SpreadableFromUiOptions> => {
  const propsToExclude = [
    'format',
    'rangePickerType',
    'outputFormat',
    'defaultValue',
  ];
  const result: Record<string, unknown> = {};

  Object.entries(uiOptions).forEach(([key, value]) => {
    if (!propsToExclude.includes(key) && value !== undefined) {
      result[key] = value;
    }
  });

  return result as Partial<SpreadableFromUiOptions>;
};
