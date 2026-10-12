import {
  MouseEvent,
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
  HOUR_HEIGHT,
} from '../consts';
import { CalendarDayHighlight } from '../types';
import {
  clockMinutes,
  formatHourLabel,
  hasContent,
  isWholeDay,
  formatTime,
  layoutDayEvents,
  NormalizedEvent,
  PositionedEvent,
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

const minutesToPx = (minutes: number) => (minutes * HOUR_HEIGHT) / 60;

const getEventSize = (durationMinutes: number): S.DayEventSize => {
  if (durationMinutes >= 60) return 'large';
  if (durationMinutes >= 30) return 'medium';
  return 'small';
};

/** Re-renders once a minute while `enabled`, for the now line. */
const useNow = (enabled: boolean) => {
  const [now, setNow] = useState(() => DateTime.now());
  useEffect(() => {
    if (!enabled) return;
    setNow(DateTime.now());
    const timer = setInterval(() => setNow(DateTime.now()), 60_000);
    return () => clearInterval(timer);
  }, [enabled]);
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
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

/** The default look of a timed entry. Fills the box it's placed in. */
const DayEventCard = ({ entry, onClick }: DayEventCardProps) => {
  const theme = useTheme();
  const { renderEventActions, getEventProps, timeFormat } =
    useCalendarContext();
  const { item, durationMinutes } = entry;
  const { event } = item;

  const size = getEventSize(durationMinutes);
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

  const content = isTask ? (
    <span css={S.dayEventTitle(size)}>{event.title}</span>
  ) : (
    <span css={S.dayEventContent(size)}>
      <span css={S.dayEventTitle(size)}>{event.title}</span>
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
  const { renderEvent } = useCalendarContext();
  const { item, startMinutes, durationMinutes, column, columns } = entry;
  const onClick = useEventClick(item.event);

  const width = `(100% - ${COLUMN_INSET.start + COLUMN_INSET.end}px) / ${columns}`;
  const style = {
    top: minutesToPx(startMinutes) + DAY_EVENT_GAP / 2,
    height: Math.max(
      minutesToPx(durationMinutes) - DAY_EVENT_GAP,
      DAY_EVENT_MIN_HEIGHT,
    ),
    left: `calc(${COLUMN_INSET.start}px + ${width} * ${column})`,
    width: `calc(${width} - ${columns > 1 ? 2 : 0}px)`,
  };

  const defaultContent = <DayEventCard entry={entry} onClick={onClick} />;
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
 * A single day: header, untimed entries above 00:00, and an hour timeline
 * with the timed entries placed by time. Overlapping entries share the width.
 */
export const DayView = ({
  date,
  items,
  header,
  scrollToHour,
}: DayViewProps) => {
  const theme = useTheme();
  const { getDayProps, onAddEvent, canAddOn, backToMonth, timeFormat, locale } =
    useCalendarContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  const localized = withLocale(date, locale);
  const isToday = date.hasSame(DateTime.now(), 'day');
  const now = useNow(isToday);
  const dayProps = getDayProps?.(date.toJSDate());
  const highlight = dayProps?.highlight;
  const canAdd = canAddOn(date) && !dayProps?.disableAdd;

  const untimed = items.filter((item) => isWholeDay(item, date));
  const positioned = layoutDayEvents(items, date);

  const dayKey = date.toISODate();
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const hour =
      scrollToHour ?? (isToday ? Math.max(DateTime.now().hour - 1, 0) : 8);
    // The lead row is sticky, so the hour lands right under it; back off
    // half a label so the label isn't cut in half.
    scroller.scrollTop = Math.max(hour * HOUR_HEIGHT - 12, 0);
    // Only when the day changes — not on every new event.
  }, [dayKey, scrollToHour]);

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
        {canAdd && (
          <button
            type="button"
            css={S.addButton(theme)}
            aria-label={`Add to ${localized.toFormat('cccc, d MMMM yyyy')}`}
            onClick={() => onAddEvent?.(date.startOf('day').toJSDate())}>
            <Icon name="plus" size={16} color={theme.colors.greyDarker} />
          </button>
        )}
      </div>

      <div ref={scrollRef} css={S.dayScroll}>
        <div css={[S.dayRow, S.dayLeadRow(theme)]}>
          <div css={S.hourGutter(theme)} />
          <div css={S.dayLead(theme)}>
            {highlight && <DayHighlight highlight={highlight} />}
            {untimed.map((item) => (
              <EventSlot key={item.event.id} item={item} view="day" />
            ))}
          </div>
        </div>

        <div css={S.timeline}>
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
                  top: minutesToPx(clockMinutes(now)),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
