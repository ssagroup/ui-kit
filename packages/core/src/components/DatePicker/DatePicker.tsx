import { DatePickerProps } from './types';
import { DEFAULT_FORMAT } from './constants';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerContent } from './components/DatePickerContent';

// Add the "Label" from design
// placement - calculate automatically - bottom-start / top-start
// make processing dates logic for the different date formats?
export const DatePicker = ({
  name,
  format = DEFAULT_FORMAT,
  maskOptions,
  openCalendarMode = 'icon',
}: DatePickerProps) => (
  <DatePickerProvider
    format={format}
    maskOptions={maskOptions}
    name={name}
    openCalendarMode={openCalendarMode}>
    <DatePickerContent />
  </DatePickerProvider>
);
