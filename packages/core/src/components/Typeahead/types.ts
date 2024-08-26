import { CommonProps } from '@global-types/emotion';

export type TypeaheadValue = string | number;

export type TypeaheadOptionProps = Record<string, TypeaheadValue>;

export type TypeaheadProps = {
  selectedItems?: Array<TypeaheadValue>;
  isMultiple?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  optionsClassname?: string;
  isOpen?: boolean;
  label?: string;
  onChange?: (selectedItem: TypeaheadValue, isSelected: boolean) => void;
  renderOption?: (data: {
    value: string | number;
    input: string;
    label: string;
  }) => React.ReactNode;
};

export interface TypeaheadContextType {
  isMultiple?: boolean;
  allItems: Record<number | string, Record<string, string | number>>;
  selectedItems: Array<TypeaheadValue>;
  onChange: (item: string | number) => void;
  setSelectedItems: (selectedItems: Array<TypeaheadValue>) => void;
}

export interface TypeaheadItemsListProps extends CommonProps {
  ariaLabelledby?: string;
  id?: string;
  children?: React.ReactNode;
  noItemsMessage?: string;
}

export interface TypeaheadItemProps extends CommonProps {
  isActive?: boolean; // TODO: check
  isMultiple?: boolean; // TODO: check
  isDisabled?: boolean; // TODO: check
  noHover?: boolean; // TODO: check
  value?: string | number | boolean;
  label?: string | number;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
