import { useTheme } from '@emotion/react';
import * as DPC from '.';
import * as C from '../..';
import { CalendarType } from '../types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { PRESENT_VALUE } from '../DateRangePickerFormBridge';

export const DatePickerCalendar = () => {
  const theme = useTheme();
  const components: Record<CalendarType, () => React.ReactNode> = {
    days: DPC.DaysView,
    months: DPC.MonthsView,
    years: DPC.YearsView,
  };
  const {
    calendarType,
    classNames,
    rangeSelectionStep,
    showPresentOption,
    setDateTime,
    setIsOpen,
    setRangeSelectionStep,
    onChange,
    dateTime,
    setIsEndDatePresent,
    setLastChangedDate,
  } = useDateRangePickerContext();
  const Component = components[calendarType];

  const handlePresentClick = () => {
    if (rangeSelectionStep === 'end') {
      // Set end date to undefined internally, mark as "Present"
      setDateTime((prev) => [prev[0], undefined]);
      setIsEndDatePresent(true);
      setRangeSelectionStep(null);
      setIsOpen(false);

      const startDate = dateTime[0];
      setLastChangedDate([
        startDate ? startDate.toJSDate() : undefined,
        null, // null = "Present" (end date only)
      ]);

      onChange?.([
        startDate ? startDate.toJSDate() : undefined,
        null, // null = "Present" (end date only)
      ]);
    }
  };

  const isPresentButtonDisabled = rangeSelectionStep !== 'end';

  return (
    <C.PopoverContent
      className={['popover', classNames?.calendar].filter(Boolean).join(' ')}
      data-testid="daterangepicker-calendar"
      css={{
        background: theme.colors.white,
        boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
        borderRadius: 16,
        padding: 24,
        paddingTop: 16,
        width: 346,
        height: showPresentOption ? 412 : 370,
        alignItems: 'flex-start',
        margin: '14px 0 0 -14px',
        zIndex: 100,
      }}>
      <DPC.Header />
      <C.PopoverDescription
        as="div"
        css={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Component />
        {showPresentOption && (
          <C.Button
            variant="primary"
            onClick={handlePresentClick}
            isDisabled={isPresentButtonDisabled}
            data-testid="daterangepicker-present-button"
            css={{
              marginTop: 12,
              width: '100%',
              justifyContent: 'center',
            }}>
            {PRESENT_VALUE}
          </C.Button>
        )}
      </C.PopoverDescription>
    </C.PopoverContent>
  );
};
