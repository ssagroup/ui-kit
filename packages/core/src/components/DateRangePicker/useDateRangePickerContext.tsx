import { useContext } from 'react';
import { DateRangePickerContext } from './DateRangePickerContext';
import { DateRangePickerContextProps } from './types';

export const useDateRangePickerContext = (): DateRangePickerContextProps =>
  useContext(DateRangePickerContext);
