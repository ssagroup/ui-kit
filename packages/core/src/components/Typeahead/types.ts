import { CommonProps } from '@global-types/emotion';

export type TypeaheadValue = string | number;

export type TypeaheadOptionProps = Record<string, TypeaheadValue>;

export type TypeaheadProps = {
  initialSelectedItems?: Array<TypeaheadValue>;
  isMultiple?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  optionsClassname?: string;
  isOpen?: boolean;
  onChange?: (selectedItem: TypeaheadValue, isSelected: boolean) => void;
  renderOption?: (data: {
    value: string | number;
    input: string;
    label: string;
  }) => React.ReactNode;
};

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
