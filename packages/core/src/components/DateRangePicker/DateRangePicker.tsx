import { DateRangePickerProps } from './types';
import { getFormatForRangePickerType } from './utils';
import { DatePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerProvider';

export const DateRangePicker = ({
  format,
  showCalendarIcon = true,
  showStatusArea = true,
  rangePickerType = 'days',
  ...rest
}: DateRangePickerProps) => {
  const actualFormat = format || getFormatForRangePickerType(rangePickerType);

  return (
    <DateRangePickerProvider
      format={actualFormat}
      showCalendarIcon={showCalendarIcon}
      showStatusArea={showStatusArea}
      rangePickerType={rangePickerType}
      {...rest}>
      <DatePickerContent />
    </DateRangePickerProvider>
  );
};
