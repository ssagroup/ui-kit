import { DateTime } from 'luxon';
import { MouseEventHandler } from 'react';
import { MONTHS } from '../constants';
import { useRangeHighlighting, useRangeSelection } from '../hooks';
import * as S from '../styles';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { DatesListWrapper } from './DatesListWrapper';

export const MonthsView = () => {
  const {
    dateMinDT,
    dateMaxDT,
    lastFocusedElement,
    currentCalendarViewDT,
    calendarViewDateTime,
    rangePickerType,
    setCalendarType,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDateRangePickerContext();

  const { handleDateHover, getClassNames, isHighlightDate } =
    useRangeHighlighting();

  const { handleRangeSelect, getDateSelectionState } = useRangeSelection({
    createNewDate: (selectedMonth) => {
      const monthNumber = MONTHS.findIndex((month) => month === selectedMonth);
      const newMonth = currentCalendarViewDT?.set({
        month: monthNumber + 1,
      });
      return newMonth?.set({
        day: lastFocusedElement === 'from' ? 1 : newMonth.daysInMonth,
      });
    },
    getComparisonFormat: () => 'yyyy-MM',
  });

  const handleMonthSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    if ((target as HTMLDivElement).getAttribute('aria-disabled') === null) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    const selectedMonth = (target as HTMLDivElement).innerHTML;

    if (rangePickerType === 'days') {
      // Navigation case: selecting month navigates to days view
      const monthNumber = MONTHS.findIndex((month) => month === selectedMonth);
      const newDate = currentCalendarViewDT?.set({ month: monthNumber + 1 });
      if (newDate) {
        setCalendarViewDateTime(
          lastFocusedElement === 'from'
            ? [newDate, calendarViewDateTime[1]]
            : [calendarViewDateTime[0], newDate],
        );
        onMonthChange?.(newDate.toJSDate());
        setCalendarType('days');
      }
    } else {
      // Range selection case: selecting month completes the range
      handleRangeSelect(selectedMonth);
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

        const { isCalendarFirstDateSelected, isCalendarSecondDateSelected } =
          getDateSelectionState(currentMonthDT);

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
