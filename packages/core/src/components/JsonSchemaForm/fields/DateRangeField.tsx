import { DateTime } from 'luxon';
import {
  FieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { DateRangePicker } from '@components/DateRangePicker';

export const DateRangeField = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: FieldProps<T, S, F>,
) => {
  const { idSchema, uiSchema, schema, name, formData, disabled, onChange } =
    props;

  if (schema.type !== 'object') {
    throw new Error(
      'DateRangeField: schema.type must be "object" to render DateRangeField',
    );
  }

  if (!schema.properties?.start || !schema.properties?.end) {
    throw new Error(
      'DateRangeField: schema.properties.start and schema.properties.end are required to render DateRangeField',
    );
  }

  const useFormResult = useForm<FieldValues>();

  const { outputFormat = 'yyyy-MM-dd' } = uiSchema?.['ui:options'] || {};
  const title = uiSchema?.['ui:title']
    ? uiSchema['ui:title']
    : schema?.title
      ? schema.title
      : name;

  const id = idSchema.$id;
  const { start, end } = (formData || {}) as {
    start: string;
    end: string;
  };

  const onDateRangeChange = (date?: [Date | null, Date | null]) => {
    const [startDate, endDate] = date || [null, null];
    const start =
      startDate &&
      DateTime.fromJSDate(startDate).toFormat(outputFormat as string);
    const end =
      endDate && DateTime.fromJSDate(endDate).toFormat(outputFormat as string);
    const dateRangeChange = {
      ...(start && { start }),
      ...(end && { end }),
    };
    onChange(dateRangeChange as T);
  };

  return (
    <FormProvider {...useFormResult}>
      <DateRangePicker
        name={id}
        label={title}
        disabled={disabled}
        defaultValue={[start, end]}
        onChange={onDateRangeChange}
      />
    </FormProvider>
  );
};
