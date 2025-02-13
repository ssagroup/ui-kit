import { createContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DateTime } from 'luxon';
import { CalendarType, DatePickerContextProps, DatePickerProps } from './types';
import { DEFAULT_MASK_FORMAT, YEAR_MAX, YEAR_MIN } from './constants';
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
  const { watch, setValue, clearErrors, setError } = useFormContext();
  const { format, maskOptions, name, onError } = rest;
  const value = watch(name);
  const luxonFormat = format.replace('mm', 'MM');
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
        ? DateTime.fromFormat(value, luxonFormat)
        : undefined;
    if (!newDateTime?.isValid) {
      setError(
        name,
        {
          message: newDateTime?.invalidExplanation || '',
        },
        {
          shouldFocus: true,
        },
      );

      onError?.(value, {
        explanation: newDateTime?.invalidExplanation,
        reason: newDateTime?.invalidReason,
      });
    } else if (newDateTime !== undefined) {
      setDateTime(newDateTime);
      clearErrors();
      onError?.(null);
    }
    const newCalendarViewDateTime =
      newDateTime && newDateTime.isValid
        ? newDateTime
        : DateTime.now().set({ day: 1 });

    // TODO: check it
    setCalendarViewDateTime(newCalendarViewDateTime);
    // console.log('>>>value', value);
    rest.onChange?.(dateTime?.toJSDate());
  }, [value]);

  useEffect(() => {
    if (dateTime) {
      const newValue = dateTime.toFormat(luxonFormat);
      if (value !== newValue) {
        console.log('>>>setting value to ', newValue);
        setValue(rest.name, newValue);
      }
    }
    // TODO: pass a validation result as well
  }, [dateTime]);

  useEffect(() => {
    isOpen ? rest.onOpen?.() : rest.onClose?.();
  }, [isOpen]);

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
