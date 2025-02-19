import { forwardRef } from 'react';
import { DatePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerContent } from './components';
import { DatePickerProvider } from './DatePickerContext';

// - replace of existing values?
// - add tests
// + storybook controls - remove unused, add the specific types...
// + fix default event trigger (onClose, onChange...)
// + aria?
// + process backspace key
// + remove extra props
// + onBlur validation
// TODO: different loading logic
// + by the external value (external useFormContext + loader) - useFormResult.setValue(...)
// + by the property (instantaneous value)
// + add API (onChange, ...)
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
-displayWeekNumber - do it later
-loading - do it later
+/-onOpen
+/-onChange
+inputRef
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
+value (selected)
The selected value. Used when the component is controlled.
 */
const DatePickerInner = (
  {
    format = DEFAULT_MASK_FORMAT,
    openCalendarMode = 'icon',
    ...rest
  }: DatePickerProps,
  inputRef?: React.ForwardedRef<HTMLInputElement | null>,
) => (
  <DatePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    inputRef={inputRef}
    {...rest}>
    <DatePickerContent />
  </DatePickerProvider>
);

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  DatePickerInner,
);
