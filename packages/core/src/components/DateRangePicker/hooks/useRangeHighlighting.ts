import { useState } from 'react';
import { DateTime } from 'luxon';
import { ClassnameArray } from '@ssa-ui-kit/utils';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

export const useRangeHighlighting = () => {
  const [hoveredDate, setHoveredDate] = useState<DateTime | null>(null);
  const { dateTime, lastFocusedElement } = useDateRangePickerContext();

  const handleDateHover = (currentDT: DateTime | null) => {
    setHoveredDate(currentDT);
  };

  const getClassNames = (
    currentDT: DateTime,
    {
      isCalendarFirstDateSelected,
      isCalendarSecondDateSelected,
    }: {
      isCalendarFirstDateSelected: boolean;
      isCalendarSecondDateSelected: boolean;
    },
  ) => {
    const classNames = new ClassnameArray();
    let isHoverRangeHighlightFrom = false;
    let isHoverRangeHighlightTo = false;
    if (hoveredDate !== null) {
      if (
        dateTime[0] &&
        lastFocusedElement === 'from' &&
        hoveredDate < dateTime[0]
      ) {
        isHoverRangeHighlightFrom =
          currentDT >= hoveredDate && currentDT <= dateTime[0];
      }
      if (
        dateTime[1] &&
        lastFocusedElement === 'to' &&
        hoveredDate > dateTime[1]
      ) {
        isHoverRangeHighlightTo =
          currentDT <= hoveredDate && currentDT >= dateTime[1];
      }
    }

    classNames.toggle('hover-range-from', isHoverRangeHighlightFrom);
    classNames.toggle('hover-range-to', isHoverRangeHighlightTo);
    classNames.toggle('selected-range-from', isCalendarFirstDateSelected);
    classNames.toggle('selected-range-to', isCalendarSecondDateSelected);
    classNames.toggle(
      'date-hovered',
      hoveredDate?.toISODate() === currentDT.toISODate(),
    );

    return classNames.values().toArray();
  };

  const isHighlightDate = (currentDT: DateTime) => {
    if (dateTime[0] && dateTime[1]) {
      return currentDT > dateTime[0] && currentDT < dateTime[1];
    } else if (dateTime[0] && hoveredDate) {
      return currentDT > dateTime[0] && currentDT < hoveredDate;
    } else if (dateTime[1] && hoveredDate) {
      return currentDT < dateTime[1] && currentDT > hoveredDate;
    }
    return false;
  };

  return {
    handleDateHover,
    getClassNames,
    isHighlightDate,
    hoveredDate,
  };
};
