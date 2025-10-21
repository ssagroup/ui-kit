import React, { MouseEventHandler } from 'react';

import { DateTime } from 'luxon';

import Wrapper from '@components/Wrapper';

import { useRangeHighlighting } from '../hooks';
import * as S from '../styles';
import { DateTimeTuple } from '../types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';

import { DatesListWrapper } from './DatesListWrapper';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastFocusedElement,
    currentCalendarViewDT,
    setCalendarViewDateTime,
    setDateTime,
    setIsOpen,
  } = useDateRangePickerContext();
  const currentDate = currentCalendarViewDT.toJSDate();
  const currentMonth = currentDate?.getMonth();
  const dates = getDaysForCalendarMonth(currentDate);
  const nowDate = DateTime.fromJSDate(new Date()).toFormat('D');

  const { handleDateHover, getClassNames, isHighlightDate } =
    useRangeHighlighting();

  const handleDaySelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedDay = Number((target as HTMLDivElement).innerHTML);
    const isEnabled =
      (target as HTMLDivElement).getAttribute('aria-disabled') === 'false';
    if (isEnabled) {
      const newDate = currentCalendarViewDT.set({
        day: selectedDay,
      });
      const newDateTuple: DateTimeTuple =
        lastFocusedElement === 'from'
          ? [newDate, dateTime[1]]
          : [dateTime[0], newDate];
      setCalendarViewDateTime(
        lastFocusedElement === 'from'
          ? [newDate, dateTime[1] ? calendarViewDateTime?.[1] : newDate]
          : [dateTime[0] ? calendarViewDateTime?.[0] : newDate, newDate],
      );
      setDateTime(newDateTuple);
      if (newDateTuple[0] && newDateTuple[1]) {
        setIsOpen(false);
      }
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
      <DatesListWrapper
        css={{
          paddingLeft: 9,
        }}
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

          const classNames = getClassNames(currentDT, {
            isCalendarFirstDateSelected,
            isCalendarSecondDateSelected,
          });

          return (
            <S.DaysViewCell
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${index}`}
              aria-disabled={isAriaDisabled}
              aria-label={ariaLabel}
              data-day={calendarDate}
              isCalendarDateNow={isCalendarDateNow}
              isCalendarDateSelected={isCalendarDateSelected}
              isCalendarFirstDateSelected={isCalendarFirstDateSelected}
              isCalendarSecondDateSelected={isCalendarSecondDateSelected}
              isHighlighted={isHighlightDate(currentDT)}
              className={classNames.join(' ')}
              onMouseEnter={() => handleDateHover(currentDT)}
              onMouseLeave={() => handleDateHover(null)}>
              {calendarDay}
            </S.DaysViewCell>
          );
        })}
      </DatesListWrapper>
    </React.Fragment>
  );
};
