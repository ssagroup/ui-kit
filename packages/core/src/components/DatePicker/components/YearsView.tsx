import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';
import Wrapper from '@components/Wrapper';
import { useDatePickerContext } from '../useDatePickerContext';
import { getYearsList } from '../utils';
import * as S from '../styles';

export const YearsView = () => {
  const {
    calendarViewDateTime,
    setCalendarType,
    setCalendarViewDateTime,
    setDateTime,
  } = useDatePickerContext();
  const wrapper = useRef<HTMLDivElement>(null);
  const yearsList = getYearsList();
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
  };
  return (
    <Wrapper
      css={{ flexWrap: 'wrap', overflowY: 'auto', height: 280 }}
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
