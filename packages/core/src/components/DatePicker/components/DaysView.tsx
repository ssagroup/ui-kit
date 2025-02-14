import React, { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';
import { useDatePickerContext } from '../useDatePickerContext';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const {
    dateTime,
    calendarViewDateTime,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    // yearMinReached,
    // yearMaxReached,
    setCalendarViewDateTime,
    setDateTime,
    setIsOpen,
  } = useDatePickerContext();
  const selectedDateTime = dateTime?.toFormat('D');
  const currentDate = calendarViewDateTime?.toJSDate();
  const currentMonth = currentDate?.getMonth();
  const dates = getDaysForCalendarMonth(currentDate);
  const nowDate = DateTime.fromJSDate(new Date()).toFormat('D');
  const handleDaySelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedDay = Number((target as HTMLDivElement).innerHTML);
    const isEnabled =
      (target as HTMLDivElement).getAttribute('aria-disabled') === 'false';
    if (isEnabled) {
      const newDate = calendarViewDateTime?.set({ day: selectedDay });
      setCalendarViewDateTime(newDate);
      setDateTime(newDate);
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
            }}>
            {weekDay}
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper
        css={{ flexWrap: 'wrap', paddingLeft: 9 }}
        onClick={handleDaySelect}>
        {dates.map((currentDate, index) => {
          const calendarDate = DateTime.fromJSDate(currentDate).toFormat('D');
          const calendarDay = currentDate.getDate();
          const calendarMonth = currentDate.getMonth();
          const calendarYear = currentDate.getFullYear();
          const isCalendarDateNow = nowDate === calendarDate;
          const isCalendarDateSelected = selectedDateTime === calendarDate;
          const isCalendarMonth = currentMonth === calendarMonth;
          /**
           * - check the year
           * - check the month
           * - check the day
           */
          const isMinDayReached =
            calendarYear <= dateMinParts[formatIndexes['year']] &&
            calendarMonth <= dateMinParts[formatIndexes['month']] &&
            calendarDay <= dateMinParts[formatIndexes['day']];
          // const isMinDayReached = yearMinReached
          //   ? dateMinParts[formatIndexes['day']] <= calendarDay
          //   : false;
          const isMaxDayReached =
            calendarYear >= dateMaxParts[formatIndexes['year']] &&
            calendarMonth >= dateMaxParts[formatIndexes['month']] &&
            calendarDay >= dateMaxParts[formatIndexes['day']];
          // const isMaxDayReached = yearMaxReached
          //   ? dateMaxParts[formatIndexes['day']] >= calendarDay
          //   : false;
          const isAriaDisabled =
            isMinDayReached || isMaxDayReached || !isCalendarMonth;
          // console.log(`>>>dayDisabled: ${calendarDay}`, isAriaDisabled, {
          //   isMinDayReached,
          //   isMaxDayReached,
          //   isCalendarMonth,
          // });
          /*

calendarDay:    3
calendarMonth:  1
calendarYear:   2025
dateMinParts:   [10, 2, 2025]

const isMinDayReached =
  2025 <= 2025 &&
  1 <= 2 &&
  3 <= 10;


calendarDay: 11
calendarMonth: 2
calendarYear: 2025
dateMinParts: (3) [10, 2, 2025]
formatIndexes: {day: 1, month: 0, year: 2}

const isMinDayReached =
  2025 <= 2025 &&
  2 <= 2 &&
  11 <= 10;
          */
          console.log(
            `>>>dayDisabled: ${calendarDay}`,
            isAriaDisabled,
            isMinDayReached,
            {
              calendarYear, // 2025
              calendarMonth, // 1
              calendarDay, // 3
              dateMinParts, // [10, 2, 2025]
              formatIndexes, // { day: 1, month: 0, year: 2 }
            },
          );
          return (
            <S.DaysViewCell
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${index}`}
              aria-disabled={!isCalendarMonth}
              // aria-disabled={isAriaDisabled}
              isCalendarDateNow={isCalendarDateNow}
              isCalendarDateSelected={isCalendarDateSelected}
              isCalendarMonth={isCalendarMonth}>
              {/* isAriaDisabled={isAriaDisabled}> */}
              {calendarDay}
            </S.DaysViewCell>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};
