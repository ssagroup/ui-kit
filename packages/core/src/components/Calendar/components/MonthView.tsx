import { Fragment, ReactNode, useMemo } from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';

import Icon from '@components/Icon';

import { useCalendarContext } from '../CalendarContext';
import { getHighlightColors } from '../consts';
import { CalendarDayHighlight, CalendarWeek } from '../types';
import {
  buildMonthWeeks,
  getWeekdayNames,
  hasContent,
  MonthDay,
  NormalizedEvent,
  withLocale,
} from '../utils';
import * as S from '../styles';
import { EventSlot } from './EventSlot';
import { HighlightBadge } from './HighlightBadge';
import { MoreEventsPopover } from './MoreEventsPopover';

type MonthViewProps = {
  month: DateTime;
  eventsByDay: Map<string, NormalizedEvent[]>;
  weekdays: 5 | 7;
  maxEventsPerDay: number;
  renderWeekTotal?: (week: CalendarWeek) => ReactNode;
  totalLabel: ReactNode;
  footer?: ReactNode;
};

/** The badge row a highlighted day lists first. */
const HighlightRow = ({ highlight }: { highlight: CalendarDayHighlight }) => {
  const theme = useTheme();
  const label = (
    <span css={S.highlightMain}>
      <HighlightBadge highlight={highlight} />
      <span css={S.slotTitle}>{highlight.label}</span>
    </span>
  );
  const trailing = hasContent(highlight.trailing) && (
    <span css={S.slotTrailing}>{highlight.trailing}</span>
  );

  if (highlight.onClick) {
    return (
      <button
        type="button"
        css={[S.highlightButton(theme), S.highlightRow, S.highlightRowInCell]}
        onClick={highlight.onClick}>
        {label}
        {trailing}
      </button>
    );
  }
  return (
    <div css={[S.highlightRow, S.highlightRowInCell]}>
      {label}
      {trailing}
    </div>
  );
};

const MonthCell = ({
  day,
  items,
  maxEventsPerDay,
}: {
  day: MonthDay;
  items: NormalizedEvent[];
  maxEventsPerDay: number;
}) => {
  const theme = useTheme();
  const { getDayProps, onAddEvent, canAddOn, onDayClick, openDay, locale } =
    useCalendarContext();
  const jsDate = day.date.toJSDate();
  const dayProps = getDayProps?.(jsDate);
  const highlight = dayProps?.highlight;
  const canAdd =
    canAddOn(day.date) && day.isCurrentMonth && !dayProps?.disableAdd;

  // A highlight takes a row of its own, so it leaves one fewer for entries.
  const capacity = Math.max(maxEventsPerDay - (highlight ? 1 : 0), 0);
  const visible = items.slice(0, capacity);
  const overflow = items.slice(capacity);

  const label = withLocale(day.date, locale).toFormat('cccc, d MMMM yyyy');
  const highlightColors = highlight
    ? getHighlightColors(theme, highlight.color)
    : undefined;

  const dayClickable = Boolean(onDayClick || openDay);
  const handleDayClick = () => {
    onDayClick?.(jsDate);
    openDay?.(jsDate);
  };

  const dateNumberCss = [
    S.dateNumber(theme),
    !day.isCurrentMonth && S.dateNumberOutside(theme),
    day.isToday && S.dateNumberToday(theme),
    dayClickable && S.dateNumberClickable(theme),
  ];

  return (
    <div
      role="group"
      aria-label={label}
      data-today={day.isToday || undefined}
      css={[
        S.monthCell(theme),
        day.isWeekend && S.monthCellWeekend(theme),
        canAdd && !highlight && S.monthCellInteractive(theme),
        highlightColors &&
          S.monthCellHighlight(highlightColors.outline, highlightColors.tint),
      ]}>
      <div css={S.monthCellHead}>
        {dayClickable ? (
          <button
            type="button"
            css={dateNumberCss}
            aria-label={label}
            aria-current={day.isToday ? 'date' : undefined}
            onClick={handleDayClick}>
            {day.date.day}
          </button>
        ) : (
          <span
            css={dateNumberCss}
            aria-current={day.isToday ? 'date' : undefined}>
            {day.date.day}
          </span>
        )}
        {canAdd && (
          <button
            type="button"
            data-calendar-add
            css={[S.addButton(theme), S.addButtonOnHover]}
            aria-label={`Add to ${label}`}
            onClick={() => onAddEvent?.(jsDate)}>
            <Icon name="plus" size={16} color={theme.colors.greyDarker} />
          </button>
        )}
      </div>
      {(highlight || items.length > 0) && (
        <div css={S.monthEvents}>
          {highlight && <HighlightRow highlight={highlight} />}
          {visible.map((item) => (
            <EventSlot key={item.event.id} item={item} view="month" />
          ))}
        </div>
      )}
      {overflow.length > 0 && (
        <MoreEventsPopover date={day.date} items={overflow} />
      )}
    </div>
  );
};

/**
 * The month grid: weekday header, a row of day cells per week (plus the
 * weekly total in the `timeTracker` variant) and the optional footer.
 */
export const MonthView = ({
  month,
  eventsByDay,
  weekdays,
  maxEventsPerDay,
  renderWeekTotal,
  totalLabel,
  footer,
}: MonthViewProps) => {
  const theme = useTheme();
  const { locale } = useCalendarContext();
  const withTotal = Boolean(renderWeekTotal);

  const weeks = useMemo(
    () => buildMonthWeeks(month, weekdays),
    [month, weekdays],
  );
  const weekdayNames = useMemo(
    () => getWeekdayNames('long', locale).slice(0, weekdays),
    [locale, weekdays],
  );
  const columns = S.monthColumns(weekdays, withTotal);

  return (
    <>
      <div css={S.monthScroll}>
        <div css={[columns, S.monthHeader(theme)]}>
          {weekdayNames.map((name) => (
            <div key={name} css={S.monthHeaderCell}>
              {name}
            </div>
          ))}
          {withTotal && <div css={S.monthHeaderCell}>{totalLabel}</div>}
        </div>
        <div css={[columns, S.monthBody(theme)]}>
          {weeks.map((week) => (
            <Fragment key={week.key}>
              {week.days.map((day) => (
                <MonthCell
                  key={day.key}
                  day={day}
                  items={eventsByDay.get(day.key) ?? []}
                  maxEventsPerDay={maxEventsPerDay}
                />
              ))}
              {renderWeekTotal && (
                <div css={S.totalCell(weekdays)}>
                  {renderWeekTotal({
                    start: week.days[0].date.toJSDate(),
                    end: week.days[week.days.length - 1].date.toJSDate(),
                    days: week.days.map((day) => day.date.toJSDate()),
                    // A Set, so a multi-day event counts once.
                    events: [
                      ...new Set(
                        week.days.flatMap((day) =>
                          day.isCurrentMonth
                            ? (eventsByDay.get(day.key) ?? []).map(
                                (item) => item.event,
                              )
                            : [],
                        ),
                      ),
                    ],
                  })}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      {hasContent(footer) && <div css={S.footer(theme)}>{footer}</div>}
    </>
  );
};
