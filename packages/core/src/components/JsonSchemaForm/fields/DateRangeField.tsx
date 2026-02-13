import {
  FieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import {
  DateRangePickerFormBridge,
  type DateRangePickerFormBridgeValue,
} from '@components/DateRangePicker/DateRangePickerFormBridge';
import { getFormatForRangePickerType } from '@components/DateRangePicker/utils';
import {
  extractTransformedProps,
  extractSpreadableProps,
} from '../utils/dateRangeField';
import { type DateFormat } from '../utils/dateFormats';

/**
 * DateRangeField - RJSF adapter for DateRangePicker
 *
 * Uses DateRangePickerFormBridge so that:
 * - Format conversion: formData (outputFormat) → DateRangePicker (inputFormat) happens in the bridge
 * - "Present" handling: form stores PRESENT_VALUE string; picker only sees null (see bridge)
 *
 * SCHEMA REQUIREMENT: type must be "object" with properties start and end (each typically type: "string").
 *
 * USAGE (example schemas):
 * - Both optional: { type: "object", properties: { start: { type: "string" }, end: { type: "string" } } }
 * - Only start required: same + required: ["start"]
 * - Both required (or "present" for end): same + required: ["start", "end"]  // "present" satisfies string
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startErrors = (errorSchema as any)?.start?.__errors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const endErrors = (errorSchema as any)?.end?.__errors;

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
  const inputFormat: DateFormat =
    transformedProps.format ?? getFormatForRangePickerType(rangePickerType);

  const label =
    typeof uiOptions.label === 'string'
      ? uiOptions.label
      : uiSchema?.['ui:title'] || (schema.title as string) || name;

  const isDisabled =
    typeof uiOptions.disabled === 'boolean' ? uiOptions.disabled : disabled;

  const id = idSchema.$id;

  const value = (formData || {}) as { start?: string; end?: string };

  const defaultValueFromOptions = uiOptions.defaultValue;
  const defaultValue: DateRangePickerFormBridgeValue | undefined = (() => {
    if (
      !Array.isArray(defaultValueFromOptions) ||
      defaultValueFromOptions.length !== 2 ||
      typeof defaultValueFromOptions[0] !== 'string'
    ) {
      return undefined;
    }
    const endRaw = defaultValueFromOptions[1];
    return {
      start: defaultValueFromOptions[0],
      end:
        endRaw === null || endRaw === undefined
          ? ('present' as const)
          : String(endRaw),
    };
  })();

  const allErrors = [
    ...(rawErrors ?? []),
    ...(startErrors ?? []),
    ...(endErrors ?? []),
  ];
  const hasRjsfErrors = allErrors.length > 0;
  const errorMessage = hasRjsfErrors ? allErrors.join(', ') : undefined;
  const fieldStatus = hasRjsfErrors ? 'error' : 'basic';

  return (
    <DateRangePickerFormBridge
      name={id}
      label={label}
      disabled={isDisabled}
      value={value}
      defaultValue={defaultValue}
      onChange={(v) => onChange(v as T)}
      outputFormat={outputFormat}
      inputFormat={inputFormat}
      format={inputFormat}
      rangePickerType={rangePickerType}
      status={fieldStatus}
      messages={{ error: errorMessage }}
      {...spreadableProps}
    />
  );
};
