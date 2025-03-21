import { Popover } from '@components/Popover';
import { DatePickerCalendar } from './Calendar';
import { Trigger } from './Trigger';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

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
