import { MouseEventHandler } from 'react';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { useDatePickerContext } from '../useDatePickerContext';
import { MONTHS } from '../constants';

export const MonthsView = () => {
  const {
    calendarViewDateTime,
    setCalendarType,
    setDateTime,
    setCalendarViewDateTime,
  } = useDatePickerContext();
  const handleMonthSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedMonth = (target as HTMLDivElement).innerHTML;
    const monthNumber = MONTHS.findIndex((month) => month === selectedMonth);
    const newDate = calendarViewDateTime?.set({ month: monthNumber + 1 });
    setCalendarType('days');
    setCalendarViewDateTime(newDate);
    setDateTime(newDate);
  };
  return (
    <Wrapper
      css={{ flexWrap: 'wrap', paddingTop: 10 }}
      onClick={handleMonthSelect}>
      {MONTHS.map((month, index) => {
        const isCalendarMonth = calendarViewDateTime
          ? calendarViewDateTime.month === index + 1
          : false;
        return (
          <S.MonthsViewCell key={month} isCalendarMonth={isCalendarMonth}>
            {month}
          </S.MonthsViewCell>
        );
      })}
    </Wrapper>
  );
};
