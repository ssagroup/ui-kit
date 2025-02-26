import { DatePickerProps } from '@components/DatePicker/types';

export type DateRangePickerProps = Pick<
  DatePickerProps,
  | 'dateMin'
  | 'dateMax'
  | 'disabled'
  | 'format'
  | 'helperText'
  | 'inputProps'
  | 'label'
  | 'maskOptions'
  | 'openCalendarMode'
>;
