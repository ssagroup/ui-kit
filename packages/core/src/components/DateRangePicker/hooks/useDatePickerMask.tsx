import { useMask, format as maskFormat } from '@react-input/mask';
import { DateRangePickerProps } from '../types';
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
    mask,
    replacement = { _: /\d/ },
    ...restMaskOptions
  } = maskOptions || {};

  const useMaskResult = useMask({
    mask,
    replacement,
    track: ({ data, selectionStart, selectionEnd, value: currentValue }) => {
      const isDateMask = typeof mask === 'string' && /^[_/]+$/.test(mask);
      if (isDateMask) {
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
