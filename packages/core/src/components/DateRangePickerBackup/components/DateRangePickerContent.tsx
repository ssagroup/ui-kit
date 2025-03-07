import { Popover } from '@components/Popover';
import { DateRangePickerCalendar } from './DateRangePickerCalendar';
import { DateRangePickerTrigger } from './DateRangePickerTrigger';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { useImperativeHandle, useRef } from 'react';

export const DateRangePickerContent = () => {
  const { isOpen, setIsOpen, inputFromRef } = useDateRangePickerContext();
  const handleOpenChange = (open: boolean) => setIsOpen(open);
  const ref = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(inputFromRef, () => ref.current as HTMLInputElement);
  console.log('>>>inputFromRef', inputFromRef);
  return (
    <Popover
      interactionsEnabled={'click'}
      onOpenChange={handleOpenChange}
      placement={'top-start'}
      floatingOptions={{
        elements: {
          // floating: (inputRef as any)?.current,
          reference: ref.current,
        },
      }}
      open={isOpen}>
      <DateRangePickerTrigger />
      <DateRangePickerCalendar />
    </Popover>
  );
};
