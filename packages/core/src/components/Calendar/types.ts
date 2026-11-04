import { CSSProperties, MouseEvent, ReactNode } from 'react';
import { IconProps } from '@components/Icon/types';

/**
 * Which grid the calendar draws: a whole month of day cells, or a single day
 * on an hour timeline.
 */
export type CalendarView = 'month' | 'day';

/**
 * Overall flavour of the month grid.
 *
 * - `events` — a plain calendar.
 * - `timeTracker` — adds a trailing column per week whose content comes from
 *   `renderWeekTotal`, for things like "hours logged this week".
 */
export type CalendarVariant = 'events' | 'timeTracker';

/**
 * Colour of an event's stripe. The nine colours of the design's calendar
 * palette.
 */
export type CalendarColor =
  | 'purple'
  | 'blue'
  | 'lightBlue'
  | 'turquoise'
  | 'cyan'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'red';

/**
 * Colour of a whole-day highlight — the tinted, outlined cell used for days
 * off, holidays and the like.
 */
export type CalendarHighlightColor = 'purple' | 'turquoise' | 'red' | 'yellow';

/**
 * A date the calendar accepts: a `Date`, or an ISO 8601 string such as
 * `'2026-10-12'` or `'2026-10-12T09:30'`.
 */
export type CalendarDateInput = Date | string;

/**
 * A single entry on the calendar.
 */
export type CalendarEvent<TData = unknown> = {
  /** Unique id. Used as the React key. */
  id: string | number;
  /** Text of the entry. */
  title: ReactNode;
  /**
   * When the entry happens. Only the date part is used for `allDay` entries.
   */
  start: CalendarDateInput;
  /**
   * When the entry ends. Defaults to 30 minutes after `start` for a timed
   * entry, and to its start day for an `allDay` one — whose `end` is the
   * last day it covers (inclusive; only the date part counts).
   *
   * An `allDay` entry over several days, or a timed one lasting 24 hours or
   * more, is repeated on each day it covers (up to a year). A shorter timed
   * entry that crosses midnight stays on its start day in the month grid,
   * and continues on the next day's timeline in the day view.
   */
  end?: CalendarDateInput;
  /**
   * The entry has no time of day — a holiday, a reminder, or a time log that
   * records a duration but not when it happened. Untimed entries are listed
   * without a time in the month grid and above the hour timeline in the day
   * view.
   * @default false
   */
  allDay?: boolean;
  /**
   * Stripe colour.
   * @default 'blue'
   */
  color?: CalendarColor;
  /**
   * `task` entries get a completion checkbox; see `completed` and
   * `onTaskToggle` on the calendar.
   * @default 'event'
   */
  kind?: 'event' | 'task';
  /** Whether a `task` is done. */
  completed?: boolean;
  /**
   * Content at the end of the entry — for example the logged duration
   * (`'2:30'`), a status badge or an avatar group.
   */
  trailing?: ReactNode;
  /** Anything the consumer wants back in callbacks. */
  data?: TData;
};

/**
 * A whole-day highlight: the cell gets a tinted background and outline, and
 * a badge with an icon and label is listed first.
 */
export type CalendarDayHighlight = {
  /** Tint, outline and badge colour. */
  color: CalendarHighlightColor;
  /** Text next to the badge, e.g. `'Vacation'`. */
  label: ReactNode;
  /**
   * Icon inside the round badge. A string is taken as an icon name from the
   * kit's set and drawn white at 16px; any other node is rendered as is.
   */
  icon?: IconProps['name'] | ReactNode;
  /** Content at the end of the badge row, e.g. `'8:00'`. */
  trailing?: ReactNode;
  /** Makes the badge row clickable. */
  onClick?: () => void;
};

/**
 * A day's working time on the day view's timeline, in hours from midnight —
 * `{ start: 8, end: 20 }` is 08:00–20:00, `17.5` is 17:30. The hours
 * outside it are shaded grey, but stay open for adding entries.
 */
export type CalendarWorkingHours = {
  /** Hour the working time starts, 0–24. */
  start: number;
  /** Hour the working time ends, 0–24; after `start`. */
  end: number;
};

/** A weekday, as keyed in {@link CalendarWorkingHoursByWeekday}. */
export type CalendarWeekday =
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun';

/**
 * Working time per weekday. A weekday left out, or set to `null`, has no
 * working time — the whole day is shaded.
 */
export type CalendarWorkingHoursByWeekday = Partial<
  Record<CalendarWeekday, CalendarWorkingHours | null>
>;

/**
 * Per-day options returned by `getDayProps`.
 */
export type CalendarDayProps = {
  /**
   * The day's working time, over `workingHours` — e.g. a short day before a
   * holiday. `null` shades the whole day.
   */
  workingHours?: CalendarWorkingHours | null;
  /** Turns the day into a highlighted, whole-day cell. */
  highlight?: CalendarDayHighlight;
  /**
   * Hides the add button for this day, e.g. on a holiday. For a range of
   * days, use `minAddDate` / `maxAddDate`.
   * @default false
   */
  disableAdd?: boolean;
};

/**
 * A week row of the month grid, handed to `renderWeekTotal`.
 */
export type CalendarWeek<TData = unknown> = {
  /** Monday of the week. */
  start: Date;
  /** Last day shown in the row (Friday or Sunday). */
  end: Date;
  /** Days shown in the row, including days of the neighbouring months. */
  days: Date[];
  /**
   * Events of the row's days that fall in the displayed month — the ones a
   * weekly total would normally add up. Each event is listed once, even
   * one repeated over several of the days.
   */
  events: CalendarEvent<TData>[];
};

/**
 * Where an event is being drawn, handed to `renderEventActions`.
 */
export type CalendarEventSlotContext = {
  view: CalendarView;
  /** `true` inside the "+N more" popover. */
  inPopover: boolean;
  /**
   * Which day of a multi-day entry this is, from 1. Always 1 for a
   * single-day entry.
   */
  dayOfSpan: number;
  /** Days a multi-day entry is repeated on; 1 for a single-day entry. */
  spanDays: number;
};

/**
 * Handed to `renderEvent`: where the event is drawn, the default rendering
 * to wrap or extend, and the click handler to put on a custom entry.
 */
export type CalendarEventRenderContext = CalendarEventSlotContext & {
  /**
   * The entry as the calendar would draw it. Return it wrapped, or next to
   * something else, to extend the default rather than replace it.
   */
  defaultContent: ReactNode;
  /**
   * Fires `onEventClick` and opens `renderEventDetails`, anchored to the
   * clicked element. Put it on the clickable part of a custom entry.
   * `undefined` when entries aren't clickable.
   */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

/**
 * Extra attributes for an entry's default rendering, returned by
 * `getEventProps`.
 */
export type CalendarEventProps = {
  /** Added to the entry's root, e.g. an emotion class to restyle it. */
  className?: string;
  style?: CSSProperties;
};

/**
 * Second argument of `onEventClick`.
 */
export type CalendarEventClickInfo = {
  /**
   * The element the entry is drawn as — to anchor your own popover to. For
   * an entry in the "+N more" popover, the "+N more" button, since the
   * popover closes on click.
   */
  anchor: HTMLElement;
};

/**
 * Handed to `renderEventDetails`.
 */
export type CalendarEventDetailsControls = {
  /** Closes the details. */
  close: () => void;
};

/**
 * The days a view shows, handed to `onRangeChange`. Unlike the calendar's
 * other day values, `start` and `end` are moments — the span to fetch timed
 * entries for — so with a `timeZone` they're that zone's midnights, not
 * local ones.
 */
export type CalendarRange = {
  view: CalendarView;
  /** Start of the first day shown, in the calendar's time zone. */
  start: Date;
  /** End of the last day shown (23:59:59.999), in the calendar's time zone. */
  end: Date;
};

/**
 * Props of the {@link Calendar} component.
 */
export type CalendarProps<TData = unknown> = {
  /**
   * Entries to show. They don't have to be limited to the visible range.
   */
  events?: CalendarEvent<TData>[];
  /**
   * Month grid or single-day timeline. Passing it makes the view
   * controlled: change it from `onViewChange`.
   */
  view?: CalendarView;
  /**
   * View to start in when `view` isn't controlled.
   * @default the first of `views`
   */
  defaultView?: CalendarView;
  /**
   * Called when the calendar switches view: a day number opens the `day`
   * view; the day view's back button (shown when there's no toolbar) and
   * the toolbar's toggle switch between the two.
   */
  onViewChange?: (view: CalendarView) => void;
  /**
   * Views the user can switch between. With a single view there is no
   * switching: day numbers don't open the day view, and the toolbar has no
   * toggle.
   * @default ['month', 'day']
   */
  views?: CalendarView[];
  /**
   * Date on show: any day of the month in the `month` view, the day itself
   * in the `day` view. Passing it makes the date controlled: change it from
   * `onDateChange`.
   */
  date?: CalendarDateInput;
  /**
   * Date to start on when `date` isn't controlled.
   * @default today
   */
  defaultDate?: CalendarDateInput;
  /**
   * Called when the calendar moves to another date: the toolbar's arrows
   * and "Today" button, or a day number opening the day view.
   */
  onDateChange?: (date: Date) => void;
  /**
   * Called with the days on show whenever they change, and once on mount —
   * the range to fetch events for.
   */
  onRangeChange?: (range: CalendarRange) => void;
  /**
   * Shows a bar above the grid with previous/next and "Today" buttons, the
   * date on show and, with more than one of `views`, a Month/Day toggle.
   * @default false
   */
  toolbar?: boolean;
  /**
   * Content at the end of the toolbar, e.g. a "Create" button.
   */
  toolbarEnd?: ReactNode;
  /**
   * Marks the calendar busy while events load: a progress bar runs along
   * the top and the region gets `aria-busy`. Entries already shown stay.
   * @default false
   */
  loading?: boolean;
  /**
   * Adds the weekly total column to the month grid. See {@link CalendarVariant}.
   * @default 'events'
   */
  variant?: CalendarVariant;
  /**
   * Columns of the month grid: Monday–Friday or Monday–Sunday.
   * @default 7
   */
  weekdays?: 5 | 7;
  /**
   * Entries listed in a month cell before the rest collapse behind a
   * "+N more" button.
   * @default 3
   */
  maxEventsPerDay?: number;
  /**
   * Content of the weekly total cell in the `timeTracker` variant.
   */
  renderWeekTotal?: (week: CalendarWeek<TData>) => ReactNode;
  /**
   * Header text of the total column.
   * @default 'Total'
   */
  totalLabel?: ReactNode;
  /**
   * Bar under the month grid, e.g. "Monthly norm" and "Reported" figures.
   * Laid out as a row with space between its children.
   */
  footer?: ReactNode;
  /**
   * Per-day options: whole-day highlights and disabling the add button.
   */
  getDayProps?: (date: Date) => CalendarDayProps | undefined;
  /**
   * Shows an add button on each day (on hover in the month grid) and in the
   * day view header. Receives the day clicked (its start, in local time
   * like every day value), or the hour clicked on the day view's timeline
   * — a moment, which in another `timeZone` reads differently locally.
   */
  onAddEvent?: (date: Date) => void;
  /**
   * First day the add button shows on, e.g. today to stop adding to the
   * past. Inclusive; only the date part counts.
   */
  minAddDate?: CalendarDateInput;
  /**
   * Last day the add button shows on, e.g. today to stop adding to the
   * future. Inclusive; only the date part counts. For one-off days, use
   * `getDayProps(date).disableAdd`.
   */
  maxAddDate?: CalendarDateInput;
  /**
   * Makes entries clickable. `info.anchor` is the clicked element, to anchor
   * your own popover to.
   */
  onEventClick?: (
    event: CalendarEvent<TData>,
    info: CalendarEventClickInfo,
  ) => void;
  /**
   * Content of the card a clicked entry opens — typically a
   * `CalendarEventDetails`. The calendar positions, opens and closes it;
   * `close` closes it from inside (e.g. after deleting).
   */
  renderEventDetails?: (
    event: CalendarEvent<TData>,
    controls: CalendarEventDetailsControls,
  ) => ReactNode;
  /**
   * How `renderEventDetails` opens: next to the clicked entry, or centred
   * over the page.
   * @default 'popover'
   */
  eventDetailsDisplay?: 'popover' | 'modal';
  /** Called when a task's checkbox is toggled. */
  onTaskToggle?: (event: CalendarEvent<TData>, completed: boolean) => void;
  /**
   * Called when a day number of the month grid is clicked. Day numbers also
   * open the `day` view unless switching views is off (see `views`).
   */
  onDayClick?: (date: Date) => void;
  /**
   * Replaces how an entry is drawn. Return `undefined` to fall back to the
   * default for that entry, or `context.defaultContent` wrapped to extend
   * it.
   */
  renderEvent?: (
    event: CalendarEvent<TData>,
    context: CalendarEventRenderContext,
  ) => ReactNode;
  /**
   * Buttons at the end of an entry, outside its click target — e.g. a
   * remove button. Shown after `trailing`.
   */
  renderEventActions?: (
    event: CalendarEvent<TData>,
    context: CalendarEventSlotContext,
  ) => ReactNode;
  /**
   * Class name and style for an entry's default rendering, to restyle it
   * per event.
   */
  getEventProps?: (
    event: CalendarEvent<TData>,
  ) => CalendarEventProps | undefined;
  /**
   * Clock used for event times and the hour labels of the day view.
   * @default '24h'
   */
  timeFormat?: '24h' | '12h';
  /**
   * Header of the day view: the weekday name, or the month and year.
   * @default 'monthYear'
   */
  dayHeader?: 'weekday' | 'monthYear';
  /**
   * Locale for weekday and month names, e.g. `'uk'`. Defaults to the
   * browser's.
   */
  locale?: string;
  /**
   * Hour the day view scrolls to when it opens. Defaults to an hour before
   * the current time on today, and to the start of the working time (see
   * `workingHours`) or 8:00 on other days.
   */
  scrollToHour?: number;
  /**
   * Working time of the day view: the hours outside it get a grey
   * background. They stay open for adding entries — the shading is only a
   * hint. One range for every day, or a range per weekday; for one-off days
   * use `getDayProps(date).workingHours`.
   *
   * Unset, no hours are shaded.
   */
  workingHours?: CalendarWorkingHours | CalendarWorkingHoursByWeekday;
  /**
   * Height of one hour on the day view's timeline, in px. Passing it makes
   * it controlled: change it from `onHourHeightChange`.
   */
  hourHeight?: number;
  /**
   * Hour height to start with when `hourHeight` isn't controlled, and the
   * one a double click on the hour labels goes back to.
   * @default 68
   */
  defaultHourHeight?: number;
  /** Called as the user resizes the hours — see `resizableHours`. */
  onHourHeightChange?: (hourHeight: number) => void;
  /**
   * Lets the user make the day view's hours taller or shorter by dragging
   * the hour labels column up or down, or with the arrow keys when it's
   * focused — from the whole day fitting the view to a single hour filling
   * it. A double click on the column goes back to `defaultHourHeight`.
   * @default false
   */
  resizableHours?: boolean;
  /**
   * IANA time zone the calendar shows times in, e.g. `'Europe/Kyiv'` or
   * `'UTC'`. Passing it makes it controlled: change it from
   * `onTimeZoneChange`.
   *
   * Timed entries are moved into the zone — an entry at 09:00 in Kyiv shows
   * at 07:00 in `'UTC'`. Untimed entries, `date` and the other day values
   * are calendar days and stay on their day. "Today" and the now line follow
   * the zone.
   *
   * @default the browser's time zone
   */
  timeZone?: string;
  /** Time zone to start in when `timeZone` isn't controlled. */
  defaultTimeZone?: string;
  /** Called when the user picks a time zone — see `timeZoneSelector`. */
  onTimeZoneChange?: (timeZone: string) => void;
  /**
   * Shows a time zone button that opens a searchable list of zones. It sits
   * in the toolbar next to the Month/Day toggle; without `toolbar`, in the
   * day view's header.
   * @default false
   */
  timeZoneSelector?: boolean;
  /**
   * Zones the selector offers.
   * @default every zone the browser knows
   */
  timeZones?: string[];
  /** Accessible name of the calendar region. */
  'aria-label'?: string;
  className?: string;
  style?: CSSProperties;
};
