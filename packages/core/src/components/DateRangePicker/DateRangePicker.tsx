import { DateRangePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerProvider';

export const DateRangePicker = ({
  format = DEFAULT_MASK_FORMAT,
  openCalendarMode = 'icon',
  showCalendarIcon = true,
  showStatusArea = true,
  ...rest
}: DateRangePickerProps) => (
  <DateRangePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    showCalendarIcon={showCalendarIcon}
    showStatusArea={showStatusArea}
    {...rest}>
    <DatePickerContent />
  </DateRangePickerProvider>
);
