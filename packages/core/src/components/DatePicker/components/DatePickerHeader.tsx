import * as C from '../..';
import * as DPC from '.';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerHeader = () => {
  const { calendarType, setCalendarType, calendarViewDateTime } =
    useDatePickerContext();
  const handleCalendarTypeChange = () => {
    if (calendarType === 'days') {
      setCalendarType('years');
    } else {
      setCalendarType('days');
    }
  };
  return (
    <C.PopoverHeading
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: 32,
        marginBottom: 12,
      }}
      as={'div'}>
      <C.Button
        endIcon={
          <C.Icon
            name={calendarType === 'days' ? 'carrot-down' : 'carrot-up'}
            size={14}
            tooltip=""
          />
        }
        variant="tertiary"
        onClick={handleCalendarTypeChange}
        data-testid="calendar-type-change-button"
        css={{
          padding: 0,
          fontSize: 18,
          fontWeight: 700,
          lineHeight: '24px',
          height: 32,
          gap: 16,
          '&:focus::before': {
            display: 'none',
          },
        }}>
        {calendarViewDateTime?.toFormat('LLLL yyyy')}
      </C.Button>
      <DPC.DatePickerMonthsSwitch />
    </C.PopoverHeading>
  );
};
