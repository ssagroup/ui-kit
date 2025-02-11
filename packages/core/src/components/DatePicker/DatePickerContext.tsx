import { createContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DateTime } from 'luxon';
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
  value: undefined,
  dateTime: undefined,
  calendarViewDateTime: undefined,
  setIsOpen: () => {
    // no-op
  },
  setCalendarType: () => {
    // no-op
  },
  setCalendarViewDateTime: () => {
    // no-op
  },
});

export const DatePickerProvider = ({
  children,
  ...rest
}: React.PropsWithChildren<DatePickerProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>('days');
  const [dateTime, setDateTime] = useState<DateTime | undefined>(undefined);
  const [calendarViewDateTime, setCalendarViewDateTime] = useState<
    DateTime | undefined
  >(undefined);
  const { watch } = useFormContext();
  const value = watch(rest.name);
  // Save 1st date of the month [luxon?]
  // luxon.DateTime.fromJSDate(new Date()).set({ day: 1, hour: 12 }).toFormat('DDDD')
  const { format, maskOptions } = rest;
  const inputRef = useDatePickerMask({
    format,
    maskOptions,
  });

  useEffect(() => {
    const newDateTime =
      typeof value === 'string'
        ? // TODO: make this format flexible
          DateTime.fromFormat(value, 'MM/dd/yyyy')
        : undefined;
    setDateTime(newDateTime);

    const newCalendarViewDateTime = newDateTime
      ? newDateTime.set({ day: 15 })
      : DateTime.now().set({ day: 15 });

    // TODO: check it
    setCalendarViewDateTime(newCalendarViewDateTime);
  }, [value]);

  return (
    <DatePickerContext.Provider
      value={{
        ...rest,
        inputRef,
        isOpen,
        calendarType,
        value,
        dateTime,
        calendarViewDateTime,
        setCalendarViewDateTime,
        setIsOpen,
        setCalendarType,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};
