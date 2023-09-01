import { IDropdownOption } from '@components/DropdownOptions';

export interface IDropdownProps<P extends IDropdownOption> {
  selectedItems?: P[];
  onChange?: (items: P[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export interface DropdownContextType {
  onChange: (item: IDropdownOption) => void;
  // activeItems: IDropdownOption[];
  allItems: Record<string | number, IDropdownOption>;
}
