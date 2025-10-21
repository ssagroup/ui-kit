import { useTheme } from '@emotion/react';

import * as C from '../..';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerMonthsSwitch = () => {
  const {
    calendarType,
    calendarViewDateTime,
    dateMinDT,
    dateMaxDT,
    classNames,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDatePickerContext();
  const theme = useTheme();
  const isDayCalendarType = calendarType === 'days';

  const isMinMonthReached = calendarViewDateTime
    ? calendarViewDateTime.month === dateMinDT.month &&
      calendarViewDateTime.year === dateMinDT.year
    : false;
  const isMaxMonthReached = calendarViewDateTime
    ? calendarViewDateTime.month === dateMaxDT.month &&
      calendarViewDateTime.year === dateMaxDT.year
    : false;

  const handlePreviousMonth = () => {
    const newDate = calendarViewDateTime?.minus({
      month: 1,
    });
    setCalendarViewDateTime(newDate);
    if (newDate) {
      onMonthChange?.(newDate.toJSDate());
    }
  };
  const handleNextMonth = () => {
    const newDate = calendarViewDateTime?.plus({
      month: 1,
    });
    setCalendarViewDateTime(newDate);
    if (newDate) {
      onMonthChange?.(newDate.toJSDate());
    }
  };

  if (!isDayCalendarType) {
    return null;
  }

  return (
    <C.Wrapper
      css={{ width: 72, gap: 24 }}
      className={classNames?.monthsSwitch?.wrapper}>
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
        className={classNames?.monthsSwitch?.previousMonth}
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
        className={classNames?.monthsSwitch?.nextMonth}
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
