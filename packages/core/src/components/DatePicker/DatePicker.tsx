import { forwardRef } from 'react';

import { DatePickerContent } from './components';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerProvider } from './DatePickerContext';
import { DatePickerProps } from './types';

const DatePickerInner = (
  {
    format = DEFAULT_MASK_FORMAT,
    openCalendarMode = 'icon',
    showCalendarIcon = true,
    ...rest
  }: DatePickerProps,
  inputRef?: React.ForwardedRef<HTMLInputElement | null>,
) => (
  <DatePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    inputRef={inputRef}
    showCalendarIcon={showCalendarIcon}
    {...rest}>
    <DatePickerContent />
  </DatePickerProvider>
);

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  DatePickerInner,
);
