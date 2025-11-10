import { useTheme } from '@emotion/react';

import * as C from '../..';
import { CalendarType } from '../types';
import { useDatePickerContext } from '../useDatePickerContext';

import * as DPC from '.';

export const DatePickerCalendar = () => {
  const theme = useTheme();
  const components: Record<CalendarType, () => React.ReactNode> = {
    days: DPC.DaysView,
    months: DPC.MonthsView,
    years: DPC.YearsView,
  };
  const { calendarType, classNames } = useDatePickerContext();
  const Component = components[calendarType];

  return (
    <C.PopoverContent
      className={['popover', classNames?.calendar].filter(Boolean).join(' ')}
      css={{
        background: theme.colors.white,
        boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
        borderRadius: 16,
        padding: 24,
        paddingTop: 16,
        width: 346,
        height: 370,
        alignItems: 'flex-start',
        zIndex: 100,
      }}>
      <DPC.DatePickerHeader />
      <C.PopoverDescription
        as="div"
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Component />
      </C.PopoverDescription>
    </C.PopoverContent>
  );
};
