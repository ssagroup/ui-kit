import { createContext } from 'react';
import { DateTime } from 'luxon';
// import { useMergeRefs } from '@floating-ui/react';
import { DateRangePickerContextProps, DateRangePickerProps } from './types';
import { DATE_MAX, DATE_MIN, DEFAULT_MASK_FORMAT } from './constants';
import { useDatePicker } from './hooks';

/**
 * Use both context?
 * DataPickerContext + DateRangePickerContext?
 */
export const DateRangePickerContext =
  createContext<DateRangePickerContextProps>({
    format: DEFAULT_MASK_FORMAT,
    name: '',
    maskOptions: {},
    openCalendarMode: 'icon',
    inputFromRef: { current: null },
    isOpen: false,
    calendarType: 'days',
    inputValue: undefined,
    dateTime: undefined,
    calendarViewDateTime: undefined,
    dateMinParts: DATE_MIN.split('/').map(Number),
    dateMaxParts: DATE_MAX.split('/').map(Number),
    dateMinDT: DateTime.fromFormat(DATE_MIN, DEFAULT_MASK_FORMAT),
    dateMaxDT: DateTime.fromFormat(DATE_MAX, DEFAULT_MASK_FORMAT),
    formatIndexes: { day: 1, month: 0, year: 2 },
    lastFocusedElement: 'from',
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
    setLastFocusedElement: () => {
      // no-op
    },
  });

export const DateRangePickerProvider = ({
  children,
  ...rest
}: React.PropsWithChildren<DateRangePickerProps>) => {
  //  & Pick<DateRangePickerContextProps, 'inputRef'>
  // TODO: use different name
  const { maskInputFromRef, formatIndexes, ...restHook } = useDatePicker(rest);

  // console.log(
  //   '>>>PROVIDER',
  //   maskInputRef,
  //   rest.inputRef,
  //   useMergeRefs([maskInputRef, rest.inputRef]),
  // );

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    restHook.handleBlur(e);
    rest.onBlur?.(e);
  };

  return (
    <DateRangePickerContext.Provider
      value={{
        ...rest,
        ...restHook,
        formatIndexes,
        inputFromRef: maskInputFromRef,
        // inputRef: useMergeRefs([maskInputRef, rest.inputRef]),
        onBlur: handleBlur,
      }}>
      {children}
    </DateRangePickerContext.Provider>
  );
};
