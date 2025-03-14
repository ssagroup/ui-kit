import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';
import Wrapper from '@components/Wrapper';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { getYearsList } from '../utils';
import * as S from '../styles';

export const YearsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    lastFocusedElement,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
    onYearChange,
  } = useDateRangePickerContext();
  const currentIndex = lastFocusedElement === 'from' ? 0 : 1;
  const currentCalendarViewDT = calendarViewDateTime[currentIndex];
  const wrapper = useRef<HTMLDivElement>(null);
  const yearsList = getYearsList({
    yearsFrom: dateMinParts[formatIndexes['year']],
    yearsCount:
      dateMaxParts[formatIndexes['year']] -
      dateMinParts[formatIndexes['year']] +
      1,
  });

  useEffect(() => {
    if (
      calendarViewDateTime[lastFocusedElement === 'from' ? 0 : 1] &&
      wrapper.current
    ) {
      wrapper.current.querySelector('[aria-current=date]')?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [calendarViewDateTime, lastFocusedElement]);

  const handleYearSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedYear = Number((target as HTMLDivElement).innerHTML);
    const newDate = calendarViewDateTime[currentIndex]?.set({
      year: selectedYear,
    });
    setCalendarType('months');
    setCalendarViewDateTime(
      lastFocusedElement === 'from'
        ? [newDate, calendarViewDateTime[1]]
        : [calendarViewDateTime[0], newDate],
    );
    setDateTime(
      lastFocusedElement === 'from'
        ? [newDate, dateTime[1]]
        : [dateTime[0], newDate],
    );
    if (newDate) {
      onYearChange?.(newDate.toJSDate());
    }
  };
  return (
    <Wrapper
      css={{
        flexWrap: 'wrap',
        overflowY: 'auto',
        height: 280,
        alignContent: 'flex-start',
      }}
      ref={wrapper}
      onClick={handleYearSelect}>
      {yearsList.map((year) => {
        const additionalProps: HTMLAttributes<HTMLDivElement> = {};
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

        let isHighlightDate = false;

        if (dateTime[0] && dateTime[1]) {
          isHighlightDate = year > dateTime[0].year && year < dateTime[1].year;
        }

        return (
          <S.YearsViewCell
            key={`year-${year}`}
            isCalendarYear={isCalendarYear}
            isCalendarFirstDateSelected={isCalendarFirstDateSelected}
            isCalendarSecondDateSelected={isCalendarSecondDateSelected}
            isHighlighted={isHighlightDate}
            {...additionalProps}>
            {year}
          </S.YearsViewCell>
        );
      })}
    </Wrapper>
  );
};
