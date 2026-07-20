import { useMask, format as maskFormat } from '@react-input/mask';
import { DatePickerProps } from '../types';
import {
  DEFAULT_MASK,
  DEFAULT_MONTH_MASK,
  DEFAULT_YEAR_MASK,
} from '../constants';
import { processDate } from '../utils';

export const useDatePickerMask = ({
  maskOptions,
  formatIndexes,
  dateMinParts,
  dateMaxParts,
}: Pick<DatePickerProps, 'maskOptions'> & {
  formatIndexes: { day: number; month: number; year: number };
  dateMinParts: number[];
  dateMaxParts: number[];
}) => {
  const {
    mask = DEFAULT_MASK,
    replacement = { _: /\d/ },
    ...restMaskOptions
  } = maskOptions || {};

  const useMaskResult = useMask({
    mask,
    replacement,
    track: ({ data, selectionStart, selectionEnd, value: currentValue }) => {
      // `showTimePicker` appends a ` __:__` suffix onto the date mask, so
      // strip it before comparing against the bare date masks below.
      const dateMask = mask.split(' ')[0];

      if (
        dateMask === DEFAULT_MASK ||
        dateMask === DEFAULT_MONTH_MASK ||
        dateMask === DEFAULT_YEAR_MASK
      ) {
        const newValue =
          currentValue.slice(0, selectionStart) +
          data +
          currentValue.slice(selectionEnd);

        const updatedValue = maskFormat(newValue, { mask, replacement });
        const splittedValue = updatedValue.split(' ')[0].split('/');
        const isChecked = processDate(
          {
            day:
              formatIndexes['day'] !== -1
                ? splittedValue[formatIndexes['day']]
                : '',
            month:
              formatIndexes['month'] !== -1
                ? splittedValue[formatIndexes['month']]
                : '',
            year: splittedValue[formatIndexes['year']],
          },
          dateMinParts[formatIndexes['year']],
          dateMaxParts[formatIndexes['year']],
        );

        return isChecked ? data : '';
      } else {
        return data;
      }
    },
    ...restMaskOptions,
  });

  return useMaskResult;
};
