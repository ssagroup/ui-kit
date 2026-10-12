import { MouseEvent } from 'react';

import { useCalendarContext } from '../CalendarContext';
import { CalendarEvent } from '../types';

/** Marks the root of an entry, the element details anchor to. */
export const EVENT_ROOT_ATTRIBUTE = 'data-calendar-event';

/**
 * Click handler of an entry: fires `onEventClick` and opens the details card,
 * anchored to the entry's root (or to `getAnchor()` when given). `undefined`
 * when entries aren't clickable.
 */
export const useEventClick = (
  event: CalendarEvent,
  getAnchor?: () => HTMLElement | null,
) => {
  const { activateEvent } = useCalendarContext();
  if (!activateEvent) return undefined;

  return (clickEvent: MouseEvent<HTMLElement>) => {
    const target = clickEvent.currentTarget;
    const anchor =
      getAnchor?.() ??
      target.closest<HTMLElement>(`[${EVENT_ROOT_ATTRIBUTE}]`) ??
      target;
    activateEvent(event, anchor);
  };
};
