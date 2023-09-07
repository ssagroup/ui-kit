import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { CommonProps } from '../..';

export interface ICheckboxProps extends CommonProps {
  text?: string;
  id?: string;
  onChange: (newState: boolean) => void;
  externalState?: boolean;
  isDisabled?: boolean;
  initialState?: boolean;
  isIndeterminate?: boolean;
  name?: string;
  isRequired?: boolean;
}

export type IFormCheckboxProps<T extends FieldValues> = Omit<
  ICheckboxProps,
  'onChange' | 'name'
> & {
  name: FieldPath<T>;
  control: Control<T>;
};
