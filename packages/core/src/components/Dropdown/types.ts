import { IDropdownOption } from '@components/DropdownOptions';
import { CommonProps } from '@global-types/emotion';

export interface IDropdownProps<P extends IDropdownOption> extends CommonProps {
  selectedItem?: P;
  onChange?: (item: P) => void;
  isDisabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  isOpen?: boolean;
}

export interface DropdownContextType {
  onChange: (item?: string) => void;
  activeItem?: IDropdownOption | null;
}
