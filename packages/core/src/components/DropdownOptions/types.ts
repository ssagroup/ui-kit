import { CommonProps } from '@global-types/emotion';

export type IDropdownOption = Record<string, string | number>;

export interface IDropdownItemsListProps extends CommonProps {
  ariaLabelledby?: string;
  id?: string;
  children?: React.ReactNode;
}
