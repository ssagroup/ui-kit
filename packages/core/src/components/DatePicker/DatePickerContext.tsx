import { createContext } from 'react';
import { DateTime } from 'luxon';
import { useMergeRefs } from '@floating-ui/react';
import {
  DatePickerContextProps,
  DatePickerProps,
  DatePickerFormat,
} from './types';
import {
  DATE_MAX,
  DATE_MIN,
  DEFAULT_MASK_FORMAT,
  PICKER_TYPE,
  CALENDAR_TYPE,
} from './constants';
import { useDatePicker } from './hooks';

export const DatePickerContext = createContext<DatePickerContextProps>({
  format: DEFAULT_MASK_FORMAT,
  name: '',
  maskOptions: {},
  openCalendarMode: 'icon',
  pickerType: PICKER_TYPE.DAYS,
  inputRef: { current: null },
  inputProps: {},
  isOpen: false,
  calendarType: CALENDAR_TYPE.DAYS,
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
  const {
    maskInputRef,
    formatIndexes,
    format: hookFormat,
    pickerType: hookPickerType,
    ...restHook
  } = useDatePicker(rest);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    restHook.handleBlur(e);
    rest.onBlur?.(e);
  };

  return (
    <DatePickerContext.Provider
      value={{
        ...rest,
        ...restHook,
        pickerType: hookPickerType || rest.pickerType || PICKER_TYPE.DAYS,
        format: (hookFormat ||
          rest.format ||
          DEFAULT_MASK_FORMAT) as DatePickerFormat,
        formatIndexes,
        inputRef: useMergeRefs([maskInputRef, rest.inputRef]),
        onBlur: handleBlur,
      }}>
      {children}
    </DatePickerContext.Provider>
  );
};
