import { useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTime } from 'luxon';
import { useMergeRefs } from '@floating-ui/react';
import { useDatePickerMask } from './useDatePickerMask';
import { INVALID_DATE, OUT_OF_RANGE, DEFAULT_MASK_FORMAT } from '../constants';
import {
  getExpectedDateLength,
  getMaskForFormat,
  getDefaultDateRange,
} from '../utils';
import {
  CalendarType,
  DateRangePickerContextProps,
  DateRangePickerProps,
  DateTimeTuple,
} from '../types';

export const useDateRangePicker = ({
  dateMin,
  dateMax,
  name: _name,
  format = DEFAULT_MASK_FORMAT,
  maskOptions,
  isOpenState = false,
  defaultValue,
  rangePickerType = 'days',
  onOpen,
  onClose,
  onError,
  onChange,
  ...rest
}: DateRangePickerProps & { isOpenState?: boolean }) => {
  const { defaultMin, defaultMax } = getDefaultDateRange(format);
  const finalDateMin = dateMin || defaultMin;
  const finalDateMax = dateMax || defaultMax;
  const inputFromRef = useRef<HTMLInputElement | null>(null);
  const inputToRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(isOpenState);
  const [status, setStatus] = useState(rest.status);
  const previousOpenState = useRef(isOpenState);

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const { clearErrors, setError, setValue, resetField, setFocus } =
    useFormContext();

  const nameFrom = `${_name}From`;
  const nameTo = `${_name}To`;

  const inputValueFrom = useWatch({ name: nameFrom });
  const inputValueTo = useWatch({ name: nameTo });

  const [dateTime, setDateTime] = useState<
    DateRangePickerContextProps['dateTime']
  >([undefined, undefined]);
  const [lastChangedDate, setLastChangedDate] = useState<
    [Date | undefined, Date | undefined]
  >([undefined, undefined]);
  const [lastFocusedElement, setLastFocusedElement] = useState<'from' | 'to'>(
    'from',
  );
  const currentIndex = lastFocusedElement === 'from' ? 0 : 1;
  const currentName = lastFocusedElement === 'from' ? nameFrom : nameTo;
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
  const splittedFormat = format.split('/');
  const [formatIndexes, setFormatIndexes] = useState({
    day: splittedFormat.findIndex((item) => item === 'dd'),
    month: splittedFormat.findIndex((item) => item === 'mm'),
    year: splittedFormat.findIndex((item) => item === 'yyyy'),
  });
  const [calendarType, setCalendarType] =
    useState<CalendarType>(rangePickerType);
  const [calendarViewDateTime, setCalendarViewDateTime] = useState<
    [DateTime | undefined, DateTime | undefined]
  >([undefined, undefined]);
  const currentCalendarViewDT =
    calendarViewDateTime[currentIndex] || DateTime.now().set({ day: 1 });
  const luxonFormat = format.replace('mm', 'MM');
  const expectedDateLength = getExpectedDateLength(format);
  const dateMinParts = finalDateMin.split('/').map(Number);
  const dateMaxParts = finalDateMax.split('/').map(Number);

  const defaultMask = getMaskForFormat(format);
  const maskInputRef = useDatePickerMask({
    maskOptions: {
      mask: defaultMask,
      ...maskOptions,
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
    const _newDateTime = newDateTime ? newDateTime.startOf('day') : undefined;

    const _dateTimeForChangeEvent = dateTimeForChangeEvent
      ? dateTimeForChangeEvent.startOf('day')
      : undefined;
    if (_newDateTime?.toMillis() !== _dateTimeForChangeEvent?.toMillis()) {
      setDateTimeForChangeEvent(newDateTime);
      if (_newDateTime) {
        const _newDateTimeJS = _newDateTime.toJSDate();
        if (lastFocusedElement === 'from') {
          setLastChangedDate([_newDateTimeJS, lastChangedDate[1]]);
          onChange?.([_newDateTimeJS, lastChangedDate[1] || null]);
        } else {
          setLastChangedDate([lastChangedDate[0], _newDateTimeJS]);
          onChange?.([lastChangedDate[0] || null, _newDateTimeJS]);
        }
      } else {
        setLastChangedDate([
          lastFocusedElement === 'from' ? undefined : lastChangedDate[0],
          lastFocusedElement === 'to' ? undefined : lastChangedDate[1],
        ]);
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

  const processValue = (newValue: string, elementName?: 'from' | 'to') => {
    const currentElementType = elementName || lastFocusedElement;
    const currentName = currentElementType === 'from' ? nameFrom : nameTo;
    const newDateTime =
      typeof newValue === 'string' && newValue.length === expectedDateLength
        ? DateTime.fromFormat(newValue, luxonFormat)
        : undefined;

    const newDateTimeIfInvalid: DateTimeTuple = [
      currentElementType === 'from' ? undefined : dateTime?.[0],
      currentElementType === 'to' ? undefined : dateTime?.[1],
    ];

    const newDateTimeIfValid: DateTimeTuple = [
      currentElementType === 'from' ? newDateTime : dateTime?.[0],
      currentElementType === 'to' ? newDateTime : dateTime?.[1],
    ];

    if (!newDateTime?.isValid) {
      const errorMessage = newDateTime?.invalidExplanation || INVALID_DATE;
      setError(currentName, { message: errorMessage }, { shouldFocus: true });
      setStatus('error');
      setDateTime(newDateTimeIfInvalid);
      safeOnError?.(newValue, errorMessage);
      safeOnChange();
    } else if (newDateTime !== undefined) {
      if (newDateTime < dateMinDT || newDateTime > dateMaxDT) {
        const errorMessage = OUT_OF_RANGE;
        setError(currentName, { message: errorMessage }, { shouldFocus: true });
        setStatus('error');
        setDateTime(newDateTimeIfInvalid);
        safeOnError?.(newValue, errorMessage);
        safeOnChange();
      } else {
        setDateTime(newDateTimeIfValid);
        clearErrors();
        setStatus('basic');
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

  const processInputValue = (
    inputValue: string,
    elementName?: 'from' | 'to',
  ) => {
    const currentElementType = elementName || lastFocusedElement;
    const currentName = currentElementType === 'from' ? nameFrom : nameTo;
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
      setValue(currentName, inputValue);
      processValue(inputValue, elementName);
    }

    const newCalendarViewDateTime =
      newDateTime && newDateTime.isValid ? newDateTime : undefined;

    if (newCalendarViewDateTime) {
      if (newCalendarViewDateTime < dateMinDT) {
        const { year, month, day } = dateMinDT;
        newCalendarViewDateTime.set({ year, month, day });
      }
      if (newCalendarViewDateTime > dateMaxDT) {
        const { year, month, day } = dateMaxDT;
        newCalendarViewDateTime.set({ year, month, day });
      }

      setCalendarViewDateTime(
        currentElementType === 'from'
          ? [newCalendarViewDateTime, calendarViewDateTime[1]]
          : [calendarViewDateTime[0], newCalendarViewDateTime],
      );
    }
  };

  useEffect(() => {
    setCalendarType(rangePickerType);
  }, [rangePickerType]);

  useEffect(() => {
    processInputValue(
      lastFocusedElement === 'from' ? inputValueFrom : inputValueTo,
    );
  }, [lastFocusedElement]);

  useEffect(() => {
    if (inputValueFrom && inputValueFrom.length === expectedDateLength) {
      processInputValue(
        lastFocusedElement === 'from' ? inputValueFrom : inputValueTo,
      );
    }
  }, [inputValueFrom]);

  useEffect(() => {
    if (inputValueTo && inputValueTo.length === expectedDateLength) {
      processInputValue(
        lastFocusedElement === 'from' ? inputValueFrom : inputValueTo,
      );
    }
  }, [inputValueTo]);

  useEffect(() => {
    const currentIndex = lastFocusedElement === 'from' ? 0 : 1;
    const currentInputValue =
      currentIndex === 0 ? inputValueFrom : inputValueTo;
    if (dateTime?.[currentIndex]) {
      const newValue = dateTime[currentIndex].toFormat(luxonFormat);
      if (currentInputValue !== newValue) {
        setValue(currentName, newValue);
      }
    }
  }, [dateTime, lastFocusedElement, currentName]);

  useEffect(() => {
    if (dateTime[0] && dateTime[1] && dateTime[0] > dateTime[1]) {
      if (lastFocusedElement === 'from') {
        resetField(nameTo);
        setDateTime([dateTime[0], undefined]);
        setLastChangedDate([dateTime[0].toJSDate(), undefined]);
        setValue(nameTo, undefined);
        setLastFocusedElement('to');

        setTimeout(() => {
          setFocus(nameTo, {
            shouldSelect: true,
          });
        }, 50);

        setIsOpen(true);
      } else {
        resetField(nameFrom);
        setDateTime([undefined, dateTime[1]]);
        setLastChangedDate([undefined, dateTime[1].toJSDate()]);
        setValue(nameFrom, undefined);
        setLastFocusedElement('from');

        setTimeout(() => {
          setFocus(nameFrom, {
            shouldSelect: true,
          });
        }, 50);

        setIsOpen(true);
      }
    }
  }, [dateTime]);

  useEffect(() => {
    if (previousOpenState.current !== isOpen) {
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
        setCalendarType(rangePickerType);
        setCalendarViewDateTime([dateTime[0], dateTime[1]]);
      }
      previousOpenState.current = isOpen;
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
    if (Array.isArray(rest.value)) {
      const newDateTimeFrom =
        typeof rest.value[0] === 'string' &&
        rest.value[0].length === expectedDateLength
          ? DateTime.fromFormat(rest.value[0], luxonFormat)
          : undefined;
      const newDateTimeTo =
        typeof rest.value[1] === 'string' &&
        rest.value[1].length === expectedDateLength
          ? DateTime.fromFormat(rest.value[1], luxonFormat)
          : undefined;

      const newDateTime: DateTimeTuple = [
        newDateTimeFrom?.isValid ? newDateTimeFrom : undefined,
        newDateTimeTo?.isValid ? newDateTimeTo : undefined,
      ];
      setDateTime(newDateTime);
      setLastChangedDate([
        newDateTime[0]?.toJSDate(),
        newDateTime[1]?.toJSDate(),
      ]);
      setValue(nameFrom, newDateTime[0]?.toFormat(luxonFormat));
      setValue(nameTo, newDateTime[1]?.toFormat(luxonFormat));
    }
  }, [rest.value]);

  useEffect(() => {
    setStatus(rest.status);
  }, [rest.status]);

  useEffect(() => {
    if (lastChangedDate[0] || lastChangedDate[1]) {
      if (lastFocusedElement === 'from' && !lastChangedDate[1]) {
        setFocus(nameTo);
      }
      if (lastFocusedElement === 'to' && !lastChangedDate[0]) {
        setFocus(nameFrom);
        inputFromRef.current?.focus();
      }
    }
  }, [lastChangedDate]);

  useEffect(() => {
    if (calendarViewDateTime[0] && !calendarViewDateTime[1]) {
      setCalendarViewDateTime([
        calendarViewDateTime[0],
        calendarViewDateTime[0],
      ]);
    }
    if (calendarViewDateTime[1] && !calendarViewDateTime[0]) {
      setCalendarViewDateTime([
        calendarViewDateTime[1],
        calendarViewDateTime[1],
      ]);
    }
  }, [calendarViewDateTime]);

  useEffect(() => {
    if (isOpenState !== isOpen) {
      setIsOpen(isOpenState);
    }
  }, [isOpenState]);

  useEffect(() => {
    if (defaultValue) {
      setValue(nameFrom, defaultValue[0]);
      setValue(nameTo, defaultValue[1]);
    }
  }, []);

  return {
    formatIndexes,
    dateMinParts,
    dateMaxParts,
    dateMinDT,
    dateMaxDT,
    dateTime,
    inputValueFrom,
    inputValueTo,
    calendarViewDateTime,
    maskInputRef,
    calendarType,
    lastChangedDate,
    luxonFormat,
    lastFocusedElement,
    nameFrom,
    nameTo,
    currentIndex,
    currentCalendarViewDT,
    isOpen,
    status,
    inputFromRef: useMergeRefs<HTMLInputElement | null>([
      maskInputRef,
      inputFromRef,
    ]),
    inputToRef: useMergeRefs<HTMLInputElement | null>([
      maskInputRef,
      inputToRef,
    ]),
    setIsOpen,
    handleSetIsOpen,
    setLastFocusedElement,
    safeOnChange,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
    handleBlur,
  };
};
