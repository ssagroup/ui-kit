import React, { MouseEventHandler } from 'react';
import { DateTime } from 'luxon';
import { useTheme } from '@emotion/react';
import Wrapper from '@components/Wrapper';
import { getRangeEdge } from '@components/DatePicker/styles';
import { DatesListWrapper } from './DatesListWrapper';
import * as S from '../styles';
import { getDaysForCalendarMonth, getWeekDays } from '../utils';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { useRangeHighlighting, useRangeSelection } from '../hooks';

export const DaysView = () => {
  const weekDays = getWeekDays();
  const theme = useTheme();
  const { dateMinDT, dateMaxDT, currentCalendarViewDT } =
    useDateRangePickerContext();
  const currentDate = currentCalendarViewDT.toJSDate();
  const currentMonth = currentDate?.getMonth();
  const dates = getDaysForCalendarMonth(currentDate);
  const nowDate = DateTime.fromJSDate(new Date()).toFormat('D');

  const { handleDateHover, getClassNames, isHighlightDate } =
    useRangeHighlighting();

  const { handleRangeSelect, getDateSelectionState, isRangeActive } =
    useRangeSelection({
      createNewDate: (selectedDay) =>
        currentCalendarViewDT.set({
          day: Number(selectedDay),
        }),
      getComparisonFormat: () => 'D',
    });

  const handleDaySelect: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const selectedDay = (target as HTMLDivElement).innerHTML;
    const isEnabled =
      (target as HTMLDivElement).getAttribute('aria-disabled') === 'false';
    if (isEnabled) {
      handleRangeSelect(selectedDay);
    }
  };

  return (
    <React.Fragment>
      <Wrapper>
        {weekDays.map((weekDay, index) => (
          <Wrapper
            key={`week-day-${weekDay}-${index}`}
            css={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: '16px',
              color: theme.colors.greyDarker80,
              cursor: 'default',
              userSelect: 'none',
            }}>
            {weekDay}
          </Wrapper>
        ))}
      </Wrapper>
      <DatesListWrapper onClick={handleDaySelect}>
        {dates.map((currentDate, index) => {
          const currentDT = DateTime.fromJSDate(currentDate).startOf('day');
          const calendarDate = currentDT.toFormat('D');
          const calendarDay = currentDate.getDate();
          const calendarMonth = currentDate.getMonth();
          const ariaLabel = currentDT.toLocaleString(DateTime.DATE_HUGE);
          const isCalendarDateNow = nowDate === calendarDate;
          const isCalendarMonth = currentMonth === calendarMonth;
          const {
            isCalendarFirstDateSelected,
            isCalendarSecondDateSelected,
            isCalendarDateSelected,
          } = getDateSelectionState(currentDT);

          let isAriaDisabled = false;
          if (dateMinDT && dateMaxDT) {
            isAriaDisabled =
              currentDT < dateMinDT ||
              currentDT > dateMaxDT ||
              !isCalendarMonth;
          } else {
            if (dateMinDT) {
              isAriaDisabled = currentDT < dateMinDT || !isCalendarMonth;
            }
            if (dateMaxDT) {
              isAriaDisabled = currentDT > dateMaxDT || !isCalendarMonth;
            }
          }

          const classNames = getClassNames(currentDT, {
            isCalendarFirstDateSelected,
            isCalendarSecondDateSelected,
          });

          return (
            <S.DaysViewCell
              key={`day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}-${index}`}
              aria-disabled={isAriaDisabled}
              aria-label={ariaLabel}
              data-day={calendarDate}
              isCalendarDateNow={isCalendarDateNow}
              isCalendarDateSelected={isCalendarDateSelected}
              rangeEdge={getRangeEdge({
                isFirstSelected: isCalendarFirstDateSelected,
                isSecondSelected: isCalendarSecondDateSelected,
                isRangeActive,
                mode: 'dateFrom',
              })}
              isHighlighted={isHighlightDate(currentDT)}
              className={classNames.join(' ')}
              onMouseEnter={() => handleDateHover(currentDT)}
              onMouseLeave={() => handleDateHover(null)}>
              {calendarDay}
            </S.DaysViewCell>
          );
        })}
      </DatesListWrapper>
    </React.Fragment>
  );
};
