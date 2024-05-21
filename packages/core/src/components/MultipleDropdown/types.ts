import { DropdownOptionProps } from '@components/DropdownOptions/types';

export type DropdownProps<P extends DropdownOptionProps> = {
  selectedItems?: P[];
  isMultiple?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  showPlaceholder?: boolean;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  label?: string;
  onChange?: (selectedItem: string | number, isSelected: boolean) => void;
};

export interface DropdownContextType<T extends DropdownOptionProps> {
  onChange: (item: T) => void;
  isMultiple?: boolean;
  allItems: Record<string | number, T>;
}
