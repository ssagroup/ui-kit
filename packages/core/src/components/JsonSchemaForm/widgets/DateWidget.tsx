import { DateTime } from 'luxon';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { DatePicker } from '@components/DatePicker';

export const DateWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const { value, name, uiSchema, onChange } = props;
  const useFormResult = useForm<FieldValues>();

  const { outputFormat = 'yyyy-MM-dd' } = uiSchema?.['ui:options'] || {};

  const onDateChange = (date?: Date) => {
    const formattedDate =
      date && DateTime.fromJSDate(date).toFormat(outputFormat as string);
    onChange(formattedDate);
  };

  return (
    <FormProvider {...useFormResult}>
      <DatePicker name={name} defaultValue={value} onChange={onDateChange} />
    </FormProvider>
  );
};
