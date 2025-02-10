import { createContext, useState } from 'react';
import { CalendarType, DatePickerContextProps, DatePickerProps } from './types';
import { DEFAULT_FORMAT } from './constants';
import { useDatePickerMask } from './useDatePickerMask';

export const DatePickerContext = createContext<DatePickerContextProps>({
  format: DEFAULT_FORMAT,
  name: '',
  maskOptions: {},
  openCalendarMode: 'icon',
  inputRef: { current: null },
  isOpen: false,
  calendarType: 'days',
  setIsOpen: () => {
    // no-op
  },
  setCalendarType: () => {
    // no-op
  },
});

export const DatePickerProvider = ({
  children,
  ...rest
}: React.PropsWithChildren<DatePickerProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>('days');
  // Save 1st date of the month [luxon?]
  // luxon.DateTime.fromJSDate(new Date()).set({ day: 1, hour: 12 }).toFormat('DDDD')
  const { format, maskOptions } = rest;
  const inputRef = useDatePickerMask({
    format,
    maskOptions,
  });
  return (
    <DatePickerContext.Provider
      value={{
        ...rest,
        inputRef,
        isOpen,
        calendarType,
        setIsOpen,
        setCalendarType,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};
