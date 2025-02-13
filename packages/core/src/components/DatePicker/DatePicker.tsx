import { DatePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerContent } from './components';
import { DatePickerProvider } from './DatePickerContext';

// - process errors and visibility of them, try 02/31/2025, for example
// - process backspace key
// - storybook controls - remove unused, add the specific types...
// - errors texts? keep as is? changes?
// - add the "Label" from design
// - replace of existing values?
// - store available date formats as constant?
// - add API (onChange, ...)
// - fix default event trigger (onClose, onChange...)
// TODO: different loading logic
// - by the external value (external useFormContext + loader) - useFormResult.setValue(...)
// - by the property (instantaneous value)
// - add tests
// +++ placement - calculate automatically - bottom-start / top-start
// + make processing dates logic for the different date formats?
// +++ which formats???
// +++ dd/mm/yyyy
// + disable "Previous month" / "Next month", if yearMin/yearMax are reached

/**
-defaultValue
The default value. Used when the component is not controlled.
-disabled
-inputRef
-label
-minDate
-maxDate
-value (selected)
The selected value. Used when the component is controlled.
e
-displayWeekNumber - do it later
-loading - do it later
+/-onOpen
+/-onChange
+format
+onClose
+onError
+name
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
