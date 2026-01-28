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

/**
 * Special value to represent "Present" (ongoing/no end date) in RJSF form data.
 *
 * WHY THIS EXISTS:
 * - DateRangePicker (standalone component) uses `null` for "Present" (semantic, clean API)
 * - RJSF schemas with type: "string" reject `null` (validation error: "must be string")
 * - This magic string allows validation to pass while preserving the "Present" meaning
 *
 * DATA FLOW:
 * 1. Standalone DateRangePicker: `null` (input) → `null` (output)
 * 2. RJSF DateRangeField: `"present"` (input) → `null` (to DateRangePicker) → `null` (from DateRangePicker) → `"present"` (output)
 *
 * SCHEMA REQUIREMENT:
 * - Works with: { type: "string" } - no schema changes needed
 * - Alternative: { type: ["string", "null"] } - allows null directly, no magic string needed
 *
 * @constant {string} PRESENT_VALUE
 */
const PRESENT_VALUE = 'present';

/**
 * DateRangeField - RJSF adapter for DateRangePicker component
 *
 * PURPOSE:
 * Adapts the standalone DateRangePicker component to work within RJSF forms by:
 * - Converting between outputFormat (form storage) and inputFormat (user display)
 * - Converting null (DateRangePicker's "Present") ↔ "present" (RJSF's string value)
 * - Mapping RJSF validation errors to DateRangePicker's error display
 *
 * "PRESENT" BUTTON BEHAVIOR:
 * - When "Present" button is clicked, end date is null (meaning ongoing/no end date)
 * - This component converts null → "present" string for RJSF compatibility
 * - On reload, "present" string is converted back to null for DateRangePicker display
 *
 * USAGE:
 * ```typescript
 * // Example schemas (start/end can be optional or required based on your needs):
 *
 * // Both optional (user can leave range empty)
 * const schema1 = {
 *   type: "object",
 *   properties: {
 *     start: { type: "string" },
 *     end: { type: "string" }
 *   }
 * };
 *
 * // Only start required (common for "from date onwards")
 * const schema2 = {
 *   type: "object",
 *   properties: {
 *     start: { type: "string" },
 *     end: { type: "string" }
 *   },
 *   required: ["start"]
 * };
 *
 * // Both required (enforces complete date range or "present")
 * const schema3 = {
 *   type: "object",
 *   properties: {
 *     start: { type: "string" },
 *     end: { type: "string" }  // "present" satisfies string requirement
 *   },
 *   required: ["start", "end"]
 * };
 * ```
 */
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startErrors = (errorSchema as any)?.start?.__errors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      start?: string | null;
      end?: string | null;
    };

    // Handle case where start date exists (requirement depends on schema)
    // Note: Typically start is required for date ranges, but schema may vary
    if (start && typeof start === 'string') {
      // Convert inputFormat to Luxon format (mm → MM)
      const luxonInputFormat = inputFormat.replace(/mm/gi, 'MM');

      // Step 1: Parse start date from form data
      const startDT = DateTime.fromFormat(start, outputFormat);

      if (startDT.isValid) {
        // Step 2: Handle end date - can be a date string, PRESENT_VALUE, or undefined
        // Note: We check for PRESENT_VALUE from RJSF form data and convert to null for DateRangePicker
        if (end === PRESENT_VALUE) {
          // "present" from RJSF → null for DateRangePicker (displays "Present" in UI)
          return [startDT.toFormat(luxonInputFormat), null] as [string, null];
        } else if (end && typeof end === 'string') {
          // Parse and format end date
          const endDT = DateTime.fromFormat(end, outputFormat);
          if (endDT.isValid) {
            return [
              startDT.toFormat(luxonInputFormat),
              endDT.toFormat(luxonInputFormat),
            ] as [string, string];
          }
        }
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

  /**
   * Handles DateRangePicker changes and converts to RJSF format
   *
   * CONVERSION LOGIC:
   * - DateRangePicker returns: [Date | null, Date | null]
   * - We convert to RJSF format: { start: string | undefined, end: string | "present" | undefined }
   * - null from DateRangePicker → "present" for RJSF (allows string validation to pass)
   */
  const onDateRangeChange = (date?: [Date | null, Date | null]) => {
    const [startDate, endDate] = date || [null, null];

    const start = startDate
      ? DateTime.fromJSDate(startDate).toFormat(outputFormat)
      : undefined;

    // CRITICAL: Convert null (from DateRangePicker's "Present" button) to PRESENT_VALUE string
    // This allows RJSF schema validation to pass (type: "string" accepts "present" but not null)
    const end =
      endDate === null
        ? PRESENT_VALUE
        : endDate
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
