import { useContext } from 'react';

import { DateRangePickerContext } from './DateRangePickerContext';

export const useDateRangePickerContext = () =>
  useContext(DateRangePickerContext);
