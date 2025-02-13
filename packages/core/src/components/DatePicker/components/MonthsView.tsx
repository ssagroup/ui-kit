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
    onMonthChange,
  } = useDatePickerContext();
  const handleMonthSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedMonth = (target as HTMLDivElement).innerHTML;
    const monthNumber = MONTHS.findIndex((month) => month === selectedMonth);
    const newDate = calendarViewDateTime?.set({ month: monthNumber + 1 });
    setCalendarViewDateTime(newDate);
    setDateTime(newDate);
    newDate && onMonthChange?.(newDate.toJSDate());
    setCalendarType('days');
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
