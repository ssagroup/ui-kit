import { createContext, useContext } from 'react';
import { DateTime } from 'luxon';

import { CalendarEvent, CalendarProps } from './types';

/**
 * Props every part of the calendar reads, shared through context so the
 * views don't have to pass them down level by level.
 */
export type CalendarContextValue = Pick<
  CalendarProps,
  | 'getDayProps'
  | 'onAddEvent'
  | 'onTaskToggle'
  | 'onDayClick'
  | 'renderEvent'
  | 'renderEventActions'
  | 'getEventProps'
  | 'locale'
> & {
  timeFormat: '24h' | '12h';
  /**
   * Whether a day gets an add button, going by `onAddEvent` and
   * `minAddDate` / `maxAddDate` (not `getDayProps`, which the views apply).
   */
  canAddOn: (date: DateTime) => boolean;
  /**
   * Fires `onEventClick` and opens the details card. `undefined` when
   * entries aren't clickable.
   */
  activateEvent?: (event: CalendarEvent, anchor: HTMLElement) => void;
  /** Opens a day in the `day` view, when the calendar may switch to it. */
  openDay?: (date: Date) => void;
  /** Back from the `day` view to the month, when the calendar may. */
  backToMonth?: () => void;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('Calendar parts must be rendered inside <Calendar>');
  }
  return context;
};
