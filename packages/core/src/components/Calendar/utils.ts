import { ReactNode } from 'react';
import { DateTime, Info } from 'luxon';

import { CalendarDateInput, CalendarEvent } from './types';

/** Length given to a timed event that has no `end`. */
export const DEFAULT_EVENT_MINUTES = 30;

const MINUTES_PER_DAY = 24 * 60;

/** `Date` or ISO string → luxon, in local time. */
export const toDateTime = (value: CalendarDateInput): DateTime =>
  value instanceof Date ? DateTime.fromJSDate(value) : DateTime.fromISO(value);

/** `yyyy-MM-dd` of a date — the key events are grouped by. */
export const toDayKey = (value: DateTime): string => value.toISODate() ?? '';

/**
 * An event with its dates parsed once, so rendering never re-parses them.
 */
export type NormalizedEvent<TData = unknown> = {
  event: CalendarEvent<TData>;
  start: DateTime;
  /** Same as `start` for untimed events. */
  end: DateTime;
  allDay: boolean;
};

export const normalizeEvent = <TData>(
  event: CalendarEvent<TData>,
): NormalizedEvent<TData> | undefined => {
  const start = toDateTime(event.start);
  if (!start.isValid) return undefined;

  const allDay = Boolean(event.allDay);
  if (allDay) return { event, start, end: start, allDay };

  const parsedEnd = event.end ? toDateTime(event.end) : undefined;
  const end =
    parsedEnd?.isValid && parsedEnd > start
      ? parsedEnd
      : start.plus({ minutes: DEFAULT_EVENT_MINUTES });

  return { event, start, end, allDay };
};

/**
 * Untimed entries first, then timed ones by start time. Entries starting
 * together keep the order they were passed in.
 */
const compareEvents = (a: NormalizedEvent, b: NormalizedEvent) => {
  if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
  if (a.allDay) return 0;
  return a.start.toMillis() - b.start.toMillis();
};

/**
 * Groups events by the day they start on (`yyyy-MM-dd`), each day sorted for
 * display. Events with an unparsable `start` are dropped.
 */
export const groupEventsByDay = <TData>(
  events: CalendarEvent<TData>[],
): Map<string, NormalizedEvent<TData>[]> => {
  const byDay = new Map<string, NormalizedEvent<TData>[]>();

  for (const event of events) {
    const normalized = normalizeEvent(event);
    if (!normalized) continue;
    const key = toDayKey(normalized.start);
    const list = byDay.get(key);
    if (list) list.push(normalized);
    else byDay.set(key, [normalized]);
  }

  for (const list of byDay.values()) list.sort(compareEvents);
  return byDay;
};

/** A cell of the month grid. */
export type MonthDay = {
  date: DateTime;
  key: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

/** A row of the month grid. */
export type MonthWeek = {
  key: string;
  days: MonthDay[];
};

/**
 * The Monday-first week rows covering `month`, padded out with the
 * neighbouring months' days. With five weekdays a row that holds only the
 * neighbours' days is dropped — a month that ends on a Saturday would
 * otherwise get a row of nothing but padding.
 */
export const buildMonthWeeks = (
  month: DateTime,
  weekdays: 5 | 7,
  today: DateTime = DateTime.now(),
): MonthWeek[] => {
  const monthStart = month.startOf('month');
  const monthEnd = month.endOf('month').startOf('day');
  // Weekday arithmetic rather than `startOf('week')`, which follows the
  // locale's first day of the week; the design always starts on Monday.
  const gridStart = monthStart.minus({ days: monthStart.weekday - 1 });
  const gridEnd = monthEnd.plus({ days: 7 - monthEnd.weekday });

  const weeks: MonthWeek[] = [];
  for (
    let weekStart = gridStart;
    weekStart <= gridEnd;
    weekStart = weekStart.plus({ weeks: 1 })
  ) {
    const days: MonthDay[] = [];
    for (let offset = 0; offset < weekdays; offset += 1) {
      const date = weekStart.plus({ days: offset });
      days.push({
        date,
        key: toDayKey(date),
        isCurrentMonth: date.hasSame(monthStart, 'month'),
        isToday: date.hasSame(today, 'day'),
        isWeekend: date.weekday > 5,
      });
    }
    if (!days.some((day) => day.isCurrentMonth)) continue;
    weeks.push({ key: toDayKey(weekStart), days });
  }
  return weeks;
};

/** Monday-first weekday names, `long` (`Monday`) or `short` (`Mon`). */
export const getWeekdayNames = (
  format: 'long' | 'short',
  locale?: string,
): string[] => Info.weekdays(format, locale ? { locale } : undefined);

/** `09:30` or `09:30 AM`. */
export const formatTime = (value: DateTime, timeFormat: '24h' | '12h') =>
  value.toFormat(timeFormat === '12h' ? 'hh:mm a' : 'HH:mm');

/**
 * Hour label of the day view: `09:00` or `9 AM`. Formatted on a fixed date
 * with no DST change, so every hour exists — on today's date an hour skipped
 * by DST would be moved on, and labelled like the next one.
 */
export const formatHourLabel = (hour: number, timeFormat: '24h' | '12h') =>
  DateTime.fromObject({ year: 2000, month: 1, day: 15, hour }).toFormat(
    timeFormat === '12h' ? 'h a' : 'HH:mm',
  );

/**
 * Minutes from midnight as the clock shows them. The timeline draws 24
 * labelled hours on every day, so positions follow the clock rather than
 * elapsed time — on a DST day, elapsed time would put entries after the
 * change an hour off their labels.
 */
export const clockMinutes = (value: DateTime) => value.hour * 60 + value.minute;

/** A timed event placed on the day view's timeline. */
export type PositionedEvent<TData = unknown> = {
  item: NormalizedEvent<TData>;
  /** Minutes from midnight to the start. */
  startMinutes: number;
  /** Minutes the event lasts, clipped to the day. */
  durationMinutes: number;
  /** Column within its overlap group, from 0. */
  column: number;
  /** Columns in its overlap group. */
  columns: number;
};

/**
 * Places a day's timed events on the timeline. Events that overlap share the
 * width side by side; each overlap group gets just as many columns as it
 * needs at its busiest moment.
 *
 * Expects events sorted by start: the day's own (as `groupEventsByDay`
 * returns them), after any carried over from earlier days. Events running
 * past either midnight are clipped to the day; events not on it are skipped.
 */
export const layoutDayEvents = <TData>(
  items: NormalizedEvent<TData>[],
  day: DateTime,
): PositionedEvent<TData>[] => {
  const dayStart = day.startOf('day');
  const positioned: PositionedEvent<TData>[] = [];

  let group: PositionedEvent<TData>[] = [];
  /** When each column of the current group becomes free, in minutes. */
  let columnEnds: number[] = [];
  let groupEnd = -1;

  const closeGroup = () => {
    for (const entry of group) entry.columns = columnEnds.length;
    group = [];
    columnEnds = [];
  };

  for (const item of items) {
    if (item.allDay) continue;
    const startsBefore = item.start < dayStart;
    if (!startsBefore && !item.start.hasSame(dayStart, 'day')) continue;
    if (item.end <= dayStart) continue;

    const startMinutes = startsBefore ? 0 : clockMinutes(item.start);
    const endMinutes = item.end.hasSame(dayStart, 'day')
      ? clockMinutes(item.end)
      : MINUTES_PER_DAY;

    if (startMinutes >= groupEnd) closeGroup();

    let column = columnEnds.findIndex((end) => end <= startMinutes);
    if (column === -1) {
      column = columnEnds.length;
      columnEnds.push(endMinutes);
    } else {
      columnEnds[column] = endMinutes;
    }
    groupEnd = Math.max(groupEnd, endMinutes);

    const entry: PositionedEvent<TData> = {
      item,
      startMinutes,
      durationMinutes: Math.max(endMinutes - startMinutes, 1),
      column,
      columns: 1,
    };
    group.push(entry);
    positioned.push(entry);
  }
  closeGroup();

  return positioned;
};

/** Applies `locale` when given; otherwise keeps luxon's default. */
export const withLocale = (value: DateTime, locale?: string) =>
  locale ? value.setLocale(locale) : value;

/**
 * First and last day a view shows: the whole grid of the month view,
 * neighbouring months' days included, or the single day.
 */
export const getVisibleRange = (
  view: 'month' | 'day',
  date: DateTime,
  weekdays: 5 | 7,
): { start: DateTime; end: DateTime } => {
  if (view === 'day') {
    return { start: date.startOf('day'), end: date.endOf('day') };
  }
  const weeks = buildMonthWeeks(date, weekdays);
  const lastWeek = weeks[weeks.length - 1].days;
  return {
    start: weeks[0].days[0].date.startOf('day'),
    end: lastWeek[lastWeek.length - 1].date.endOf('day'),
  };
};

/**
 * Whether a slot has something to draw. Like React itself, keeps `0` and
 * `''` but skips `false` — so `slot={cond && <Button />}` adds no empty
 * wrapper when `cond` is false.
 */
export const hasContent = (node: ReactNode) =>
  node !== undefined && node !== null && node !== false;
