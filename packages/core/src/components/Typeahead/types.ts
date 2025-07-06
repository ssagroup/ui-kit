import { CommonProps } from '@global-types/emotion';
import { FieldError } from 'react-hook-form';

export type TypeaheadValue = string | number;

export type TypeaheadOptionProps = Record<string, TypeaheadValue>;

export interface TypeaheadProps {
  selectedItems?: Array<TypeaheadValue>;
  defaultSelectedItems?: Array<TypeaheadValue>;
  isMultiple?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  popoverClassName?: string;
  optionsClassName?: string;
  wrapperClassName?: string;
  width?: string | number;
  isOpen?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startIconClassName?: string;
  endIconClassName?: string;
  name?: string;
  label?: string;
  helperText?: string;
  error?: FieldError;
  success?: boolean;
  validationSchema?: Record<string, unknown>;
  placeholder?: string | null;
  filterOptions?: boolean;
  autoSelect?: boolean;
  onChange?: (selectedItem: TypeaheadValue, isSelected: boolean) => void;
  onClearAll?: () => void;
  onRemoveSelectedClick?: (selectedItem: TypeaheadValue) => void;
  onEmptyChange?: (isEmpty?: boolean) => void;
  renderOption?: (data: {
    value: string | number;
    input: string;
    label: string;
  }) => React.ReactNode;
}

export type UseTypeaheadProps = Pick<
  TypeaheadProps,
  | 'selectedItems'
  | 'defaultSelectedItems'
  | 'isDisabled'
  | 'children'
  | 'isMultiple'
  | 'onChange'
  | 'onClearAll'
  | 'onRemoveSelectedClick'
  | 'onEmptyChange'
  | 'renderOption'
  | 'isOpen'
  | 'className'
  | 'startIcon'
  | 'endIcon'
  | 'startIconClassName'
  | 'endIconClassName'
  | 'name'
  | 'validationSchema'
  | 'error'
  | 'success'
  | 'placeholder'
  | 'filterOptions'
  | 'autoSelect'
>;

export interface TypeaheadItemsListProps extends CommonProps {
  children?: React.ReactNode;
  noItemsMessage?: string;
}

export interface TypeaheadItemProps extends CommonProps {
  isActive?: boolean;
  isDisabled?: boolean;
  value?: string | number;
  label?: string | number;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
