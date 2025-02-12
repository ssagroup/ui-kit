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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      if (format === DEFAULT_MASK_FORMAT && mask === DEFAULT_MASK) {
        const newValue =
          currentValue.slice(0, selectionStart) +
          data +
          currentValue.slice(selectionEnd);

        const updatedValue = maskFormat(newValue, { mask, replacement });
        const splittedValue = updatedValue.split('/');
        const isChecked = processDate(
          {
            day: splittedValue[1],
            month: splittedValue[0],
            year: splittedValue[2],
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
