import React, { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';
import { useDatePickerContext } from '../useDatePickerContext';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const theme = useTheme();
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastChangedDate,
    highlightDates,
    showTimePicker,
    setCalendarViewDateTime,
    setDateTime,
    setIsOpen,
    safeOnChange,
  } = useDatePickerContext();
  const selectedDateTime = dateTime?.toFormat('D');
  const currentDate = calendarViewDateTime?.toJSDate();
  const currentMonth = currentDate?.getMonth();
  const dates = getDaysForCalendarMonth(currentDate);
  const nowDate = DateTime.fromJSDate(new Date()).toFormat('D');
  const isHighlightEnabled = !!highlightDates?.enabled;
  const { otherDate } = highlightDates || {};
  const otherDateDT = otherDate && DateTime.fromJSDate(otherDate);

  const handleDaySelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedDay = (target as HTMLDivElement).getAttribute('data-day');
    const isEnabled =
      (target as HTMLDivElement).getAttribute('aria-disabled') === 'false';
    if (isEnabled && selectedDay) {
      // The clicked cell may belong to the previous/next month (leading or
      // trailing padding), so its year/month/day must come from data-day
      // rather than being applied to the currently displayed month —
      // otherwise e.g. clicking "30 Jul" while viewing August would
      // silently resolve to 30 Aug. Any time-of-day already chosen via the
      // time panel is preserved from calendarViewDateTime.
      const parsedDay = DateTime.fromFormat(selectedDay, 'D');
      const newDate = calendarViewDateTime?.set({
        year: parsedDay.year,
        month: parsedDay.month,
        day: parsedDay.day,
      });
      setCalendarViewDateTime(newDate);
      setDateTime(newDate);
      safeOnChange?.(newDate);

      // With a time panel open, closing here would make the hours/minutes
      // unreachable — the popover closes on outside click instead.
      if (!showTimePicker) {
        setIsOpen(false);
      }
    }
  };
  return (
    <React.Fragment>
      <Wrapper>
        {weekDays.map((weekDay, index) => (
          <Wrapper
            key={`week-day-${weekDay}-${index}`}
            css={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: '16px',
              color: theme.colors.greyDarker80,
              cursor: 'default',
              userSelect: 'none',
            }}>
            {weekDay}
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper css={{ flexWrap: 'wrap' }} onClick={handleDaySelect}>
        {dates.map((currentDate, index) => {
          const currentDT = DateTime.fromJSDate(currentDate);
          const calendarDate = currentDT.toFormat('D');
          const calendarDay = currentDate.getDate();
          const calendarMonth = currentDate.getMonth();
          const ariaLabel = currentDT.toLocaleString(DateTime.DATE_HUGE);
          const isCalendarDateNow = nowDate === calendarDate;
          const isCalendarMonth = currentMonth === calendarMonth;
          const isCalendarFirstDateSelected = calendarDate === selectedDateTime;
          const isCalendarSecondDateSelected =
            calendarDate === otherDateDT?.toFormat('D');
          const isCalendarDateSelected =
            isCalendarFirstDateSelected || isCalendarSecondDateSelected;
          let isHighlightDate = false;

          if (
            isHighlightEnabled &&
            lastChangedDate &&
            otherDateDT &&
            dateTime
          ) {
            isHighlightDate =
              highlightDates.mode === 'dateTo'
                ? otherDateDT < currentDT && currentDT < dateTime
                : dateTime < currentDT && currentDT < otherDateDT;
          }

          // Leading/trailing days from adjacent months are only muted, not
          // disabled — they're real, selectable dates.
          let isAriaDisabled = false;
          if (dateMinDT && dateMaxDT) {
            isAriaDisabled = currentDT < dateMinDT || currentDT > dateMaxDT;
          } else if (dateMinDT) {
            isAriaDisabled = currentDT < dateMinDT;
          } else if (dateMaxDT) {
            isAriaDisabled = currentDT > dateMaxDT;
          }

          const isRangeActive =
            isHighlightEnabled && !!otherDateDT && !!dateTime;
          const rangeEdge = S.getRangeEdge({
            isFirstSelected: isCalendarFirstDateSelected,
            isSecondSelected: isCalendarSecondDateSelected,
            isRangeActive,
            mode: highlightDates?.mode,
          });

          return (
            <S.DaysViewCell
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${index}`}
              aria-disabled={isAriaDisabled}
              aria-label={ariaLabel}
              data-day={calendarDate}
              isCalendarDateNow={isCalendarDateNow}
              isCalendarDateSelected={isCalendarDateSelected}
              isOutOfMonth={!isCalendarMonth}
              rangeEdge={rangeEdge}
              isHighlighted={isHighlightDate}>
              {calendarDay}
            </S.DaysViewCell>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};
