import { Popover } from '@components/Popover';
import { DatePickerCalendar } from './DatePickerCalendar';
import { DatePickerTrigger } from './DatePickerTrigger';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerContent = () => {
  const { isOpen, setIsOpen } = useDatePickerContext();
  const handleOpenChange = (open: boolean) => setIsOpen(open);
  return (
    <Popover
      interactionsEnabled={'click'}
      onOpenChange={handleOpenChange}
      placement={'top-start'}
      // open
      open={isOpen}>
      <DatePickerTrigger />
      <DatePickerCalendar />
    </Popover>
  );
};
