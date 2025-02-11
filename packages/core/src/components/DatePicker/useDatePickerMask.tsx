import { useMask } from '@react-input/mask';
import { DatePickerProps } from './types';
import { DEFAULT_FORMAT } from './constants';

export const useDatePickerMask = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  format = DEFAULT_FORMAT,
  maskOptions,
}: Pick<DatePickerProps, 'format' | 'maskOptions'>) => {
  const {
    mask = '__/__/____',
    replacement = { _: /\d/ },
    ...restMaskOptions
  } = maskOptions || {};
  return useMask({
    mask,
    replacement,
    // track: ({
    //   data,
    //   inputType,
    //   selectionStart,
    //   selectionEnd,
    //   value: currentValue,
    // }) => {
    //   // If a character is inserted (not deleted), and format is default
    //   if (
    //     inputType === 'insert' &&
    //     data !== null &&
    //     format === DEFAULT_FORMAT &&
    //     mask === DEFAULT_MASK
    //   ) {
    //     const updatedValue =
    //       currentValue.slice(0, selectionStart) +
    //       data +
    //       currentValue.slice(selectionEnd);

    //     // Inserted month validation (MM must be between 01 and 12)
    //     if (selectionStart < 2) {
    //       const month = parseInt(updatedValue.slice(0, 2), 10);
    //       if (month < 1 || month > 12) {
    //         return ''; // If the month is invalid, clear the insertion
    //       }
    //     }

    //     let offset = 0;
    //     if (currentValue.at(2) === '/') {
    //       offset = 1;
    //     }

    //     // Inserted day validation (DD must be between 01 and 31)
    //     if (selectionStart >= 3 + offset && selectionStart < 5 + offset) {
    //       const day = parseInt(updatedValue.slice(3 + offset, 5 + offset), 10);
    //       if (day < 1 || day > 31) {
    //         console.log()
    //         return ''; // If the day is invalid, clear the insertion
    //       }
    //     }

    //     // const yearOffset =
    //     //   currentValue.split('').filter((char) => char === '/').length === 2
    //     //     ? 1
    //     //     : 0;
    //     // if (selectionStart === 5 + yearOffset) {
    //     //   const firstYearNumber = parseInt(
    //     //     updatedValue.slice(5 + yearOffset, 6 + yearOffset),
    //     //   );
    //     //   if (firstYearNumber < 1 || firstYearNumber > 2) {
    //     //     return '';
    //     //   }
    //     // }
    //   }

    //   return data;
    // },
    ...restMaskOptions,
  });
};
