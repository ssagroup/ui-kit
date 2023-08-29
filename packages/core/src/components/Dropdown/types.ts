import { IDropdownOption } from '@components/DropdownOptions';

export interface IDropdownProps<P extends IDropdownOption> {
  selectedItem?: P;
  onChange?: (item: P) => void;
  isDisabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export interface DropdownContextType {
  onChange: (item: IDropdownOption | null | undefined) => void;
  activeItem: IDropdownOption | null | undefined;
}
