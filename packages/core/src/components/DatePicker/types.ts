import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';
import { DateTime } from 'luxon';

export type DatePickerProps = {
  name: string;
  format: string;
  maskOptions: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
};

export type DatePickerContextProps = DatePickerProps & {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  isOpen: boolean;
  calendarType: CalendarType;
  value?: string;
  dateTime?: DateTime;
  calendarViewDateTime?: DateTime;
  setCalendarViewDateTime: Dispatch<SetStateAction<DateTime | undefined>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCalendarType: Dispatch<SetStateAction<CalendarType>>;
};

export type CalendarType = 'days' | 'months' | 'years';
