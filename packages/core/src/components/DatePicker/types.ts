import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';
import { DateTime } from 'luxon';

export type DatePickerProps = {
  name: string;
  format: string;
  maskOptions: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
  yearMin?: number;
  yearMax?: number;
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
