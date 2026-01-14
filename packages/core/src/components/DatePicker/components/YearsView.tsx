import { HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import Wrapper from '@components/Wrapper';
import { useDatePickerContext } from '../useDatePickerContext';
import { getYearsList } from '../utils';
import * as S from '../styles';
import { CALENDAR_TYPE, PICKER_TYPE } from '../constants';

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
    pickerType,
    setIsOpen,
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

        container.scrollTo({ top: nextTop, behavior: 'auto' });
      }
    }
  }, [calendarViewDateTime]);

  const handleYearSelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedYear = Number((target as HTMLDivElement).innerHTML);
    const newDate = calendarViewDateTime?.set({ year: selectedYear });

    if (!newDate) return;

    const isYearTypeSelected = pickerType === PICKER_TYPE.YEARS;

    if (isYearTypeSelected) {
      const startDate = newDate.startOf('year');

      setCalendarViewDateTime(startDate);
      setDateTime(startDate);
      onYearChange?.(startDate.toJSDate());

      setIsOpen(false);
    } else {
      setCalendarViewDateTime(newDate);
      setCalendarType(CALENDAR_TYPE.MONTHS);
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
