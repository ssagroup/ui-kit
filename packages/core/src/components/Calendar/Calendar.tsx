import {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import { useControllableState } from '@ssa-ui-kit/hooks';

import { CalendarContext, CalendarContextValue } from './CalendarContext';
import { MonthView } from './components/MonthView';
import { DayView } from './components/DayView';
import { CalendarToolbar } from './components/CalendarToolbar';
import { EventDetailsLayer } from './components/EventDetailsLayer';
import {
  CalendarDateInput,
  CalendarEvent,
  CalendarProps,
  CalendarView,
  CalendarWeek,
} from './types';
import {
  getVisibleRange,
  groupEventsByDay,
  NormalizedEvent,
  toDateTime,
  toDayKey,
} from './utils';
import * as S from './styles';

const NO_EVENTS: never[] = [];
const ALL_VIEWS: CalendarView[] = ['month', 'day'];

/** Start of the given day, or of today when it's missing or invalid. */
const toDay = (value: CalendarDateInput | undefined) => {
  const parsed = value === undefined ? DateTime.now() : toDateTime(value);
  return (parsed.isValid ? parsed : DateTime.now()).startOf('day');
};

/** `yyyy-MM-dd` of an add limit; empty — no limit — when missing or invalid. */
const toLimitKey = (value: CalendarDateInput | undefined) => {
  if (value === undefined) return '';
  const parsed = toDateTime(value);
  return parsed.isValid ? toDayKey(parsed) : '';
};

/** An open details card: which entry, and what it's anchored to. */
type OpenDetails = { id: CalendarEvent['id']; anchor: HTMLElement };

const CalendarInner = <TData,>(
  props: CalendarProps<TData>,
  ref: Ref<HTMLDivElement>,
) => {
  const {
    events = NO_EVENTS,
    defaultView,
    onViewChange,
    views = ALL_VIEWS,
    defaultDate,
    onDateChange,
    onRangeChange,
    toolbar = false,
    toolbarEnd,
    loading = false,
    variant = 'events',
    weekdays = 7,
    maxEventsPerDay = 3,
    renderWeekTotal,
    totalLabel = 'Total',
    footer,
    getDayProps,
    onAddEvent,
    minAddDate,
    maxAddDate,
    onEventClick,
    renderEventDetails,
    eventDetailsDisplay = 'popover',
    onTaskToggle,
    onDayClick,
    renderEvent,
    renderEventActions,
    getEventProps,
    timeFormat = '24h',
    dayHeader = 'monthYear',
    locale,
    scrollToHour,
    'aria-label': ariaLabel = 'Calendar',
    className,
    style,
  } = props;
  const theme = useTheme();

  // Controlled by presence, so `view={undefined}` still means "the parent
  // owns it" — see `useControllableState`.
  const viewControlled = 'view' in props;
  const dateControlled = 'date' in props;

  const [viewState, setView] = useControllableState<CalendarView>({
    controlled: viewControlled,
    value: props.view,
    defaultValue: defaultView,
    finalValue: views[0] ?? 'month',
    onChange: onViewChange,
  });
  const view: CalendarView = viewState ?? 'month';

  const [dateState, setDate] = useControllableState<CalendarDateInput>({
    controlled: dateControlled,
    value: props.date,
    defaultValue: defaultDate,
    onChange: onDateChange as ((date: CalendarDateInput) => void) | undefined,
  });

  const current = useMemo(
    () => toDay(dateState),
    // Re-parse only when the day changes, not on every new Date instance.
    [dateState instanceof Date ? dateState.toDateString() : dateState],
  );

  // A controlled value without its change handler can't move, so the
  // controls that would move it aren't offered.
  const canChangeView = !viewControlled || Boolean(onViewChange);
  const canChangeDate = !dateControlled || Boolean(onDateChange);
  const switchable = canChangeView && views.length > 1;

  const navigate = useCallback(
    (next: DateTime) => setDate(next.toJSDate()),
    [setDate],
  );
  const openDay = useCallback(
    (day: Date) => {
      setDate(day);
      setView('day');
    },
    [setDate, setView],
  );
  const backToMonth = useCallback(() => setView('month'), [setView]);

  const eventsByDay = useMemo(() => groupEventsByDay(events), [events]);

  // Entries of a day or more are already on every day they cover. The day
  // view also shows the rest of shorter ones from the day before — a night
  // shift continues on the next day's timeline.
  const dayItems = useMemo(() => {
    const own = eventsByDay.get(toDayKey(current)) ?? NO_EVENTS;
    if (view !== 'day') return own;
    const carried: NormalizedEvent<TData>[] = (
      eventsByDay.get(toDayKey(current.minus({ days: 1 }))) ?? []
    )
      .filter(
        (item) => !item.allDay && item.spanDays === 1 && item.end > current,
      )
      .map((item) => ({ ...item, spanDays: 2, dayOfSpan: 2 }));
    return carried.length === 0 ? own : [...carried, ...own];
  }, [eventsByDay, current, view]);

  // Compared as yyyy-MM-dd keys, which sort like the dates they name.
  const minAddKey = toLimitKey(minAddDate);
  const maxAddKey = toLimitKey(maxAddDate);
  const canAddOn = useCallback(
    (day: DateTime) => {
      if (!onAddEvent) return false;
      const key = toDayKey(day);
      return (
        (!minAddKey || key >= minAddKey) && (!maxAddKey || key <= maxAddKey)
      );
    },
    [onAddEvent, minAddKey, maxAddKey],
  );

  // ─── Visible range ────────────────────────────────────────────────────────

  const range = useMemo(
    () => getVisibleRange(view, current, weekdays),
    [view, current, weekdays],
  );
  const onRangeChangeRef = useRef(onRangeChange);
  onRangeChangeRef.current = onRangeChange;
  const rangeKey = `${view}|${toDayKey(range.start)}|${toDayKey(range.end)}`;
  useEffect(() => {
    onRangeChangeRef.current?.({
      view,
      start: range.start.toJSDate(),
      end: range.end.toJSDate(),
    });
    // Only when the days on show change.
  }, [rangeKey]);

  // ─── Event details ────────────────────────────────────────────────────────

  const [details, setDetails] = useState<OpenDetails | null>(null);
  const closeDetails = useCallback(() => setDetails(null), []);
  // Looked up on every render, so an edited event shows its new values and
  // a removed one closes its card.
  const detailsEvent = details
    ? events.find((event) => event.id === details.id)
    : undefined;

  useEffect(() => {
    if (details && !detailsEvent) setDetails(null);
  }, [details, detailsEvent]);
  // The anchor leaves the screen when the view or the date changes.
  useEffect(() => setDetails(null), [view, current]);

  const clickable = Boolean(onEventClick || renderEventDetails);
  const activateEvent = useCallback(
    (event: CalendarEvent, anchor: HTMLElement) => {
      (onEventClick as CalendarProps['onEventClick'])?.(event, { anchor });
      if (renderEventDetails) setDetails({ id: event.id, anchor });
    },
    [onEventClick, renderEventDetails],
  );

  // The context is typed for `unknown` data; the callbacks only ever receive
  // the consumer's own events back, so the cast is sound.
  const context = useMemo(
    () =>
      ({
        getDayProps,
        onAddEvent,
        canAddOn,
        onTaskToggle,
        onDayClick,
        renderEvent,
        renderEventActions,
        getEventProps,
        locale,
        timeFormat,
        activateEvent: clickable ? activateEvent : undefined,
        openDay:
          switchable && canChangeDate && views.includes('day')
            ? openDay
            : undefined,
        // The toolbar's toggle does the same, so the back button only shows
        // without it.
        backToMonth:
          switchable && views.includes('month') && !toolbar
            ? backToMonth
            : undefined,
      }) as CalendarContextValue,
    [
      getDayProps,
      onAddEvent,
      canAddOn,
      onTaskToggle,
      onDayClick,
      renderEvent,
      renderEventActions,
      getEventProps,
      locale,
      timeFormat,
      clickable,
      activateEvent,
      switchable,
      canChangeDate,
      toolbar,
      views,
      openDay,
      backToMonth,
    ],
  );

  return (
    <CalendarContext.Provider value={context}>
      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={className}
        style={style}
        css={S.root(theme)}>
        {toolbar && (
          <CalendarToolbar
            view={view}
            date={current}
            locale={locale}
            onNavigate={canChangeDate ? navigate : undefined}
            views={views}
            onViewChange={canChangeView ? setView : undefined}
            end={toolbarEnd}
          />
        )}
        <div css={[S.body, loading && S.bodyLoading]}>
          {loading && (
            <div data-calendar-loading aria-hidden css={S.loadingBar(theme)} />
          )}
          {view === 'day' ? (
            <DayView
              date={current}
              items={dayItems}
              header={dayHeader}
              scrollToHour={scrollToHour}
            />
          ) : (
            <MonthView
              month={current}
              eventsByDay={eventsByDay}
              weekdays={weekdays}
              maxEventsPerDay={maxEventsPerDay}
              renderWeekTotal={
                variant === 'timeTracker'
                  ? (renderWeekTotal as
                      | ((week: CalendarWeek) => ReactNode)
                      | undefined)
                  : undefined
              }
              totalLabel={totalLabel}
              footer={footer}
            />
          )}
        </div>
      </div>
      {details && detailsEvent && renderEventDetails && (
        <EventDetailsLayer
          anchor={details.anchor}
          display={eventDetailsDisplay}
          label={
            typeof detailsEvent.title === 'string'
              ? detailsEvent.title
              : 'Event details'
          }
          onClose={closeDetails}>
          {renderEventDetails(detailsEvent, { close: closeDetails })}
        </EventDetailsLayer>
      )}
    </CalendarContext.Provider>
  );
};

/**
 * Calendar - Shows entries on a month grid or on a single day's hour
 * timeline.
 *
 * ### Entries
 * An entry (`CalendarEvent`) has a `start` and, when timed, an `end`.
 * Entries with `allDay` have no time of day: holidays, reminders, or time
 * logs that record how long but not when. Each entry has a colour stripe from
 * the nine-colour palette, an optional `trailing` node (a duration, a badge,
 * avatars) and can be a `task` with a completion checkbox.
 *
 * ### Month view
 * Monday-first weeks, 5 or 7 columns. A cell lists `maxEventsPerDay` entries
 * and collapses the rest behind "+N more", which opens them in a popover.
 * `getDayProps` can turn a day into a whole-day highlight (tinted, outlined,
 * with a badge — days off, holidays) or hide its add button.
 *
 * The `timeTracker` variant adds a total column per week with content from
 * `renderWeekTotal`; `footer` adds a bar under the grid. The calendar never
 * adds anything up itself — totals are whatever the consumer renders.
 *
 * ### Day view
 * Untimed entries are listed above 00:00; timed ones are placed on the hour
 * timeline, side by side where they overlap. A timed entry that runs past
 * midnight continues on the next day's timeline. Today shows a line at the
 * current time.
 *
 * ### Multi-day entries
 * An untimed entry with an `end`, or a timed one lasting 24 hours or more,
 * is repeated on every day it covers, with chevrons where it continues. On
 * the days it fills, it's listed with the untimed entries.
 *
 * ### Navigation
 * Left alone, the calendar navigates itself: a day number opens that day,
 * the day view's back button returns to the month, and `toolbar` adds
 * previous / today / next buttons and a Month/Day toggle. Pass `view` and
 * `date` to control them instead — with `onViewChange` and `onDateChange`,
 * or without them to pin them. `views` limits the views on offer.
 * `onRangeChange` reports the days on show, to fetch events for.
 *
 * ### Entries: clicks, details and custom looks
 * `onEventClick` and `renderEventDetails` make entries clickable. The
 * latter's content (typically a `CalendarEventDetails`) opens next to the
 * entry, or centred with `eventDetailsDisplay="modal"`.
 * `renderEventActions` adds buttons (e.g. remove) outside the click target;
 * `getEventProps` restyles an entry; `renderEvent` replaces or wraps it.
 *
 * ### Sizing
 * The calendar fills its container's width. The month grid is as tall as its
 * rows. The day view shows twelve hours and scrolls; give the calendar a
 * height (e.g. `style={{ height: '100%' }}` or `flex: 1`) and it fills that
 * instead.
 *
 * @category Components
 * @subcategory Data Display
 *
 * @example
 * ```tsx
 * <Calendar
 *   date={new Date()}
 *   events={[
 *     { id: 1, title: 'Planning', start: '2026-10-12T10:00', end: '2026-10-12T11:00', color: 'purple' },
 *     { id: 2, title: 'Release day', start: '2026-10-14', allDay: true, color: 'green' },
 *   ]}
 *   onAddEvent={(date) => openCreateModal(date)}
 *   onEventClick={(event) => openDetails(event)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Time tracker: untimed logs with durations, weekly totals, a footer
 * <Calendar
 *   variant="timeTracker"
 *   weekdays={5}
 *   events={logs.map((log) => ({
 *     id: log.id,
 *     title: log.activity,
 *     start: log.date,
 *     allDay: true,
 *     trailing: formatHours(log.hours),
 *   }))}
 *   renderWeekTotal={(week) => `${sumHours(week.events)} hr(s)`}
 *   footer={<><span>Monthly norm: 174:00</span><span>Reported 80:00</span></>}
 *   getDayProps={(date) =>
 *     isVacation(date)
 *       ? { highlight: { color: 'yellow', icon: 'vacation', label: 'Vacation' } }
 *       : undefined
 *   }
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Self-navigating, with a toolbar, details on click and loading state
 * <Calendar
 *   toolbar
 *   events={events}
 *   loading={isFetching}
 *   onRangeChange={({ start, end }) => fetchEvents(start, end)}
 *   renderEventDetails={(event, { close }) => (
 *     <CalendarEventDetails
 *       title={event.title}
 *       fields={[{ label: 'Location', value: event.data.location }]}
 *       onDelete={() => remove(event.id)}
 *       onClose={close}
 *     />
 *   )}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // A single day, 12-hour clock
 * <Calendar view="day" date={day} events={events} timeFormat="12h" />
 * ```
 *
 * @accessibility
 * - Root is a labelled `region`; each month cell is a `group` named by its full date
 * - Today's date carries `aria-current="date"`
 * - Add buttons show on hover but stay in the tab order, and are always visible on touch screens
 * - Clickable entries, day numbers and "+N more" are real buttons
 * - Entry details open as a labelled `dialog`; Escape closes it and focus returns to the entry
 * - `aria-busy` is set while `loading`
 */
export const Calendar = forwardRef(CalendarInner) as <TData = unknown>(
  props: CalendarProps<TData> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
