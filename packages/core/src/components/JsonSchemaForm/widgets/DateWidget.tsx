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
import { DatePickerFormat, PickerType } from '@components/DatePicker/types';
import {
  PICKER_TYPE,
  VALID_DATE_FORMATS,
} from '@components/DatePicker/constants';

/**
 * Type guards to ensure RJSF ui:options match our DatePicker requirements
 */
const isValidDatePickerFormat = (value: unknown): value is DatePickerFormat => {
  return (
    typeof value === 'string' &&
    VALID_DATE_FORMATS.includes(value as DatePickerFormat)
  );
};

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

  /**
   * 1. Try to get parent form context.
   * 2. Always initialize a local useForm to satisfy the 'Rules of Hooks'.
   * 3. Use parentContext if available, otherwise fall back to localContext.
   */
  const parentContext = useFormContext<FieldValues>();
  const localContext = useForm<FieldValues>();
  const hookFormResult = parentContext ?? localContext;

  const uiOptions = uiSchema?.['ui:options'] || {};
  const {
    outputFormat = 'yyyy-MM-dd',
    dateMin,
    dateMax,
    format,
    pickerType,
    validationSchema,
  } = uiOptions;

  const onDateChange = (date?: Date) => {
    const formattedDate = date
      ? DateTime.fromJSDate(date).toFormat(outputFormat as string)
      : undefined;

    onChange(formattedDate);
  };

  return (
    <FormProvider {...hookFormResult}>
      <DatePicker
        name={name}
        defaultValue={value as string | undefined}
        onChange={onDateChange}
        dateMin={isValidString(dateMin) ? dateMin : undefined}
        dateMax={isValidString(dateMax) ? dateMax : undefined}
        format={isValidDatePickerFormat(format) ? format : undefined}
        pickerType={
          isValidPickerType(pickerType) ? pickerType : PICKER_TYPE.DAYS
        }
        validationSchema={
          isValidObject(validationSchema)
            ? (validationSchema as RegisterOptions)
            : undefined
        }
      />
    </FormProvider>
  );
};
