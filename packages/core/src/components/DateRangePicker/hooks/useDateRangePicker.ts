import { useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTime } from 'luxon';
import { useMergeRefs } from '@floating-ui/react';
import { useDatePickerMask } from './useDatePickerMask';
import { INVALID_DATE, OUT_OF_RANGE } from '../constants';
import {
  getExpectedDateLength,
  getMaskForFormat,
  getDefaultDateRange,
  getFormatForRangePickerType,
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
  format: propFormat,
  maskOptions,
  isOpenState = false,
  defaultValue,
  rangePickerType = 'days',
  onOpen,
  onClose,
  onError,
  onChange,
  ...rest
}: DateRangePickerProps & { isOpenState?: boolean }): {
  formatIndexes: {
    day: number;
    month: number;
    year: number;
  };
  dateMinParts: number[];
  dateMaxParts: number[];
  dateMinDT: DateTime;
  dateMaxDT: DateTime;
  dateTime: DateTimeTuple;
  inputValueFrom?: string;
  inputValueTo?: string;
  calendarViewDateTime: DateTimeTuple;
  maskInputRef: ReturnType<typeof useDatePickerMask>;
  calendarType: CalendarType;
  lastChangedDate?: [Date | undefined, Date | undefined];
  luxonFormat: string;
  lastFocusedElement: 'from' | 'to';
  nameFrom: string;
  nameTo: string;
  currentIndex: number;
  currentCalendarViewDT: DateTime;
  isOpen: boolean;
  status?: 'error' | 'success' | 'basic';
  inputFromRef: ReturnType<typeof useMergeRefs<HTMLInputElement | null>>;
  inputToRef: ReturnType<typeof useMergeRefs<HTMLInputElement | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSetIsOpen: (open: boolean) => void;
  setLastFocusedElement: React.Dispatch<React.SetStateAction<'from' | 'to'>>;
  safeOnChange: (newDateTime?: DateTime) => void;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
  setCalendarViewDateTime: React.Dispatch<React.SetStateAction<DateTimeTuple>>;
  setDateTime: React.Dispatch<React.SetStateAction<DateTimeTuple>>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
} => {
  const format = propFormat || getFormatForRangePickerType(rangePickerType);
  const { defaultMin, defaultMax } = getDefaultDateRange(format);
  const finalDateMin = dateMin || defaultMin;
  const finalDateMax = dateMax || defaultMax;
  const inputFromRef = useRef<HTMLInputElement | null>(null);
  const inputToRef = useRef<HTMLInputElement | null>(null);
  const previousRangePickerType = useRef(rangePickerType);
  const [isOpen, setIsOpen] = useState(isOpenState);
  const [status, setStatus] = useState(rest.status);
  const previousOpenState = useRef(isOpenState);
  const previousDateTime = useRef<DateTimeTuple>([undefined, undefined]);
  const defaultValueProcessed = useRef(false);

  const { clearErrors, setError, setValue } = useFormContext();

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
  const [rangeSelectionStep, setRangeSelectionStep] = useState<
    'start' | 'end' | null
  >(null);
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
  // separate mask refs per input to prevent focus/typing conflicts
  const maskInputRefFrom = useDatePickerMask({
    maskOptions: {
      mask: defaultMask,
      ...(maskOptions || {}),
    },
  });
  const maskInputRefTo = useDatePickerMask({
    maskOptions: {
      mask: defaultMask,
      ...(maskOptions || {}),
    },
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
      setError(currentName, { message: errorMessage }, { shouldFocus: false });
      setStatus('error');
      setDateTime(newDateTimeIfInvalid);
      safeOnError?.(newValue, errorMessage);
      safeOnChange();
    } else if (newDateTime !== undefined) {
      if (newDateTime < dateMinDT || newDateTime > dateMaxDT) {
        const errorMessage = OUT_OF_RANGE;
        setError(
          currentName,
          { message: errorMessage },
          { shouldFocus: false },
        );
        setStatus('error');
        setDateTime(newDateTimeIfInvalid);
        safeOnError?.(newValue, errorMessage);
        safeOnChange();
      } else {
        setDateTime(newDateTimeIfValid);
        // Update calendar view to reflect the manually entered date
        let adjustedDateTime = newDateTime.startOf('day');
        if (adjustedDateTime < dateMinDT) {
          const { year, month, day } = dateMinDT;
          adjustedDateTime = adjustedDateTime.set({ year, month, day });
        }
        if (adjustedDateTime > dateMaxDT) {
          const { year, month, day } = dateMaxDT;
          adjustedDateTime = adjustedDateTime.set({ year, month, day });
        }
        setCalendarViewDateTime(
          currentElementType === 'from'
            ? [adjustedDateTime, calendarViewDateTime[1] || adjustedDateTime]
            : [calendarViewDateTime[0] || adjustedDateTime, adjustedDateTime],
        );
        clearErrors();
        setStatus('basic');
        safeOnError?.(null);
        safeOnChange?.(newDateTime);
      }
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const blurredValue = event.currentTarget.value;
    const fieldName = event.currentTarget.name;
    const isFromField = fieldName === nameFrom;

    if (blurredValue.length > 0) {
      processValue(blurredValue, isFromField ? 'from' : 'to');
    } else {
      // User cleared the field - clear the corresponding dateTime
      setDateTime((prev) =>
        isFromField ? [undefined, prev[1]] : [prev[0], undefined],
      );
      setLastChangedDate((prev) =>
        isFromField ? [undefined, prev[1]] : [prev[0], undefined],
      );
      setValue(fieldName, undefined);
      clearErrors(fieldName);
    }
  };

  const processInputValue = (
    inputValue: string,
    elementName?: 'from' | 'to',
  ) => {
    const currentElementType = elementName || lastFocusedElement;
    const currentName = currentElementType === 'from' ? nameFrom : nameTo;
    const currentWatchedValue =
      currentElementType === 'from' ? inputValueFrom : inputValueTo;
    if (
      typeof inputValue === 'string' &&
      inputValue.length &&
      inputValue.length < expectedDateLength
    ) {
      setIsOpen(false);
    }
    let newDateTime;

    if (
      typeof inputValue === 'string' &&
      inputValue.length === expectedDateLength
    ) {
      newDateTime = DateTime.fromFormat(inputValue, luxonFormat);
      // Avoid redundant setValue to prevent React Hook Form update loops
      if (currentWatchedValue !== inputValue) {
        setValue(currentName, inputValue);
      }
      // Do NOT validate immediately here to avoid blocking mid-edit scenarios and feedback loops.
      // Validation will happen on blur explicitly.
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
    // Only sync when dateTime actually changes (from calendar selection or programmatic change)
    // Don't sync when only inputValue changes (user typing)
    const dateTimeChanged =
      previousDateTime.current[0]?.toMillis() !== dateTime[0]?.toMillis() ||
      previousDateTime.current[1]?.toMillis() !== dateTime[1]?.toMillis();

    // Initialize on first run
    if (
      previousDateTime.current[0] === undefined &&
      previousDateTime.current[1] === undefined &&
      (dateTime[0] !== undefined || dateTime[1] !== undefined)
    ) {
      previousDateTime.current = [dateTime[0], dateTime[1]];
      // Continue to sync on initialization
    } else if (!dateTimeChanged) {
      // dateTime hasn't changed, don't sync (user is typing)
      return;
    } else {
      // Update previous dateTime
      previousDateTime.current = [dateTime[0], dateTime[1]];
    }

    const nextFromValue = dateTime[0]?.toFormat(luxonFormat);
    if (nextFromValue) {
      // Sync dateTime to form when dateTime changed (calendar selection)
      // Don't overwrite if user is actively typing (input is focused and partial)
      const isInputFocused =
        (inputFromRef.current &&
          document.activeElement === inputFromRef.current) ||
        (inputToRef.current && document.activeElement === inputToRef.current);

      if (!inputValueFrom) {
        // Input is empty - sync from dateTime
        setValue(nameFrom, nextFromValue);
      } else if (inputValueFrom === nextFromValue) {
        // Already in sync - no action needed
      } else if (inputValueFrom.length < expectedDateLength && isInputFocused) {
        // User is actively typing partial input - don't overwrite
      } else {
        // dateTime changed (calendar selection) - sync to form
        setValue(nameFrom, nextFromValue);
      }
    }

    const nextToValue = dateTime[1]?.toFormat(luxonFormat);
    if (nextToValue) {
      // Sync dateTime to form when dateTime changed (calendar selection)
      // Don't overwrite if user is actively typing (input is focused and partial)
      const isInputFocused =
        (inputFromRef.current &&
          document.activeElement === inputFromRef.current) ||
        (inputToRef.current && document.activeElement === inputToRef.current);

      if (!inputValueTo) {
        // Input is empty - sync from dateTime
        setValue(nameTo, nextToValue);
      } else if (inputValueTo === nextToValue) {
        // Already in sync - no action needed
      } else if (inputValueTo.length < expectedDateLength && isInputFocused) {
        // User is actively typing partial input - don't overwrite
      } else {
        // dateTime changed (calendar selection) - sync to form
        setValue(nameTo, nextToValue);
      }
    }
  }, [
    dateTime,
    inputValueFrom,
    inputValueTo,
    luxonFormat,
    nameFrom,
    nameTo,
    setValue,
    expectedDateLength,
    inputFromRef,
    inputToRef,
  ]);

  useEffect(() => {
    if (dateTime[0] && dateTime[1] && dateTime[0] > dateTime[1]) {
      // When dates are in reverse order, swap them silently
      // Calendar only opens via user click on icon button, not automatically
      if (lastFocusedElement === 'from') {
        setDateTime([dateTime[0], undefined]);
        setLastChangedDate([dateTime[0].toJSDate(), undefined]);
        setValue(nameTo, undefined);
      } else {
        setDateTime([undefined, dateTime[1]]);
        setLastChangedDate([undefined, dateTime[1].toJSDate()]);
        setValue(nameFrom, undefined);
      }
    }
  }, [dateTime, lastFocusedElement, nameFrom, nameTo, setValue]);

  useEffect(() => {
    if (previousOpenState.current !== isOpen) {
      if (isOpen) {
        onOpen?.();
        setRangeSelectionStep('start');
        setLastFocusedElement('from');
        // Sync calendar view with current dateTime when opening
        // This ensures preselected dates are visible in the calendar
        if (dateTime[0] || dateTime[1]) {
          setCalendarViewDateTime([
            dateTime[0] || dateTime[1] || DateTime.now().set({ day: 1 }),
            dateTime[1] || dateTime[0] || DateTime.now().set({ day: 1 }),
          ]);
        }
      } else {
        onClose?.();
        setRangeSelectionStep(null);
        setCalendarType(rangePickerType);
        setCalendarViewDateTime([dateTime[0], dateTime[1]]);
      }
      previousOpenState.current = isOpen;
    }
  }, [isOpen, dateTime, rangePickerType, onOpen, onClose]);

  useEffect(() => {
    const splittedFormat = format.split('/');
    setFormatIndexes({
      day: splittedFormat.findIndex((item) => item === 'dd'),
      month: splittedFormat.findIndex((item) => item === 'mm'),
      year: splittedFormat.findIndex((item) => item === 'yyyy'),
    });
  }, [format]);

  useEffect(() => {
    if (previousRangePickerType.current !== rangePickerType) {
      if (dateTime[0] || dateTime[1]) {
        const newLuxonFormat = format.replace('mm', 'MM');

        if (dateTime[0]) {
          setValue(nameFrom, dateTime[0].toFormat(newLuxonFormat));
        }
        if (dateTime[1]) {
          setValue(nameTo, dateTime[1].toFormat(newLuxonFormat));
        }
      }
      previousRangePickerType.current = rangePickerType;
    }
  }, [rangePickerType, format, dateTime, nameFrom, nameTo, setValue]);

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
        newDateTimeFrom?.isValid ? newDateTimeFrom.startOf('day') : undefined,
        newDateTimeTo?.isValid ? newDateTimeTo.startOf('day') : undefined,
      ];
      setDateTime(newDateTime);
      setLastChangedDate([
        newDateTime[0]?.toJSDate(),
        newDateTime[1]?.toJSDate(),
      ]);
      // Sync calendar view with the new dates so they're visible when calendar opens
      setCalendarViewDateTime([
        newDateTime[0] || newDateTime[1] || undefined,
        newDateTime[1] || newDateTime[0] || undefined,
      ]);
      setValue(nameFrom, newDateTime[0]?.toFormat(luxonFormat));
      setValue(nameTo, newDateTime[1]?.toFormat(luxonFormat));
    }
  }, [
    rest.value,
    expectedDateLength,
    luxonFormat,
    nameFrom,
    nameTo,
    setValue,
    _name,
  ]);

  useEffect(() => {
    setStatus(rest.status);
  }, [rest.status]);

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
    // Only process defaultValue once on mount to avoid re-processing
    if (Array.isArray(defaultValue) && !defaultValueProcessed.current) {
      const defaultDateTimeFrom =
        typeof defaultValue[0] === 'string' &&
        defaultValue[0].length === expectedDateLength
          ? DateTime.fromFormat(defaultValue[0], luxonFormat)
          : undefined;
      const defaultDateTimeTo =
        typeof defaultValue[1] === 'string' &&
        defaultValue[1].length === expectedDateLength
          ? DateTime.fromFormat(defaultValue[1], luxonFormat)
          : undefined;

      const newDateTime: DateTimeTuple = [
        defaultDateTimeFrom?.isValid
          ? defaultDateTimeFrom.startOf('day')
          : undefined,
        defaultDateTimeTo?.isValid
          ? defaultDateTimeTo.startOf('day')
          : undefined,
      ];

      setDateTime(newDateTime);
      setLastChangedDate([
        newDateTime[0]?.toJSDate(),
        newDateTime[1]?.toJSDate(),
      ]);
      // Sync calendar view with default dates so they're visible when calendar opens
      setCalendarViewDateTime([
        newDateTime[0] || newDateTime[1] || undefined,
        newDateTime[1] || newDateTime[0] || undefined,
      ]);
      setValue(nameFrom, newDateTime[0]?.toFormat(luxonFormat));
      setValue(nameTo, newDateTime[1]?.toFormat(luxonFormat));
      defaultValueProcessed.current = true;
    }
  }, [
    defaultValue,
    expectedDateLength,
    luxonFormat,
    nameFrom,
    nameTo,
    setCalendarViewDateTime,
    setValue,
    _name,
  ]);

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
      maskInputRefFrom,
      inputFromRef,
    ]),
    inputToRef: useMergeRefs<HTMLInputElement | null>([
      maskInputRefTo,
      inputToRef,
    ]),
    setIsOpen,
    setLastFocusedElement,
    safeOnChange,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
    handleBlur,
    rangeSelectionStep,
    setRangeSelectionStep,
    clearInputValue: (field: 'from' | 'to') => {
      const targetName = field === 'from' ? nameFrom : nameTo;
      clearErrors(targetName);
      setValue(targetName, undefined);
      setDateTime((prev) =>
        field === 'from' ? [undefined, prev[1]] : [prev[0], undefined],
      );
      setLastChangedDate((prev) =>
        field === 'from' ? [undefined, prev[1]] : [prev[0], undefined],
      );
    },
  };
};
