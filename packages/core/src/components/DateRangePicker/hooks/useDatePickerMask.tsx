import { useMask, format as maskFormat } from '@react-input/mask';
import { DateRangePickerProps } from '../types';
import { DEFAULT_MASK } from '../constants';
import { processDate } from '../utils';

export const useDatePickerMask = ({
  maskOptions,
  formatIndexes,
  dateMinParts,
  dateMaxParts,
}: Pick<DateRangePickerProps, 'maskOptions'> & {
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
      console.log('>>>track', data, selectionStart, selectionEnd, currentValue);
      if (mask === DEFAULT_MASK) {
        const newValue =
          currentValue.slice(0, selectionStart) +
          data +
          currentValue.slice(selectionEnd);

        const updatedValue = maskFormat(newValue, { mask, replacement });
        const splittedValue = updatedValue.split('/');
        const isChecked = processDate(
          {
            day: splittedValue[formatIndexes['day']],
            month: splittedValue[formatIndexes['month']],
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
