import { createContext, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTime } from 'luxon';
import { CalendarType, DatePickerContextProps, DatePickerProps } from './types';
import {
  DATE_MAX,
  DATE_MIN,
  DEFAULT_MASK_FORMAT,
  INVALID_DATE,
  OUT_OF_RANGE,
} from './constants';
import { useDatePickerMask } from './useDatePickerMask';

// TODO: optimize context properties - do we need all of them?
// TODO: check FOCUS! +Tab!
export const DatePickerContext = createContext<DatePickerContextProps>({
  format: DEFAULT_MASK_FORMAT,
  name: '',
  maskOptions: {},
  openCalendarMode: 'icon',
  inputRef: { current: null },
  isOpen: false,
  calendarType: 'days',
  inputValue: undefined,
  dateTime: undefined,
  calendarViewDateTime: undefined,
  dateMin: DATE_MIN,
  dateMax: DATE_MAX,
  dateMinParts: DATE_MIN.split('/').map(Number),
  dateMaxParts: DATE_MAX.split('/').map(Number),
  dateMinDT: DateTime.fromFormat(DATE_MIN, DEFAULT_MASK_FORMAT),
  dateMaxDT: DateTime.fromFormat(DATE_MAX, DEFAULT_MASK_FORMAT),
  yearMinReached: false,
  yearMaxReached: false,
  formatIndexes: { day: 1, month: 0, year: 2 },
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
  const [yearMinReached, setYearMinReached] = useState(false);
  const [yearMaxReached, setYearMaxReached] = useState(false);
  const [calendarViewDateTime, setCalendarViewDateTime] = useState<
    DateTime | undefined
  >(undefined);
  const { setValue, clearErrors, setError } = useFormContext();
  const { format, maskOptions, name, onError } = rest;
  const inputValue = useWatch({ name });
  const luxonFormat = format.replace('mm', 'MM');
  const inputRef = useDatePickerMask({
    maskOptions,
  });
  const splittedFormat = format.split('/');
  const formatIndexes = {
    day: splittedFormat.findIndex((item) => item === 'dd'),
    month: splittedFormat.findIndex((item) => item === 'mm'),
    year: splittedFormat.findIndex((item) => item === 'yyyy'),
  };

  const dateMin = rest.dateMin || DATE_MIN;
  const dateMax = rest.dateMax || DATE_MAX;
  const dateMinParts = dateMin.split('/').map(Number);
  const dateMaxParts = dateMax.split('/').map(Number);

  const maxDT = DateTime.fromObject({
    year: dateMaxParts[formatIndexes['year']],
    month: dateMaxParts[formatIndexes['month']],
    day: dateMaxParts[formatIndexes['day']],
  });
  const minDT = DateTime.fromObject({
    year: dateMinParts[formatIndexes['year']],
    month: dateMinParts[formatIndexes['month']],
    day: dateMinParts[formatIndexes['day']],
  });

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const blurredValue = event.currentTarget.value;
    const newDateTime =
      typeof blurredValue === 'string' && blurredValue.length === 10
        ? DateTime.fromFormat(blurredValue, luxonFormat)
        : undefined;
    if (!newDateTime?.isValid) {
      // TODO: need to set an error only onBlur!
      setError(
        name,
        { message: newDateTime?.invalidExplanation || INVALID_DATE },
        { shouldFocus: true },
      );

      onError?.(blurredValue, newDateTime?.invalidExplanation);
    } else if (newDateTime !== undefined) {
      if (newDateTime < minDT || newDateTime > maxDT) {
        const errorMessage = OUT_OF_RANGE;
        setError(name, { message: errorMessage }, { shouldFocus: true });
        onError?.(blurredValue, errorMessage);
      } else {
        setDateTime(newDateTime);
        clearErrors();
        onError?.(null);
      }
    }
  };

  useEffect(() => {
    const nextYearDT = calendarViewDateTime?.plus({
      month: 1,
    });
    const previousYearDT = calendarViewDateTime?.minus({
      month: 1,
    });
    setYearMaxReached(
      nextYearDT ? nextYearDT.year > dateMaxParts[formatIndexes['year']] : true,
    );
    setYearMinReached(
      previousYearDT
        ? previousYearDT.year < dateMinParts[formatIndexes['year']]
        : true,
    );
  }, [calendarViewDateTime]);

  // TODO: Make common validation logic? Use it for the onBlur event either.
  useEffect(() => {
    if (typeof inputValue === 'string' && inputValue.length < 10) {
      setIsOpen(false);
      setTimeout(() => {
        inputRef.current.focus();
      }, 10);
    }
    const newDateTime =
      typeof inputValue === 'string' && inputValue.length === 10
        ? DateTime.fromFormat(inputValue, luxonFormat)
        : undefined;

    const newCalendarViewDateTime =
      newDateTime && newDateTime.isValid
        ? newDateTime
        : DateTime.now().set({ day: 1 });

    if (newCalendarViewDateTime < minDT) {
      newCalendarViewDateTime.set({
        year: minDT.year,
        month: minDT.month,
        day: minDT.day,
      });
    }
    if (newCalendarViewDateTime > maxDT) {
      newCalendarViewDateTime.set({
        year: maxDT.year,
        month: maxDT.month,
        day: maxDT.day,
      });
    }

    setCalendarViewDateTime(newCalendarViewDateTime);
    // TODO: move to the onBlur event?
    rest.onChange?.(dateTime?.toJSDate());
  }, [inputValue]);

  useEffect(() => {
    if (dateTime) {
      const newValue = dateTime.toFormat(luxonFormat);
      if (inputValue !== newValue) {
        setValue(rest.name, newValue);
      }
    }
  }, [dateTime]);

  useEffect(() => {
    isOpen ? rest.onOpen?.() : rest.onClose?.();
  }, [isOpen]);

  useEffect(() => {
    if ('value' in rest) {
      setValue(rest.name, rest.value);
    }
  }, [rest.value]);

  useEffect(() => {
    if (rest.defaultValue) {
      const newDateTime = DateTime.fromFormat(rest.defaultValue, luxonFormat);
      if (newDateTime.isValid) {
        setDateTime(newDateTime);
        setValue(rest.name, rest.defaultValue);
      }
    }
  }, []);

  return (
    <DatePickerContext.Provider
      value={{
        ...rest,
        inputRef,
        isOpen,
        calendarType,
        inputValue,
        dateTime,
        calendarViewDateTime,
        dateMin,
        dateMax,
        dateMinParts,
        dateMaxParts,
        dateMinDT: minDT,
        dateMaxDT: maxDT,
        formatIndexes,
        yearMinReached,
        yearMaxReached,
        setDateTime,
        setCalendarViewDateTime,
        setIsOpen,
        setCalendarType,
        handleBlur,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};
