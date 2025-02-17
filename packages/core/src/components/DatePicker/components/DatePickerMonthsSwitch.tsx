import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import * as C from '../..';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerMonthsSwitch = () => {
  const {
    calendarType,
    calendarViewDateTime,
    dateMaxParts,
    dateMinParts,
    formatIndexes,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDatePickerContext();
  const theme = useTheme();
  // Change this component's code to use the dateMin and dateMax values
  const isDayCalendarType = calendarType === 'days';
  // TODO: move to the context
  const maxDT = DateTime.fromObject({
    year: dateMaxParts[formatIndexes['year']],
    month: dateMaxParts[formatIndexes['month']],
    day: dateMaxParts[formatIndexes['day']],
  });
  // TODO: move to the context
  const minDT = DateTime.fromObject({
    year: dateMinParts[formatIndexes['year']],
    month: dateMinParts[formatIndexes['month']],
    day: dateMinParts[formatIndexes['day']],
  });
  const isMinMonthReached = calendarViewDateTime
    ? calendarViewDateTime.month === minDT.month &&
      calendarViewDateTime.year === minDT.year
    : false;
  const isMaxMonthReached = calendarViewDateTime
    ? calendarViewDateTime.month === maxDT.month &&
      calendarViewDateTime.year === maxDT.year
    : false;

  const handlePreviousMonth = () => {
    const newDate = calendarViewDateTime?.minus({
      month: 1,
    });
    setCalendarViewDateTime(newDate);
    newDate && onMonthChange?.(newDate.toJSDate());
  };
  const handleNextMonth = () => {
    const newDate = calendarViewDateTime?.plus({
      month: 1,
    });
    setCalendarViewDateTime(newDate);
    newDate && onMonthChange?.(newDate.toJSDate());
  };

  if (!isDayCalendarType) {
    return null;
  }

  // TODO: process disabling of the buttons
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
