import { CommonProps } from '@global-types/emotion';
import {
  FieldError,
  FieldValues,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';

export type TypeaheadValue = string | number;

export type TypeaheadOptionProps = Record<string, TypeaheadValue>;

export interface TypeaheadProps {
  initialSelectedItems?: Array<TypeaheadValue>;
  isMultiple?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  optionsClassName?: string;
  isOpen?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  startIconClassName?: string;
  endIconClassName?: string;
  name?: string;
  label?: string;
  helperText?: string;
  errors?: FieldError;
  success?: boolean;
  validationSchema?: Record<string, unknown>;
  placeholder?: string | null;
  setValue?: UseFormSetValue<FieldValues>;
  register?: UseFormReturn['register'];
  onChange?: (selectedItem: TypeaheadValue, isSelected: boolean) => void;
  renderOption?: (data: {
    value: string | number;
    input: string;
    label: string;
  }) => React.ReactNode;
}

export type UseTypeaheadProps = Pick<
  TypeaheadProps,
  | 'initialSelectedItems'
  | 'isDisabled'
  | 'children'
  | 'isMultiple'
  | 'onChange'
  | 'renderOption'
  | 'isOpen'
  | 'className'
  | 'startIcon'
  | 'endIcon'
  | 'startIconClassName'
  | 'endIconClassName'
  | 'name'
  | 'register'
  | 'setValue'
  | 'validationSchema'
  | 'errors'
  | 'success'
  | 'placeholder'
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
