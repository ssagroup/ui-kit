import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import { useRangeHighlighting, useRangeSelection } from '../hooks';
import * as S from '../styles';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { getYearsList } from '../utils';
import { DatesListWrapper } from './DatesListWrapper';

export const YearsView = () => {
  const {
    rangePickerType,
    calendarViewDateTime,
    currentCalendarViewDT,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    lastFocusedElement,
    setCalendarType,
    setCalendarViewDateTime,
    onYearChange,
    calendarType,
    isOpen,
  } = useDateRangePickerContext();
  const wrapper = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);
  const yearsList = getYearsList({
    yearsFrom: dateMinParts[formatIndexes['year']],
    yearsCount:
      dateMaxParts[formatIndexes['year']] -
      dateMinParts[formatIndexes['year']] +
      1,
  });

  const { handleDateHover, getClassNames, isHighlightDate } =
    useRangeHighlighting();

  const { handleRangeSelect, getDateSelectionState } = useRangeSelection({
    createNewDate: (selectedYear) => {
      const newYear = currentCalendarViewDT?.set({
        year: Number(selectedYear),
      });
      return newYear?.set(
        lastFocusedElement === 'from'
          ? { day: 1, month: 1 }
          : { day: 31, month: 12 },
      );
    },
    getComparisonFormat: () => 'yyyy',
  });

  // Reset scroll tracking when calendar closes or calendar type changes away from years
  useEffect(() => {
    if (!isOpen || calendarType !== 'years') {
      hasScrolledRef.current = false;
    }
  }, [isOpen, calendarType]);

  // Only scroll to center the selected year when:
  // 1. Calendar first opens and calendar type is 'years'
  // 2. Calendar type changes to 'years' for the first time
  // Do NOT scroll on every selection
  useEffect(() => {
    if (
      currentCalendarViewDT &&
      wrapper.current &&
      isOpen &&
      calendarType === 'years' &&
      !hasScrolledRef.current
    ) {
      const container = wrapper.current;
      const currentEl = container.querySelector(
        '[aria-current=date]',
      ) as HTMLElement | null;

      // Scroll the internal years list WITHOUT scrolling the window/page.
      // `scrollIntoView` can bubble up and scroll the main page, causing a "jump".
      if (currentEl) {
        const containerRect = container.getBoundingClientRect();
        const elRect = currentEl.getBoundingClientRect();
        const deltaTop = elRect.top - containerRect.top;
        const nextTop =
          container.scrollTop +
          deltaTop -
          container.clientHeight / 2 +
          elRect.height / 2;

        if (typeof container.scrollTo === 'function') {
          container.scrollTo({ top: nextTop, behavior: 'auto' });
        } else {
          // Fallback for environments that don't support scrollTo (e.g., jsdom)
          container.scrollTop = nextTop;
        }
        hasScrolledRef.current = true;
      }
    }
  }, [isOpen, calendarType, currentCalendarViewDT]);

  const handleYearSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedYear = (target as HTMLDivElement).innerHTML;

    if (rangePickerType !== 'years') {
      // Navigation case: selecting year navigates to months view
      const newDate = currentCalendarViewDT.set({
        year: Number(selectedYear),
      });
      setCalendarType('months');
      setCalendarViewDateTime(
        lastFocusedElement === 'from'
          ? [newDate, calendarViewDateTime[1]]
          : [calendarViewDateTime[0], newDate],
      );
      if (newDate) {
        onYearChange?.(newDate.toJSDate());
      }
    } else {
      // Range selection case: selecting year completes the range
      handleRangeSelect(selectedYear);
    }
  };

  return (
    <DatesListWrapper
      css={{
        overflowY: 'auto',
        height: 280,
        alignContent: 'flex-start',
      }}
      ref={wrapper}
      onClick={handleYearSelect}>
      {yearsList.map((year) => {
        const additionalProps: HTMLAttributes<HTMLDivElement> = {};
        const currentYearDT = DateTime.fromObject({
          year,
          month: 1,
          day: 1,
        });
        const isCalendarYear = currentCalendarViewDT
          ? currentCalendarViewDT.year === year
          : false;
        if (isCalendarYear) {
          additionalProps['aria-current'] = 'date';
        }

        const { isCalendarFirstDateSelected, isCalendarSecondDateSelected } =
          getDateSelectionState(currentYearDT);

        const classNames = getClassNames(currentYearDT, {
          isCalendarFirstDateSelected,
          isCalendarSecondDateSelected,
        });

        return (
          <S.YearsViewCell
            key={`year-${year}`}
            className={classNames.join(' ')}
            isCalendarYear={isCalendarYear}
            isCalendarFirstDateSelected={isCalendarFirstDateSelected}
            isCalendarSecondDateSelected={isCalendarSecondDateSelected}
            isHighlighted={isHighlightDate(currentYearDT)}
            onMouseEnter={() => handleDateHover(currentYearDT)}
            onMouseLeave={() => handleDateHover(null)}
            {...additionalProps}>
            {year}
          </S.YearsViewCell>
        );
      })}
    </DatesListWrapper>
  );
};
