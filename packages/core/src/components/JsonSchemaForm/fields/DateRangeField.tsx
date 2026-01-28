import { useMemo } from 'react';
import { DateTime } from 'luxon';
import {
  FieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { DateRangePicker } from '@components/DateRangePicker';
import { getFormatForRangePickerType } from '@components/DateRangePicker/utils';
import {
  extractTransformedProps,
  extractSpreadableProps,
} from '../utils/dateRangeField';

export const DateRangeField = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: FieldProps<T, S, F>,
) => {
  const {
    idSchema,
    uiSchema,
    schema,
    name,
    formData,
    disabled,
    onChange,
    rawErrors,
    errorSchema,
  } = props;

  // Extract nested errors from errorSchema for start/end fields
  const startErrors = (errorSchema as any)?.start?.__errors;
  const endErrors = (errorSchema as any)?.end?.__errors;

  // 1. Schema Guard - return null instead of throwing to prevent form crashes
  if (
    schema.type !== 'object' ||
    !schema.properties?.start ||
    !schema.properties?.end
  ) {
    console.error(
      'DateRangeField: schema.type must be "object" with start/end properties',
    );
    return null;
  }

  const uiOptions = uiSchema?.['ui:options'] || {};
  const transformedProps = extractTransformedProps(uiOptions);
  const spreadableProps = extractSpreadableProps(uiOptions);
  const { rangePickerType, outputFormat } = transformedProps;
  const inputFormat =
    transformedProps.format ?? getFormatForRangePickerType(rangePickerType);

  // Label can be overridden from ui:options, otherwise use ui:title or schema.title
  const label =
    typeof uiOptions.label === 'string'
      ? uiOptions.label
      : uiSchema?.['ui:title'] || (schema.title as string) || name;

  // Disabled can be overridden from ui:options, otherwise use form state
  const isDisabled =
    typeof uiOptions.disabled === 'boolean' ? uiOptions.disabled : disabled;

  const id = idSchema.$id;

  /**
   * Format conversion: formData (outputFormat) → DateRangePicker (inputFormat)
   *
   * WHY THIS EXISTS:
   * - Form stores dates in outputFormat (e.g., 'yyyy-MM-dd' ISO format for database/API)
   * - DateRangePicker expects dates in inputFormat (e.g., 'mm/dd/yyyy' for user display)
   * - We need to convert between these formats when initializing the picker
   *
   * EXAMPLE:
   * - formData: { start: '2024-01-15', end: '2024-12-31' } (outputFormat: 'yyyy-MM-dd')
   * - inputFormat: 'mm/dd/yyyy'
   * - Result: ['01/15/2024', '12/31/2024'] (what DateRangePicker needs)
   *
   * PRIORITY:
   * 1. formData (form's current state) - preferred source
   * 2. ui:options.defaultValue - fallback if formData is empty
   */
  const defaultValue = useMemo(() => {
    // First try formData (form's current state)
    const { start, end } = (formData || {}) as {
      start?: string;
      end?: string;
    };

    if (start && end && typeof start === 'string' && typeof end === 'string') {
      // Convert inputFormat to Luxon format (mm → MM)
      const luxonInputFormat = inputFormat.replace(/mm/gi, 'MM');

      // Step 1: Parse formData strings (in outputFormat) into DateTime objects
      const startDT = DateTime.fromFormat(start, outputFormat);
      const endDT = DateTime.fromFormat(end, outputFormat);

      // Step 2: Convert DateTime objects back to strings, but in inputFormat
      if (startDT.isValid && endDT.isValid) {
        return [
          startDT.toFormat(luxonInputFormat),
          endDT.toFormat(luxonInputFormat),
        ] as [string, string];
      }
    }

    // Fallback to defaultValue from ui:options if formData is not available
    const defaultValueFromOptions = uiOptions.defaultValue;
    if (
      Array.isArray(defaultValueFromOptions) &&
      defaultValueFromOptions.length === 2 &&
      typeof defaultValueFromOptions[0] === 'string' &&
      typeof defaultValueFromOptions[1] === 'string'
    ) {
      return defaultValueFromOptions as [string, string];
    }

    return undefined;
  }, [formData, inputFormat, outputFormat, uiOptions.defaultValue]);

  // NOTE: DateRangePicker requires FormProvider because it uses useFormContext() internally
  // Each DateRangeField creates its own isolated form context for the picker's internal state
  // This is a known limitation - multiple DateRangeFields in one form will have separate contexts
  const useFormResult = useForm<FieldValues>();

  const onDateRangeChange = (date?: [Date | null, Date | null]) => {
    const [startDate, endDate] = date || [null, null];

    const start = startDate
      ? DateTime.fromJSDate(startDate).toFormat(outputFormat)
      : undefined;
    const end = endDate
      ? DateTime.fromJSDate(endDate).toFormat(outputFormat)
      : undefined;

    onChange({ start, end } as T);
  };

  // Convert RJSF errors to messages for DateRangePicker
  // For object fields with nested properties (start/end), errors are in errorSchema not rawErrors
  const allErrors = [
    ...(rawErrors ?? []),
    ...(startErrors ?? []),
    ...(endErrors ?? []),
  ];

  const hasRjsfErrors = allErrors.length > 0;
  const errorMessage = hasRjsfErrors ? allErrors.join(', ') : undefined;
  const fieldStatus = hasRjsfErrors ? 'error' : 'basic';

  return (
    <FormProvider {...useFormResult}>
      <DateRangePicker
        name={id}
        label={label}
        disabled={isDisabled}
        defaultValue={defaultValue}
        onChange={onDateRangeChange}
        format={inputFormat}
        rangePickerType={rangePickerType}
        status={fieldStatus}
        messages={{
          error: errorMessage,
        }}
        {...spreadableProps}
      />
    </FormProvider>
  );
};
