import React from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import Wrapper from '@components/Wrapper';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';

export const DaysView = () => {
  const theme = useTheme();
  const weekDays = getWeekDays();
  const currentMonth = 1;
  const dates = getDaysForCalendarMonth(new Date(2025, currentMonth, 10));
  const nowDate = DateTime.fromJSDate(new Date()).toFormat('D');
  return (
    <React.Fragment>
      <Wrapper>
        {weekDays.map((weekDay) => (
          <Wrapper
            key={`week-day-${weekDay}`}
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
      <Wrapper css={{ flexWrap: 'wrap' }}>
        {dates.map((currentDate) => {
          const calendarDate = DateTime.fromJSDate(currentDate).toFormat('D');
          const calendarMonth = currentDate.getMonth();
          return (
            <Wrapper
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`}
              css={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'default',
                borderRadius: 6,
                color:
                  nowDate === calendarDate
                    ? theme.colors.white
                    : currentMonth === calendarMonth
                    ? theme.colors.greyDarker
                    : theme.colors.grey,
                background:
                  nowDate === calendarDate
                    ? 'linear-gradient(247deg, #7599DE 14.71%, #4178E1 85.29%)'
                    : 'none',
              }}>
              {currentDate.getDate()}
            </Wrapper>
          );
        })}
      </Wrapper>
    </React.Fragment>
  );
};
