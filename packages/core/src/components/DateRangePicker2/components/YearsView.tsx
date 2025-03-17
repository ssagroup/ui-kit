import {
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Wrapper from '@components/Wrapper';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { getYearsList } from '../utils';
import * as S from '../styles';

export const YearsView = () => {
  const {
    dateTime,
    calendarViewDateTime,
    currentCalendarViewDT,
    dateMinParts,
    dateMaxParts,
    formatIndexes,
    lastFocusedElement,
    currentIndex,
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

  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

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
    const newDate = calendarViewDateTime[currentIndex]?.set({
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

  const handleYearHover: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const hoveredYear = Number((target as HTMLDivElement).innerHTML);
    setHoveredYear(hoveredYear);
  };

  const handleYearMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setHoveredYear(null);
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
      onClick={handleYearSelect}
      onMouseLeave={handleYearMouseLeave}>
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

        let isHoverRangeHighlightFrom = false;
        let isHoverRangeHighlightTo = false;

        const classNames = [];
        if (hoveredYear !== null) {
          if (dateTime[0] && hoveredYear < dateTime[0].year) {
            isHoverRangeHighlightFrom =
              year >= hoveredYear && year <= dateTime[0].year;
          } else if (dateTime[1] && hoveredYear > dateTime[1].year) {
            isHoverRangeHighlightTo =
              year <= hoveredYear && year >= dateTime[1].year;
          }
        }

        if (isHoverRangeHighlightFrom) {
          classNames.push('hover-range-from');
        }

        if (isHoverRangeHighlightTo) {
          classNames.push('hover-range-to');
        }

        return (
          <S.YearsViewCell
            key={`year-${year}`}
            className={classNames.join(' ')}
            isCalendarYear={isCalendarYear}
            isCalendarFirstDateSelected={isCalendarFirstDateSelected}
            isCalendarSecondDateSelected={isCalendarSecondDateSelected}
            isHighlighted={isHighlightDate}
            onMouseEnter={handleYearHover}
            {...additionalProps}>
            {year}
          </S.YearsViewCell>
        );
      })}
    </Wrapper>
  );
};
