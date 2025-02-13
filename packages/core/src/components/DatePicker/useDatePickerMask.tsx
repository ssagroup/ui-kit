import { useMask, format as maskFormat } from '@react-input/mask';
import { DatePickerProps } from './types';
import {
  DEFAULT_MASK_FORMAT,
  DEFAULT_MASK,
  YEAR_MAX,
  YEAR_MIN,
} from './constants';
import { processDate } from './utils';

export const useDatePickerMask = ({
  format = DEFAULT_MASK_FORMAT,
  maskOptions,
  yearMin = YEAR_MIN,
  yearMax = YEAR_MAX,
}: Pick<DatePickerProps, 'format' | 'maskOptions' | 'yearMin' | 'yearMax'>) => {
  const {
    mask = DEFAULT_MASK,
    replacement = { _: /\d/ },
    ...restMaskOptions
  } = maskOptions || {};

  const useMaskResult = useMask({
    mask,
    replacement,
    track: ({ data, selectionStart, selectionEnd, value: currentValue }) => {
      if (mask === DEFAULT_MASK) {
        const newValue =
          currentValue.slice(0, selectionStart) +
          data +
          currentValue.slice(selectionEnd);

        const updatedValue = maskFormat(newValue, { mask, replacement });
        const splittedValue = updatedValue.split('/');
        const splittedFormat = format.split('/');
        const formatIndexes = {
          day: splittedFormat.findIndex((item) => item === 'dd'),
          month: splittedFormat.findIndex((item) => item === 'mm'),
          year: splittedFormat.findIndex((item) => item === 'yyyy'),
        };
        const isChecked = processDate(
          {
            day: splittedValue[formatIndexes['day']],
            month: splittedValue[formatIndexes['month']],
            year: splittedValue[formatIndexes['year']],
          },
          yearMin,
          yearMax,
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
