import { IDropdownOption } from '@components/DropdownOptions';

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

export interface DropdownContextType {
  onChange: (item: IDropdownOption) => void;
  isMultiple?: boolean;
  allItems: Record<string | number, IDropdownOption>;
}
