import { createContext } from 'react';
import { DateTime } from 'luxon';
import { DateRangePickerContextProps } from './types';
import { DATE_MAX, DATE_MIN, DEFAULT_MASK_FORMAT } from './constants';

export const DateRangePickerContext =
  createContext<DateRangePickerContextProps>({
    format: DEFAULT_MASK_FORMAT,
    name: '',
    nameFrom: '',
    nameTo: '',
    maskOptions: {},
    inputFromRef: { current: null },
    inputToRef: { current: null },
    inputProps: {},
    isOpen: false,
    isOpenState: false,
    calendarType: 'days',
    inputValueFrom: undefined,
    inputValueTo: undefined,
    dateTime: [undefined, undefined],
    calendarViewDateTime: [undefined, undefined],
    dateMinParts: DATE_MIN.split('/').map(Number),
    dateMaxParts: DATE_MAX.split('/').map(Number),
    dateMinDT: DateTime.fromFormat(DATE_MIN, DEFAULT_MASK_FORMAT),
    dateMaxDT: DateTime.fromFormat(DATE_MAX, DEFAULT_MASK_FORMAT),
    formatIndexes: { day: 1, month: 0, year: 2 },
    lastFocusedElement: 'from',
    currentCalendarViewDT: DateTime.now().set({ day: 1 }),
    currentIndex: 0,
    handleToggleOpen: () => {
      // no-op
    },
    setIsOpen: () => {
      // no-op
    },
    setCalendarType: () => {
      // no-op
    },
    rangeSelectionStep: null,
    setRangeSelectionStep: () => {
      // no-op
    },
    clearInputValue: () => {
      // no-op
    },
    setCalendarViewDateTime: () => {
      // no-op
    },
    setDateTime: () => {
      // no-op
    },
    setLastFocusedElement: () => {
      // no-op
    },
  });
