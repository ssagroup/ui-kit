import { createContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DateTime } from 'luxon';
import { CalendarType, DatePickerContextProps, DatePickerProps } from './types';
import {
  DEFAULT_LUXON_FORMAT,
  DEFAULT_MASK_FORMAT,
  YEAR_MAX,
  YEAR_MIN,
} from './constants';
import { useDatePickerMask } from './useDatePickerMask';

export const DatePickerContext = createContext<DatePickerContextProps>({
  format: DEFAULT_MASK_FORMAT,
  name: '',
  maskOptions: {},
  openCalendarMode: 'icon',
  inputRef: { current: null },
  isOpen: false,
  calendarType: 'days',
  value: undefined,
  dateTime: undefined,
  calendarViewDateTime: undefined,
  yearMin: YEAR_MIN,
  yearMax: YEAR_MAX,
  setIsOpen: () => {
    // no-op
  },
  setCalendarType: () => {
    // no-op
  },
  setCalendarViewDateTime: () => {
    // no-op
  },
  setDateTime: () => {
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
  const { watch, setValue } = useFormContext();
  const value = watch(rest.name);
  const { format, maskOptions } = rest;
  const inputRef = useDatePickerMask({
    format,
    maskOptions,
  });

  useEffect(() => {
    if (typeof value === 'string' && value.length < 10) {
      setIsOpen(false);
      setTimeout(() => {
        inputRef.current.focus();
      }, 10);
    }
    const newDateTime =
      typeof value === 'string' && value.length === 10
        ? // TODO: make this format flexible
          DateTime.fromFormat(value, DEFAULT_LUXON_FORMAT)
        : undefined;
    if (newDateTime !== undefined) {
      setDateTime(newDateTime);
    }

    const newCalendarViewDateTime = newDateTime
      ? newDateTime
      : DateTime.now().set({ day: 15 });

    // TODO: check it
    setCalendarViewDateTime(newCalendarViewDateTime);
  }, [value]);

  useEffect(() => {
    if (dateTime) {
      const newValue = dateTime.toFormat(DEFAULT_LUXON_FORMAT);
      if (value !== newValue) {
        setValue(rest.name, newValue);
      }
    }
  }, [dateTime]);

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
        yearMin: rest.yearMin || YEAR_MIN,
        yearMax: rest.yearMax || YEAR_MAX,
        setDateTime,
        setCalendarViewDateTime,
        setIsOpen,
        setCalendarType,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};
