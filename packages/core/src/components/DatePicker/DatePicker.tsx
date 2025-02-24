import { forwardRef } from 'react';
import { DatePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DatePickerContent } from './components';
import { DatePickerProvider } from './DatePickerContext';

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
