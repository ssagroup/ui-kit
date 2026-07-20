import { useTheme } from '@emotion/react';
import * as DPC from '.';
import * as C from '../..';
import { CalendarType } from '../types';
import { useDatePickerContext } from '../useDatePickerContext';
import { CALENDAR_TYPE } from '../constants';

export const DatePickerCalendar = () => {
  const theme = useTheme();
  const components: Record<CalendarType, () => React.ReactNode> = {
    [CALENDAR_TYPE.DAYS]: DPC.DaysView,
    [CALENDAR_TYPE.MONTHS]: DPC.MonthsView,
    [CALENDAR_TYPE.YEARS]: DPC.YearsView,
  };
  const { calendarType, classNames, showTimePicker } = useDatePickerContext();
  const Component = components[calendarType];

  return (
    <C.PopoverContent
      className={['popover', classNames?.calendar].filter(Boolean).join(' ')}
      css={{
        background: theme.colors.white,
        boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
        borderRadius: 16,
        // The calendar keeps its own 24px padding; the time panel brings its
        // own, so the padding moves inside when both are shown.
        padding: showTimePicker ? 0 : 24,
        paddingTop: showTimePicker ? 0 : 16,
        // 328 calendar + 144 time panel, per the Figma Day & Time pop-up.
        width: showTimePicker ? 472 : 328,
        height: 368,
        flexDirection: 'row',
        alignItems: 'flex-start',
        zIndex: 100,
      }}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexShrink: 0,
          width: showTimePicker ? 328 : '100%',
          height: '100%',
          padding: showTimePicker ? '16px 24px 24px' : 0,
        }}>
        <DPC.DatePickerHeader />
        <C.PopoverDescription
          as="div"
          css={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Component />
        </C.PopoverDescription>
      </div>
      {showTimePicker && <DPC.DatePickerTimePanel />}
    </C.PopoverContent>
  );
};
