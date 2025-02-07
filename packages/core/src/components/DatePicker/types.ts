import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useMask } from '@react-input/mask';

export type DatePickerProps = {
  name: string;
  format: string;
  maskOptions: Parameters<typeof useMask>[0];
  openCalendarMode?: 'icon' | 'input' | 'both';
};

export type DatePickerContextProps = DatePickerProps & {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
