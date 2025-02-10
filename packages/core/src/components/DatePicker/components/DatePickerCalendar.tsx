import { useTheme } from '@emotion/react';
import * as DPC from '.';
import { CalendarType } from '../types';
import { useDatePickerContext } from '../useDatePickerContext';
import * as C from '../..';

/**
 * TODO:
 * - dynamically create the second part of a tooltip's name
 */
export const DatePickerCalendar = () => {
  const theme = useTheme();
  const components: Record<CalendarType, () => React.ReactNode> = {
    days: DPC.DaysView,
    months: DPC.MonthsView,
    years: DPC.YearsView,
  };
  const { calendarType, setCalendarType } = useDatePickerContext();
  const isDayCalendarType = calendarType === 'days';
  const Component = components[calendarType];
  const handleCalendarTypeChange = () => {
    if (calendarType === 'days') {
      setCalendarType('years');
    } else {
      setCalendarType('days');
    }
  };
  return (
    <C.PopoverContent
      className="popover"
      css={{
        background: theme.colors.white,
        boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
        borderRadius: 16,
        padding: 24,
        paddingTop: 16,
        width: 328,
        height: 370,
        alignItems: 'flex-start',
      }}>
      <C.PopoverHeading
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
        as={'div'}>
        <C.Button
          endIcon={
            <C.Icon
              name={calendarType === 'days' ? 'carrot-down' : 'carrot-up'}
              size={16}
              tooltip=""
            />
          }
          variant="tertiary"
          onClick={handleCalendarTypeChange}
          css={{
            padding: 0,
            fontSize: 18,
            fontWeight: 700,
            lineHeight: '24px',
            height: 40,
            gap: 16,
            '&:focus::before': {
              display: 'none',
            },
          }}>
          February 2025
        </C.Button>
        {isDayCalendarType && (
          <C.Wrapper css={{ width: 72, gap: 24 }}>
            <C.Button
              endIcon={
                <C.Icon name="carrot-left" size={14} tooltip="Previous month" />
              }
              variant={'tertiary'}
              css={{ padding: 4 }}
            />
            <C.Button
              endIcon={
                <C.Icon name="carrot-right" size={14} tooltip="Next month" />
              }
              variant={'tertiary'}
              css={{ padding: 4 }}
            />
          </C.Wrapper>
        )}
      </C.PopoverHeading>
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
