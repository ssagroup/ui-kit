import {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { useCalendarContext } from '../CalendarContext';
import {
  DAY_EVENT_GAP,
  DAY_EVENT_MIN_HEIGHT,
  getEventColor,
  getHighlightColors,
  HOUR_HEIGHT_FALLBACK_LIMITS,
  HOUR_HEIGHT_FLOOR,
  HOUR_HEIGHT_STEP,
} from '../consts';
import { CalendarDayHighlight } from '../types';
import {
  clockMinutes,
  formatHourLabel,
  getNonWorkingRanges,
  hasContent,
  isWholeDay,
  formatTime,
  layoutDayEvents,
  NormalizedEvent,
  nowIn,
  PositionedEvent,
  resolveWorkingHours,
  toLocalDayDate,
  withLocale,
} from '../utils';
import * as S from '../styles';
import { EventSlot } from './EventSlot';
import { HighlightBadge } from './HighlightBadge';
import { TaskCheckbox } from './TaskCheckbox';
import { EVENT_ROOT_ATTRIBUTE, useEventClick } from './useEventClick';

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
/** Space between the events and the edges of the day's column. */
const COLUMN_INSET = { start: 4, end: 12 };

type DayViewProps = {
  date: DateTime;
  items: NormalizedEvent[];
  header: 'weekday' | 'monthYear';
  scrollToHour?: number;
};

/** Pointer distance from the top below which a drag isn't made steeper. */
const MIN_RESIZE_REACH = 40;

const minutesToPx = (minutes: number, hourHeight: number) =>
  (minutes * hourHeight) / 60;

type HourLimits = { min: number; max: number };

/**
 * How far the hours can be resized: from the whole day fitting the visible
 * timeline to a single hour filling it. The default and the current height
 * are always within reach — so a double click can go back, and a view that
 * grew or shrank around the current height doesn't make it jump.
 */
const getHourLimits = (
  visibleHeight: number,
  hourHeight: number,
  defaultHourHeight: number,
): HourLimits => {
  const fit =
    visibleHeight > 0
      ? {
          // Rounded down, so the whole day fits without a scroll.
          min: Math.floor(visibleHeight / 24),
          max: Math.floor(visibleHeight),
        }
      : HOUR_HEIGHT_FALLBACK_LIMITS;
  // Never below the floor the calendar clamps to, or the handle would
  // report a height it can't reach.
  const min = Math.max(
    Math.min(fit.min, hourHeight, defaultHourHeight),
    HOUR_HEIGHT_FLOOR,
  );
  return { min, max: Math.max(fit.max, hourHeight, defaultHourHeight, min) };
};

const SIZES: S.DayEventSize[] = [
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
];

/**
 * Text size of an entry by the height of its box, so the text grows with
 * the box as the hours are resized. Side-by-side entries are narrow, so the
 * biggest sizes are kept for wider ones.
 */
const getEventSize = (height: number, columns: number): S.DayEventSize => {
  const fits = SIZES.filter(
    (size) => height >= S.DAY_EVENT_TEXT[size].minHeight,
  ).length;
  const cap = columns >= 3 ? 3 : columns === 2 ? 4 : SIZES.length;
  return SIZES[Math.max(Math.min(fits, cap), 1) - 1];
};

/** Re-renders once a minute while `enabled`, for the now line. */
const useNow = (enabled: boolean, zone?: string) => {
  const [now, setNow] = useState(() => nowIn(zone));
  useEffect(() => {
    if (!enabled) return;
    setNow(nowIn(zone));
    const timer = setInterval(() => setNow(nowIn(zone)), 60_000);
    return () => clearInterval(timer);
  }, [enabled, zone]);
  return now;
};

const DayHighlight = ({ highlight }: { highlight: CalendarDayHighlight }) => {
  const theme = useTheme();
  const { outline, tint } = getHighlightColors(theme, highlight.color);
  const content = (
    <>
      <HighlightBadge highlight={highlight} />
      <span css={S.dayHighlightLabel}>{highlight.label}</span>
      {hasContent(highlight.trailing) && (
        <span css={S.slotTrailing}>{highlight.trailing}</span>
      )}
    </>
  );

  if (highlight.onClick) {
    return (
      <button
        type="button"
        css={[S.highlightButton(theme), S.dayHighlight(outline, tint)]}
        onClick={highlight.onClick}>
        {content}
      </button>
    );
  }
  return <div css={S.dayHighlight(outline, tint)}>{content}</div>;
};

type DayEventCardProps = {
  entry: PositionedEvent;
  /** Height of the entry's box, in px — sets its text size. */
  height: number;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

/**
 * The default look of a timed entry. Fills the box it's placed in; the
 * bigger the box, the bigger the text, and a long title wraps onto as many
 * lines as fit.
 */
const DayEventCard = ({ entry, height, onClick }: DayEventCardProps) => {
  const theme = useTheme();
  const { renderEventActions, getEventProps, timeFormat } =
    useCalendarContext();
  const { item, columns } = entry;
  const { event } = item;

  const size = getEventSize(height, columns);
  const metrics = S.DAY_EVENT_TEXT[size];
  const stripe = getEventColor(theme, event.color ?? 'blue');
  const isTask = event.kind === 'task';
  const actions = renderEventActions?.(event, {
    view: 'day',
    inPopover: false,
    dayOfSpan: item.dayOfSpan,
    spanDays: item.spanDays,
  });
  const withActions = hasContent(actions);
  const extra = getEventProps?.(event);
  const rootProps = {
    [EVENT_ROOT_ATTRIBUTE]: '',
    title: typeof event.title === 'string' ? event.title : undefined,
    className: extra?.className,
    style: extra?.style,
  };
  const time = `${formatTime(item.start, timeFormat)} – ${formatTime(
    item.end,
    timeFormat,
  )}`;

  // Lines the title can take: whatever is left once the padding and, in a
  // stacked layout, the time line are taken out.
  const stacked = !isTask && size !== 'small';
  const titleLines = Math.max(
    Math.floor(
      (height - metrics.padding * 2 - (stacked ? metrics.timeLineHeight : 0)) /
        metrics.titleLineHeight,
    ),
    1,
  );
  const title = (
    <span
      css={[S.dayEventTitle(size), titleLines > 1 && S.dayEventTitleWrap]}
      style={titleLines > 1 ? { WebkitLineClamp: titleLines } : undefined}>
      {event.title}
    </span>
  );
  const content = isTask ? (
    title
  ) : (
    <span css={S.dayEventContent(size)}>
      {title}
      <span css={S.dayEventTime(size)}>{time}</span>
    </span>
  );
  const clickable = onClick ? (
    <button type="button" css={S.slotContentButton} onClick={onClick}>
      {content}
    </button>
  ) : (
    content
  );
  const trailing = hasContent(event.trailing) && (
    <span css={S.slotTrailing}>{event.trailing}</span>
  );
  const actionsSlot = withActions && <span css={S.slotActions}>{actions}</span>;
  const cardCss = S.dayEvent(theme, stripe, size);

  if (isTask) {
    return (
      <div {...rootProps} css={cardCss}>
        <span css={S.dayTask}>
          <TaskCheckbox event={event} />
          {clickable}
        </span>
        {trailing}
        {actionsSlot}
      </div>
    );
  }

  // The whole card is one button only when nothing else in it is interactive.
  if (onClick && !withActions) {
    return (
      <button
        type="button"
        {...rootProps}
        css={[S.slotButton(theme), cardCss]}
        onClick={onClick}>
        {content}
        {trailing}
      </button>
    );
  }

  return (
    <div {...rootProps} css={cardCss}>
      {clickable}
      {trailing}
      {actionsSlot}
    </div>
  );
};

/** A timed entry, placed on the timeline by its time and overlap column. */
const DayEvent = ({ entry }: { entry: PositionedEvent }) => {
  const { renderEvent, hourHeight } = useCalendarContext();
  const { item, startMinutes, durationMinutes, column, columns } = entry;
  const onClick = useEventClick(item.event);

  const width = `(100% - ${COLUMN_INSET.start + COLUMN_INSET.end}px) / ${columns}`;
  const height = Math.max(
    minutesToPx(durationMinutes, hourHeight) - DAY_EVENT_GAP,
    DAY_EVENT_MIN_HEIGHT,
  );
  const style = {
    top: minutesToPx(startMinutes, hourHeight) + DAY_EVENT_GAP / 2,
    height,
    left: `calc(${COLUMN_INSET.start}px + ${width} * ${column})`,
    width: `calc(${width} - ${columns > 1 ? 2 : 0}px)`,
  };

  const defaultContent = (
    <DayEventCard entry={entry} height={height} onClick={onClick} />
  );
  const custom = renderEvent?.(item.event, {
    view: 'day',
    inPopover: false,
    dayOfSpan: item.dayOfSpan,
    spanDays: item.spanDays,
    defaultContent,
    onClick,
  });

  return (
    <div css={S.dayEventBox} style={style}>
      {custom === undefined ? defaultContent : custom}
    </div>
  );
};

/**
 * A single day: header, untimed entries above 00:00 (a row shown only when
 * there are some), and an hour timeline with the timed entries placed by
 * time. Overlapping entries share the width; hours outside the working time
 * are shaded.
 */
export const DayView = ({
  date,
  items,
  header,
  scrollToHour,
}: DayViewProps) => {
  const theme = useTheme();
  const {
    getDayProps,
    onAddEvent,
    canAddOn,
    backToMonth,
    timeFormat,
    locale,
    timeZone,
    workingHours,
    hourHeight,
    setHourHeight,
    defaultHourHeight,
    dayHeaderEnd,
  } = useCalendarContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const localized = withLocale(date, locale);
  const isToday = date.hasSame(nowIn(timeZone), 'day');
  const now = useNow(isToday, timeZone);
  const dayDate = toLocalDayDate(date);
  const dayProps = getDayProps?.(dayDate);
  const highlight = dayProps?.highlight;
  const canAdd = canAddOn(date) && !dayProps?.disableAdd;

  const dayHours = resolveWorkingHours(
    workingHours,
    date,
    dayProps?.workingHours,
  );
  const offHours = dayHours === undefined ? [] : getNonWorkingRanges(dayHours);

  const untimed = items.filter((item) => isWholeDay(item, date));
  const positioned = layoutDayEvents(items, date);
  const withLead = Boolean(highlight) || untimed.length > 0;

  const dayKey = date.toISODate();
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const hour =
      scrollToHour ??
      (isToday
        ? Math.max(nowIn(timeZone).hour - 1, 0)
        : Math.floor(dayHours?.start ?? 8));
    // A lead row is sticky, so the hour lands right under it; back off half
    // a label so the label isn't cut in half.
    scroller.scrollTop = Math.max(hour * hourHeight - 12, 0);
    // Only when the day or the zone changes — "now" moves with the zone —
    // not on every new event or resize.
  }, [dayKey, scrollToHour, timeZone]);

  // ─── Resizing the hours ───────────────────────────────────────────────────

  // Where to scroll once the new height is drawn, to keep an hour in place.
  // Tied to the height asked for: a controlled parent may clamp or ignore
  // it, and a stale target must not land on some later, unrelated change.
  const pendingScroll = useRef<{ height: number; top: number } | null>(null);
  useLayoutEffect(() => {
    const pending = pendingScroll.current;
    pendingScroll.current = null;
    const scroller = scrollRef.current;
    if (scroller && pending?.height === hourHeight) {
      scroller.scrollTop = pending.top;
    }
  }, [hourHeight]);

  const drag = useRef<{
    y0: number;
    startHeight: number;
    /** Hour under the pointer when the drag started. */
    hour: number;
  } | null>(null);

  /** Pointer position from the top of the scrolling area. */
  const pointerY = (clientY: number) =>
    clientY - (scrollRef.current?.getBoundingClientRect().top ?? 0);
  /** Top of 00:00 in the scrolling area — under the lead row, if any. */
  const timelineTop = () => timelineRef.current?.offsetTop ?? 0;

  // The visible part of the timeline, under the sticky lead row: it sets
  // the resize limits, and follows the calendar's size.
  const [visibleHeight, setVisibleHeight] = useState(0);
  const resizable = Boolean(setHourHeight);
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!resizable || !scroller) return;
    const measure = () =>
      setVisibleHeight(scroller.clientHeight - timelineTop());
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, [resizable, withLead]);
  const limits = getHourLimits(visibleHeight, hourHeight, defaultHourHeight);

  const resizeTo = (next: number, keepHour: number, atY: number) => {
    const height = Math.round(Math.min(Math.max(next, limits.min), limits.max));
    if (height === hourHeight) return;
    pendingScroll.current = {
      height,
      top: keepHour * height + timelineTop() - atY,
    };
    setHourHeight?.(height);
  };

  const onResizeStart = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;
    if (!scroller || event.button !== 0) return;
    const y0 = pointerY(event.clientY);
    drag.current = {
      y0,
      startHeight: hourHeight,
      hour: (scroller.scrollTop + y0 - timelineTop()) / hourHeight,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  // The hour grabbed follows the pointer: dragging down stretches the hours
  // above it, dragging up squeezes them.
  const onResizeMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const { y0, startHeight, hour } = drag.current;
    const y = pointerY(event.clientY);
    const reach = Math.max(y0, MIN_RESIZE_REACH);
    resizeTo((startHeight * (reach + y - y0)) / reach, hour, y);
  };

  const onResizeEnd = () => {
    drag.current = null;
  };

  // Back to the default zoom, keeping the hour under the pointer in place.
  const onResizeReset = (event: MouseEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const y = pointerY(event.clientY);
    resizeTo(
      defaultHourHeight,
      (scroller.scrollTop + y - timelineTop()) / hourHeight,
      y,
    );
  };

  const onResizeKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const steps: Record<string, number> = {
      ArrowUp: hourHeight + HOUR_HEIGHT_STEP,
      ArrowRight: hourHeight + HOUR_HEIGHT_STEP,
      ArrowDown: hourHeight - HOUR_HEIGHT_STEP,
      ArrowLeft: hourHeight - HOUR_HEIGHT_STEP,
      Home: limits.min,
      End: limits.max,
    };
    if (!(event.key in steps)) return;
    event.preventDefault();
    // Keeps the hour at the top of the view in place.
    resizeTo(
      steps[event.key],
      (scroller.scrollTop - timelineTop()) / hourHeight,
      0,
    );
  };

  const addAt = (hour: number) =>
    onAddEvent?.(date.startOf('day').set({ hour }).toJSDate());

  return (
    <>
      <div css={S.dayHeader(theme, header === 'weekday')}>
        {backToMonth && (
          <button
            type="button"
            css={S.backButton(theme)}
            aria-label="Back to month"
            onClick={backToMonth}>
            <Icon
              name="carrot-left"
              size={16}
              color={theme.colors.greyDarker}
            />
          </button>
        )}
        {header === 'weekday' ? (
          <>
            <span css={S.dayBadge(theme, isToday)}>{date.day}</span>
            <h2 css={S.dayHeaderTitle('weekday')}>
              {localized.toFormat('cccc')}
            </h2>
          </>
        ) : (
          <>
            <span css={S.dayHeaderDate}>
              <span css={S.dayBadge(theme, isToday)}>{date.day}</span>
              <span css={S.dayHeaderWeekdayShort}>
                {localized.toFormat('ccc')}
              </span>
            </span>
            <h2 css={S.dayHeaderTitle('monthYear')}>
              {localized.toFormat('LLLL yyyy')}
            </h2>
          </>
        )}
        {hasContent(dayHeaderEnd) && dayHeaderEnd}
        {canAdd && (
          <button
            type="button"
            css={S.addButton(theme)}
            aria-label={`Add to ${localized.toFormat('cccc, d MMMM yyyy')}`}
            onClick={() => onAddEvent?.(dayDate)}>
            <Icon name="plus" size={16} color={theme.colors.greyDarker} />
          </button>
        )}
      </div>

      <div ref={scrollRef} css={S.dayScroll}>
        {withLead && (
          <div data-all-day css={[S.dayRow, S.dayLeadRow(theme)]}>
            <div css={S.hourGutter(theme)} />
            <div css={S.dayLead(theme)}>
              {highlight && <DayHighlight highlight={highlight} />}
              {untimed.map((item) => (
                <EventSlot key={item.event.id} item={item} view="day" />
              ))}
            </div>
          </div>
        )}

        <div
          ref={timelineRef}
          css={S.timeline}
          style={
            { [S.HOUR_HEIGHT_VARIABLE]: `${hourHeight}px` } as CSSProperties
          }>
          {HOURS.map((hour) => (
            <div key={hour} css={S.dayRow}>
              <div css={S.hourGutter(theme)}>
                <span css={[S.hourLabel, hour === 0 && S.hourLabelFirst]}>
                  {formatHourLabel(hour, timeFormat)}
                </span>
              </div>
              {canAdd ? (
                <button
                  type="button"
                  data-hour={hour}
                  // Mouse shortcut only; the header button adds by keyboard.
                  tabIndex={-1}
                  aria-label={`Add at ${formatHourLabel(hour, timeFormat)}`}
                  css={[
                    S.hourCellAddable(theme),
                    S.hourCell(theme),
                    hour === HOURS.length - 1 && S.hourCellLast,
                  ]}
                  onClick={() => addAt(hour)}
                />
              ) : (
                <div
                  data-hour={hour}
                  css={[
                    S.hourCell(theme),
                    hour === HOURS.length - 1 && S.hourCellLast,
                  ]}
                />
              )}
            </div>
          ))}

          {offHours.length > 0 && (
            <div css={S.offHoursLayer} aria-hidden>
              {offHours.map((range) => (
                <div
                  key={range.start}
                  data-off-hours
                  css={S.offHours(theme)}
                  style={{
                    top: minutesToPx(range.start, hourHeight),
                    height: minutesToPx(range.end - range.start, hourHeight),
                  }}
                />
              ))}
            </div>
          )}

          {setHourHeight && (
            <div
              role="slider"
              tabIndex={0}
              aria-label="Hour height"
              aria-orientation="vertical"
              aria-valuemin={limits.min}
              aria-valuemax={limits.max}
              aria-valuenow={hourHeight}
              aria-valuetext={`${hourHeight} px per hour`}
              css={S.hourResizer(theme)}
              onPointerDown={onResizeStart}
              onPointerMove={onResizeMove}
              onPointerUp={onResizeEnd}
              onPointerCancel={onResizeEnd}
              onDoubleClick={onResizeReset}
              onKeyDown={onResizeKey}
            />
          )}

          <div css={S.dayEventsLayer}>
            {positioned.map((entry) => (
              <DayEvent key={entry.item.event.id} entry={entry} />
            ))}
            {isToday && (
              <div
                data-testid="calendar-now"
                data-now
                css={S.nowPointer(theme)}
                style={{
                  top: minutesToPx(clockMinutes(now), hourHeight),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
