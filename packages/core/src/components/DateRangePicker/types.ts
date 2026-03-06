import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  FocusEventHandler,
} from 'react';
import { DateTime } from 'luxon';
import { useMask } from '@react-input/mask';
import { FieldContextValue } from '@components/Field/FieldProvider';
import { InputProps } from '@components/Input/types';

import type {
  PickerCalendarType,
  DateFormat,
} from '@components/JsonSchemaForm/utils/dateFormats';

export type LastFocusedElement = 'from' | 'to';
export type RangePickerType = PickerCalendarType;
export type Format = DateFormat;

/**
 * Type for the dates tuple passed to DateRangePicker's onChange callback.
 *
 * - Date: A valid date was selected
 * - null: "Present" option was selected (end date only)
 * - undefined: Date field is empty/unset
 */
export type DateRangePickerOnChangeDates = [
  Date | null | undefined,
  Date | null | undefined,
];

export type DateRangePickerProps = {
  name: string;
  label?: string;
  format?: Format;
  isOpenState?: boolean;
  value?: [string | undefined | null, string | undefined | null]; // depends on the format, null for end date means "present"
  defaultValue?: [string, string | null] | [string, string]; // depends on the format, null for end date means "present"
  maskOptions?: Parameters<typeof useMask>[0];
  inputProps?: Partial<InputProps>;
  status?: FieldContextValue['status'];
  showStatusArea?: boolean;
  dateMin?: string; // depends on the format
  dateMax?: string; // depends on the format
  disabled?: boolean;
  showCalendarIcon?: boolean;
  rangePickerType?: RangePickerType;
  messages?: {
    description?: string;
    success?: string;
    error?: string;
  };
  classNames?: {
    trigger?: {
      root?: string;
      controlsWrapper?: string;
      inputFrom?: string;
      inputTo?: string;
      arrowIcon?: string;
      calendarIcon?: string;
    };
    calendar?: string;
    label?: string;
  };
  onChange?: (dates?: DateRangePickerOnChangeDates) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (date: unknown, error?: string | null) => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  allowReverseSelection?: boolean;
  showPresentOption?: boolean;
};

export type DateTimeTuple = [DateTime | undefined, DateTime | undefined];

export type DateRangePickerContextProps = Omit<
  DateRangePickerProps,
  'dateMin' | 'dateMax'
> & {
  nameFrom: string;
  nameTo: string;
  isOpen: boolean;
  currentCalendarViewDT: DateTime;
  currentIndex: number;
  calendarViewDateTime: DateTimeTuple;
  calendarType: CalendarType;
  inputValueFrom?: string;
  inputValueTo?: string;
  inputFromRef: React.ForwardedRef<HTMLInputElement | null>;
  inputToRef: React.ForwardedRef<HTMLInputElement | null>;
  dateTime: DateTimeTuple;
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
  lastChangedDate?: [Date | undefined | null, Date | undefined | null];
  safeOnChange?: (date?: DateTime) => void;
  setLastFocusedElement: Dispatch<SetStateAction<LastFocusedElement>>;
  setLastChangedDate: Dispatch<
    SetStateAction<[Date | undefined | null, Date | undefined | null]>
  >;
  handleToggleOpen: MouseEventHandler<HTMLButtonElement | HTMLInputElement>;
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTimeTuple>>;
  setDateTime: Dispatch<SetStateAction<DateTimeTuple>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
  rangeSelectionStep: 'start' | 'end' | null;
  setRangeSelectionStep: Dispatch<SetStateAction<'start' | 'end' | null>>;
  clearInputValue: (field: 'from' | 'to') => void;
  showPresentOption?: boolean;
  isEndDatePresent: boolean;
  setIsEndDatePresent: Dispatch<SetStateAction<boolean>>;
};

export type CalendarType = PickerCalendarType;
