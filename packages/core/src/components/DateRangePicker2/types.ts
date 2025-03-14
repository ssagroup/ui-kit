import { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { DateTime } from 'luxon';
import { useMask } from '@react-input/mask';
import { FieldContextValue } from '@components/Field/FieldProvider';
import { InputProps } from '@components/Input/types';

export type LastFocusedElement = 'from' | 'to';

export type DateRangePickerProps = {
  name: string;
  label?: string;
  format?: 'mm/dd/yyyy' | 'dd/mm/yyyy';
  isOpenToggle?: boolean;
  value?: [string | undefined, string | undefined]; // depends on the format
  defaultValue?: [string, string]; // depends on the format
  maskOptions?: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
  inputProps?: Partial<InputProps>;
  status?: FieldContextValue['status'];
  isOpen: boolean;
  dateMin?: string; // depends on the format
  dateMax?: string; // depends on the format
  disabled?: boolean;
  helperText?: string;
  showCalendarIcon?: boolean;
  lastChangedDate?: [Date | undefined, Date | undefined];
  calendarViewDateTime: [DateTime | undefined, DateTime | undefined];
  safeOnChange?: (date?: DateTime) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onChange?: (dates?: [Date | null, Date | null]) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (date: unknown, error?: string | null) => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

type DateTimeTuple = [DateTime | undefined, DateTime | undefined];

export type DateRangePickerContextProps = Omit<
  DateRangePickerProps,
  'dateMin' | 'dateMax'
> & {
  inputFromRef: React.MutableRefObject<HTMLInputElement | null>;
  inputToRef: React.MutableRefObject<HTMLInputElement | null>;
  nameFrom: string;
  nameTo: string;
  isOpen: boolean;
  calendarType: CalendarType;
  inputValueFrom?: string;
  inputValueTo?: string;
  dateTime: DateTimeTuple;
  calendarViewDateTime?: DateTimeTuple;
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
  handleToggleOpen: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
  handleSetIsOpen: (open: boolean) => void;
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTimeTuple>>;
  setDateTime: Dispatch<SetStateAction<DateTimeTuple>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
};

export type CalendarType = 'days' | 'months' | 'years';
