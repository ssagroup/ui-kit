import { IDropdownOption } from '@components/DropdownOptions/types';

export type IDropdownProps<P extends IDropdownOption> = {
  selectedItems?: P[];
  isMultiple?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  showPlaceholder?: boolean;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  label?: string;
  onChange?: (items: P[]) => void;
};

export interface DropdownContextType<T extends IDropdownOption> {
  onChange: (item: T) => void;
  isMultiple?: boolean;
  allItems: Record<string | number, T>;
}
