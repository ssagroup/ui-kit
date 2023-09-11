import { IDropdownOption } from '@components/DropdownOptions/types';

export type IDropdownProps<P extends IDropdownOption> = {
  selectedItems?: P[];
  isMultiple?: boolean;
  onChange?: (items: P[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  label?: string;
};

export interface DropdownContextType<T extends IDropdownOption> {
  onChange: (item: T) => void;
  isMultiple?: boolean;
  allItems: Record<string | number, T>;
}
