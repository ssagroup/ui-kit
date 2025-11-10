import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';

import { DateTime } from 'luxon';

import Wrapper from '@components/Wrapper';

import * as S from '../styles';
import { useDatePickerContext } from '../useDatePickerContext';
import { getYearsList } from '../utils';

export const YearsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    lastChangedDate,
    highlightDates,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
    onYearChange,
  } = useDatePickerContext();
  const wrapper = useRef<HTMLDivElement>(null);
  const yearsList = getYearsList({
    yearsFrom: dateMinParts[formatIndexes['year']],
    yearsCount:
      dateMaxParts[formatIndexes['year']] -
      dateMinParts[formatIndexes['year']] +
      1,
  });

  const isHighlightEnabled = !!highlightDates?.enabled;
  const { otherDate } = highlightDates || {};
  const otherDateDT = otherDate && DateTime.fromJSDate(otherDate);

  useEffect(() => {
    if (calendarViewDateTime && wrapper.current) {
      wrapper.current.querySelector('[aria-current=date]')?.scrollIntoView({
        behavior: 'instant',
        block: 'center',
      });
    }
  }, [calendarViewDateTime]);

  const handleYearSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedYear = Number((target as HTMLDivElement).innerHTML);
    const newDate = calendarViewDateTime?.set({ year: selectedYear });
    setCalendarType('months');
    setCalendarViewDateTime(newDate);
    setDateTime(newDate);
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
        const isCalendarYear = calendarViewDateTime
          ? calendarViewDateTime.year === year
          : false;
        if (isCalendarYear) {
          additionalProps['aria-current'] = 'date';
        }

        const isCalendarFirstDateSelected =
          year.toString() === dateTime?.toFormat('yyyy');
        const isCalendarSecondDateSelected =
          year.toString() === otherDateDT?.toFormat('yyyy');

        let isHighlightDate = false;

        if (isHighlightEnabled && lastChangedDate && otherDateDT && dateTime) {
          isHighlightDate =
            highlightDates.mode === 'dateTo'
              ? otherDateDT.year < year && year < dateTime.year
              : dateTime.year < year && year < otherDateDT.year;
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
