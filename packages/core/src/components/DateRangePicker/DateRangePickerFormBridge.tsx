import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { DateRangePicker } from './DateRangePicker';
import type { DateRangePickerProps } from './types';
import { type DateFormat } from '@components/JsonSchemaForm/utils/dateFormats';

/**
 * Special value to represent "Present" (ongoing/no end date) in form data.
 *
 * WHY THIS EXISTS:
 * - DateRangePicker (standalone) uses `null` for "Present" (semantic, clean API)
 * - Form schemas with type: "string" reject `null` (validation error: "must be string")
 * - This magic string allows validation to pass while preserving the "Present" meaning
 *
 * DATA FLOW:
 * - Form → Bridge: end can be PRESENT_VALUE
 * - Bridge → Picker: PRESENT_VALUE becomes null
 * - Picker → Bridge: null (user clicked "Present") comes back
 * - Bridge → Form: null becomes PRESENT_VALUE for storage
 */
export const PRESENT_VALUE = 'present';

export type DateRangePickerFormBridgeValue = {
  start?: string;
  end?: string | typeof PRESENT_VALUE;
};

export type DateRangePickerFormBridgeProps = Omit<
  DateRangePickerProps,
  'defaultValue' | 'value' | 'onChange'
> & {
  /** Form value: dates in outputFormat, end can be PRESENT_VALUE for "Present" */
  value?: DateRangePickerFormBridgeValue;
  /** Fallback when value is empty (e.g. from ui:options.defaultValue) */
  defaultValue?: DateRangePickerFormBridgeValue;
  /** Called with form shape: dates in outputFormat, end is PRESENT_VALUE when "Present" */
  onChange?: (value: DateRangePickerFormBridgeValue) => void;
  /** Format used to parse value (form storage), e.g. 'yyyy-MM-dd' */
  outputFormat: string;
  /** Format used for display in the picker, e.g. 'dd/mm/yyyy' */
  inputFormat: DateFormat;
};

/**
 * DateRangePickerFormBridge - adapter between form builders and DateRangePicker
 *
 * PURPOSE:
 * - Keeps DateRangePicker "pure": it only ever sees inputFormat and null for "Present"
 * - Converts form value (outputFormat + PRESENT_VALUE string) ↔ picker value (inputFormat + null)
 * - Used by DateRangeField (RJSF); can be used by other form builders
 */

/**
 * Format conversion: form value (outputFormat) → DateRangePicker (inputFormat)
 *
 * WHY THIS EXISTS:
 * - Form stores dates in outputFormat (e.g. 'yyyy-MM-dd' ISO format for database/API)
 * - DateRangePicker expects dates in inputFormat (e.g. 'mm/dd/yyyy' for user display)
 * - We need to convert between these formats when initializing the picker
 *
 * EXAMPLE:
 * - value: { start: '2024-01-15', end: '2024-12-31' } (outputFormat: 'yyyy-MM-dd')
 * - inputFormat: 'mm/dd/yyyy'
 * - Result: ['01/15/2024', '12/31/2024'] (what DateRangePicker needs)
 *
 * PRIORITY (in defaultValue useMemo):
 * 1. value (form's current state) - preferred source
 * 2. defaultValueProp (e.g. from ui:options.defaultValue) - fallback if value is empty
 */
function formValueToPickerDefault(
  source: DateRangePickerFormBridgeValue | undefined,
  outputFormat: string,
  inputFormat: string,
): DateRangePickerProps['defaultValue'] {
  if (!source) return undefined;

  const { start, end } = source;
  const luxonOutput = outputFormat.replace(/mm/gi, 'MM');
  const luxonInput = inputFormat.replace(/mm/gi, 'MM');

  if (!start || typeof start !== 'string') {
    return undefined;
  }

  const startDT = DateTime.fromFormat(start, luxonOutput);
  if (!startDT.isValid) {
    return undefined;
  }

  const startFormatted = startDT.toFormat(luxonInput);

  if (end === PRESENT_VALUE) {
    return [startFormatted, null] as [string, null];
  }

  if (end && typeof end === 'string') {
    const endDT = DateTime.fromFormat(end, luxonOutput);
    if (endDT.isValid) {
      return [startFormatted, endDT.toFormat(luxonInput)] as [string, string];
    }
  }

  return undefined;
}

export const DateRangePickerFormBridge = ({
  value,
  defaultValue: defaultValueProp,
  onChange,
  outputFormat,
  inputFormat: inputFormatProp,
  ...pickerProps
}: DateRangePickerFormBridgeProps) => {
  const inputFormat: DateFormat = inputFormatProp;
  const defaultValue = useMemo((): DateRangePickerProps['defaultValue'] => {
    const fromValue = formValueToPickerDefault(
      value,
      outputFormat,
      inputFormatProp,
    );
    if (fromValue) return fromValue;
    return formValueToPickerDefault(
      defaultValueProp,
      outputFormat,
      inputFormatProp,
    );
  }, [value, defaultValueProp, outputFormat, inputFormatProp]);

  /**
   * Handles DateRangePicker changes and converts to form format.
   *
   * CONVERSION:
   * - Picker returns: [Date | null | undefined, Date | null | undefined] | undefined
   * - null for end date = "Present" (when isEndDatePresent === true)
   * - undefined = empty/unset (when clearing or not set)
   * - We convert to form shape: { start: string | undefined, end: string | PRESENT_VALUE | undefined }
   * - Dates are formatted with outputFormat (e.g. 'yyyy-MM-dd')
   * - null from picker (user chose "Present") → PRESENT_VALUE so form validation (type: "string") passes
   */
  const onPickerChange = (
    dates?: [Date | null | undefined, Date | null | undefined],
  ) => {
    if (!onChange) return;

    const [startDate, endDate] = dates ?? [undefined, undefined];

    const start = startDate
      ? DateTime.fromJSDate(startDate).toFormat(outputFormat)
      : undefined;

    const end: string | typeof PRESENT_VALUE | undefined =
      endDate === null
        ? PRESENT_VALUE // null means "Present" (end date only)
        : endDate
          ? DateTime.fromJSDate(endDate).toFormat(outputFormat)
          : undefined; // undefined means empty/unset

    onChange({ start, end });
  };

  const useFormResult = useForm<FieldValues>();

  return (
    <FormProvider {...useFormResult}>
      <DateRangePicker
        {...pickerProps}
        format={inputFormat}
        defaultValue={defaultValue}
        onChange={onPickerChange}
      />
    </FormProvider>
  );
};
