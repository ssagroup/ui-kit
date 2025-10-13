import React, { MouseEventHandler } from 'react';

import { DateTime } from 'luxon';

import Wrapper from '@components/Wrapper';

import * as S from '../styles';
import { useDatePickerContext } from '../useDatePickerContext';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastChangedDate,
    highlightDates,
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
    const selectedDay = Number((target as HTMLDivElement).innerHTML);
    const isEnabled =
      (target as HTMLDivElement).getAttribute('aria-disabled') === 'false';
    if (isEnabled) {
      const newDate = calendarViewDateTime?.set({ day: selectedDay });
      setCalendarViewDateTime(newDate);
      setDateTime(newDate);
      safeOnChange?.(newDate);
      setIsOpen(false);
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
