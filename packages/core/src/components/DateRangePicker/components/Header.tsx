import * as C from '../..';
import * as DPC from '.';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

export const Header = () => {
  const {
    rangePickerType,
    calendarType,
    currentCalendarViewDT,
    setCalendarType,
  } = useDateRangePickerContext();
  const handleCalendarTypeChange = () => {
    setCalendarType(
      calendarType === 'days' || calendarType === 'months'
        ? 'years'
        : (rangePickerType ?? 'days'),
    );
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
            name={
              calendarType === 'days' || calendarType === 'months'
                ? 'carrot-down'
                : 'carrot-up'
            }
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
        {currentCalendarViewDT.toFormat(
          rangePickerType === 'days' ? 'LLLL yyyy' : 'yyyy',
        )}
      </C.Button>
      <DPC.MonthsSwitch />
    </C.PopoverHeading>
  );
};
