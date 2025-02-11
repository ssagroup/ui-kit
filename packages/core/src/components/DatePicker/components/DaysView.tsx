import React, { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';
import { useDatePickerContext } from '../useDatePickerContext';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const { calendarViewDateTime, dateTime } = useDatePickerContext();
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
      console.log('>>>selected day', selectedDay);
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
              cursor: 'default',
            }}>
            {weekDay}
          </Wrapper>
        ))}
      </Wrapper>
      <Wrapper css={{ flexWrap: 'wrap' }} onClick={handleDaySelect}>
        {dates.map((currentDate, index) => {
          const calendarDate = DateTime.fromJSDate(currentDate).toFormat('D');
          const calendarDay = currentDate.getDate();
          const calendarMonth = currentDate.getMonth();
          const isCalendarDateNow = nowDate === calendarDate;
          const isCalendarDateSelected = selectedDateTime === calendarDate;
          const isCalendarMonth = currentMonth === calendarMonth;
          return (
            <S.DaysViewCell
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${index}`}
              aria-disabled={!isCalendarMonth}
              isCalendarDateNow={isCalendarDateNow}
              isCalendarDateSelected={isCalendarDateSelected}
              isCalendarMonth={isCalendarMonth}>
              {calendarDay}
            </S.DaysViewCell>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};
