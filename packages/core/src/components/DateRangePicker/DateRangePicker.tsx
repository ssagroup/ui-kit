// import { forwardRef } from 'react';
import { DateRangePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';
import { DateRangePickerContent } from './components';
import { DateRangePickerProvider } from './DateRangePickerContext';

/**
 * TODO:
 * - use only one "name" attr
 * - onChange => [null, null], [DateTime, null], [null, DateTime], [DateTime, DateTime]
 * - check working of the mask for the each of fields
 */
// const DateRangePickerInner = (
export const DateRangePicker = ({
  format = DEFAULT_MASK_FORMAT,
  openCalendarMode = 'icon',
  ...rest
}: DateRangePickerProps) => (
  <DateRangePickerProvider
    format={format}
    openCalendarMode={openCalendarMode}
    {...rest}>
    <DateRangePickerContent />
  </DateRangePickerProvider>
);

// export const DateRangePicker = forwardRef<
//   HTMLInputElement,
//   DateRangePickerProps
// >(DateRangePickerInner);
