import * as C from '../..';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerMonthsSwitch = () => {
  const { calendarType, setCalendarViewDateTime, calendarViewDateTime } =
    useDatePickerContext();
  const isDayCalendarType = calendarType === 'days';
  const handlePreviousMonth = () => {
    setCalendarViewDateTime(
      calendarViewDateTime?.minus({
        month: 1,
      }),
    );
  };
  const handleNextMonth = () => {
    setCalendarViewDateTime(
      calendarViewDateTime?.plus({
        month: 1,
      }),
    );
  };
  if (!isDayCalendarType) {
    return null;
  }
  return (
    <C.Wrapper css={{ width: 72, gap: 24 }}>
      <C.Button
        endIcon={
          <C.Icon name="carrot-left" size={14} tooltip="Previous month" />
        }
        variant={'tertiary'}
        onClick={handlePreviousMonth}
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
        css={{
          padding: 4,
          height: 32,
          '&:focus::before': { display: 'none' },
        }}
      />
    </C.Wrapper>
  );
};
