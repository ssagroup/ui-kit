import React, { useEffect, useRef, useState } from 'react';
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
  calendarType: CalendarType;
  lastChangedDate?: [Date | undefined | null, Date | undefined | null];
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
  setLastFocusedElement: React.Dispatch<React.SetStateAction<'from' | 'to'>>;
  safeOnChange: (newDateTime?: DateTime) => void;
  setCalendarType: React.Dispatch<React.SetStateAction<CalendarType>>;
  setCalendarViewDateTime: React.Dispatch<React.SetStateAction<DateTimeTuple>>;
  setDateTime: React.Dispatch<React.SetStateAction<DateTimeTuple>>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  rangeSelectionStep: 'start' | 'end' | null;
  setRangeSelectionStep: React.Dispatch<
    React.SetStateAction<'start' | 'end' | null>
  >;
  clearInputValue: (field: 'from' | 'to') => void;
  isEndDatePresent: boolean;
  setIsEndDatePresent: React.Dispatch<React.SetStateAction<boolean>>;
  setLastChangedDate: React.Dispatch<
    React.SetStateAction<[Date | undefined | null, Date | undefined | null]>
  >;
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
  const [isEndDatePresent, setIsEndDatePresent] = useState(false);
  const [lastChangedDate, setLastChangedDate] = useState<
    [Date | undefined | null, Date | undefined | null]
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

  // Helper function to clear a field and notify form
  const clearField = (field: 'from' | 'to') => {
    const isFromField = field === 'from';
    const fieldName = isFromField ? nameFrom : nameTo;

    const newDateTime: DateTimeTuple = isFromField
      ? [undefined, dateTime[1]]
      : [dateTime[0], undefined];

    // undefined = empty/cleared, null = "Present" end date
    const newLastChangedDate: [
      Date | null | undefined,
      Date | null | undefined,
    ] = isFromField
      ? [undefined, lastChangedDate[1] ?? undefined]
      : [lastChangedDate[0] ?? undefined, undefined];

    setDateTime(newDateTime);
    setLastChangedDate(newLastChangedDate);
    setValue(fieldName, undefined);
    clearErrors(fieldName);

    if (!isFromField) {
      setIsEndDatePresent(false);
    }

    // Notify parent: undefined = cleared, null = "Present" (end date only)
    onChange?.(newLastChangedDate);
  };

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
          // Preserve null (Present) or Date, use undefined for empty
          const changeValue: [
            Date | null | undefined,
            Date | null | undefined,
          ] = [
            _newDateTimeJS,
            lastChangedDate[1] === undefined ? undefined : lastChangedDate[1],
          ];
          setLastChangedDate([_newDateTimeJS, lastChangedDate[1] ?? null]);
          onChange?.(changeValue);
        } else {
          // Setting end date: always a Date (not null/undefined)
          // Start date: preserve Date or undefined (never null)
          const changeValue: [
            Date | null | undefined,
            Date | null | undefined,
          ] = [
            lastChangedDate[0] === undefined ? undefined : lastChangedDate[0],
            _newDateTimeJS,
          ];
          setLastChangedDate([lastChangedDate[0] ?? null, _newDateTimeJS]);
          onChange?.(changeValue);
        }
      } else {
        // When clearing via safeOnChange, use undefined for cleared fields (empty/not set)
        // null is ONLY used for "Present" end date (when isEndDatePresent === true)
        const newLastChangedDate: [
          Date | null | undefined,
          Date | null | undefined,
        ] = [
          lastFocusedElement === 'from'
            ? undefined
            : (lastChangedDate[0] ?? undefined),
          lastFocusedElement === 'to'
            ? undefined
            : (lastChangedDate[1] ?? undefined),
        ];
        setLastChangedDate([
          lastFocusedElement === 'from' ? null : (lastChangedDate[0] ?? null),
          lastFocusedElement === 'to' ? null : (lastChangedDate[1] ?? null),
        ]);
        onChange?.(newLastChangedDate);
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

    // Skip parsing when "Present" is displayed (form value is empty, display shows PRESENT_VALUE)
    if (currentElementType === 'to' && isEndDatePresent) {
      return;
    }

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

    // Skip processing if "Present" is displayed (isEndDatePresent flag is true)
    // The form value is empty in this case, so we don't want to try parsing the display text as a date
    if (!isFromField && isEndDatePresent) {
      return; // Do nothing - "Present" is just a display value, not a real date
    }

    if (blurredValue.length > 0) {
      // Clear "Present" flag if user entered a date (non-empty value)
      if (!isFromField) {
        setIsEndDatePresent(false);
      }
      processValue(blurredValue, isFromField ? 'from' : 'to');
    } else {
      // User cleared the field - use shared clearField helper
      clearField(isFromField ? 'from' : 'to');
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

    // Skip parsing when "Present" is displayed (form value is empty, display shows PRESENT_VALUE)
    if (currentElementType === 'to' && isEndDatePresent) {
      return;
    }

    if (
      typeof inputValue === 'string' &&
      inputValue.length &&
      inputValue.length < expectedDateLength
    ) {
      setIsOpen(false);
    }

    // Clear "Present" flag when user types in end field
    if (currentElementType === 'to' && inputValue && inputValue.length > 0) {
      setIsEndDatePresent(false);
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

    const isUserActivelyTyping = () => {
      const isFromFocused =
        inputFromRef.current && document.activeElement === inputFromRef.current;
      const isToFocused =
        inputToRef.current && document.activeElement === inputToRef.current;
      return isFromFocused || isToFocused;
    };

    const syncDateValue = (
      targetValue: string | undefined,
      currentValue: string | undefined,
      fieldName: string,
    ) => {
      if (!targetValue) return;

      const isInputFocused = isUserActivelyTyping();
      const isEmpty = !currentValue;
      const isSynced = currentValue === targetValue;
      const isPartialInput =
        currentValue &&
        currentValue.length < expectedDateLength &&
        isInputFocused;

      if (isEmpty || (!isSynced && !isPartialInput)) {
        setValue(fieldName, targetValue);
      }
    };

    const syncEndDateValue = () => {
      // Keep form value empty when "Present" is displayed (avoids mask errors)
      // Display text is overridden in TriggerInput component
      if (isEndDatePresent) {
        // Only set to empty if it's not already empty - avoid unnecessary updates
        if (inputValueTo && inputValueTo !== '') {
          setValue(nameTo, '');
        }
        return;
      }

      const targetValue = dateTime[1]?.toFormat(luxonFormat);
      if (!targetValue) {
        // No date: keep empty (isEndDatePresent flag handles "Present" display)
        if (inputValueTo && inputValueTo !== '') {
          setValue(nameTo, '');
        }
        return;
      }

      // Sync date value (handles "Present" → date transition)
      const isInputFocused = isUserActivelyTyping();
      const isEmpty = !inputValueTo || inputValueTo === '';
      const isSynced = inputValueTo === targetValue;
      const isPartialInput =
        inputValueTo &&
        inputValueTo.length < expectedDateLength &&
        isInputFocused;
      // Detect transition from "Present" (empty form value but flag was true)
      const isTransitioningFromPresent = isEmpty && isEndDatePresent;

      if (
        isEmpty ||
        isTransitioningFromPresent ||
        (!isSynced && !isPartialInput)
      ) {
        setValue(nameTo, targetValue);
      }
    };

    // Sync start date
    const nextFromValue = dateTime[0]?.toFormat(luxonFormat);
    syncDateValue(nextFromValue, inputValueFrom, nameFrom);

    // Sync end date
    syncEndDateValue();
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
    isEndDatePresent,
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

      // Handle null end date (represents "Present")
      const isEndPresent = rest.value[1] === null;
      setIsEndDatePresent(isEndPresent);

      const newDateTime: DateTimeTuple = [
        newDateTimeFrom?.isValid ? newDateTimeFrom.startOf('day') : undefined,
        isEndPresent
          ? undefined
          : newDateTimeTo?.isValid
            ? newDateTimeTo.startOf('day')
            : undefined,
      ];
      setDateTime(newDateTime);
      setLastChangedDate([
        newDateTime[0]?.toJSDate(),
        isEndPresent ? null : newDateTime[1]?.toJSDate(),
      ]);
      // Sync calendar view with the new dates so they're visible when calendar opens
      setCalendarViewDateTime([
        newDateTime[0] || newDateTime[1] || undefined,
        newDateTime[1] || newDateTime[0] || undefined,
      ]);
      setValue(nameFrom, newDateTime[0]?.toFormat(luxonFormat));
      // Keep form value empty when "Present" (avoids mask errors, display overridden in TriggerInput)
      setValue(
        nameTo,
        isEndPresent ? '' : newDateTime[1]?.toFormat(luxonFormat),
      );
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

      // Handle null end date (represents "Present")
      const isEndPresent = defaultValue[1] === null;
      if (isEndPresent) {
        setIsEndDatePresent(true);
      }

      const newDateTime: DateTimeTuple = [
        defaultDateTimeFrom?.isValid
          ? defaultDateTimeFrom.startOf('day')
          : undefined,
        isEndPresent
          ? undefined
          : defaultDateTimeTo?.isValid
            ? defaultDateTimeTo.startOf('day')
            : undefined,
      ];

      setDateTime(newDateTime);
      setLastChangedDate([
        newDateTime[0]?.toJSDate(),
        isEndPresent ? null : newDateTime[1]?.toJSDate(),
      ]);
      // Sync calendar view with default dates so they're visible when calendar opens
      setCalendarViewDateTime([
        newDateTime[0] || newDateTime[1] || undefined,
        newDateTime[1] || newDateTime[0] || undefined,
      ]);
      setValue(nameFrom, newDateTime[0]?.toFormat(luxonFormat));
      // Keep form value empty when "Present" to avoid mask errors
      // "Present" is displayed via displayValue override in TriggerInput
      setValue(
        nameTo,
        isEndPresent ? '' : newDateTime[1]?.toFormat(luxonFormat),
      );
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
    isEndDatePresent,
    setIsEndDatePresent,
    setLastChangedDate,
    clearInputValue: clearField,
  };
};
