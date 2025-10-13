import { MouseEventHandler } from 'react';

import { DateTime } from 'luxon';

import { MONTHS } from '../constants';
import { useRangeHighlighting } from '../hooks';
import * as S from '../styles';
import { DateTimeTuple } from '../types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

import { DatesListWrapper } from './DatesListWrapper';

export const MonthsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastFocusedElement,
    currentCalendarViewDT,
    rangePickerType,
    setCalendarType,
    setCalendarViewDateTime,
    onMonthChange,
    setDateTime,
    setIsOpen,
  } = useDateRangePickerContext();

  const { handleDateHover, getClassNames, isHighlightDate } =
    useRangeHighlighting();

  const handleMonthSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    if ((target as HTMLDivElement).getAttribute('aria-disabled') === null) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    const selectedMonth = (target as HTMLDivElement).innerHTML;
    const monthNumber = MONTHS.findIndex((month) => month === selectedMonth);

    if (rangePickerType === 'days') {
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
    } else {
      const newMonth = currentCalendarViewDT?.set({
        month: monthNumber + 1,
      });
      const newDate = newMonth?.set({
        day: lastFocusedElement === 'from' ? 1 : newMonth.daysInMonth,
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
    <DatesListWrapper css={{ paddingTop: 10 }} onClick={handleMonthSelect}>
      {MONTHS.map((month, index) => {
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

        const classNames = getClassNames(currentMonthDT, {
          isCalendarFirstDateSelected,
          isCalendarSecondDateSelected,
        });

        return (
          <S.MonthsViewCell
            key={month}
            aria-disabled={isAriaDisabled}
            aria-label={`${month}, ${currentCalendarViewDT?.year}`}
            isCalendarFirstDateSelected={isCalendarFirstDateSelected}
            isCalendarSecondDateSelected={isCalendarSecondDateSelected}
            isHighlighted={isHighlightDate(currentMonthDT)}
            className={classNames.join(' ')}
            onMouseEnter={() => handleDateHover(currentMonthDT)}
            onMouseLeave={() => handleDateHover(null)}>
            {month}
          </S.MonthsViewCell>
        );
      })}
    </DatesListWrapper>
  );
};
