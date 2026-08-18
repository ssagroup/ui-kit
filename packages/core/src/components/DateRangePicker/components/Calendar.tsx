import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
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
    nameTo,
    presets,
  } = useDateRangePickerContext();
  const Component = components[calendarType];
  const formContext = useFormContext();
  const setValue = formContext?.setValue;

  const handlePresentClick = () => {
    if (rangeSelectionStep === 'end') {
      // Get current start date before updating state
      const startDate = dateTime[0];

      // Set end date to undefined internally, mark as "Present"
      setDateTime((prev) => [prev[0], undefined]);
      setIsEndDatePresent(true);
      // Clear the form value directly (without clearing isEndDatePresent flag)
      if (setValue && nameTo) {
        setValue(nameTo, '');
      }
      setRangeSelectionStep(null);
      setIsOpen(false);

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

  // Disable "Present" button when not selecting end date
  const isPresentButtonDisabled = rangeSelectionStep !== 'end';

  const hasPresets = !!presets?.length;

  return (
    <C.PopoverContent
      className={['popover', classNames?.calendar].filter(Boolean).join(' ')}
      data-testid="daterangepicker-calendar"
      css={{
        background: theme.colors.white,
        boxShadow: `-4px 4px 14px 0px ${theme.colors.greyDarker14}`,
        borderRadius: 16,
        // The calendar keeps its own 24px padding; the presets panel brings
        // its own, so the padding moves inside when both are shown.
        padding: hasPresets ? 0 : 24,
        paddingTop: hasPresets ? 0 : 16,
        // 160 presets column + 328 calendar, matching the day-and-time pop-up.
        width: hasPresets ? 488 : 328,
        height: showPresentOption ? 410 : 368,
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: '14px 0 0 -14px',
        zIndex: 100,
      }}>
      {hasPresets && <DPC.Presets />}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          flexShrink: 0,
          width: hasPresets ? 328 : '100%',
          height: '100%',
          padding: hasPresets ? '16px 24px 24px' : 0,
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
              disabled={isPresentButtonDisabled}
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
      </div>
    </C.PopoverContent>
  );
};
