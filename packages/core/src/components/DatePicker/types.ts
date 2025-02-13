import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';
import { DateTime } from 'luxon';
import { InputProps } from '@components/Input/types';

export type DatePickerProps = {
  name: string;
  format: 'mm/dd/yyyy' | 'dd/mm/yyyy';
  maskOptions: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
  inputProps?: InputProps['inputProps'];
  yearMin?: number;
  yearMax?: number;
  disabled?: boolean;
  onChange?: (date: Date | undefined) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    date: any,
    error?: {
      explanation?: string | null;
      reason?: string | null;
    },
  ) => void;
  onMonthChange?: (date: Date) => void;
  onYearChange?: (date: Date) => void;
};

export type DatePickerContextProps = Omit<
  DatePickerProps,
  'yearMin' | 'yearMax'
> & {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  isOpen: boolean;
  calendarType: CalendarType;
  value?: string;
  dateTime?: DateTime;
  calendarViewDateTime?: DateTime;
  yearMin: number;
  yearMax: number;
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTime | undefined>>;
  setDateTime: Dispatch<SetStateAction<DateTime<boolean> | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
};

export type CalendarType = 'days' | 'months' | 'years';
