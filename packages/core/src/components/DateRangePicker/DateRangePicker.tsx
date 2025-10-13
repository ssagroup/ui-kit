import { DatePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerProvider';
import { DateRangePickerProps } from './types';
import { getFormatForRangePickerType } from './utils';

export const DateRangePicker = ({
  format,
  openCalendarMode = 'icon',
  showCalendarIcon = true,
  showStatusArea = true,
  rangePickerType = 'days',
  ...rest
}: DateRangePickerProps) => {
  const actualFormat = format || getFormatForRangePickerType(rangePickerType);

  return (
    <DateRangePickerProvider
      format={actualFormat}
      openCalendarMode={openCalendarMode}
      showCalendarIcon={showCalendarIcon}
      showStatusArea={showStatusArea}
      rangePickerType={rangePickerType}
      {...rest}>
      <DatePickerContent />
    </DateRangePickerProvider>
  );
};
