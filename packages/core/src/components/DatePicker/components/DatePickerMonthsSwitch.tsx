import { useTheme } from '@emotion/react';
import * as C from '../..';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerMonthsSwitch = () => {
  const {
    calendarType,
    calendarViewDateTime,
    yearMinReached,
    yearMaxReached,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDatePickerContext();
  const theme = useTheme();
  // Change this component's code to use the dateMin and dateMax values
  const isDayCalendarType = calendarType === 'days';
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
            color={yearMinReached ? theme.colors.grey : theme.colors.greyDarker}
          />
        }
        variant={'tertiary'}
        onClick={handlePreviousMonth}
        isDisabled={yearMinReached}
        css={{
          padding: 4,
          height: 32,
          cursor: yearMinReached ? 'default' : 'pointer',
          '&:focus::before': { display: 'none' },
        }}
      />
      <C.Button
        endIcon={
          <C.Icon
            name="carrot-right"
            size={14}
            tooltip="Next month"
            color={yearMaxReached ? theme.colors.grey : theme.colors.greyDarker}
          />
        }
        variant={'tertiary'}
        onClick={handleNextMonth}
        isDisabled={yearMaxReached}
        css={{
          padding: 4,
          height: 32,
          cursor: yearMaxReached ? 'default' : 'pointer',
          '&:focus::before': { display: 'none' },
        }}
      />
    </C.Wrapper>
  );
};
