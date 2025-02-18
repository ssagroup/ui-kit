import { createContext } from 'react';
import { DateTime } from 'luxon';
import { useMergeRefs } from '@floating-ui/react';
import { DatePickerContextProps, DatePickerProps } from './types';
import { DATE_MAX, DATE_MIN, DEFAULT_MASK_FORMAT } from './constants';
import { useDatePicker } from './hooks';

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
  dateMinParts: DATE_MIN.split('/').map(Number),
  dateMaxParts: DATE_MAX.split('/').map(Number),
  dateMinDT: DateTime.fromFormat(DATE_MIN, DEFAULT_MASK_FORMAT),
  dateMaxDT: DateTime.fromFormat(DATE_MAX, DEFAULT_MASK_FORMAT),
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
}: React.PropsWithChildren<
  DatePickerProps & Pick<DatePickerContextProps, 'inputRef'>
>) => {
  const { maskInputRef, formatIndexes, ...restHook } = useDatePicker({
    ...rest,
  });

  return (
    <DatePickerContext.Provider
      value={{
        ...rest,
        inputRef: useMergeRefs([maskInputRef, rest.inputRef]),
        ...restHook,
        formatIndexes,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};
