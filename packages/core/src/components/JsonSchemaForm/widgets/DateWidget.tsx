import { useMemo } from 'react';
import { DateTime } from 'luxon';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import {
  FormProvider,
  useForm,
  useFormContext,
  RegisterOptions,
  FieldValues,
} from 'react-hook-form';

import { DatePicker } from '@components/DatePicker';
import { PickerType } from '@components/DatePicker/types';
import {
  PICKER_TYPE,
  DEFAULT_MASK_FORMAT,
  DEFAULT_MONTH_MASK_FORMAT,
  DEFAULT_YEAR_MASK_FORMAT,
} from '@components/DatePicker/constants';
import {
  isValidDateFormat,
  isValidOutputFormat,
  type DateFormat,
} from '../utils/dateFormats';

const isValidPickerType = (value: unknown): value is PickerType => {
  return (
    typeof value === 'string' &&
    Object.values(PICKER_TYPE).includes(value as PickerType)
  );
};

const isValidString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isValidObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

export const DateWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const { value, name, uiSchema, onChange } = props;

  const parentContext = useFormContext<FieldValues>();
  const localContext = useForm<FieldValues>();
  const hookFormResult = parentContext ?? localContext;

  const uiOptions = uiSchema?.['ui:options'] || {};
  const {
    outputFormat: rawOutputFormat,
    dateMin,
    dateMax,
    format: rawFormat,
    pickerType: rawPickerType,
    validationSchema,
  } = uiOptions;

  // Validate and set defaults for formats
  const outputFormat = isValidOutputFormat(rawOutputFormat)
    ? rawOutputFormat
    : 'yyyy-MM-dd';

  const pickerType = isValidPickerType(rawPickerType)
    ? rawPickerType
    : PICKER_TYPE.DAYS;

  // Determine input format: use format prop, or default based on pickerType
  const getDefaultFormatForPickerType = (type: PickerType): DateFormat => {
    switch (type) {
      case PICKER_TYPE.MONTHS:
        return DEFAULT_MONTH_MASK_FORMAT;
      case PICKER_TYPE.YEARS:
        return DEFAULT_YEAR_MASK_FORMAT;
      case PICKER_TYPE.DAYS:
      default:
        return DEFAULT_MASK_FORMAT;
    }
  };

  const inputFormat: DateFormat = isValidDateFormat(rawFormat)
    ? rawFormat
    : getDefaultFormatForPickerType(pickerType);

  /**
   * Format conversion: formData (outputFormat) → DatePicker (inputFormat)
   *
   * WHY THIS EXISTS:
   * - Form stores dates in outputFormat (e.g., 'yyyy-MM-dd' ISO format for database/API)
   * - DatePicker expects dates in inputFormat (e.g., 'mm/dd/yyyy' for user display)
   * - We need to convert between these formats when initializing the picker
   *
   * EXAMPLE:
   * - value: '2024-01-15' (outputFormat: 'yyyy-MM-dd')
   * - inputFormat: 'mm/dd/yyyy'
   * - Result: '01/15/2024' (what DatePicker needs)
   */
  const defaultValue = useMemo(() => {
    if (!value || typeof value !== 'string') {
      return undefined;
    }

    // If formats are the same, no conversion needed
    if (outputFormat === inputFormat) {
      return value;
    }

    // Convert from outputFormat to inputFormat
    // Convert inputFormat to Luxon format (mm → MM)
    const luxonOutputFormat = outputFormat.replace(/mm/gi, 'MM');
    const luxonInputFormat = inputFormat.replace(/mm/gi, 'MM');

    const dateTime = DateTime.fromFormat(value, luxonOutputFormat);

    if (dateTime.isValid) {
      return dateTime.toFormat(luxonInputFormat);
    }

    // If parsing fails, return undefined (DatePicker will handle it)
    return undefined;
  }, [value, outputFormat, inputFormat]);

  const onDateChange = (date?: Date) => {
    const formattedDate = date
      ? DateTime.fromJSDate(date).toFormat(outputFormat)
      : undefined;

    onChange(formattedDate);
  };

  return (
    <FormProvider {...hookFormResult}>
      <DatePicker
        name={name}
        defaultValue={defaultValue}
        onChange={onDateChange}
        dateMin={isValidString(dateMin) ? dateMin : undefined}
        dateMax={isValidString(dateMax) ? dateMax : undefined}
        format={inputFormat}
        pickerType={pickerType}
        validationSchema={
          isValidObject(validationSchema)
            ? (validationSchema as RegisterOptions)
            : undefined
        }
      />
    </FormProvider>
  );
};
