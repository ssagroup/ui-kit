import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';
import Wrapper from '@components/Wrapper';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { getYearsList } from '../utils';
import * as S from '../styles';

export const YearsView = () => {
  const {
    calendarViewDateTime,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
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
        return (
          <S.YearsViewCell
            key={`year-${year}`}
            isCalendarYear={isCalendarYear}
            {...additionalProps}>
            {year}
          </S.YearsViewCell>
        );
      })}
    </Wrapper>
  );
};
