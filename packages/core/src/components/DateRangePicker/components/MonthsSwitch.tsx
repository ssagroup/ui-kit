import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import * as C from '../..';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

export const MonthsSwitch = () => {
  const {
    calendarType,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    lastFocusedElement,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDateRangePickerContext();
  const theme = useTheme();
  const isYearsCalendarType = calendarType === 'years';
  const isDayCalendarType = calendarType === 'days';
  const currentIndex = lastFocusedElement === 'from' ? 0 : 1;
  const currentCalendarViewDT =
    calendarViewDateTime[currentIndex] || DateTime.now().set({ day: 1 });

  const isMinMonthReached = calendarViewDateTime
    ? currentCalendarViewDT?.month === dateMinDT.month &&
      currentCalendarViewDT.year === dateMinDT.year
    : false;
  const isMaxMonthReached = calendarViewDateTime
    ? currentCalendarViewDT?.month === dateMaxDT.month &&
      currentCalendarViewDT.year === dateMaxDT.year
    : false;

  const handlePreviousMonth = () => {
    const newDate = currentCalendarViewDT?.minus(
      isDayCalendarType ? { month: 1 } : { year: 1 },
    );

    setCalendarViewDateTime(
      lastFocusedElement === 'from'
        ? [newDate, calendarViewDateTime[1]]
        : [calendarViewDateTime[0], newDate],
    );
    if (newDate) {
      onMonthChange?.(newDate.toJSDate());
    }
  };
  const handleNextMonth = () => {
    const newDate = currentCalendarViewDT?.plus(
      isDayCalendarType ? { month: 1 } : { year: 1 },
    );
    setCalendarViewDateTime(
      lastFocusedElement === 'from'
        ? [newDate, calendarViewDateTime[1]]
        : [calendarViewDateTime[0], newDate],
    );
    if (newDate) {
      onMonthChange?.(newDate.toJSDate());
    }
  };

  if (isYearsCalendarType) {
    return null;
  }

  return (
    <C.Wrapper css={{ width: 72, gap: 24 }}>
      <C.Button
        endIcon={
          <C.Icon
            name="carrot-left"
            size={14}
            tooltip="Previous month"
            color={
              isMinMonthReached ? theme.colors.grey : theme.colors.greyDarker
            }
          />
        }
        variant={'tertiary'}
        aria-label="Previous month"
        data-testid="previous-month"
        onClick={handlePreviousMonth}
        isDisabled={isMinMonthReached}
        css={{
          padding: 4,
          height: 32,
          cursor: isMinMonthReached ? 'default' : 'pointer',
          '&:focus::before': { display: 'none' },
        }}
      />
      <C.Button
        endIcon={
          <C.Icon
            name="carrot-right"
            size={14}
            tooltip="Next month"
            color={
              isMaxMonthReached ? theme.colors.grey : theme.colors.greyDarker
            }
          />
        }
        variant={'tertiary'}
        onClick={handleNextMonth}
        isDisabled={isMaxMonthReached}
        aria-label="Next month"
        data-testid="next-month"
        css={{
          padding: 4,
          height: 32,
          cursor: isMaxMonthReached ? 'default' : 'pointer',
          '&:focus::before': { display: 'none' },
        }}
      />
    </C.Wrapper>
  );
};
