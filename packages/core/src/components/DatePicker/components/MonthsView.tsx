import { MouseEventHandler } from 'react';

import { DateTime } from 'luxon';

import Wrapper from '@components/Wrapper';

import { MONTHS } from '../constants';
import * as S from '../styles';
import { useDatePickerContext } from '../useDatePickerContext';

export const MonthsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastChangedDate,
    highlightDates,
    setCalendarType,
    setDateTime,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDatePickerContext();

  const isHighlightEnabled = !!highlightDates?.enabled;
  const { otherDate } = highlightDates || {};
  const otherDateDT = otherDate && DateTime.fromJSDate(otherDate);

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

        const isCalendarFirstDateSelected =
          currentMonthDT.toFormat('yyyy-MM') === dateTime?.toFormat('yyyy-MM');
        const isCalendarSecondDateSelected =
          currentMonthDT.toFormat('yyyy-MM') ===
          otherDateDT?.toFormat('yyyy-MM');

        let isHighlightDate = false;

        if (isHighlightEnabled && lastChangedDate && otherDateDT && dateTime) {
          isHighlightDate =
            highlightDates.mode === 'dateTo'
              ? otherDateDT < currentMonthDT && currentMonthDT < dateTime
              : dateTime < currentMonthDT && currentMonthDT < otherDateDT;
        }
        return (
          <S.MonthsViewCell
            key={month}
            isCalendarMonth={isCalendarMonth}
            aria-disabled={isAriaDisabled}
            aria-label={`${month}, ${calendarViewDateTime?.year}`}
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
