import { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import Wrapper from '@components/Wrapper';
import * as S from '../styles';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { MONTHS } from '../constants';

export const MonthsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastFocusedElement,
    currentCalendarViewDT,
    setCalendarType,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDateRangePickerContext();

  const handleMonthSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    if ((target as HTMLDivElement).getAttribute('aria-disabled') === null) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    const selectedMonth = (target as HTMLDivElement).innerHTML;
    const monthNumber = MONTHS.findIndex((month) => month === selectedMonth);
    const newDate = currentCalendarViewDT?.set({ month: monthNumber + 1 });
    setCalendarViewDateTime(
      lastFocusedElement === 'from'
        ? [newDate, calendarViewDateTime[1]]
        : [calendarViewDateTime[0], newDate],
    );
    if (newDate) {
      onMonthChange?.(newDate.toJSDate());
    }
    setCalendarType('days');
  };
  return (
    <Wrapper
      css={{ flexWrap: 'wrap', paddingTop: 10 }}
      onClick={handleMonthSelect}>
      {MONTHS.map((month, index) => {
        const isCalendarMonth = currentCalendarViewDT
          ? currentCalendarViewDT.month === index + 1
          : false;
        const currentMonthDT = DateTime.fromObject({
          year: currentCalendarViewDT?.year,
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

        const isCalendarFirstDateSelected =
          currentMonthDT.toFormat('yyyy-MM') ===
          dateTime[0]?.toFormat('yyyy-MM');
        const isCalendarSecondDateSelected =
          currentMonthDT.toFormat('yyyy-MM') ===
          dateTime[1]?.toFormat('yyyy-MM');

        let isHighlightDate = false;

        if (dateTime[0] && dateTime[1]) {
          isHighlightDate =
            dateTime[0] < currentMonthDT && currentMonthDT < dateTime[1];
        }

        return (
          <S.MonthsViewCell
            key={month}
            isCalendarMonth={isCalendarMonth}
            aria-disabled={isAriaDisabled}
            aria-label={`${month}, ${currentCalendarViewDT?.year}`}
            isCalendarFirstDateSelected={isCalendarFirstDateSelected}
            isCalendarSecondDateSelected={isCalendarSecondDateSelected}
            isHighlighted={isHighlightDate}>
            {month}
          </S.MonthsViewCell>
        );
      })}
    </Wrapper>
  );
};
