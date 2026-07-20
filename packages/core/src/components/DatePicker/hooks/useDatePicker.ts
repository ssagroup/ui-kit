import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { DateTime } from 'luxon';
import { isNill } from '@ssa-ui-kit/utils';
import { useDatePickerMask } from './useDatePickerMask';
import {
  DATE_MAX,
  DATE_MIN,
  MONTH_DATE_MIN,
  MONTH_DATE_MAX,
  YEAR_DATE_MIN,
  YEAR_DATE_MAX,
  DEFAULT_MONTH_MASK_FORMAT,
  DEFAULT_YEAR_MASK_FORMAT,
  DEFAULT_MASK_FORMAT,
  DEFAULT_MASK,
  DEFAULT_MONTH_MASK,
  DEFAULT_YEAR_MASK,
  FULL_DATE_LENGTH,
  FULL_MONTH_DATE_LENGTH,
  FULL_YEAR_DATE_LENGTH,
  INVALID_DATE,
  OUT_OF_RANGE,
  PICKER_TYPE,
  CALENDAR_TYPE,
  TIME_MASK_SUFFIX,
  TIME_MASK_FORMAT_SUFFIX,
  TIME_LENGTH,
} from '../constants';
import { CalendarType, DatePickerProps, DatePickerFormat } from '../types';

const CONFIG = {
  [PICKER_TYPE.DAYS]: {
    format: DEFAULT_MASK_FORMAT,
    mask: DEFAULT_MASK,
    length: FULL_DATE_LENGTH,
    min: DATE_MIN,
    max: DATE_MAX,
    calendar: CALENDAR_TYPE.DAYS,
    unit: 'day' as const,
  },
  [PICKER_TYPE.MONTHS]: {
    format: DEFAULT_MONTH_MASK_FORMAT,
    mask: DEFAULT_MONTH_MASK,
    length: FULL_MONTH_DATE_LENGTH,
    min: MONTH_DATE_MIN,
    max: MONTH_DATE_MAX,
    calendar: CALENDAR_TYPE.MONTHS,
    unit: 'month' as const,
  },
  [PICKER_TYPE.YEARS]: {
    format: DEFAULT_YEAR_MASK_FORMAT,
    mask: DEFAULT_YEAR_MASK,
    length: FULL_YEAR_DATE_LENGTH,
    min: YEAR_DATE_MIN,
    max: YEAR_DATE_MAX,
    calendar: CALENDAR_TYPE.YEARS,
    unit: 'year' as const,
  },
};

const getNumberAtIndex = (parts: number[], index: number, fallback: number) =>
  index >= 0 && !isNill(parts[index]) ? parts[index] : fallback;

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
  value: externalValue,
  showTimePicker = false,
}: DatePickerProps) => {
  const { clearErrors, setError, setValue } = useFormContext();
  const inputValue = useWatch({ name });

  const config = useMemo(() => {
    const base = CONFIG[pickerType] || CONFIG[PICKER_TYPE.DAYS];

    if (!showTimePicker) return base;

    // Time is layered onto the picker's own config rather than being a fourth
    // picker type, so `HH:mm` composes with days, months, or years. The unit
    // moves to 'minute' so emitted values stop being floored to midnight.
    return {
      ...base,
      mask: `${base.mask}${TIME_MASK_SUFFIX}`,
      length: base.length + TIME_LENGTH,
      unit: 'minute' as const,
    };
  }, [pickerType, showTimePicker]);

  // The date half of the format, kept separate because `formatIndexes` and the
  // min/max parsing below both split on '/' and would choke on a time suffix.
  const dateFormat = (propFormat || config.format) as DatePickerFormat;
  const format = showTimePicker
    ? `${dateFormat}${TIME_MASK_FORMAT_SUFFIX}`
    : dateFormat;
  const luxonFormat = useMemo(() => {
    // Only the date half may be uppercased — `mm` in `HH:mm` is minutes, and
    // a blanket /mm/gi replace would turn it into a month token.
    const luxonDate = dateFormat.replace(/mm/gi, 'MM');

    return showTimePicker
      ? `${luxonDate}${TIME_MASK_FORMAT_SUFFIX}`
      : luxonDate;
  }, [dateFormat, showTimePicker]);

  const [isLoading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState<DateTime | undefined>();
  const [lastChangedDate, setLastChangedDate] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType>(
    config.calendar,
  );
  const [calendarViewDateTime, setCalendarViewDateTime] = useState<
    DateTime | undefined
  >();

  const lastProcessedValueRef = useRef<string>('');
  const lastEmittedTsRef = useRef<number | null>(null);
  const lastExternalValueRef = useRef<string | undefined>(undefined);
  const lastErrorRef = useRef<{
    date: string | null | undefined;
    error?: string | null;
  }>({
    date: null,
    error: null,
  });
  const wasOpenRef = useRef<boolean | undefined>(undefined);

  const formatIndexes = useMemo(() => {
    const parts = dateFormat
      .split('/')
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean);
    const year = parts.findIndex((p) => p === 'yyyy');

    if (year === -1) throw new Error('DatePicker format must contain year');

    return {
      day: parts.findIndex((p) => p === 'dd'),
      month: parts.findIndex((p) => p === 'mm'),
      year,
    };
  }, [dateFormat]);

  const { dateMinDT, dateMaxDT, dateMinParts, dateMaxParts } = useMemo(() => {
    const minP = (dateMin || config.min).split('/').map(Number);
    const maxP = (dateMax || config.max).split('/').map(Number);

    const toDT = (p: number[]) =>
      DateTime.fromObject({
        year: getNumberAtIndex(p, formatIndexes.year, DateTime.now().year),
        month: getNumberAtIndex(p, formatIndexes.month, 1),
        day: getNumberAtIndex(p, formatIndexes.day, 1),
      });

    return {
      dateMinDT: toDT(minP),
      // With a time component, the max day itself must stay selectable for
      // any time up to its last minute, not just 00:00.
      dateMaxDT: showTimePicker ? toDT(maxP).endOf('day') : toDT(maxP),
      dateMinParts: minP,
      dateMaxParts: maxP,
    };
  }, [dateMin, dateMax, config, formatIndexes, showTimePicker]);

  const maskInputRef = useDatePickerMask({
    maskOptions: { mask: config.mask, ...maskOptions },
    dateMaxParts,
    dateMinParts,
    formatIndexes,
  });

  const safeOnChange = useCallback(
    (newDT?: DateTime) => {
      const normalized = newDT?.startOf(config.unit);
      const ts = normalized?.toMillis() ?? null;

      if (lastEmittedTsRef.current === ts) return;

      lastEmittedTsRef.current = ts;

      const jsDate = normalized?.toJSDate();

      setLastChangedDate(jsDate);
      onChange?.(jsDate);
    },
    [config.unit, onChange, name],
  );

  const safeOnError = useCallback(
    (date: string | null | undefined, error?: string | null) => {
      // Only call onError if error actually changed
      if (
        lastErrorRef.current.date !== date ||
        lastErrorRef.current.error !== error
      ) {
        lastErrorRef.current = { date, error };
        onError?.(date, error);
      }
    },
    [onError],
  );

  const processValue = useCallback(
    (newValue: string, isBlur = false) => {
      if (
        typeof newValue !== 'string' ||
        (!isBlur && newValue === lastProcessedValueRef.current)
      ) {
        return;
      }

      // If the field is empty and we blurred, just clear errors and stop
      if (isBlur && newValue.length === 0) {
        clearErrors(name);
        setDateTime(undefined);
        safeOnChange();
        safeOnError(null);
        lastProcessedValueRef.current = newValue;
        return;
      }

      // Only validate if the string is complete OR if the user moved away (blur)
      const isComplete = newValue.length === config.length;

      if (!isComplete && !isBlur) {
        // User is still typing - don't validate yet, but update the ref
        lastProcessedValueRef.current = newValue;
        return;
      }

      lastProcessedValueRef.current = newValue;

      // If incomplete on blur, show error
      if (!isComplete) {
        if (isBlur && newValue.length > 0) {
          setError(name, { message: INVALID_DATE });
          setDateTime(undefined);
          safeOnChange();
          safeOnError(newValue, INVALID_DATE);
        }

        return;
      }

      const newDT = DateTime.fromFormat(newValue, luxonFormat);
      if (!newDT.isValid) {
        setError(name, { message: newDT.invalidExplanation || INVALID_DATE });
        setDateTime(undefined);
        safeOnChange();
        safeOnError(newValue, INVALID_DATE);

        return;
      }

      if (newDT < dateMinDT || newDT > dateMaxDT) {
        setError(name, { message: OUT_OF_RANGE });
        setDateTime(undefined);
        safeOnError(newValue, OUT_OF_RANGE);
        safeOnChange();

        return;
      }

      // Valid Date - Use ref to check latest dateTime to avoid stale closure
      setDateTime((prevDT) => {
        if (prevDT?.toMillis() === newDT.toMillis()) {
          return prevDT; // No change
        }

        clearErrors(name);
        safeOnError(null);
        safeOnChange(newDT);

        return newDT;
      });
    },
    [
      config.length,
      luxonFormat,
      dateMinDT,
      dateMaxDT,
      name,
      setError,
      clearErrors,
      safeOnChange,
      safeOnError,
    ],
  );

  // The value the clear button restores. With no `defaultValue` this is the
  // empty string, so "reset" and "clear" collapse into the same behaviour.
  const resetValue = defaultValue ?? '';

  // Drives the clear button's visibility: there is nothing to undo while the
  // field still holds its default.
  const isDirty = (inputValue ?? '') !== resetValue;

  const resetToDefault = useCallback(() => {
    const nextDT = resetValue
      ? DateTime.fromFormat(resetValue, luxonFormat)
      : undefined;
    const validDT = nextDT?.isValid ? nextDT : undefined;

    // Keep the processing refs in step with the value we're writing, so the
    // input-sync effect doesn't re-process a stale string and undo the reset.
    lastProcessedValueRef.current = resetValue;
    lastExternalValueRef.current = resetValue;

    clearErrors(name);
    setValue(name, resetValue);
    setDateTime(validDT);
    safeOnChange(validDT);
    safeOnError(null);
  }, [
    resetValue,
    luxonFormat,
    name,
    clearErrors,
    setValue,
    safeOnChange,
    safeOnError,
  ]);

  /**
   * Commits an hour/minute pick from the time panel, keeping the currently
   * selected day. Falls back to the visible calendar day (then today) so a
   * time can be chosen before a date.
   */
  const setTime = useCallback(
    ({ hour, minute }: { hour?: number; minute?: number }) => {
      const base = dateTime ?? calendarViewDateTime ?? DateTime.now();
      const next = base.set({
        hour: hour ?? base.hour,
        minute: minute ?? base.minute,
        second: 0,
        millisecond: 0,
      });

      if (!next.isValid || next < dateMinDT || next > dateMaxDT) return;

      clearErrors(name);
      setDateTime(next);
      setCalendarViewDateTime(next);
      safeOnChange(next);
    },
    [
      dateTime,
      calendarViewDateTime,
      dateMinDT,
      dateMaxDT,
      name,
      clearErrors,
      safeOnChange,
    ],
  );

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // Force validation on blur - catches incomplete inputs when user leaves the field
    processValue(e.currentTarget.value, true);
    // Close the calendar overlay
    setIsOpen(false);
  };

  // Sync Input Value -> States (Passive - no focus manipulation)
  useEffect(() => {
    if (typeof inputValue !== 'string') return;

    // Only auto-process while typing if they have finished the mask
    // This allows the user to click away or tab out freely
    if (inputValue.length === config.length) {
      processValue(inputValue);
    }
  }, [inputValue, config.length, processValue]);

  // Sync Internal DateTime -> Form Value
  // Using ref to track inputValue to prevent infinite loop while still checking its value
  const inputValueRef = useRef<string | undefined>(inputValue);
  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  useEffect(() => {
    if (!dateTime || !dateTime.isValid) return;

    const formatted = dateTime.toFormat(luxonFormat);

    // Only setValue if it actually differs from what's in the form
    if (inputValueRef.current !== formatted) {
      setValue(name, formatted, { shouldValidate: true });
    }
  }, [dateTime, luxonFormat, name, setValue]);

  // Update Calendar View
  useEffect(() => {
    const base = (dateTime?.isValid ? dateTime : DateTime.now()).startOf(
      config.unit,
    );

    setCalendarViewDateTime(
      DateTime.min(DateTime.max(base, dateMinDT), dateMaxDT),
    );
  }, [dateTime, dateMinDT, dateMaxDT, config.unit]);

  // Sync External Prop 'value'
  useEffect(() => {
    if (
      externalValue === undefined ||
      externalValue === lastExternalValueRef.current
    ) {
      return;
    }

    lastExternalValueRef.current = externalValue;
    setValue(name, externalValue);
  }, [externalValue, name, setValue]);

  // Open/Close side effects only - no focus manipulation
  useEffect(() => {
    if (isLoading) return;

    if (isOpen) {
      wasOpenRef.current = true;
      onOpen?.();
    } else {
      // Only call onClose if the calendar was previously open (not on initial mount)
      if (wasOpenRef.current === true) {
        onClose?.();
      }
      wasOpenRef.current = false;
      setCalendarType(config.calendar);
    }
  }, [isOpen, isLoading, config.calendar, onOpen, onClose]);

  useEffect(() => {
    if (defaultValue) {
      const dt = DateTime.fromFormat(defaultValue, luxonFormat);

      if (dt.isValid) {
        // Set ref to prevent double-processing when setValue triggers inputValue effect
        lastProcessedValueRef.current = defaultValue;
        lastExternalValueRef.current = defaultValue;
        setDateTime(dt);
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
    isDirty,
    inputValue,
    resetToDefault,
    setTime,
    showTimePicker,
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
