import { Dispatch, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';
import { DateTime } from 'luxon';
import { InputProps } from '@components/Input/types';
import { PICKER_TYPE, CALENDAR_TYPE } from './constants';

export type PickerType = (typeof PICKER_TYPE)[keyof typeof PICKER_TYPE];
export type DatePickerFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'mm/yyyy';

export type DatePickerProps = {
  name: string;
  label?: string;
  format?: DatePickerFormat;
  maskOptions?: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
  pickerType?: PickerType;
  inputProps?: Partial<InputProps>;
  value?: string; // depends on the format
  defaultValue?: string; // depends on the format
  dateMin?: string; // depends on the format
  dateMax?: string; // depends on the format
  disabled?: boolean;
  helperText?: string;
  showCalendarIcon?: boolean;
  lastChangedDate?: Date;
  highlightDates?: {
    enabled: boolean;
    mode: 'dateFrom' | 'dateTo';
    otherDate: Date | null;
  };
  classNames?: {
    header?: string;
    trigger?: {
      input?: string;
      calendarIcon?: string;
    };
    monthsSwitch?: {
      wrapper?: string;
      previousMonth?: string;
      nextMonth?: string;
    };
    calendar?: string;
    label?: string;
  };
  onChange?: (date?: Date) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    date: any,
    error?: string | null,
  ) => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export type DatePickerContextProps = Omit<
  DatePickerProps,
  'dateMin' | 'dateMax'
> & {
  inputRef?: React.ForwardedRef<HTMLInputElement | null>;
  isOpen: boolean;
  calendarType: CalendarType;
  inputValue?: string;
  dateTime?: DateTime;
  calendarViewDateTime?: DateTime;
  dateMinParts: number[];
  dateMaxParts: number[];
  dateMinDT: DateTime;
  dateMaxDT: DateTime;
  formatIndexes: {
    day: number;
    month: number;
    year: number;
  };
  pickerType: PickerType;
  safeOnChange?: (date?: DateTime) => void;
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTime | undefined>>;
  setDateTime: Dispatch<SetStateAction<DateTime<boolean> | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
};

export type CalendarType = (typeof CALENDAR_TYPE)[keyof typeof CALENDAR_TYPE];
