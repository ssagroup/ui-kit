import { useEffect, useState } from 'react';
import * as C from '../..';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerMonthsSwitch = () => {
  const {
    yearMin,
    yearMax,
    calendarType,
    calendarViewDateTime,
    setCalendarViewDateTime,
    onMonthChange,
  } = useDatePickerContext();
  const [yearMinReached, setYearMinReached] = useState(false);
  const [yearMaxReached, setYearMaxReached] = useState(false);
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
  useEffect(() => {
    const nextYearDT = calendarViewDateTime?.plus({
      month: 1,
    });
    const previousYearDT = calendarViewDateTime?.minus({
      month: 1,
    });
    setYearMaxReached(nextYearDT ? nextYearDT.year >= yearMax : true);
    setYearMinReached(previousYearDT ? previousYearDT.year < yearMin : true);
  }, [calendarViewDateTime]);

  if (!isDayCalendarType) {
    return null;
  }

  // TODO: process disabling of the buttons
  return (
    <C.Wrapper css={{ width: 72, gap: 24 }}>
      <C.Button
        endIcon={
          <C.Icon name="carrot-left" size={14} tooltip="Previous month" />
        }
        variant={'tertiary'}
        onClick={handlePreviousMonth}
        isDisabled={yearMinReached}
        css={{
          padding: 4,
          height: 32,
          '&:focus::before': { display: 'none' },
        }}
      />
      <C.Button
        endIcon={<C.Icon name="carrot-right" size={14} tooltip="Next month" />}
        variant={'tertiary'}
        onClick={handleNextMonth}
        isDisabled={yearMaxReached}
        css={{
          padding: 4,
          height: 32,
          '&:focus::before': { display: 'none' },
        }}
      />
    </C.Wrapper>
  );
};
