import { DateRangePickerProps } from './types';
import {
  DEFAULT_MASK_FORMAT,
  DEFAULT_MONTH_MASK_FORMAT,
  DEFAULT_YEAR_MASK_FORMAT,
} from './constants';
import { DatePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerProvider';

export const DateRangePicker = ({
  format,
  openCalendarMode = 'icon',
  showCalendarIcon = true,
  showStatusArea = true,
  rangePickerType = 'days',
  ...rest
}: DateRangePickerProps) => {
  const getDefaultFormat = () => {
    switch (rangePickerType) {
      case 'years':
        return DEFAULT_YEAR_MASK_FORMAT;
      case 'months':
        return DEFAULT_MONTH_MASK_FORMAT;
      default:
        return DEFAULT_MASK_FORMAT;
    }
  };

  const actualFormat = format || getDefaultFormat();

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
