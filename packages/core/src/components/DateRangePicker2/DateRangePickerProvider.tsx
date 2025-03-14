import { useRef, useState } from 'react';
import { DateRangePickerContextProps, DateRangePickerProps } from './types';
import { useDateRangePicker } from './hooks';
import { DateRangePickerContext } from './DateRangePickerContext';

export const DateRangePickerProvider = ({
  children,
  ...rest
}: React.PropsWithChildren<DateRangePickerProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const { formatIndexes, ...restHook } = useDateRangePicker({
    ...rest,
    isOpen,
    setIsOpen,
  });

  const inputFromRef = useRef<HTMLInputElement | null>(null);
  const inputToRef = useRef<HTMLInputElement | null>(null);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    restHook.handleBlur(e);
    rest.onBlur?.(e);
  };

  const toggleOpen = () => {
    setIsOpen((current) => !current);
  };

  const handleToggleOpen: DateRangePickerContextProps['handleToggleOpen'] = (
    e,
  ) => {
    const tagName = e.currentTarget.tagName.toLowerCase();
    if (
      rest.openCalendarMode === 'both' ||
      (rest.openCalendarMode === 'input' && tagName === 'input') ||
      (rest.openCalendarMode === 'icon' && tagName === 'button')
    ) {
      toggleOpen();
    }
    if (tagName === 'input' && rest.inputProps?.inputProps?.onClick) {
      rest.inputProps.inputProps.onClick(
        e as React.MouseEvent<HTMLInputElement>,
      );
    }
  };
  return (
    <DateRangePickerContext.Provider
      value={{
        ...rest,
        ...restHook,
        formatIndexes,
        inputFromRef,
        inputToRef,
        isOpen,
        setIsOpen,
        handleSetIsOpen,
        handleToggleOpen,
        onBlur: handleBlur,
      }}>
      {children}
    </DateRangePickerContext.Provider>
  );
};
