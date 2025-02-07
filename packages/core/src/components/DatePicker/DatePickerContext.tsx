import { createContext, useState } from 'react';
import { DatePickerContextProps, DatePickerProps } from './types';
import { DEFAULT_FORMAT } from './constants';
import { useDatePickerMask } from './useDatePickerMask';

export const DatePickerContext = createContext<DatePickerContextProps>({
  format: DEFAULT_FORMAT,
  name: '',
  maskOptions: {},
  openCalendarMode: 'icon',
  inputRef: { current: null },
  isOpen: false,
  setIsOpen: () => {
    // no-op
  },
});

export const DatePickerProvider = ({
  children,
  ...rest
}: React.PropsWithChildren<DatePickerProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { format, maskOptions } = rest;
  const inputRef = useDatePickerMask({
    format,
    maskOptions,
  });
  return (
    <DatePickerContext.Provider
      value={{ ...rest, inputRef, isOpen, setIsOpen }}>
      {children}
    </DatePickerContext.Provider>
  );
};
