import { Dispatch, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';
import { DateTime } from 'luxon';
import { InputProps } from '@components/Input/types';

export type DatePickerProps = {
  name: string;
  label?: string;
  format?: 'mm/dd/yyyy' | 'dd/mm/yyyy';
  isOpenToggle?: boolean;
  // datepickerMode?: 'default' | 'dateRangePicker';
  maskOptions?: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
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
  safeOnChange?: (date?: DateTime) => void;
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
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTime | undefined>>;
  setDateTime: Dispatch<SetStateAction<DateTime<boolean> | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
};

export type CalendarType = 'days' | 'months' | 'years';
