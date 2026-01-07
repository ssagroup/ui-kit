import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTime } from 'luxon';
import { useDatePickerMask } from './useDatePickerMask';
import {
  DATE_MAX,
  DATE_MIN,
  MONTH_DATE_MIN,
  MONTH_DATE_MAX,
  DEFAULT_MONTH_MASK_FORMAT,
  DEFAULT_MASK_FORMAT,
  DEFAULT_MASK,
  DEFAULT_MONTH_MASK,
  FULL_DATE_LENGTH,
  FULL_MONTH_DATE_LENGTH,
  INVALID_DATE,
  OUT_OF_RANGE,
  PICKER_TYPE,
  CALENDAR_TYPE,
} from '../constants';
import {
  CalendarType,
  DatePickerProps,
  DatePickerFormat,
  PickerType,
} from '../types';

const getFormatForPickerType = (pickerType?: PickerType): DatePickerFormat => {
  switch (pickerType) {
    case PICKER_TYPE.MONTHS:
      return DEFAULT_MONTH_MASK_FORMAT as DatePickerFormat;
    case PICKER_TYPE.DAYS:
    default:
      return DEFAULT_MASK_FORMAT as DatePickerFormat;
  }
};

const isMonthOnlyFormat = (format?: string): boolean => {
  if (!format) return false;
  const lowerFormat = format.toLowerCase();
  const hasMonth = lowerFormat.includes('mm');
  const hasYear = lowerFormat.includes('yyyy');
  const hasDay = lowerFormat.includes('dd');
  return hasMonth && hasYear && !hasDay;
};

const getExpectedDateLength = (format?: string): number => {
  if (!format) return FULL_DATE_LENGTH;
  if (isMonthOnlyFormat(format)) {
    return FULL_MONTH_DATE_LENGTH;
  }
  return FULL_DATE_LENGTH;
};

const getDefaultDateRange = (
  format?: string,
): { defaultMin: string; defaultMax: string } => {
  if (isMonthOnlyFormat(format)) {
    return {
      defaultMin: MONTH_DATE_MIN,
      defaultMax: MONTH_DATE_MAX,
    };
  }
  return {
    defaultMin: DATE_MIN,
    defaultMax: DATE_MAX,
  };
};

const getMaskForFormat = (format?: string): string => {
  if (isMonthOnlyFormat(format)) {
    return DEFAULT_MONTH_MASK;
  }
  return DEFAULT_MASK;
};

export const useDatePicker = ({
  dateMin,
  dateMax,
  name,
  defaultValue,
  format: propFormat,
  maskOptions,
  pickerType = PICKER_TYPE.DAYS,
  onOpen,
  onClose,
  onError,
  onChange,
  ...rest
}: DatePickerProps) => {
  const format: DatePickerFormat =
    propFormat || getFormatForPickerType(pickerType);
  const { defaultMin, defaultMax } = getDefaultDateRange(format);
  const finalDateMin = dateMin || defaultMin;
  const finalDateMax = dateMax || defaultMax;
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
  const [calendarType, setCalendarType] = useState<CalendarType>(
    pickerType === PICKER_TYPE.MONTHS
      ? CALENDAR_TYPE.MONTHS
      : CALENDAR_TYPE.DAYS,
  );
  const [calendarViewDateTime, setCalendarViewDateTime] = useState<
    DateTime | undefined
  >(undefined);
  const luxonFormat = format.replace('mm', 'MM');
  const expectedDateLength = getExpectedDateLength(format);
  const dateMinParts = finalDateMin.split('/').map(Number);
  const dateMaxParts = finalDateMax.split('/').map(Number);

  const defaultMask = getMaskForFormat(format);
  const maskInputRef = useDatePickerMask({
    maskOptions: {
      mask: defaultMask,
      ...(maskOptions || {}),
    },
    dateMaxParts,
    dateMinParts,
    formatIndexes,
  });

  const dateMaxDT = DateTime.fromObject({
    year: dateMaxParts[formatIndexes['year']],
    month: dateMaxParts[formatIndexes['month']],
    day: formatIndexes['day'] !== -1 ? dateMaxParts[formatIndexes['day']] : 1,
  });
  const dateMinDT = DateTime.fromObject({
    year: dateMinParts[formatIndexes['year']],
    month: dateMinParts[formatIndexes['month']],
    day: formatIndexes['day'] !== -1 ? dateMinParts[formatIndexes['day']] : 1,
  });

  const safeOnChange = (newDateTime?: DateTime) => {
    const _newDateTime = newDateTime
      ? pickerType === PICKER_TYPE.MONTHS
        ? newDateTime.startOf('month')
        : newDateTime.startOf('day')
      : undefined;

    const _dateTimeForChangeEvent = dateTimeForChangeEvent
      ? pickerType === PICKER_TYPE.MONTHS
        ? dateTimeForChangeEvent.startOf('month')
        : dateTimeForChangeEvent.startOf('day')
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
      typeof newValue === 'string' && newValue.length === expectedDateLength
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
      inputValue.length < expectedDateLength
    ) {
      setIsOpen(false);
      setTimeout(() => {
        maskInputRef.current.focus();
      }, 10);
    }
    let newDateTime;

    if (
      typeof inputValue === 'string' &&
      inputValue.length === expectedDateLength
    ) {
      newDateTime = DateTime.fromFormat(inputValue, luxonFormat);
      setValue(name, inputValue);
      processValue(inputValue);
    }

    const newCalendarViewDateTime =
      newDateTime && newDateTime.isValid
        ? newDateTime
        : pickerType === PICKER_TYPE.MONTHS
          ? DateTime.now().startOf('month')
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
        setCalendarType(
          pickerType === PICKER_TYPE.MONTHS
            ? CALENDAR_TYPE.MONTHS
            : CALENDAR_TYPE.DAYS,
        );
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
    format,
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
    pickerType,
  };
};
