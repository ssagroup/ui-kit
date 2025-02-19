import { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { useDatePickerContext } from '../useDatePickerContext';
import { MONTHS } from '../constants';

// TODO: disable specific months, depends on chose year
// prev.month doesn't block correctly
// block the specific months in the year, when the year is reached
export const MonthsView = () => {
  const {
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    setCalendarType,
    setDateTime,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDatePickerContext();
  const handleMonthSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    if ((target as HTMLDivElement).getAttribute('aria-disabled') === null) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
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
        const currentMonthDT = DateTime.fromObject({
          year: calendarViewDateTime?.year,
          month: index + 1,
          day: 1,
        });
        const isMinMonthReached = dateMinDT
          ? currentMonthDT.month < dateMinDT.month &&
            currentMonthDT.year === dateMinDT.year
          : false;
        const isMaxMonthReached = dateMaxDT
          ? currentMonthDT.month > dateMaxDT.month &&
            currentMonthDT.year === dateMaxDT.year
          : false;
        const isAriaDisabled = isMinMonthReached || isMaxMonthReached;
        return (
          <S.MonthsViewCell
            key={month}
            isCalendarMonth={isCalendarMonth}
            aria-disabled={isAriaDisabled}
            aria-label={`${month}, ${calendarViewDateTime?.year}`}>
            {month}
          </S.MonthsViewCell>
        );
      })}
    </Wrapper>
  );
};
