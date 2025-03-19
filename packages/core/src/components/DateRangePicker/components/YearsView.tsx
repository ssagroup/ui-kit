import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import { useRangeHighlighting } from '../hooks';
import * as S from '../styles';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { getYearsList } from '../utils';
import { DatesListWrapper } from './DatesListWrapper';

export const YearsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    currentCalendarViewDT,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    lastFocusedElement,
    setCalendarType,
    setCalendarViewDateTime,
    onYearChange,
  } = useDateRangePickerContext();
  const wrapper = useRef<HTMLDivElement>(null);
  const yearsList = getYearsList({
    yearsFrom: dateMinParts[formatIndexes['year']],
    yearsCount:
      dateMaxParts[formatIndexes['year']] -
      dateMinParts[formatIndexes['year']] +
      1,
  });

  const { handleDateHover, getClassNames, isHighlightDate } =
    useRangeHighlighting();

  useEffect(() => {
    if (currentCalendarViewDT && wrapper.current) {
      wrapper.current.querySelector('[aria-current=date]')?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [calendarViewDateTime, lastFocusedElement]);

  const handleYearSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedYear = Number((target as HTMLDivElement).innerHTML);
    const newDate = currentCalendarViewDT.set({
      year: selectedYear,
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

        const isCalendarFirstDateSelected =
          year.toString() === dateTime[0]?.toFormat('yyyy');
        const isCalendarSecondDateSelected =
          year.toString() === dateTime[1]?.toFormat('yyyy');

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
