import { DatePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerContent } from './components';
import { DatePickerProvider } from './DatePickerContext';

// - process backspace key
// - storybook controls - remove unused, add the specific types...
// - replace of existing values?
// - add API (onChange, ...)
// - fix default event trigger (onClose, onChange...)
// TODO: different loading logic
// - by the external value (external useFormContext + loader) - useFormResult.setValue(...)
// - by the property (instantaneous value)
// - add tests
// +/- errors texts? keep as is? changes?
// +/- process errors and visibility of them, try 02/31/2025, for example
// +++ placement - calculate automatically - bottom-start / top-start
// + make processing dates logic for the different date formats?
// +++ which formats???
// +++ dd/mm/yyyy
// + disable "Previous month" / "Next month", if yearMin/yearMax are reached
// + add the "Label" from design
// + store available date formats as constant?

/**
-inputRef
e
-displayWeekNumber - do it later
-loading - do it later
+/-onOpen
+/-onChange
+format
+onClose
+onError
+name
+minDate
+maxDate
+disabled
+label
+defaultValue
The default value. Used when the component is not controlled.
-value (selected)
The selected value. Used when the component is controlled.
 */
export const DatePicker = ({
  format = DEFAULT_MASK_FORMAT,
  openCalendarMode = 'icon',
  ...rest
}: DatePickerProps) => (
  <DatePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    {...rest}>
    <DatePickerContent />
  </DatePickerProvider>
);
