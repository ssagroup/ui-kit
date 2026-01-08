import * as C from '../..';
import * as DPC from '.';
import { useDatePickerContext } from '../useDatePickerContext';
import { CALENDAR_TYPE, PICKER_TYPE } from '../constants';

export const DatePickerHeader = () => {
  const {
    calendarType,
    setCalendarType,
    calendarViewDateTime,
    classNames,
    pickerType,
  } = useDatePickerContext();
  const handleCalendarTypeChange = () => {
    if (pickerType === PICKER_TYPE.YEARS) {
      return;
    }

    if (pickerType === PICKER_TYPE.MONTHS) {
      // For month picker: switch between months and years
      if (calendarType === CALENDAR_TYPE.MONTHS) {
        setCalendarType(CALENDAR_TYPE.YEARS);
      } else {
        setCalendarType(CALENDAR_TYPE.MONTHS);
      }
    } else {
      // For day picker: cycle through days -> months -> years -> months -> days
      if (calendarType === CALENDAR_TYPE.DAYS) {
        setCalendarType(CALENDAR_TYPE.MONTHS);
      } else if (calendarType === CALENDAR_TYPE.MONTHS) {
        setCalendarType(CALENDAR_TYPE.YEARS);
      } else {
        // From years, go back to months (not directly to days)
        setCalendarType(CALENDAR_TYPE.MONTHS);
      }
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
      className={classNames?.header}
      as={'div'}>
      <C.Button
        endIcon={
          pickerType !== PICKER_TYPE.YEARS ? (
            <C.Icon
              name={
                calendarType === CALENDAR_TYPE.DAYS ||
                calendarType === CALENDAR_TYPE.MONTHS
                  ? 'carrot-down'
                  : 'carrot-up'
              }
              size={14}
              tooltip=""
            />
          ) : null
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
          cursor: pickerType === PICKER_TYPE.YEARS ? 'default' : 'pointer',
          '&:focus::before': {
            display: 'none',
          },
        }}>
        {calendarViewDateTime?.toFormat(
          calendarType === CALENDAR_TYPE.YEARS ||
            pickerType === PICKER_TYPE.YEARS
            ? 'yyyy'
            : 'LLLL yyyy',
        )}
      </C.Button>
      <DPC.DatePickerMonthsSwitch />
    </C.PopoverHeading>
  );
};
