import { Popover } from '@components/Popover';

import { useDateRangePickerContext } from '../useDateRangePickerContext';

import { DatePickerCalendar } from './Calendar';
import { Trigger } from './Trigger';

export const DatePickerContent = () => {
  const { isOpen } = useDateRangePickerContext();

  return (
    <Popover
      interactionsEnabled={'click'}
      placement={'top-start'}
      open={isOpen}>
      <Trigger />
      <DatePickerCalendar />
    </Popover>
  );
};
