import { Popover } from '@components/Popover';

import { useDatePickerContext } from '../useDatePickerContext';

import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerTrigger } from './DatePickerTrigger';

export const DatePickerContent = () => {
  const { isOpen, setIsOpen } = useDatePickerContext();
  const handleOpenChange = (open: boolean) => setIsOpen(open);
  return (
    <Popover
      interactionsEnabled={'click'}
      onOpenChange={handleOpenChange}
      placement={'top-start'}
      open={isOpen}>
      <DatePickerTrigger />
      <DatePickerCalendar />
    </Popover>
  );
};
