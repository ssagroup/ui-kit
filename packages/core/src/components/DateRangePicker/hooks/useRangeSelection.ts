import { DateTime } from 'luxon';
import { DateTimeTuple } from '../types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

type UseRangeSelectionOptions = {
  /**
   * Function to create the new DateTime from the selected value
   */
  createNewDate: (selectedValue: number | string) => DateTime | undefined;
  /**
   * Function to format the date for comparison (e.g., 'D' for days, 'yyyy-MM' for months, 'yyyy' for years)
   */
  getComparisonFormat: () => string;
};

export const useRangeSelection = ({
  createNewDate,
  getComparisonFormat,
}: UseRangeSelectionOptions) => {
  const {
    dateTime,
    calendarViewDateTime,
    setCalendarViewDateTime,
    setDateTime,
    setIsOpen,
    setLastFocusedElement,
    rangeSelectionStep,
    setRangeSelectionStep,
    clearInputValue,
    allowReverseSelection = false,
    onChange,
  } = useDateRangePickerContext();

  const handleRangeSelect = (selectedValue: number | string) => {
    const newDate = createNewDate(selectedValue);
    if (!newDate) return;

    // Range selection logic
    const isSelectingStart = rangeSelectionStep === 'start';
    if (isSelectingStart) {
      clearInputValue('to');
      setLastFocusedElement('to');
      setRangeSelectionStep('end');
    }

    let newDateTuple: DateTimeTuple = isSelectingStart
      ? [newDate, undefined]
      : [dateTime[0], newDate];

    setCalendarViewDateTime(
      isSelectingStart
        ? [newDate, newDate]
        : [dateTime[0] ? calendarViewDateTime?.[0] : newDate, newDate],
    );

    // Check if dates are in reverse order
    const isReversed =
      newDateTuple[0] &&
      newDateTuple[1] &&
      newDateTuple[0].toMillis() > newDateTuple[1].toMillis();

    if (isReversed) {
      if (allowReverseSelection) {
        // Auto-swap dates when reverse selection is allowed
        newDateTuple = [newDateTuple[1], newDateTuple[0]];
      } else if (!isSelectingStart) {
        // User selected an earlier date - update start date
        newDateTuple = [newDateTuple[1], undefined];
        setLastFocusedElement('to');
        setRangeSelectionStep('end');
        setCalendarViewDateTime([newDateTuple[0], newDateTuple[0]]);
      }
    }

    setDateTime(newDateTuple);

    const normalizeToMidnight = (dt: DateTime) =>
      dt.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate();

    // Call onChange when a date is selected from calendar
    if (isSelectingStart && newDateTuple[0]) {
      // First date selected
      onChange?.([normalizeToMidnight(newDateTuple[0]), null]);
    } else if (
      newDateTuple[0] &&
      newDateTuple[1] &&
      newDateTuple[0].toMillis() <= newDateTuple[1].toMillis()
    ) {
      // Both dates selected and in correct order
      onChange?.([
        normalizeToMidnight(newDateTuple[0]),
        normalizeToMidnight(newDateTuple[1]),
      ]);
      setRangeSelectionStep(null);
      setIsOpen(false);
    }
  };

  const getDateSelectionState = (currentDT: DateTime) => {
    const comparisonFormat = getComparisonFormat();
    const isCalendarFirstDateSelected =
      currentDT.toFormat(comparisonFormat) ===
      dateTime[0]?.toFormat(comparisonFormat);
    const isCalendarSecondDateSelected =
      currentDT.toFormat(comparisonFormat) ===
      dateTime[1]?.toFormat(comparisonFormat);
    const isCalendarDateSelected =
      isCalendarFirstDateSelected || isCalendarSecondDateSelected;

    return {
      isCalendarFirstDateSelected,
      isCalendarSecondDateSelected,
      isCalendarDateSelected,
    };
  };

  return {
    handleRangeSelect,
    getDateSelectionState,
  };
};
