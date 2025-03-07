import { Dispatch, SetStateAction } from 'react';
import { DateTime } from 'luxon';
import { DatePickerProps } from '@components/DatePicker/types';
import { FieldContextValue } from '@components/Field/FieldProvider';

export type LastFocusedElement = 'from' | 'to';

export type DateRangePickerProps = Omit<
  DatePickerProps,
  'isOpenToggle' | 'value' | 'defaultValue' | 'onChange'
> & {
  value?: [string, string]; // depends on the format
  defaultValue?: [string, string]; // depends on the format
  status?: FieldContextValue['status'];
  onChange?: (dates?: [Date | null, Date | null]) => void;
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

export type DateRangePickerContextProps = Omit<
  DateRangePickerProps,
  'dateMin' | 'dateMax'
> & {
  // TODO: do we need it?
  inputFromRef?: React.ForwardedRef<HTMLInputElement | null>;
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
  lastFocusedElement: LastFocusedElement;
  setLastFocusedElement: Dispatch<SetStateAction<LastFocusedElement>>;
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTime | undefined>>;
  setDateTime: Dispatch<SetStateAction<DateTime<boolean> | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
};

export type CalendarType = 'days' | 'months' | 'years';
