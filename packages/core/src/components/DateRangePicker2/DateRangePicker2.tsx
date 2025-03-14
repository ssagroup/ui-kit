import { DateRangePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerProvider';

export const DateRangePicker2 = ({
  format = DEFAULT_MASK_FORMAT,
  openCalendarMode = 'icon',
  showCalendarIcon = true,
  ...rest
}: DateRangePickerProps) => (
  <DateRangePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    showCalendarIcon={showCalendarIcon}
    {...rest}>
    <DatePickerContent />
  </DateRangePickerProvider>
);
