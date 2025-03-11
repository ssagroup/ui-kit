import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTime } from 'luxon';
import { useDatePickerMask } from './useDatePickerMask';
import { DATE_MAX, DATE_MIN, INVALID_DATE, OUT_OF_RANGE } from '../constants';
import { CalendarType, DatePickerProps } from '../types';

export const useDatePicker = ({
  dateMin = DATE_MIN,
  dateMax = DATE_MAX,
  name,
  defaultValue,
  format = 'mm/dd/yyyy',
  maskOptions,
  onOpen,
  onClose,
  onError,
  onChange,
  ...rest
}: DatePickerProps) => {
  const { clearErrors, setError, setValue } = useFormContext();
  const inputValue = useWatch({ name });
  const [isLoading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState<DateTime | undefined>();
  const [lastChangedDate, setLastChangedDate] = useState<Date | undefined>(
    undefined,
  );
  const [dateTimeForChangeEvent, setDateTimeForChangeEvent] = useState<
    DateTime | undefined
  >(undefined);
  const [currentError, setCurrentError] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    date: any;
    error?: string | null;
  }>({
    date: null,
    error: null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const splittedFormat = format.split('/');
  const [formatIndexes, setFormatIndexes] = useState({
    day: splittedFormat.findIndex((item) => item === 'dd'),
    month: splittedFormat.findIndex((item) => item === 'mm'),
    year: splittedFormat.findIndex((item) => item === 'yyyy'),
  });
  const [calendarType, setCalendarType] = useState<CalendarType>('days');
  const [calendarViewDateTime, setCalendarViewDateTime] = useState<
    DateTime | undefined
  >(undefined);
  const luxonFormat = format.replace('mm', 'MM');
  const dateMinParts = dateMin.split('/').map(Number);
  const dateMaxParts = dateMax.split('/').map(Number);

  const maskInputRef = useDatePickerMask({
    maskOptions,
    dateMaxParts,
    dateMinParts,
    formatIndexes,
  });

  const dateMaxDT = DateTime.fromObject({
    year: dateMaxParts[formatIndexes['year']],
    month: dateMaxParts[formatIndexes['month']],
    day: dateMaxParts[formatIndexes['day']],
  });
  const dateMinDT = DateTime.fromObject({
    year: dateMinParts[formatIndexes['year']],
    month: dateMinParts[formatIndexes['month']],
    day: dateMinParts[formatIndexes['day']],
  });

  const safeOnChange = (newDateTime?: DateTime) => {
    const _newDateTime = newDateTime ? newDateTime.startOf('day') : undefined;

    const _dateTimeForChangeEvent = dateTimeForChangeEvent
      ? dateTimeForChangeEvent.startOf('day')
      : undefined;
    if (_newDateTime?.toMillis() !== _dateTimeForChangeEvent?.toMillis()) {
      setDateTimeForChangeEvent(newDateTime);
      if (_newDateTime) {
        setLastChangedDate(_newDateTime.toJSDate());
        onChange?.(_newDateTime.toJSDate());
      } else {
        setLastChangedDate(undefined);
        onChange?.();
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeOnError = (date: any, error?: string | null) => {
    if (currentError.date !== date && currentError.error !== error) {
      setCurrentError({ date, error });
      onError?.(date, error);
    }
  };

  const processValue = (newValue: string) => {
    const newDateTime =
      typeof newValue === 'string' && newValue.length === 10
        ? DateTime.fromFormat(newValue, luxonFormat)
        : undefined;

    if (!newDateTime?.isValid) {
      const errorMessage = newDateTime?.invalidExplanation || INVALID_DATE;
      setError(name, { message: errorMessage }, { shouldFocus: true });
      setDateTime(undefined);
      safeOnChange();
      safeOnError?.(newValue, errorMessage);
    } else if (newDateTime !== undefined) {
      if (newDateTime < dateMinDT || newDateTime > dateMaxDT) {
        const errorMessage = OUT_OF_RANGE;
        setError(name, { message: errorMessage }, { shouldFocus: true });
        setDateTime(undefined);
        safeOnError?.(newValue, errorMessage);
        safeOnChange();
      } else {
        setDateTime(newDateTime);
        clearErrors();
        safeOnError?.(null);
        safeOnChange?.(newDateTime);
      }
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const blurredValue = event.currentTarget.value;
    if (blurredValue.length > 0) {
      processValue(blurredValue);
    }
  };

  useEffect(() => {
    if (
      typeof inputValue === 'string' &&
      inputValue.length &&
      inputValue.length < 10
    ) {
      setIsOpen(false);
      setTimeout(() => {
        maskInputRef.current.focus();
      }, 10);
    }
    let newDateTime;

    if (typeof inputValue === 'string' && inputValue.length === 10) {
      newDateTime = DateTime.fromFormat(inputValue, luxonFormat);
      setValue(name, inputValue);
      processValue(inputValue);
    }

    const newCalendarViewDateTime =
      newDateTime && newDateTime.isValid
        ? newDateTime
        : DateTime.now().set({ day: 1 });

    if (newCalendarViewDateTime < dateMinDT) {
      const { year, month, day } = dateMinDT;
      newCalendarViewDateTime.set({ year, month, day });
    }
    if (newCalendarViewDateTime > dateMaxDT) {
      const { year, month, day } = dateMaxDT;
      newCalendarViewDateTime.set({ year, month, day });
    }

    setCalendarViewDateTime(newCalendarViewDateTime);
  }, [inputValue]);

  useEffect(() => {
    if (dateTime) {
      const newValue = dateTime.toFormat(luxonFormat);
      if (inputValue !== newValue) {
        setValue(name, newValue);
      }
    }
  }, [dateTime]);

  useEffect(() => {
    if (!isLoading) {
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
        setCalendarType('days');
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const splittedFormat = format.split('/');
    setFormatIndexes({
      day: splittedFormat.findIndex((item) => item === 'dd'),
      month: splittedFormat.findIndex((item) => item === 'mm'),
      year: splittedFormat.findIndex((item) => item === 'yyyy'),
    });
  }, [format]);

  useEffect(() => {
    if ('value' in rest) {
      setValue(name, rest.value);
    }
  }, [rest.value]);

  useEffect(() => {
    if (defaultValue) {
      const newDateTime = DateTime.fromFormat(defaultValue, luxonFormat);
      if (newDateTime.isValid) {
        setDateTime(newDateTime);
        setValue(name, defaultValue);
      }
    }
    setLoading(false);
  }, []);

  return {
    formatIndexes,
    dateMinParts,
    dateMaxParts,
    dateMinDT,
    dateMaxDT,
    dateTime,
    isOpen,
    inputValue,
    calendarViewDateTime,
    maskInputRef,
    calendarType,
    lastChangedDate,
    luxonFormat,
    safeOnChange,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
    setIsOpen,
    handleBlur,
  };
};
