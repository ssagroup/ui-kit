export interface IDropdownProps<P extends IDropdownOption> {
  selectedItem?: P;
  onChange?: (item: P) => void;
  isDisabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface DropdownContextType {
  onChange: (item: T) => void;
  activeItem: T;
}
