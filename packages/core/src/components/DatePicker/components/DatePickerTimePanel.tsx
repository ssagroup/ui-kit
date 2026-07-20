import { useEffect, useRef } from 'react';
import * as S from '../styles';
import { useDatePickerContext } from '../useDatePickerContext';
import {
  DEFAULT_MINUTE_STEP,
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
} from '../constants';

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * Centres a column on its selected cell by scrolling the column itself —
 * `scrollIntoView` can bubble up and scroll the whole page (same reason as
 * YearsView).
 */
const centreOnSelected = (container: HTMLDivElement | null) => {
  if (!container) return;

  const selectedEl = container.querySelector(
    '[aria-selected=true]',
  ) as HTMLElement | null;

  if (!selectedEl) return;

  const containerRect = container.getBoundingClientRect();
  const elRect = selectedEl.getBoundingClientRect();

  container.scrollTop +=
    elRect.top -
    containerRect.top -
    container.clientHeight / 2 +
    elRect.height / 2;
};

/**
 * Hours and minutes columns shown beside the calendar when `showTimePicker`
 * is set, matching the Figma `Day & Time Picker` pop-up.
 *
 * The hours and minutes columns scroll independently, so reaching a late hour
 * doesn't drag the minutes list out of view. Each is centred on its own
 * selected value when the popover opens.
 */
export const DatePickerTimePanel = () => {
  const {
    dateTime,
    isOpen,
    minuteStep = DEFAULT_MINUTE_STEP,
    setTime,
  } = useDatePickerContext();
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);

  const step =
    Number.isFinite(minuteStep) && minuteStep > 0 && minuteStep <= 60
      ? Math.floor(minuteStep)
      : DEFAULT_MINUTE_STEP;

  const hours = Array.from({ length: HOURS_IN_DAY }, (_, index) => index);
  const minutes = Array.from(
    { length: Math.ceil(MINUTES_IN_HOUR / step) },
    (_, index) => index * step,
  );

  const selectedHour = dateTime?.hour;
  // The selected minute rarely lands exactly on a step, so highlight the step
  // it belongs to rather than nothing at all.
  const selectedMinute =
    dateTime && Number.isFinite(dateTime.minute)
      ? Math.floor(dateTime.minute / step) * step
      : undefined;

  useEffect(() => {
    if (!isOpen) return;

    centreOnSelected(hoursRef.current);
    centreOnSelected(minutesRef.current);
  }, [isOpen, selectedHour, selectedMinute]);

  return (
    <S.TimePanel data-testid="datepicker-time-panel">
      <S.TimeColumn ref={hoursRef} role="listbox" aria-label="Hours">
        {hours.map((hour) => (
          <S.TimeCell
            key={`hour-${hour}`}
            role="option"
            aria-selected={selectedHour === hour}
            aria-label={`${pad(hour)} hours`}
            isSelected={selectedHour === hour}
            onClick={() => setTime?.({ hour })}>
            {pad(hour)}
          </S.TimeCell>
        ))}
      </S.TimeColumn>
      <S.TimeColumn ref={minutesRef} role="listbox" aria-label="Minutes">
        {minutes.map((minute) => (
          <S.TimeCell
            key={`minute-${minute}`}
            role="option"
            aria-selected={selectedMinute === minute}
            aria-label={`${pad(minute)} minutes`}
            isSelected={selectedMinute === minute}
            onClick={() => setTime?.({ minute })}>
            {pad(minute)}
          </S.TimeCell>
        ))}
      </S.TimeColumn>
    </S.TimePanel>
  );
};
