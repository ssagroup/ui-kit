import { DatePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerContent } from './components/DatePickerContent';

// - process errors and visibility of them, try 02/31/2025, for example
// - add the "Label" from design
// - placement - calculate automatically - bottom-start / top-start
// - make processing dates logic for the different date formats?
// --- which formats???
// - disable "Previous month" / "Next month", if yearMin/yearMax are reached
// - store available date formats as constant?
// - add API (onChange, ...)
// TODO: different loading logic
// - by the external value (external useFormContext + loader) - useFormResult.setValue(...)
// - by the property (instantaneous value)
// - add tests
export const DatePicker = ({
  name,
  format = DEFAULT_MASK_FORMAT,
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
