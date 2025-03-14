import React, { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastFocusedElement,
    setCalendarViewDateTime,
    setDateTime,
  } = useDateRangePickerContext();
  const currentIndex = lastFocusedElement === 'from' ? 0 : 1;
  const currentDate = calendarViewDateTime[currentIndex]?.toJSDate();
  const currentMonth = currentDate?.getMonth();
  const dates = getDaysForCalendarMonth(currentDate);
  const nowDate = DateTime.fromJSDate(new Date()).toFormat('D');

  const handleDaySelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedDay = Number((target as HTMLDivElement).innerHTML);
    const isEnabled =
      (target as HTMLDivElement).getAttribute('aria-disabled') === 'false';
    if (isEnabled) {
      const newDate = calendarViewDateTime[currentIndex]?.set({
        day: selectedDay,
      });
      setCalendarViewDateTime(
        lastFocusedElement === 'from'
          ? [newDate, calendarViewDateTime[1]]
          : [calendarViewDateTime[0], newDate],
      );
      setDateTime(
        lastFocusedElement === 'from'
          ? [newDate, dateTime[1]]
          : [dateTime[0], newDate],
      );
    }
  };

  return (
    <React.Fragment>
      <Wrapper css={{ paddingLeft: 9 }}>
        {weekDays.map((weekDay, index) => (
          <Wrapper
            key={`week-day-${weekDay}-${index}`}
            css={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'default',
              userSelect: 'none',
            }}>
            {weekDay}
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper
        css={{ flexWrap: 'wrap', paddingLeft: 9 }}
        onClick={handleDaySelect}>
        {dates.map((currentDate, index) => {
          const currentDT = DateTime.fromJSDate(currentDate);
          const calendarDate = currentDT.toFormat('D');
          const calendarDay = currentDate.getDate();
          const calendarMonth = currentDate.getMonth();
          const ariaLabel = currentDT.toLocaleString(DateTime.DATE_HUGE);
          const isCalendarDateNow = nowDate === calendarDate;
          const isCalendarMonth = currentMonth === calendarMonth;
          const isCalendarFirstDateSelected =
            calendarDate === dateTime[0]?.toFormat('D');
          const isCalendarSecondDateSelected =
            calendarDate === dateTime[1]?.toFormat('D');
          const isCalendarDateSelected =
            isCalendarFirstDateSelected || isCalendarSecondDateSelected;
          let isHighlightDate = false;

          if (dateTime[0] && dateTime[1]) {
            isHighlightDate =
              currentDT > dateTime[0] && currentDT < dateTime[1];
          }

          let isAriaDisabled = false;
          if (dateMinDT && dateMaxDT) {
            isAriaDisabled =
              currentDT < dateMinDT ||
              currentDT > dateMaxDT ||
              !isCalendarMonth;
          } else {
            if (dateMinDT) {
              isAriaDisabled = currentDT < dateMinDT || !isCalendarMonth;
            }
            if (dateMaxDT) {
              isAriaDisabled = currentDT > dateMaxDT || !isCalendarMonth;
            }
          }
          return (
            <S.DaysViewCell
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${index}`}
              aria-disabled={isAriaDisabled}
              aria-label={ariaLabel}
              isCalendarDateNow={isCalendarDateNow}
              isCalendarDateSelected={isCalendarDateSelected}
              isCalendarFirstDateSelected={isCalendarFirstDateSelected}
              isCalendarSecondDateSelected={isCalendarSecondDateSelected}
              isHighlighted={isHighlightDate}>
              {calendarDay}
            </S.DaysViewCell>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};
